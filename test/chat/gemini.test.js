import request from 'supertest';
import express from 'express';
import fs from 'fs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import router from '../../chat/chatRouter.js';

jest.mock('fs');
jest.mock('@google/generative-ai');

// Create a test server with the router
const app = express();
app.use(express.json());
app.use('/chat', router);

describe('Gemini API Tests', () => {

    beforeAll(() => {
        // Mock GoogleGenerativeAI initialization
        GoogleGenerativeAI.mockImplementation(() => ({
            getGenerativeModel: jest.fn(() => ({
                generateContentStream: jest.fn().mockResolvedValue({
                    stream: { [Symbol.asyncIterator]: jest.fn(() => ({ text: () => 'streamed text' })) }
                }),
                startChat: jest.fn(() => ({
                    sendMessage: jest.fn().mockResolvedValue({
                        response: { text: 'Mocked Response Text' },
                        candidates: [{ content: { parts: [{ text: 'Mocked Text' }] } }]
                    })
                })),
                generateContent: jest.fn().mockResolvedValue({
                    response: 'Mocked Image or Audio Result'
                })
            }))
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('GET /chat - returns welcome message', async () => {
        const res = await request(app).get('/chat');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Hello World! from chatRouter.js ');
    });

    describe('POST /chat/process-text-stream', () => {
        test('returns streamed response for valid prompt', async () => {
            const res = await request(app)
                .post('/chat/process-text-stream')
                .send({ prompt: 'Stream this prompt' });
            expect(res.statusCode).toBe(200);
        });

        test('returns error if prompt is missing', async () => {
            const res = await request(app)
                .post('/chat/process-text-stream')
                .send({});
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual({ error: 'no prompt' });
        });
    });

    describe('POST /chat/process-chat-text', () => {
        test('processes text input with valid prompt', async () => {
            const res = await request(app)
                .post('/chat/process-chat-text')
                .send({ prompt: 'Chat text prompt' });
            expect(res.statusCode).toBe(200);
            expect(res.body).toBe('Mocked Response Text');
        });

        test('returns error if prompt is missing', async () => {
            const res = await request(app)
                .post('/chat/process-chat-text')
                .send({});
            expect(res.statusCode).toBe(400);
            expect(res.body).toEqual({ error: 'no prompt' });
        });
    });

    describe('POST /chat/process-image', () => {
        test('returns processed image result', async () => {
            fs.readFileSync.mockReturnValue(Buffer.from('image data'));
            fs.unlinkSync.mockReturnValue(true);

            const res = await request(app)
                .post('/chat/process-image')
                .attach('image', Buffer.from('dummy data'), { filename: 'image.png' })
                .field('prompt', 'Image prompt');
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual('Mocked Image or Audio Result');
        });

        test('returns error if image file is missing', async () => {
            const res = await request(app)
                .post('/chat/process-image')
                .send({ prompt: 'Image prompt' });
            expect(res.statusCode).toBe(400);
            expect(res.body).toEqual({ error: 'no image file' });
        });
    });

    describe('POST /chat/process-audio', () => {
        test('returns processed audio result', async () => {
            fs.readFileSync.mockReturnValue(Buffer.from('audio data'));
            fs.unlinkSync.mockReturnValue(true);

            const res = await request(app)
                .post('/chat/process-audio')
                .attach('audio', Buffer.from('dummy data'), { filename: 'audio.mp3' })
                .field('prompt', 'Audio prompt');
            expect(res.statusCode).toBe(200);
            expect(res.body).toBe('Mocked Text');
        });

        test('returns error if audio file is missing', async () => {
            const res = await request(app)
                .post('/chat/process-audio')
                .send({ prompt: 'Audio prompt' });
            expect(res.statusCode).toBe(400);
            expect(res.body).toEqual({ error: 'no audio file' });
        });
    });
});

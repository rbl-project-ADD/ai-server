import { Model } from '../config/gemini.config.js';
import fs from 'fs';
import path from 'path';
import { defaultHistory } from '../constants/history.js';

export async function geminiTextStream(req, res) {
  // /chat/process-text-stream
  try {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache',
    });
    const { prompt } = req.body;
    if (!prompt) {
      return res.json({
        error: 'no prompt',
      });
    }

    const geminiResult = await Model().generateContentStream(prompt);

    if (geminiResult && geminiResult.stream) {
      await streamToStdout(geminiResult.stream, res);
    } else {
      res.end();
    }
  } catch (err) {
    console.log('error in Gemini chat: ', err);
    res.write('data: [DONE]\n\n');
    res.end();
  }
}

export async function geminiChatText(req, res) {
  // /chat/process-chat-text
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({
        error: 'no prompt',
      });
    }

    let message = [prompt];
    let filePath;
    if (req.file) {
      console.log('file:', req.file);
      console.log('file path:', req.file.path, path.resolve(req.file.path));
      filePath = path.resolve(req.file.path);
      const fileBuffer = fs.readFileSync(filePath);
      const fileBase64 = fileBuffer.toString('base64');
      const fileMimeType = req.file.mimetype;

      const file = {
        inlineData: {
          data: fileBase64,
          mimeType: fileMimeType,
        },
      };

      message.push(file);
    }

    const chat = Model().startChat({
      history: defaultHistory,
    });
    let result = await chat.sendMessage(message);
    // chat.getHistory().then((history) => {
    //     res.json({ ans: result.response.text(), history: history });
    // })

    fs.unlinkSync(filePath);
    res.json(result.response.text());
  } catch (err) {
    console.log('error in Gemini chat: ', err);
    res.status(500).json({
      error: 'internal server error',
    });
  }
}

export async function geminiImageInput(req, res) {
  // /chat/process-image
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({
        error: 'no prompt',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        error: 'no image file',
      });
    }

    const imagePath = path.resolve(req.file.path);
    const imageBuffer = fs.readFileSync(imagePath);
    const imageBase64 = imageBuffer.toString('base64');
    const imageMimeType = req.file.mimetype;

    const image = {
      inlineData: {
        data: imageBase64,
        mimeType: imageMimeType,
      },
    };

    const result = await Model().generateContent([prompt, image]);

    // Delete the uploaded image after processing
    fs.unlinkSync(imagePath);

    res.json(result);
  } catch (err) {
    console.log('error in Gemini image processing: ', err);
    res.status(500).json({ error: 'internal server error' });
  }
}

export async function geminiAudioInput(req, res) {
  // /chat/process-audio
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({
        error: 'no prompt',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        error: 'no audio file',
      });
    }

    const audioPath = path.resolve(req.file.path);
    const audioBuffer = fs.readFileSync(audioPath);
    const audioBase64 = audioBuffer.toString('base64');
    const audioMimeType = req.file.mimetype;

    const audio = {
      inlineData: {
        data: audioBase64,
        mimeType: audioMimeType,
      },
    };
    const chat = Model().startChat({
      history: defaultHistory,
    });
    let result = await chat.sendMessage([prompt, audio]);

    fs.unlinkSync(audioPath);
    res.json(result.response.candidates[0].content.parts[0].text);
  } catch (err) {
    console.log('error in Gemini chat: ', err);
    res.status(500).json({
      error: 'internal server error',
    });
  }
}
export async function streamToStdout(stream, res) {
  for await (const chunk of stream) {
    const chunkText = chunk.text();
    res.write(`data: ${JSON.stringify(chunkText)}\n\n`);
  }
  res.write('data: [DONE]\n\n');
  res.end();
}

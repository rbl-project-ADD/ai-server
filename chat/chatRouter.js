import express from 'express'
import multer from 'multer'
import { geminiTextStream,geminiImageInput,geminiChatText,geminiAudioInput } from './gemini.js'

const upload = multer({ dest: 'uploads/' });


const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World! from chatRouter.js ')
})
router.post('/process-text-stream', geminiTextStream)
router.post('/process-chat-text', upload.single('file'),geminiChatText)
router.post('/process-image', upload.single('image'), geminiImageInput)
router.post('/process-audio', upload.single('audio'), geminiAudioInput)

export default router
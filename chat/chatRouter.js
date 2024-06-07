import express from 'express'
import multer from 'multer'
import { gemini,geminiImageInput } from './gemini.js'

const upload = multer({ dest: 'uploads/' });


const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World! from chatRouter.js ')
})
router.post('/process-text-stream', gemini)
router.post('/process-image', upload.single('image'), geminiImageInput)

export default router
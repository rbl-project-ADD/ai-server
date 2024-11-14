import express from 'express';
import multer from 'multer';
import {
  geminiTextStream,
  geminiImageInput,
  geminiChatText,
  geminiAudioInput,
} from '../controller/translator.controller.js';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World! from translate.routes.js ');
});
router.post('/stream', geminiTextStream);
router.post('/file', upload.single('file'), geminiChatText);

export default router;

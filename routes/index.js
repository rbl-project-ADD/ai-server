// routes/index.js
import express from 'express';
import translateRouter from './translator.routes.js';
import flashCardsRouter from './flashCards.routes.js';
import grammarExerciseRouter from './grammarExercise.routes.js';

const router = express.Router();

router.use('/translate', translateRouter);
router.use('/flashcards', flashCardsRouter);
router.use('/grammar', grammarExerciseRouter);

export default router;

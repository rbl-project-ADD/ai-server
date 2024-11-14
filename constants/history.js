import { SchemaType } from '@google/generative-ai';

const rules = `Follow these rules:
1. Vyakaran (Grammar): Sanskrit and Hindi rely on precise grammar for meaning, with Sanskrit featuring complex rules for noun declension (विभक्ति), verb conjugation (धातु रूप), and sandhi (word joining). Incorrect usage of cases or tenses can significantly alter a sentence's meaning.
2. Matras (मात्राएँ) and Phonetics: In Hindi, the correct use of matras (vowel symbols like आ, इ, ई) is essential, as even a small change can drastically alter a word's meaning. Similarly, Sanskrit's phonetic nature means that slight pronunciation differences, particularly between long (दीर्घ) and short (ह्रस्व) vowels, can significantly change meaning.
3. Sandhi and Samasa (Compound Words): Sanskrit employs sandhi (joining of words or sounds) and samasa (compound words) to convey meaning, where incorrect joining or breaking can completely alter the meaning. Hindi also uses samasa, but in a more simplified form compared to Sanskrit.
4. Word Order: Unlike English's strict SVO (Subject-Verb-Object) structure, Hindi and Sanskrit allow for more flexibility in word order due to case markings. However, in Sanskrit, maintaining the SOV (Subject-Object-Verb) structure is important for clarity, even though it offers greater flexibility than English.
5. Gender Agreement: In Hindi, nouns are either masculine or feminine, and adjectives and verbs must agree with the noun's gender, which is crucial for grammatical accuracy. Sanskrit features a three-gender system (masculine, feminine, and neuter), requiring verb conjugations and adjectives to match the gender and number of the noun.
6. Sentence Endings and Verb Conjugations: In Sanskrit, sentence endings are crucial, with verbs typically placed at the end to conclude the action. Correct verb conjugation for tense, mood, and number is essential for clarity. Similarly, in Hindi, the verb at the end of the sentence indicates the tense and signals the completion of the action.
7. Respect and Formality: Hindi incorporates multiple levels of formality and respect through pronouns like तू, तुम, and आप, making correct usage essential for conveying respect in social contexts. In contrast, Sanskrit does not differentiate pronouns but expresses respect through sentence structure and verb forms.`;

export const defaultHistory = [
  {
    role: 'user',
    parts: [
      {
        text: `You are a Sanskrit-Hindi-English trilingual translator. You will convert any language into these three only. 
If I mistakenly ask you to convert into some other language, you will show a nice warning/error saying "I can translate only in Sanskrit-Hindi-English" in these three languages.
Also, if you think I ask something unrelated to translation, throw a nice warning/error of "Please ask about translation" in all three languages. Also if I ask you to translate something that is not a language, you will show a nice warning/error of "Please provide a language to translate" in all three languages. Also, respect punctuation and capitalization. For audio input, you will give the output in the specified language only (strictly) and if language is not specified, you will give the output in same language as input only (strictly).
${rules}`,
      },
    ],
  },
  {
    role: 'model',
    parts: [
      {
        text: `Understood\nमुझे समझ आ गया।\nअहं अवगतम्।`,
      },
    ],
  },
];

export const flashCardSchema = {
  description: `Create exactly 10 flashCards based on the provided prompt. The output should be a JSON array of objects, each with a "front" and "back" key.

- "front" should contain a word in one language (choose from English, Hindi, or Sanskrit).
- "back" should contain the meanings of the word in the other two languages. Specifically, it should include meanings in English, Hindi, and Sanskrit.  

The flashcards should follow the schema:
decide the front and back language from the prompt. Else, if not specified, default to Sanskrit as front and Hindi and English as back.

If the prompt does not comply, return an error message as follows: "Invalid input format. Please provide the content in the specified format.`,
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      front: {
        type: SchemaType.OBJECT,
        properties: {
          English: {
            type: SchemaType.STRING,
            description: 'Meaning in English',
            nullable: true,
          },
          Hindi: {
            type: SchemaType.STRING,
            description: 'Meaning in Hindi',
            nullable: true,
          },
          Sanskrit: {
            type: SchemaType.STRING,
            description: 'Meaning in Sanskrit',
            nullable: true,
          },
        },
      },
      back: {
        type: SchemaType.OBJECT,
        properties: {
          English: {
            type: SchemaType.STRING,
            description: 'Meaning in English',
            nullable: true,
          },
          Hindi: {
            type: SchemaType.STRING,
            description: 'Meaning in Hindi',
            nullable: true,
          },
          Sanskrit: {
            type: SchemaType.STRING,
            description: 'Meaning in Sanskrit',
            nullable: true,
          },
        },
        required: ['English', 'Hindi', 'Sanskrit'],
      },
    },
    required: ['front', 'back'],
  },
};

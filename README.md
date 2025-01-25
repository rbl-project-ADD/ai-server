# AI Server for Language Learning 🚀

A robust Node.js/Express server leveraging Google's Gemini AI for advanced language learning features. This server powers translation, flash card generation, and grammar exercises for Sanskrit, Hindi, and English languages.

## Features 🌟

- **Translation Service**: Three-way translation between Sanskrit, Hindi, and English
- **Flash Cards**: AI-powered flash card generation for vocabulary learning
- **Grammar Exercises**: Dynamic generation of grammar exercises with multiple difficulty levels
- **Streaming Support**: Real-time text processing capabilities

## Getting Started 🏁

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key

### Installation 🔧

1. **Clone the repository:**

   ```sh
   git clone https://github.com/rbl-project-ADD/ai-server.git
   ```

2. **Set up environment:**

   ```sh
   cd ai-server
   npm install
   cp .env.example .env
   ```

3. **Configure environment:**
   Add your Gemini API key to `.env`:

   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Start the server:**
   ```sh
   npm start
   ```

## API Endpoints 🛣️

### Translation Service

| Endpoint            | Method | Description                                                           |
| ------------------- | ------ | --------------------------------------------------------------------- |
| `/translate/stream` | POST   | Stream translation results                                            |
| `/translate/file`   | POST   | Process file for translation (if no file the text will be translated) |

### Flash Cards

| Endpoint               | Method | Description                     |
| ---------------------- | ------ | ------------------------------- |
| `/flashcards/generate` | POST   | Generate vocabulary flash cards |

### Grammar Exercises

| Endpoint            | Method | Description                |
| ------------------- | ------ | -------------------------- |
| `/grammar/generate` | POST   | Generate grammar exercises |

## Usage Examples 📝

### Generate Flash Cards

```sh
curl -X POST http://localhost:8000/flashcards/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Create flash cards for basic Sanskrit greetings"}'
```

### Generate Grammar Exercise

```sh
curl -X POST http://localhost:8000/grammar/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Create a beginner level Sanskrit exercise"}'
```

# AI Server 🚀

This is a server-side application for the RBL Project, utilizing Google's Generative AI for text and image processing. The server is built with Node.js and Express.

## Getting Started 🏁

These instructions will help you set up the project on your local machine for development and testing purposes.


### Installation 🔧

1. **Clone the repository:**
    ```sh
    git clone https://github.com/rbl-project-ADD/ai-server.git
    ```

2. **Navigate to the project directory:**
    ```sh
    cd ai-server
    ```

3. **Install the dependencies:**
    ```sh
    npm install
    ```

4. **Create a `.env` file in the root directory and add the following environment variables:**
    ```sh
    GEMINI_API_KEY="your_api_key_here"
    ```

5. **Start the server:**
    ```sh
    npm start
    ```

Here's the updated API Endpoints section in the `README.md`:

## API Endpoints 🛣️📡

| Route                     | HTTP Method | Description                                                           |
|---------------------------|-------------|-----------------------------------------------------------------------|
| /                         | GET         | Returns a greeting from the server                                    |
| /chat                     | GET         | Returns a greeting from the chat router                               |
| /chat/process-text-stream | POST        | Processes a text input in the body as a stream using the Gemini model |
| /chat/process-image       | POST        | Processes an image input with a prompt in form-data using the Gemini model |


### Example Usage

1. **Process Text Stream:**
    ```sh
    curl -X POST http://localhost:3000/chat/process-text-stream -H "Content-Type: application/json" -d '{"prompt": "Your prompt here"}'
    ```

2. **Process Image:**
    ```sh
    curl -X POST http://localhost:3000/chat/process-image -F "image=@path_to_your_image" -F "prompt=Do these look store-bought or homemade?"
    ```
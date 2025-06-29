# PDF ChatBot

A full-stack application that allows users to upload PDF documents and interact with them using AI-powered chat. The backend uses LangChain, Google Generative AI embeddings, and FAISS for vector storage, while the frontend is built with React and Vite.

## Features
- Upload PDF files and process them into vector stores
- Query and chat with your documents using advanced AI embeddings
- Persistent storage of document vectors for fast retrieval

## Project Structure
```
client/      # React frontend (Vite)
server/      # Node.js backend (Express)
```

## Getting Started

### 1. Clone the Repository
```sh
git clone https://github.com/your-username/Pdf-ChatBot.git
cd Pdf-ChatBot
```

### 2. Install Dependencies
#### Backend
```sh
cd server
npm install
```
#### Frontend
```sh
cd ../client
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `server` directory with the following content:
```
GEMINI_API_KEY=your_google_gemini_api_key
```
Replace `your_google_gemini_api_key` with your actual API key.

### 4. Run the Application
#### Start the Backend
```sh
cd server
node server.js
```
#### Start the Frontend
```sh
cd ../client
npm run dev
```

The frontend will be available at `http://localhost:5173` (default Vite port).

## Using as a Submodule in Another Project

You can add this project to another repository as a submodule:

```sh
git submodule add https://github.com/your-username/Pdf-ChatBot.git
```

Then follow the setup steps above inside the `Pdf-ChatBot` directory.


import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFilename(file ? file.name : "");
    setUploadSuccess(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("pdf", selectedFile);

    try {
      const res = await axios.post("http://localhost:3000/api/upload", formData);
      setUploadSuccess(true);
      alert("PDF uploaded and processed successfully.");
    } catch (err) {
      console.error("Upload Error:", err);
      alert("Failed to upload PDF.");
    }
  };

  const handleAsk = async () => {
    if (!question || !filename) {
      alert("Please enter a question and upload a PDF first.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/chat", {
        question,
        filename,
      });
      setAnswer(res.data.message);
    } catch (err) {
      console.error("Chat Error:", err);
      alert("Failed to get an answer.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">📄 PDF Chat App</h1>

      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md mb-6">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mb-4"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload PDF
        </button>
        {uploadSuccess && (
          <p className="text-green-600 mt-2">✅ Upload successful</p>
        )}
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        <textarea
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />
        <button
          onClick={handleAsk}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Ask
        </button>
        {answer && (
          <div className="mt-4">
            <h2 className="font-bold">Answer:</h2>
            <p className="text-gray-800 mt-2 whitespace-pre-wrap">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

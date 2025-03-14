"use client";
import { useState } from "react";

export default function ContentGenerator() {
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchContent = async () => {
    if (!prompt.trim()) {
      setError("Please enter a valid prompt.");
      return;
    }

    setLoading(true);
    setError(""); // Clear previous errors

    try {
      const response = await fetch("http://127.0.0.1:8000/generate-content/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setGeneratedContent(data.content);
    } catch (error) {
      console.error("Error fetching content:", error);
      setError("Failed to fetch content. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="p-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">ElevateAI 🚀</h1>

      <textarea
        className="border p-2 w-full max-w-lg"
        placeholder="Enter your prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <button
        onClick={fetchContent}
        className="px-4 py-2 mt-4 bg-blue-500 text-white rounded"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate AI Content"}
      </button>

      {generatedContent && (
        <div className="mt-4 p-4 border rounded shadow max-w-lg">{generatedContent}</div>
      )}
    </div>
  );
}

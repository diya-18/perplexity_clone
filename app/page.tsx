'use client';

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    setLoading(true);
    setAnswer('');
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: query }),
    });
    const data = await res.json();
    setAnswer(data.text || data.error || "No answer.");
    setLoading(false);
  }

  return (
    <main className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Perplexity Clone (Gemini)</h1>
      <div className="flex gap-2">
        <input
          className="border rounded px-2 py-1 flex-1"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Ask anything..."
        />
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded"
          onClick={handleAsk}
          disabled={loading || !query}
        >
          {loading ? "Loading..." : "Ask"}
        </button>
      </div>
      <div className="prose mt-6">
        {answer && (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {answer}
          </ReactMarkdown>
        )}
      </div>
    </main>
  );
}


'use client';

import { useState, useEffect } from 'react';

interface HistoryItem {
  text: string;
  context: string;
}

export default function HistoriquePage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    async function fetchHistory() {
      const response = await fetch('/api/history');
      const data: HistoryItem[] = await response.json();
      setHistory(data);
    }

    fetchHistory();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Historique des reformulations</h1>
      {history.length > 0 ? (
        <ul className="space-y-4">
          {history.map((item, index) => (
            <li key={index} className="p-4 bg-gray-100 rounded shadow">
              <p className="text-sm text-gray-600">Contexte : {item.context}</p>
              <p className="text-lg">{item.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun historique disponible.</p>
      )}
    </div>
  );
}
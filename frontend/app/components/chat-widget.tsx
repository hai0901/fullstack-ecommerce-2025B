import React, { useState } from 'react';
import api from '~/utils/api';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const send = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const r = await api.post('/chat-ai/search-products', { message });
      setItems(r.data.items || []);
    } catch (e: any) {
      console.error(e);
      setError(e?.response?.data?.error || 'Chat failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating trigger */}
      <button
        className="fixed bottom-4 right-4 z-50 rounded-full px-4 py-2 bg-black text-white border border-neutral-700 shadow"
        onClick={() => setOpen(true)}
      >
        Chat
      </button>

      {/* Overlay + panel */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end md:items-center md:justify-end p-4">
          <div className="w-full md:w-[420px] max-h-[80vh] rounded-2xl border border-neutral-800 bg-neutral-950 text-neutral-100 shadow-xl flex flex-col">
            {/* Header */}
            <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
              <div className="font-semibold text-neutral-100">Shop Assistant</div>
              <button
                className="text-xs text-neutral-400 hover:text-neutral-200"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3 overflow-auto">
              <div className="text-xs text-neutral-400">
                Ask e.g. “cheap wireless headphones under 500k”
              </div>

              <div className="flex gap-2">
                <input
                  className="flex-1 rounded-md border border-neutral-800 bg-neutral-900 text-neutral-100 placeholder:text-neutral-500 px-3 py-2 outline-none focus:border-neutral-700"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="find me anything"
                />
                <button
                  className="rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-neutral-100 hover:bg-neutral-800 disabled:opacity-50"
                  onClick={send}
                  disabled={loading}
                >
                  {loading ? '...' : 'Send'}
                </button>
              </div>

              {error && <div className="text-sm text-red-500">Chat failed</div>}

              {items.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-neutral-200">Suggestions</h4>
                  {items.map((p) => (
                    <div key={p._id} className="rounded-md border border-neutral-800 bg-neutral-900 p-3">
                      <div className="font-semibold text-neutral-100">{p.name}</div>
                      {typeof p.price !== 'undefined' && (
                        <div className="text-sm text-neutral-400">${p.price}</div>
                      )}
                      {p.description && (
                        <div className="text-sm text-neutral-300">{p.description}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

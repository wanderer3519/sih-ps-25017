import React, { useState } from 'react';

interface SendMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: (message: { subject: string; body: string }) => Promise<void> | void;
  recipientName?: string;
  recipientEmail?: string;
}

const SendMessageModal: React.FC<SendMessageModalProps> = ({ isOpen, onClose, onSendMessage, recipientName }) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    setLoading(true);
    try {
      await onSendMessage({ subject, body });
      setSubject('');
      setBody('');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
      <div className="relative w-full max-w-xl mx-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Send Message to {recipientName || 'Alumni'}</h3>
          </div>
          <div className="p-4 space-y-3">
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              className="w-full p-2 border rounded"
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={6}
              placeholder="Message body"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="p-4 border-t flex justify-end space-x-2">
            <button onClick={onClose} className="px-4 py-2 bg-gray-100 rounded">Cancel</button>
            <button onClick={handleSend} disabled={loading || !subject || !body} className="px-4 py-2 bg-yellow-500 text-white rounded disabled:opacity-50">{loading ? 'Sending...' : 'Send'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMessageModal;

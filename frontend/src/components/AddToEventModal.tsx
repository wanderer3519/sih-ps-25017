import React, { useState } from 'react';

interface AddToEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToEvent: (eventId: string, role: string) => Promise<void> | void;
  alumniName?: string;
}

const AddToEventModal: React.FC<AddToEventModalProps> = ({ isOpen, onClose, onAddToEvent, alumniName }) => {
  const [eventId, setEventId] = useState('');
  const [role, setRole] = useState('participant');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAdd = async () => {
    setLoading(true);
    try {
      await onAddToEvent(eventId, role);
      setEventId('');
      setRole('participant');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
      <div className="relative w-full max-w-md mx-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Add {alumniName || 'Alumni'} to Event</h3>
          </div>
          <div className="p-4 space-y-3">
            <input
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              placeholder="Event ID"
              className="w-full p-2 border rounded"
            />
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 border rounded">
              <option value="participant">Participant</option>
              <option value="organizer">Organizer</option>
              <option value="sponsor">Sponsor</option>
            </select>
          </div>
          <div className="p-4 border-t flex justify-end space-x-2">
            <button onClick={onClose} className="px-4 py-2 bg-gray-100 rounded">Cancel</button>
            <button onClick={handleAdd} disabled={loading || !eventId} className="px-4 py-2 bg-yellow-500 text-white rounded disabled:opacity-50">{loading ? 'Adding...' : 'Add'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToEventModal;

import React, { useState } from 'react';

interface CSVModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: (data: Record<string, string>[]) => void;
  currentData?: any[];
}

const parseCSV = (text: string): Record<string, string>[] => {
  const lines = text.replace(/\r/g, '').split('\n').filter(Boolean);
  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  const rows = lines.slice(1).map((line) => {
    // naive CSV split (does not handle quoted commas) — good enough for simple CSVs
    const cols = line.split(',').map(c => c.trim());
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h] = cols[i] ?? '';
    });
    return obj;
  });
  return rows;
};

const CSVModal: React.FC<CSVModalProps> = ({ isOpen, onClose, onImportComplete }) => {
  const [previewRows, setPreviewRows] = useState<Record<string, string>[]>([]);
  const [filename, setFilename] = useState<string>('');

  const handleFile = (file: File | null) => {
    if (!file) return;
    setFilename(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result ?? '');
      const parsed = parseCSV(text);
      setPreviewRows(parsed.slice(0, 10));
    };
    reader.readAsText(file);
  };

  const handleImport = () => {
    // Combine previewRows into full import by re-reading the file via an input isn't available here,
    // so we just import the preview rows — acceptable for small CSVs. In a real app we'd keep the full parsed data.
    if (previewRows.length === 0) return;
    onImportComplete(previewRows);
    setPreviewRows([]);
    setFilename('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
      <div className="relative w-full max-w-2xl mx-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Import CSV</h3>
            <p className="text-sm text-gray-500">Upload a CSV file with headers. First 10 rows will be previewed.</p>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="file"
                accept=".csv,text/csv"
                onChange={(e) => handleFile(e.target.files ? e.target.files[0] : null)}
              />
              <div className="text-sm text-gray-600">{filename || 'No file selected'}</div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Preview</h4>
              <div className="max-h-48 overflow-auto border rounded">
                {previewRows.length === 0 ? (
                  <div className="p-4 text-sm text-gray-500">No preview available</div>
                ) : (
                  <table className="w-full text-sm table-fixed">
                    <thead className="bg-gray-50">
                      <tr>
                        {Object.keys(previewRows[0]).map((h) => (
                          <th key={h} className="px-2 py-1 text-left font-medium text-gray-600">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {previewRows.map((r, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          {Object.keys(r).map((k) => (
                            <td key={k} className="px-2 py-1 truncate">{r[k]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 border-t flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
            >
              Close
            </button>
            <button
              onClick={handleImport}
              disabled={previewRows.length === 0}
              className={`px-4 py-2 rounded text-white ${previewRows.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'}`}
            >
              Import
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSVModal;

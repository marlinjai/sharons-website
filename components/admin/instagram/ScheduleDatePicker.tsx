'use client';

import { FiX } from 'react-icons/fi';

interface ScheduleDatePickerProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export default function ScheduleDatePicker({ value, onChange }: ScheduleDatePickerProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Scheduled Date
      </label>
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={value || ''}
          onChange={(e) => onChange(e.target.value || null)}
          className="flex-1 bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors duration-200"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-200"
            title="Clear date"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

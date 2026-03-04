'use client';

import { useState } from 'react';
import { FiX } from 'react-icons/fi';

interface HashtagInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function HashtagInput({ value, onChange }: HashtagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const tags = value
    .split(' ')
    .map((t) => t.trim())
    .filter(Boolean);

  const addTag = (raw: string) => {
    const tag = raw.startsWith('#') ? raw : `#${raw}`;
    const cleaned = tag.replace(/\s+/g, '');
    if (!cleaned || cleaned === '#') return;
    if (tags.includes(cleaned)) return;
    const next = [...tags, cleaned].join(' ');
    onChange(next);
    setInputValue('');
  };

  const removeTag = (index: number) => {
    const next = tags.filter((_, i) => i !== index).join(' ');
    onChange(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Hashtags
      </label>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-400 rounded-full px-3 py-1 text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(i)}
                className="hover:text-blue-200 transition-colors duration-200"
              >
                <FiX className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-gray-700 text-white rounded-lg p-2 w-full border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none placeholder:text-gray-500 text-sm transition-colors duration-200"
        placeholder="Type a hashtag and press Enter"
      />
    </div>
  );
}

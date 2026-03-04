'use client';

interface CaptionEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MAX_CAPTION_LENGTH = 2200;

export default function CaptionEditor({ value, onChange }: CaptionEditorProps) {
  const isOverLimit = value.length > MAX_CAPTION_LENGTH;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Caption
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={MAX_CAPTION_LENGTH}
        rows={4}
        className="bg-gray-700 text-white rounded-lg p-3 w-full resize-none border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none placeholder:text-gray-500 transition-colors duration-200"
        placeholder="Write your caption..."
      />
      <div className={`text-xs mt-1 text-right ${isOverLimit ? 'text-red-400' : 'text-gray-500'}`}>
        {value.length}/{MAX_CAPTION_LENGTH}
      </div>
    </div>
  );
}

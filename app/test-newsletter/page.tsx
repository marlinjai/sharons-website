// app/test-newsletter/page.tsx
// Test page to demonstrate newsletter template usage

'use client';

import { useState } from 'react';
import { exampleNewsletterData, createTextSection, createQuoteSection, createTipsSection } from '@/lib/newsletterUtils';

export default function TestNewsletterPage() {
  const [newsletterData, setNewsletterData] = useState(exampleNewsletterData);

  const handleSendTest = async () => {
    try {
      const response = await fetch('/api/send-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsletterData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Newsletter sent successfully!');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error sending newsletter:', error);
      alert('Failed to send newsletter');
    }
  };

  const addTextSection = () => {
    const newSection = createTextSection(
      'This is a new text section that you can customize with your own content.',
      'New Section Title'
    );
    setNewsletterData(prev => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
  };

  const addQuoteSection = () => {
    const newSection = createQuoteSection(
      'This is a beautiful quote that inspires transformation and growth.',
      'Anonymous'
    );
    setNewsletterData(prev => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
  };

  const addTipsSection = () => {
    const newSection = createTipsSection('Helpful Tips for Your Journey', [
      'Practice mindfulness daily',
      'Keep a journal of your experiences',
      'Trust the process of transformation',
    ]);
    setNewsletterData(prev => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Newsletter Template Test</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Newsletter Data Editor */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Newsletter Content</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={newsletterData.subject}
                  onChange={e =>
                    setNewsletterData(prev => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preview Text</label>
                <input
                  type="text"
                  value={newsletterData.previewText}
                  onChange={e =>
                    setNewsletterData(prev => ({
                      ...prev,
                      previewText: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Issue Number</label>
                <input
                  type="number"
                  value={newsletterData.issueNumber || ''}
                  onChange={e =>
                    setNewsletterData(prev => ({
                      ...prev,
                      issueNumber: e.target.value ? parseInt(e.target.value) : undefined,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-800">Add Content Sections</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={addTextSection}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Add Text Section
                  </button>
                  <button
                    onClick={addQuoteSection}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    Add Quote Section
                  </button>
                  <button
                    onClick={addTipsSection}
                    className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
                  >
                    Add Tips Section
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-800">Actions</h3>
                <button
                  onClick={handleSendTest}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Send Test Newsletter
                </button>
              </div>
            </div>

            {/* Newsletter Preview */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Newsletter Preview</h2>

              <div className="bg-gray-100 rounded-lg p-4 max-h-96 overflow-y-auto">
                <div className="space-y-4">
                  <div>
                    <strong>Subject:</strong> {newsletterData.subject}
                  </div>
                  <div>
                    <strong>Preview:</strong> {newsletterData.previewText}
                  </div>
                  <div>
                    <strong>Issue:</strong> {newsletterData.issueNumber || 'N/A'}
                  </div>
                  <div>
                    <strong>Sections:</strong> {newsletterData.sections.length}
                  </div>

                  <div className="space-y-2">
                    <strong>Content Sections:</strong>
                    {newsletterData.sections.map((section, index) => (
                      <div key={index} className="ml-4 text-sm">
                        <span className="font-medium">{section.type}:</span>{' '}
                        {section.title || section.content.substring(0, 50)}...
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-medium text-blue-800 mb-2">How to Use This Template</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Customize the newsletter content using the form above</li>
              <li>• Add different types of content sections (text, quotes, tips, etc.)</li>
              <li>• Test the newsletter by clicking "Send Test Newsletter"</li>
              <li>
                • Use the utility functions in <code>lib/newsletterUtils.ts</code> to create newsletters
                programmatically
              </li>
              <li>• The template supports 6 content types: text, quote, story, tips, cta, and image</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

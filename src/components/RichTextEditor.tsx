import { useState, useCallback } from 'react';
import { Bold, Italic, List, ListOrdered, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const [value, setValue] = useState(content);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    onChange(e.target.value);
  }, [onChange]);

  const handleCommand = useCallback((command: string) => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    let newText = '';
    switch (command) {
      case 'bold':
        newText = `**${selectedText}**`;
        break;
      case 'italic':
        newText = `*${selectedText}*`;
        break;
      case 'bulletList':
        newText = `\n- ${selectedText}`;
        break;
      case 'orderedList':
        newText = `\n1. ${selectedText}`;
        break;
      case 'image':
        const imageUrl = prompt('Enter image URL:');
        if (imageUrl) {
          newText = `![${selectedText || 'image'}](${imageUrl})`;
        }
        break;
      case 'link':
        const url = prompt('Enter URL:');
        if (url) {
          newText = `[${selectedText || 'link'}](${url})`;
        }
        break;
      default:
        return;
    }

    const newValue = value.substring(0, start) + newText + value.substring(end);
    setValue(newValue);
    onChange(newValue);
  }, [value, onChange]);

  return (
    <div className="border dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-800 p-2 border-b dark:border-gray-700 flex gap-2">
        <button
          onClick={() => handleCommand('bold')}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Bold"
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleCommand('italic')}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Italic"
        >
          <Italic className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleCommand('bulletList')}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Bullet List"
        >
          <List className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleCommand('orderedList')}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Numbered List"
        >
          <ListOrdered className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleCommand('image')}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Insert Image"
        >
          <ImageIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleCommand('link')}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Insert Link"
        >
          <LinkIcon className="w-5 h-5" />
        </button>
      </div>
      <textarea
        value={value}
        onChange={handleChange}
        className="w-full p-4 min-h-[200px] focus:outline-none dark:bg-gray-800 dark:text-white"
        placeholder="Write your content here..."
      />
    </div>
  );
}
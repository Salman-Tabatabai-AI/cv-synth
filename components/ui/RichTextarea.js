import React, { useRef } from 'react';
import { Bold, Italic, List } from 'lucide-react';

export function RichTextarea({ value, onChange, placeholder }) {
    const textareaRef = useRef(null);

    const insertFormatting = (type) => {
        const input = textareaRef.current;
        const start = input.selectionStart;
        const end = input.selectionEnd;
        const text = input.value;
        const before = text.substring(0, start);
        const selected = text.substring(start, end);
        const after = text.substring(end);

        let newVal = text;
        let newCursor = end;

        if (type === 'bold') {
            newVal = `${before}<b>${selected || 'bold'}</b>${after}`;
            newCursor = end + 7;
        } else if (type === 'italic') {
            newVal = `${before}<i>${selected || 'italic'}</i>${after}`;
            newCursor = end + 7;
        } else if (type === 'list') {
            const prefix = "\n• ";
            newVal = `${before}${prefix}${selected}${after}`;
            newCursor = start + prefix.length;
        }

        onChange({ target: { value: newVal } });
        setTimeout(() => {
            input.focus();
            input.setSelectionRange(newCursor, newCursor);
        }, 10);
    };

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition">
            <div className="bg-gray-50 border-b border-gray-200 p-2 flex gap-1">
                <button onClick={() => insertFormatting('bold')} className="p-1 hover:bg-gray-200 rounded text-gray-600" title="Bold"><Bold size={14} /></button>
                <button onClick={() => insertFormatting('italic')} className="p-1 hover:bg-gray-200 rounded text-gray-600" title="Italic"><Italic size={14} /></button>
                <button onClick={() => insertFormatting('list')} className="p-1 hover:bg-gray-200 rounded text-gray-600" title="Bullet Point"><List size={14} /></button>
            </div>
            <textarea ref={textareaRef} value={value} onChange={onChange} placeholder={placeholder} className="w-full p-3 text-sm outline-none min-h-[100px] resize-y" />
        </div>
    );
}

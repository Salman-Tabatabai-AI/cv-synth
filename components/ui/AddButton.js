import React from 'react';
import { Plus } from 'lucide-react';

export function AddButton({ label, onClick }) {
    return (
        <button onClick={onClick} className="w-full py-2.5 mt-2 flex items-center justify-center gap-2 text-blue-600 text-sm font-medium border border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition">
            <Plus size={16} /> {label}
        </button>
    );
}

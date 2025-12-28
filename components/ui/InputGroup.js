import React from 'react';

export function InputGroup({ label, name, value, onChange }) {
    return (
        <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">{label}</label>
            <input type="text" name={name} value={value} onChange={onChange} className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition" />
        </div>
    );
}

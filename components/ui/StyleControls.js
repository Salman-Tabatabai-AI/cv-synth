import React from 'react';
import { Bold, Italic } from 'lucide-react';

import { fonts } from '../../lib/constants';

export function StyleControl({ label, config, onChange }) {
    return (
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">{label}</span>
                <input type="color" value={config.color} onChange={(e) => onChange('color', e.target.value)} className="w-6 h-6 border-0 p-0 rounded cursor-pointer" />
            </div>

            <div className="mb-2">
                <select
                    value={config.fontFamily || fonts[0].value}
                    onChange={(e) => onChange('fontFamily', e.target.value)}
                    className="w-full p-1.5 text-xs border border-gray-300 rounded bg-white"
                >
                    {fonts.map(f => (
                        <option key={f.name} value={f.value}>{f.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex gap-2 items-center mb-2">
                <button onClick={() => onChange('bold', !config.bold)} className={`p-1.5 rounded border ${config.bold ? 'bg-blue-100 border-blue-300 text-blue-700' : 'bg-white border-gray-300 text-gray-500'}`}><Bold size={14} /></button>
                <button onClick={() => onChange('italic', !config.italic)} className={`p-1.5 rounded border ${config.italic ? 'bg-blue-100 border-blue-300 text-blue-700' : 'bg-white border-gray-300 text-gray-500'}`}><Italic size={14} /></button>
                <div className="flex-1 ml-2">
                    <input type="range" min={0.7} max={3.5} step={0.1} value={config.size} onChange={(e) => onChange('size', parseFloat(e.target.value))} className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer" />
                </div>
                <span className="text-xs text-gray-500 w-8 text-right">{config.size}em</span>
            </div>
        </div>
    )
}

export function RangeControl({ label, value, min, max, step, onChange }) {
    return (
        <div>
            <div className="flex justify-between text-xs text-gray-500 mb-2"><span>{label}</span></div>
            <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
        </div>
    );
}

export function DesignSection({ label, children }) {
    return (
        <div>
            <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">{label}</label>
            {children}
        </div>
    )
}

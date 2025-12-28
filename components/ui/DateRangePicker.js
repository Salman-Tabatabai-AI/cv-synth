import React from 'react';
import { MonthYearPicker } from './MonthYearPicker';

export function DateRangePicker({ label, value, onChange }) {
    // Robust splitting: Try em dash first, then hyphen
    const separator = value && value.includes(' — ') ? ' — ' : ' - ';
    const parts = value ? value.split(separator) : ['', ''];

    // If split failed or empty, default to empty
    const start = parts[0] || '';
    const end = parts[1] || '';

    const handleStartChange = (newStart) => {
        // Enforce the thick separator for consistency
        onChange(`${newStart} — ${end}`);
    };

    const handleEndChange = (newEnd) => {
        onChange(`${start} — ${newEnd}`);
    };

    return (
        <div className="flex flex-col gap-1.5">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
            <div className="flex flex-col sm:flex-row gap-2 items-center">
                <div className="w-full">
                    <MonthYearPicker value={start} onChange={handleStartChange} />
                </div>
                <span className="text-gray-400 hidden sm:block">—</span>
                <div className="w-full">
                    <MonthYearPicker value={end} onChange={handleEndChange} />
                </div>
            </div>
        </div>
    );
}

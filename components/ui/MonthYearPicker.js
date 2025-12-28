import React from 'react';

const MONTHS = [
    "01", "02", "03", "04", "05", "06",
    "07", "08", "09", "10", "11", "12"
];

const YEARS = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);

export function MonthYearPicker({ value, onChange, className = "" }) {
    // Value format expected: "Month YYYY" or "Present"

    const [currentMonth, currentYear] = (value && value !== 'Present')
        ? value.includes('/') ? value.split('/') : value.split(' ') // Handle potential legacy format
        : [null, null];

    const handleMonthChange = (e) => {
        const newMonth = e.target.value;
        if (!newMonth) return; // Ignore "Month" placeholder
        const year = currentYear || new Date().getFullYear();
        onChange(`${newMonth}/${year}`);
    };

    const handleYearChange = (e) => {
        const newYear = e.target.value;
        if (!newYear) return;
        const month = currentMonth || "01";
        onChange(`${month}/${newYear}`);
    };

    const setPresent = () => {
        onChange("Present");
    };

    return (
        <div className={`flex gap-2 items-center ${className}`}>
            {value === 'Present' ? (
                <div className="flex-1 p-2 bg-green-50 text-green-700 border border-green-200 rounded text-sm font-medium flex justify-between items-center">
                    <span>Present</span>
                    <button onClick={() => onChange("01/" + new Date().getFullYear())} className="text-xs underline hover:text-green-900">Edit</button>
                </div>
            ) : (
                <>
                    <select
                        value={currentMonth || ""}
                        onChange={handleMonthChange}
                        className="flex-1 p-2 border border-gray-300 rounded text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="" disabled>Month</option>
                        {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>

                    <select
                        value={currentYear || ""}
                        onChange={handleYearChange}
                        className="flex-1 p-2 border border-gray-300 rounded text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="" disabled>Year</option>
                        {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                </>
            )}

            {value !== 'Present' && (
                <button
                    type="button"
                    onClick={setPresent}
                    className="px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded border border-transparent hover:border-blue-100 transition-colors"
                >
                    Present
                </button>
            )}
        </div>
    );
}

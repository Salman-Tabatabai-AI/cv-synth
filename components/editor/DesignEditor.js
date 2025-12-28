import React from 'react';
import { StyleControl, RangeControl, DesignSection } from '../ui/StyleControls';
import { fonts, pageSizes } from '../../lib/constants';

export function DesignEditor({
    styles,
    setStyles,
    updateStyle
}) {
    return (
        <div className="p-6 space-y-8 h-full overflow-y-auto custom-scrollbar">
            <h2 className="text-xl font-bold text-gray-900">Design Settings</h2>

            <DesignSection label="Resume Font Family">
                <div className="grid grid-cols-1 gap-2">
                    {fonts.map((f) => (
                        <button key={f.name} onClick={() => setStyles(prev => ({ ...prev, fontFamily: f.value }))}
                            className={`p-3 border rounded-lg text-left flex justify-between items-center ${styles.fontFamily === f.value ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200'}`}>
                            <span style={{ fontFamily: f.value }}>{f.name}</span>
                        </button>
                    ))}
                </div>
            </DesignSection>

            <DesignSection label="Name Typography">
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Name Font</label>
                        <select
                            value={styles.name.family}
                            onChange={(e) => updateStyle('name', 'family', e.target.value)}
                            className="w-full p-2 border border-blue-100 rounded-lg text-sm bg-white"
                        >
                            {fonts.map((f) => <option key={f.name} value={f.value}>{f.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Text Case</label>
                        <div className="flex bg-gray-100 p-1 rounded-lg">
                            {['uppercase', 'capitalize', 'lowercase'].map((c) => (
                                <button
                                    key={c}
                                    onClick={() => updateStyle('name', 'case', c)}
                                    className={`flex-1 py-1.5 rounded text-xs capitalize ${styles.name.case === c ? 'bg-white shadow-sm font-medium' : 'text-gray-500'}`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>

                    <StyleControl label="Name Style" config={styles.name} onChange={(k, v) => updateStyle('name', k, v)} />
                </div>
            </DesignSection>

            <DesignSection label="Typography Details">
                <p className="text-xs text-gray-500 mb-4">Customize the appearance of specific resume elements.</p>
                <div className="space-y-4">
                    <StyleControl label="Section Headers" config={styles.sectionTitle} onChange={(k, v) => updateStyle('sectionTitle', k, v)} />
                    <StyleControl label="Job Titles" config={styles.jobTitle} onChange={(k, v) => updateStyle('jobTitle', k, v)} />
                    <StyleControl label="Company Name" config={styles.company} onChange={(k, v) => updateStyle('company', k, v)} />
                    <StyleControl label="Dates" config={styles.dates} onChange={(k, v) => updateStyle('dates', k, v)} />
                    <StyleControl label="Location (City)" config={styles.location} onChange={(k, v) => updateStyle('location', k, v)} />
                    <StyleControl label="Main Body Text" config={styles.bodyText} onChange={(k, v) => updateStyle('bodyText', k, v)} />
                </div>
            </DesignSection>

            <DesignSection label="General Layout">
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Page Size</label>
                        <select value={styles.pageSize} onChange={(e) => setStyles(prev => ({ ...prev, pageSize: e.target.value }))} className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white">
                            <option value="a4">{pageSizes.a4.label}</option>
                            <option value="letter">{pageSizes.letter.label}</option>
                        </select>
                    </div>

                    <RangeControl label="Page Margin (mm)" value={styles.margin} min={10} max={40} step={1} onChange={(v) => setStyles(prev => ({ ...prev, margin: v }))} />
                    <RangeControl label="Line Height" value={styles.lineHeight} min={1.0} max={2.0} step={0.1} onChange={(v) => setStyles(prev => ({ ...prev, lineHeight: v }))} />
                </div>
            </DesignSection>
        </div>
    );
}

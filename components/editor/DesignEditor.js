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

            <DesignSection label="Typography">
                <div className="space-y-6">
                    {/* Name Controls */}
                    <div className="pb-4 border-b border-gray-100">
                        <StyleControl label="Name" config={styles.name} onChange={(k, v) => updateStyle('name', k, v)} />
                    </div>

                    <StyleControl label="Job Title / Headline" config={styles.headerTitle || styles.jobTitle} onChange={(k, v) => updateStyle('headerTitle', k, v)} />
                    <StyleControl label="Subheader (Profile)" config={styles.subheader} onChange={(k, v) => updateStyle('subheader', k, v)} />
                    <StyleControl label="Contact Info" config={styles.contactInfo} onChange={(k, v) => updateStyle('contactInfo', k, v)} />

                    <hr className="border-gray-100 my-4" />

                    <StyleControl label="Section Headers" config={styles.sectionTitle} onChange={(k, v) => updateStyle('sectionTitle', k, v)} />
                    <StyleControl label="Job Titles (Body)" config={styles.jobTitle} onChange={(k, v) => updateStyle('jobTitle', k, v)} />
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

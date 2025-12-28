import React from 'react';
import { Accordion } from '../ui/Accordion';
import { InputGroup } from '../ui/InputGroup';
import { RichTextarea } from '../ui/RichTextarea';
import { AddButton } from '../ui/AddButton';
import { ArrowUp, ArrowDown, Trash2 } from 'lucide-react';

export function SectionList({ section, title, items, onAdd, onRemove, onMove, onChange, activeSection, setActiveSection, type }) {

    // Helper to render specific fields based on section type
    const renderFields = (item) => {
        switch (type) {
            case 'experience':
                return (
                    <>
                        <div className="grid grid-cols-2 gap-4 mb-3 mt-4">
                            <InputGroup label="Job Title" value={item.role} onChange={(e) => onChange(section.id, item.id, 'role', e.target.value)} />
                            <InputGroup label="Employer" value={item.company} onChange={(e) => onChange(section.id, item.id, 'company', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                            <InputGroup label="Dates" value={item.dates} onChange={(e) => onChange(section.id, item.id, 'dates', e.target.value)} />
                            <InputGroup label="City" value={item.city} onChange={(e) => onChange(section.id, item.id, 'city', e.target.value)} />
                        </div>
                        <RichTextarea value={item.description} onChange={(e) => onChange(section.id, item.id, 'description', e.target.value)} placeholder="Description..." />
                    </>
                );
            case 'education':
                return (
                    <>
                        <div className="grid grid-cols-2 gap-4 mb-3 mt-4">
                            <InputGroup label="School" value={item.school} onChange={(e) => onChange(section.id, item.id, 'school', e.target.value)} />
                            <InputGroup label="Degree" value={item.degree} onChange={(e) => onChange(section.id, item.id, 'degree', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                            <InputGroup label="Dates" value={item.dates} onChange={(e) => onChange(section.id, item.id, 'dates', e.target.value)} />
                            <InputGroup label="City" value={item.city} onChange={(e) => onChange(section.id, item.id, 'city', e.target.value)} />
                        </div>
                        <RichTextarea value={item.description} onChange={(e) => onChange(section.id, item.id, 'description', e.target.value)} placeholder="Description..." />
                    </>
                );
            case 'skills':
                return (
                    <div className="flex gap-2 items-center">
                        <div className="flex flex-col gap-0.5">
                            {/* Move buttons are handled in wrapper */}
                        </div>
                        <input type="text" placeholder="Skill" value={item.name} onChange={(e) => onChange(section.id, item.id, 'name', e.target.value)} className="flex-1 p-2 border border-gray-300 rounded-lg text-sm" />
                        <select value={item.level} onChange={(e) => onChange(section.id, item.id, 'level', e.target.value)} className="w-1/3 p-2 border border-gray-300 rounded-lg text-sm bg-white">
                            <option>Beginner</option><option>Intermediate</option><option>Expert</option>
                        </select>
                        {/* Remove button handled in wrapper */}
                    </div>
                );
            case 'languages':
                return (
                    <div className="flex gap-2 items-center">
                        <input type="text" placeholder="Language" value={item.name} onChange={(e) => onChange(section.id, item.id, 'name', e.target.value)} className="flex-1 p-2 border border-gray-300 rounded-lg text-sm" />
                        <select value={item.level} onChange={(e) => onChange(section.id, item.id, 'level', e.target.value)} className="w-1/3 p-2 border border-gray-300 rounded-lg text-sm bg-white">
                            <option>Native</option><option>Fluent</option><option>Intermediate</option>
                        </select>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Accordion title={title} section={section.id} activeSection={activeSection} setActiveSection={setActiveSection}>
            {/* Special Layout for Skills/Languages to trigger List View */}
            {(type === 'skills' || type === 'languages') ? (
                <div className="grid grid-cols-1 gap-2">
                    {items.map((item, idx) => (
                        <div key={item.id} className="flex gap-2 items-center">
                            <div className="flex flex-col gap-0.5">
                                <button onClick={() => onMove(section.id, idx, 'up')} className="p-0.5 hover:text-blue-600"><ArrowUp size={12} /></button>
                                <button onClick={() => onMove(section.id, idx, 'down')} className="p-0.5 hover:text-blue-600"><ArrowDown size={12} /></button>
                            </div>
                            {renderFields(item)}
                            <button onClick={() => onRemove(section.id, item.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                        </div>
                    ))}
                    <AddButton
                        label={`Add ${type === 'skills' ? 'Skill' : 'Language'}`}
                        onClick={() => onAdd(section.id, type === 'skills' ? { name: "", level: "Expert" } : { name: "", level: "Native" })}
                    />
                </div>
            ) : (
                <>
                    {items.map((item, idx) => (
                        <div key={item.id} className="p-4 border border-gray-200 rounded-lg mb-4 relative bg-gray-50/50">
                            <div className="absolute top-2 right-2 flex gap-1 z-10">
                                <button onClick={() => onMove(section.id, idx, 'up')} className="p-1.5 bg-white border rounded text-gray-500 hover:text-blue-600"><ArrowUp size={14} /></button>
                                <button onClick={() => onMove(section.id, idx, 'down')} className="p-1.5 bg-white border rounded text-gray-500 hover:text-blue-600"><ArrowDown size={14} /></button>
                                <button onClick={() => onRemove(section.id, item.id)} className="p-1.5 bg-white border rounded text-gray-500 hover:text-red-500"><Trash2 size={14} /></button>
                            </div>
                            {renderFields(item)}
                        </div>
                    ))}
                    <AddButton
                        label={`Add ${type === 'experience' ? 'Employment' : 'Education'}`}
                        onClick={() => onAdd(section.id, type === 'experience' ? { role: "", company: "", dates: "", city: "", description: "" } : { school: "", degree: "", dates: "", city: "", description: "" })}
                    />
                </>
            )}
        </Accordion>
    );
}

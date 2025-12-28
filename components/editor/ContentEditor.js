import React from 'react';
import { PersonalSection } from './PersonalSection';
import { SectionList } from './SectionList';
import { Accordion } from '../ui/Accordion';
import { RichTextarea } from '../ui/RichTextarea';
import { ArrowUp, ArrowDown } from 'lucide-react';

export function ContentEditor({
    resumeData,
    sectionOrder,
    activeSection,
    handlePersonalChange,
    handleArrayChange,
    addItem,
    removeItem,
    moveItem,
    reorderItem,
    moveSection,
    setActiveSection
}) {
    return (
        <div className="p-6 space-y-4 h-full overflow-y-auto custom-scrollbar">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Content Editor</h2>

            <PersonalSection
                resumeData={resumeData}
                handlePersonalChange={handlePersonalChange}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />

            {sectionOrder.map((section, index) => (
                <div key={section.id} className="relative group">
                    <div className="absolute left-[-24px] top-4 flex flex-col gap-1 opacity-20 group-hover:opacity-100 transition">
                        <button onClick={() => moveSection(index, 'up')} disabled={index === 0} className="hover:text-blue-600 disabled:opacity-0"><ArrowUp size={14} /></button>
                        <button onClick={() => moveSection(index, 'down')} disabled={index === sectionOrder.length - 1} className="hover:text-blue-600 disabled:opacity-0"><ArrowDown size={14} /></button>
                    </div>

                    {section.id === 'summary' && (
                        <Accordion title={section.label} section="summary" activeSection={activeSection} setActiveSection={setActiveSection}>
                            <RichTextarea value={resumeData.personal.summary} onChange={(e) => handlePersonalChange({ target: { name: 'summary', value: e.target.value } })} placeholder="Professional summary..." />
                        </Accordion>
                    )}

                    {['experience', 'education', 'skills', 'languages'].includes(section.id) && (
                        <SectionList
                            section={section}
                            title={section.label}
                            items={resumeData[section.id]}
                            type={section.id}
                            onAdd={addItem}
                            onRemove={removeItem}
                            onMove={moveItem}
                            onReorder={reorderItem}
                            onChange={handleArrayChange}
                            activeSection={activeSection}
                            setActiveSection={setActiveSection}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

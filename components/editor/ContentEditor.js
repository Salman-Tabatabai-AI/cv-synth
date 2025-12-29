import React from 'react';
import { PersonalSection } from './PersonalSection';
import { SectionList } from './SectionList';
import { Accordion } from '../ui/Accordion';
import { RichTextarea } from '../ui/RichTextarea';
import { GripVertical, Eye, EyeOff } from 'lucide-react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableSection({ section, resumeData, activeSection, setActiveSection, handlePersonalChange, handleArrayChange, addItem, removeItem, moveItem, reorderItem, toggleSection }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: section.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} className="relative group mb-4">
            <div className="flex items-center gap-2 mb-2">
                {/* Drag Handle */}
                <div {...attributes} {...listeners} className="cursor-grab p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600">
                    <GripVertical size={16} />
                </div>

                {/* Toggle Visibility */}
                <button
                    onClick={() => toggleSection(section.id)}
                    className={`p-1 rounded transition-colors ${section.visible ? 'text-gray-400 hover:text-blue-600' : 'text-red-400 bg-red-50'}`}
                    title={section.visible ? "Hide Section" : "Show Section"}
                >
                    {section.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>

                <div className="flex-1">
                    {section.id === 'summary' && section.visible && (
                        <Accordion title={section.label} section="summary" activeSection={activeSection} setActiveSection={setActiveSection}>
                            <RichTextarea value={resumeData.personal.summary} onChange={(e) => handlePersonalChange({ target: { name: 'summary', value: e.target.value } })} placeholder="Professional summary..." />
                        </Accordion>
                    )}

                    {['experience', 'education', 'skills', 'languages', 'awards'].includes(section.id) && section.visible && (
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

                    {!section.visible && (
                        <div className="p-3 border rounded-lg bg-gray-50 flex items-center justify-between text-gray-400 select-none">
                            <span>{section.label} (Hidden)</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

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
    reorderSection,
    toggleSection,
    setActiveSection
}) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = sectionOrder.findIndex((s) => s.id === active.id);
            const newIndex = sectionOrder.findIndex((s) => s.id === over.id);
            reorderSection(oldIndex, newIndex);
        }
    };

    return (
        <div className="p-6 space-y-4 h-full overflow-y-auto custom-scrollbar">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Content Editor</h2>

            <PersonalSection
                resumeData={resumeData}
                handlePersonalChange={handlePersonalChange}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />

            <hr className="border-gray-200 my-4" />

            <DndContext
                id="content-editor-dnd"
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={sectionOrder}
                    strategy={verticalListSortingStrategy}
                >
                    {sectionOrder.map((section) => (
                        <SortableSection
                            key={section.id}
                            section={section}
                            resumeData={resumeData}
                            activeSection={activeSection}
                            setActiveSection={setActiveSection}
                            handlePersonalChange={handlePersonalChange}
                            handleArrayChange={handleArrayChange}
                            addItem={addItem}
                            removeItem={removeItem}
                            moveItem={moveItem}
                            reorderItem={reorderItem}
                            toggleSection={toggleSection}
                        />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    );
}

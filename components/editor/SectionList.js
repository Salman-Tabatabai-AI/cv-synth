import React from 'react';
import { Accordion } from '../ui/Accordion';
import { InputGroup } from '../ui/InputGroup';
import { RichTextarea } from '../ui/RichTextarea';
import { AddButton } from '../ui/AddButton';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { ArrowUp, ArrowDown, Trash2, GripVertical } from 'lucide-react';
import { Button } from '../ui/Button';
import { DateRangePicker } from '../ui/DateRangePicker';

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
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from '../ui/SortableItem';

export function SectionList({ section, title, items, onAdd, onRemove, onMove, onReorder, onChange, activeSection, setActiveSection, type }) {

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);
            onReorder(section.id, oldIndex, newIndex);
        }
    }

    const handleAddItem = () => {
        const newItem = { id: Date.now() };
        if (type === 'experience') Object.assign(newItem, { role: "", company: "", dates: "", city: "", description: "" });
        else if (type === 'education') Object.assign(newItem, { school: "", degree: "", fieldOfStudy: "", dates: "", city: "", description: "" });
        else if (type === 'awards') Object.assign(newItem, { role: "", company: "", dates: "", description: "" });
        else if (type === 'skills') Object.assign(newItem, { name: "", level: "Expert" });
        else if (type === 'languages') Object.assign(newItem, { name: "", level: "Native/Bilingual" });

        onAdd(section.id, [...items, newItem]); // Append to bottom
    };

    const getAddButtonLabel = () => {
        switch (type) {
            case 'experience': return 'Add Position';
            case 'education': return 'Add Education';
            case 'awards': return 'Add Award';
            case 'skills': return 'Add Skill';
            case 'languages': return 'Add Language';
            default: return 'Add Item';
        }
    };

    // Helper to render specific fields based on section type
    const renderFields = (item) => {
        switch (type) {
            case 'experience':
                return (
                    <>
                        <div className="grid grid-cols-2 gap-4 mb-3 mt-1">
                            <InputGroup label="Job Title" value={item.role} onChange={(e) => onChange(section.id, item.id, 'role', e.target.value)} placeholder="e.g. Senior Manager" />
                            <InputGroup label="Employer" value={item.company} onChange={(e) => onChange(section.id, item.id, 'company', e.target.value)} placeholder="e.g. Acme Corp" />
                        </div>
                        <div className="grid grid-cols-1 mb-3">
                            <DateRangePicker label="Employment Period" value={item.dates} onChange={(val) => onChange(section.id, item.id, 'dates', val)} />
                        </div>
                        <div className="grid grid-cols-1 mb-3">
                            <InputGroup label="City" value={item.city} onChange={(e) => onChange(section.id, item.id, 'city', e.target.value)} placeholder="e.g. London" />
                        </div>
                        <RichTextarea value={item.description} onChange={(e) => onChange(section.id, item.id, 'description', e.target.value)} placeholder="Describe your responsibilities and achievements..." />
                    </>
                );
            case 'education':
                return (
                    <>
                        <div className="grid grid-cols-2 gap-4 mb-3 mt-1">
                            <InputGroup label="School" value={item.school} onChange={(e) => onChange(section.id, item.id, 'school', e.target.value)} placeholder="e.g. University of Design" />
                            <div className="flex flex-col gap-1.5">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Degree</label>
                                <select
                                    value={item.degree}
                                    onChange={(e) => onChange(section.id, item.id, 'degree', e.target.value)}
                                    className="w-full p-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="" disabled>Select Degree</option>
                                    <option>High School Diploma</option>
                                    <option>Associate of Arts (AA)</option>
                                    <option>Associate of Science (AS)</option>
                                    <option>Bachelor of Arts (BA)</option>
                                    <option>Bachelor of Science (BSc)</option>
                                    <option>Master of Arts (MA)</option>
                                    <option>Master of Science (MSc)</option>
                                    <option>Master of Business Administration (MBA)</option>
                                    <option>Doctor of Philosophy (PhD)</option>
                                    <option>Doctor of Medicine (MD)</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 mb-3">
                            <InputGroup label="Field of Study" value={item.fieldOfStudy} onChange={(e) => onChange(section.id, item.id, 'fieldOfStudy', e.target.value)} placeholder="e.g. Computer Science" />
                        </div>
                        <div className="grid grid-cols-1 mb-3">
                            <DateRangePicker label="Study Period" value={item.dates} onChange={(val) => onChange(section.id, item.id, 'dates', val)} />
                        </div>
                        <div className="grid grid-cols-1 mb-3">
                            <InputGroup label="City" value={item.city} onChange={(e) => onChange(section.id, item.id, 'city', e.target.value)} placeholder="e.g. New York" />
                        </div>
                        <RichTextarea value={item.description} onChange={(e) => onChange(section.id, item.id, 'description', e.target.value)} placeholder="Brief description of your studies..." />
                    </>
                );

            case 'awards':
                return (
                    <>
                        <div className="grid grid-cols-2 gap-4 mb-3 mt-1">
                            <InputGroup label="Award Name" value={item.role} onChange={(e) => onChange(section.id, item.id, 'role', e.target.value)} placeholder="e.g. Best Innovation" />
                            <InputGroup label="Issuer/Organization" value={item.company} onChange={(e) => onChange(section.id, item.id, 'company', e.target.value)} placeholder="e.g. Tech Weekly" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Date</label>
                            <InputGroup value={item.dates} onChange={(e) => onChange(section.id, item.id, 'dates', e.target.value)} placeholder="e.g. 2023" />
                        </div>
                        <RichTextarea label="Description" value={item.description} onChange={(e) => onChange(section.id, item.id, 'description', e.target.value)} placeholder="Brief details regarding the award..." />
                    </>
                );

            case 'skills':
                return (
                    <div className="flex gap-3 items-center w-full">
                        <Input
                            value={item.name}
                            onChange={(e) => onChange(section.id, item.id, 'name', e.target.value)}
                            placeholder="Skill (e.g. React)"
                            className="flex-1"
                        />
                        <div className="relative w-1/3">
                            <select
                                value={item.level}
                                onChange={(e) => onChange(section.id, item.id, 'level', e.target.value)}
                                className="w-full h-9 rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950"
                            >
                                <option>Beginner</option><option>Intermediate</option><option>Expert</option>
                            </select>
                        </div>
                    </div>
                );
            case 'languages':
                return (
                    <div className="flex gap-3 items-center w-full">
                        <Input
                            value={item.name}
                            onChange={(e) => onChange(section.id, item.id, 'name', e.target.value)}
                            placeholder="Language (e.g. French)"
                            className="flex-1"
                        />
                        <div className="relative w-1/3">
                            <select
                                value={item.level}
                                onChange={(e) => onChange(section.id, item.id, 'level', e.target.value)}
                                className="w-full h-9 rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950"
                            >
                                <option>Native/Bilingual</option><option>Fluent</option><option>Intermediate</option><option>Beginner</option>
                            </select>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Card className="border-l-4 border-l-transparent hover:border-l-blue-400 transition-all shadow-sm">
            <Accordion title={title} section={section.id} activeSection={activeSection} setActiveSection={setActiveSection}>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={items}
                        strategy={verticalListSortingStrategy}
                    >
                        {/* Special Layout for Skills/Languages to trigger List View */}
                        {(type === 'skills' || type === 'languages') ? (
                            <div className="grid grid-cols-1 gap-3 pt-2">
                                {items.map((item) => (
                                    <SortableItem key={item.id} id={item.id} className="flex gap-2 items-center group relative bg-white p-2 border border-slate-100 rounded-md shadow-sm">
                                        {/* Content is rendered by SortableItem children */}
                                        <div className="flex-1 flex gap-2 items-center">
                                            {renderFields(item)}
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={() => onRemove(section.id, item.id)} className="text-slate-400 hover:text-red-500 hover:bg-red-50 h-8 w-8">
                                            <Trash2 size={14} />
                                        </Button>
                                    </SortableItem>
                                ))}
                                <AddButton
                                    label={getAddButtonLabel()}
                                    onClick={handleAddItem}
                                />
                            </div>
                        ) : (
                            <div className="pt-2">
                                {items.map((item) => (
                                    <SortableItem key={item.id} id={item.id} className="p-4 border border-slate-200 rounded-lg mb-4 relative bg-slate-50/40 group hover:border-blue-200 transition-colors">
                                        <div className="absolute top-3 right-3 flex gap-1 z-20">
                                            <Button variant="outline" size="icon" onClick={() => onRemove(section.id, item.id)} className="h-7 w-7 text-red-500 hover:bg-red-50 hover:border-red-200"><Trash2 size={12} /></Button>
                                        </div>
                                        {renderFields(item)}
                                    </SortableItem>
                                ))}
                                <AddButton
                                    label={getAddButtonLabel()}
                                    onClick={handleAddItem}
                                />
                            </div>
                        )}
                    </SortableContext>
                </DndContext>
            </Accordion>
        </Card>
    );
}

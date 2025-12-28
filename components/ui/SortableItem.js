import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

export function SortableItem({ id, children, className }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} className={className}>
            <div className="absolute top-2 left-2 cursor-move opacity-30 hover:opacity-100 p-1" {...attributes} {...listeners}>
                <GripVertical size={16} />
            </div>
            <div className="pl-6">
                {children}
            </div>
        </div>
    );
}

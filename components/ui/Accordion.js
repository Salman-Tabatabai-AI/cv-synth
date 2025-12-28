import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export function Accordion({ title, section, activeSection, setActiveSection, children }) {
    const isOpen = activeSection === section;
    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white transition-all">
            <button onClick={() => setActiveSection(isOpen ? '' : section)} className={`w-full flex justify-between items-center p-4 text-left font-medium transition ${isOpen ? 'bg-blue-50 text-blue-800' : 'bg-white hover:bg-gray-50'}`}>
                <span>{title}</span>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {isOpen && <div className="p-5 border-t border-gray-100 animate-in slide-in-from-top-1">{children}</div>}
        </div>
    );
}

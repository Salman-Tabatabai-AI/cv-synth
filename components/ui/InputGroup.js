import React from 'react';
import { Input } from './Input';

export function InputGroup({ label, name, value, onChange, placeholder, type = "text" }) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-0.5">
                {label}
            </label>
            <Input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
}

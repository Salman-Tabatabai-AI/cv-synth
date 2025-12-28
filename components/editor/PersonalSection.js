import React from 'react';
import { InputGroup } from '../ui/InputGroup';
import { Accordion } from '../ui/Accordion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { UserCircle } from 'lucide-react';

export function PersonalSection({ resumeData, handlePersonalChange, activeSection, setActiveSection }) {
    return (
        <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
            <Accordion
                title={
                    <div className="flex items-center gap-2">
                        <UserCircle size={18} className="text-blue-500" />
                        <span>Personal Details</span>
                    </div>
                }
                section="personal"
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <InputGroup label="First Name" name="firstName" value={resumeData.personal.firstName} onChange={handlePersonalChange} placeholder="e.g. John" />
                    <InputGroup label="Surname" name="surname" value={resumeData.personal.surname} onChange={handlePersonalChange} placeholder="e.g. Doe" />

                    <div className="col-span-2">
                        <InputGroup label="Job Title" name="title" value={resumeData.personal.title} onChange={handlePersonalChange} placeholder="e.g. Software Engineer" />
                    </div>

                    <InputGroup label="Email" name="email" value={resumeData.personal.email} onChange={handlePersonalChange} placeholder="e.g. john@example.com" />
                    <InputGroup label="Phone" name="phone" value={resumeData.personal.phone} onChange={handlePersonalChange} placeholder="e.g. +1 234 567 890" />

                    <InputGroup label="City" name="city" value={resumeData.personal.city} onChange={handlePersonalChange} placeholder="e.g. New York" />
                    <InputGroup label="Country" name="country" value={resumeData.personal.country} onChange={handlePersonalChange} placeholder="e.g. USA" />

                    <InputGroup label="LinkedIn" name="linkedin" value={resumeData.personal.linkedin} onChange={handlePersonalChange} placeholder="LinkedIn URL" />
                    <InputGroup label="Website" name="website" value={resumeData.personal.website} onChange={handlePersonalChange} placeholder="Portfolio URL" />
                </div>
            </Accordion>
        </Card>
    );
}

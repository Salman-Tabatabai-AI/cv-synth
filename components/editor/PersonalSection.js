import React from 'react';
import { InputGroup } from '../ui/InputGroup';
import { Accordion } from '../ui/Accordion';

export function PersonalSection({ resumeData, handlePersonalChange, activeSection, setActiveSection }) {
    return (
        <Accordion title="Personal Details" section="personal" activeSection={activeSection} setActiveSection={setActiveSection}>
            <div className="grid grid-cols-2 gap-4">
                <InputGroup label="First Name" name="firstName" value={resumeData.personal.firstName} onChange={handlePersonalChange} />
                <InputGroup label="Surname" name="surname" value={resumeData.personal.surname} onChange={handlePersonalChange} />
            </div>
            <InputGroup label="Job Title" name="title" value={resumeData.personal.title} onChange={handlePersonalChange} />
            <div className="grid grid-cols-2 gap-4">
                <InputGroup label="Email" name="email" value={resumeData.personal.email} onChange={handlePersonalChange} />
                <InputGroup label="Phone" name="phone" value={resumeData.personal.phone} onChange={handlePersonalChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <InputGroup label="City" name="city" value={resumeData.personal.city} onChange={handlePersonalChange} />
                <InputGroup label="Country" name="country" value={resumeData.personal.country} onChange={handlePersonalChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <InputGroup label="LinkedIn URL" name="linkedin" value={resumeData.personal.linkedin} onChange={handlePersonalChange} />
                <InputGroup label="Website" name="website" value={resumeData.personal.website} onChange={handlePersonalChange} />
            </div>
        </Accordion>
    );
}

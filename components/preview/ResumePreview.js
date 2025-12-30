import React from 'react';
import { FormattedText } from '../../lib/utils';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

export function ResumePreview({ resumeData, sectionOrder, styles }) {

    const getStyle = (group) => ({
        fontSize: `${styles[group].size}rem`,
        fontWeight: styles[group].bold ? 'bold' : 'normal',
        fontStyle: styles[group].italic ? 'italic' : 'normal',
        fontFamily: styles[group].fontFamily, // Granular font control
        color: styles[group].color,
        ...(styles[group].uppercase ? { textTransform: 'uppercase', letterSpacing: '1px' } : {})
    });

    const renderSection = (sectionId) => {
        const sectionConfig = sectionOrder.find(s => s.id === sectionId);
        if (!sectionConfig?.visible) return null;

        switch (sectionId) {
            case 'summary':
                return resumeData.personal.summary && (
                    <section key="summary" className="mb-6 break-inside-avoid">
                        <h3 className="mb-3 border-b border-gray-300 pb-1" style={getStyle('sectionTitle')}>{sectionConfig.label}</h3>
                        <div className="text-left" style={getStyle('bodyText')}>
                            <FormattedText text={resumeData.personal.summary} />
                        </div>
                    </section>
                );
            case 'experience':
                return (
                    <section key="experience" className="mb-6">
                        <h3 className="mb-4 border-b border-gray-300 pb-1" style={getStyle('sectionTitle')}>{sectionConfig.label}</h3>
                        <div className="space-y-6">
                            {resumeData.experience.map((job) => (
                                // GRID: Date (130px) | Content
                                <div key={job.id} className="grid grid-cols-[130px_1fr] gap-4 break-inside-avoid items-baseline">
                                    <div className="shrink-0 text-left" style={getStyle('dates')}>
                                        {job.dates}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <div className="leading-tight">
                                                <span style={getStyle('jobTitle')}>{job.role}</span>
                                                <span className="mx-2 text-gray-300 font-light">|</span>
                                                <span style={getStyle('company')}>{job.company}</span>
                                            </div>
                                            <div className="whitespace-nowrap ml-4" style={getStyle('location')}>
                                                {job.city}
                                            </div>
                                        </div>
                                        <div className="text-left" style={getStyle('bodyText')}>
                                            <FormattedText text={job.description} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case 'education':
                return (
                    <section key="education" className="mb-6">
                        <h3 className="mb-4 border-b border-gray-300 pb-1" style={getStyle('sectionTitle')}>{sectionConfig.label}</h3>
                        <div className="space-y-5">
                            {resumeData.education.map((edu) => (
                                <div key={edu.id} className="grid grid-cols-[130px_1fr] gap-4 break-inside-avoid items-baseline">
                                    <div className="shrink-0 text-left" style={getStyle('dates')}>
                                        {edu.dates}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <div className="leading-tight">
                                                <span style={getStyle('jobTitle')}>{edu.degree}</span>
                                                {edu.fieldOfStudy && (
                                                    <>
                                                        <span className="mx-2 text-gray-300 font-light">|</span>
                                                        <span style={getStyle('jobTitle')} className="font-normal">{edu.fieldOfStudy}</span>
                                                    </>
                                                )}
                                                <span className="mx-2 text-gray-300 font-light">|</span>
                                                <span style={getStyle('company')}>{edu.school}</span>
                                            </div>
                                            <div className="whitespace-nowrap ml-4" style={getStyle('location')}>
                                                {edu.city}
                                            </div>
                                        </div>
                                        {edu.description && (
                                            <div className="text-left" style={getStyle('bodyText')}>
                                                <FormattedText text={edu.description} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case 'skills':
                return (
                    <section key="skills" className="mb-6 break-inside-avoid">
                        <h3 className="mb-4 border-b border-gray-300 pb-1" style={getStyle('sectionTitle')}>{sectionConfig.label}</h3>
                        <div className="grid grid-cols-2 gap-x-12 gap-y-2">
                            {resumeData.skills.map(skill => (
                                <div key={skill.id} className="flex justify-between items-center text-sm border-b border-gray-100 pb-1 last:border-0" style={getStyle('bodyText')}>
                                    <span className="font-medium">{skill.name}</span>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{skill.level}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case 'languages':
                return (
                    <section key="languages" className="mb-6 break-inside-avoid">
                        <h3 className="mb-3 border-b border-gray-300 pb-1" style={getStyle('sectionTitle')}>{sectionConfig.label}</h3>
                        <div className="grid grid-cols-2 gap-y-1 gap-x-8">
                            {resumeData.languages.map((lang) => (
                                <div key={lang.id} className="flex justify-between text-sm">
                                    <span style={getStyle('bodyText')} className="font-semibold">{lang.name}</span>
                                    <span style={getStyle('bodyText')} className="italic text-gray-500">{lang.level}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case 'awards':
                return (
                    <section key="awards" className="mb-6">
                        <h3 className="mb-4 border-b border-gray-300 pb-1" style={getStyle('sectionTitle')}>{sectionConfig.label}</h3>
                        <div className="space-y-4">
                            {resumeData.awards.map((award) => (
                                <div key={award.id} className="grid grid-cols-[130px_1fr] gap-4 break-inside-avoid items-baseline">
                                    <div className="shrink-0 text-left" style={getStyle('dates')}>
                                        {award.dates}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <div className="leading-tight">
                                                <span style={getStyle('jobTitle')}>{award.role}</span>
                                                <span className="mx-2 text-gray-300 font-light">|</span>
                                                <span style={getStyle('company')}>{award.company}</span>
                                            </div>
                                        </div>
                                        {award.description && (
                                            <div className="text-left" style={getStyle('bodyText')}>
                                                <FormattedText text={award.description} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            default: return null;
        }
    };

    return (
        <div style={{
            width: '100%',
            fontFamily: styles.fontFamily,
            lineHeight: styles.lineHeight,
            paddingBottom: '1px'
        }}>
            {/* Header */}
            <div className="mb-6 break-inside-avoid" style={{ textAlign: styles.headerAlign }}>
                <h1 className="mb-2"
                    style={{
                        fontSize: `${styles.name.size}rem`,
                        lineHeight: 1.2,
                        fontWeight: styles.name.bold ? 'bold' : 'normal',
                        fontStyle: styles.name.italic ? 'italic' : 'normal',
                        color: styles.name.color,
                        fontFamily: styles.name.fontFamily || styles.name.family,
                        textTransform: styles.name.case
                    }}>
                    {resumeData.personal.firstName} {resumeData.personal.surname}
                </h1>
                <p className="text-gray-600 mb-3" style={{
                    fontSize: `${styles.headerTitle?.size || 1.1}rem`,
                    fontWeight: styles.headerTitle?.bold ? 'bold' : 'normal',
                    fontStyle: styles.headerTitle?.italic ? 'italic' : 'normal',
                    color: styles.headerTitle?.color,
                    fontFamily: styles.headerTitle?.fontFamily || styles.headerTitle?.family,
                    textTransform: styles.headerTitle?.case || 'none'
                }}>{resumeData.personal.title}</p>

                <div className={`flex flex-wrap gap-x-4 gap-y-1 mb-3 ${styles.headerAlign === 'center' ? 'justify-center' : styles.headerAlign === 'right' ? 'justify-end' : 'justify-start'}`}
                    style={{
                        fontSize: `${styles.contactInfo?.size || 0.9}rem`,
                        fontWeight: styles.contactInfo?.bold ? 'bold' : 'normal',
                        fontStyle: styles.contactInfo?.italic ? 'italic' : 'normal',
                        color: styles.contactInfo?.color,
                        fontFamily: styles.contactInfo?.fontFamily || styles.contactInfo?.family,
                        textTransform: styles.contactInfo?.case || 'none'
                    }}
                >
                    {resumeData.personal.city && <span className="flex items-center gap-1.5"><MapPin size={12} /> {resumeData.personal.city}, {resumeData.personal.country}</span>}
                    {resumeData.personal.phone && <a href={`tel:${resumeData.personal.phone}`} className="flex items-center gap-1.5 hover:text-blue-600"><Phone size={12} /> {resumeData.personal.phone}</a>}
                    {resumeData.personal.email && <a href={`mailto:${resumeData.personal.email}`} className="flex items-center gap-1.5 hover:text-blue-600"><Mail size={12} /> {resumeData.personal.email}</a>}
                    {resumeData.personal.linkedin && <a href={resumeData.personal.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-blue-600"><Linkedin size={12} /> LinkedIn</a>}
                    {/* Custom Links */}
                    {resumeData.personal.links && resumeData.personal.links.map((link, idx) => (
                        <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-blue-600 underline decoration-dotted">
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Subheader (Moved below contact info) */}
                {resumeData.personal.subheader && (
                    <p className="mb-3" style={{
                        fontSize: `${styles.subheader?.size || 0.95}rem`,
                        fontWeight: styles.subheader?.bold ? 'bold' : 'normal',
                        fontStyle: styles.subheader?.italic ? 'italic' : 'normal',
                        color: styles.subheader?.color,
                        fontFamily: styles.subheader?.fontFamily || styles.subheader?.family,
                        textTransform: styles.subheader?.case || 'none'
                    }}>
                        {resumeData.personal.subheader}
                    </p>
                )}

            </div>
            <hr className="border-t-2 border-gray-800 mb-8" />

            {sectionOrder.map(section => renderSection(section.id))}
        </div >
    );
}

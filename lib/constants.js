
export const MM_TO_PX = 3.7795275591;
export const MARGIN_MM = 20;

export const pageSizes = {
  a4: {
    width: '210mm',
    height: '297mm',
    heightMm: 297,
    // Printable Area: 297 - 20 - 20 = 257mm
    printableHeightMm: 297 - (MARGIN_MM * 2),
    label: 'A4 (210 x 297 mm)'
  },
  letter: {
    width: '216mm',
    height: '279mm',
    heightMm: 279,
    printableHeightMm: 279 - (MARGIN_MM * 2),
    label: 'US Letter (8.5 x 11 in)'
  },
};

export const fonts = [
  { name: 'Times New Roman', value: '"Times New Roman", Times, serif' },
  { name: 'Arial', value: 'Arial, Helvetica, sans-serif' },
  { name: 'Roboto', value: '"Roboto", sans-serif' },
  { name: 'Open Sans', value: '"Open Sans", sans-serif' },
  { name: 'Merriweather', value: '"Merriweather", serif' },
  { name: 'Playfair', value: '"Playfair Display", serif' },
];

export const initialData = {
  personal: {
    firstName: "Alex",
    surname: "Morgan",
    title: "Senior Product Designer",
    subheader: "UX Strategy | Design Systems | Prototyping",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 123-4567",
    linkedin: "linkedin.com/in/alexmorgan-demo",
    website: "alexmorgan.design",
    city: "San Francisco",
    country: "CA",
    summary: "Creative and detail-oriented Product Designer with over 8 years of experience in building user-centric digital products. Passionate about solving complex problems through elegant design and data-driven insights.",
    links: [
      { label: "ResearchGate", url: "https://researchgate.net/profile/alex-morgan" },
      { label: "Behance", url: "https://behance.net/alexmorgan" }
    ]
  },
  experience: [
    {
      id: 1,
      role: "Senior Product Designer",
      company: "TechFlow Solutions",
      city: "San Francisco, CA",
      dates: "03/2021 — Present",
      description: "Led the redesign of the core mobile application, resulting in a 25% increase in user engagement.\n• Established a comprehensive design system used across 4 product lines.\n• Mentored junior designers and conducted weekly design critiques.\n• Collaborated closely with engineering and product management to define roadmap."
    },
    {
      id: 2,
      role: "UX Designer",
      company: "Creative Pulse",
      city: "Austin, TX",
      dates: "06/2018 — 02/2021",
      description: "Designed intuitive interfaces for a suite of fintech tools.\n• Conducted user research and usability testing to validate design concepts.\n• Reduced user error rates by 40% through workflow optimizations."
    }
  ],
  education: [
    {
      id: 1,
      school: "Rhode Island School of Design",
      degree: "Bachelor of Fine Arts (BFA)",
      fieldOfStudy: "Interaction Design",
      dates: "09/2014 — 05/2018",
      city: "Providence, RI",
      description: "Graduated with Honors. Senior Thesis on 'The Future of Adaptive Interfaces'."
    }
  ],
  awards: [
    {
      id: 1,
      role: "Best Innovation Award",
      company: "Tech Design Annual",
      dates: "2023",
      description: "Awarded for the 'EcoTrack' mobile application design."
    }
  ],
  skills: [
    { id: 1, name: "UI/UX Design", level: "Expert" },
    { id: 2, name: "Figma", level: "Expert" },
    { id: 3, name: "User Research", level: "Experienced" },
    { id: 4, name: "Prototyping", level: "Expert" }
  ],
  languages: [
    { id: 1, name: "English", level: "Native/Bilingual" },
    { id: 2, name: "Spanish", level: "Fluent" }
  ]
};

export const defaultSections = [
  { id: 'summary', label: 'Profile', visible: true },
  { id: 'experience', label: 'Professional Experiences', visible: true },
  { id: 'education', label: 'Education', visible: true },
  { id: 'awards', label: 'Awards', visible: true },
  { id: 'skills', label: 'Skills', visible: true },
  { id: 'languages', label: 'Languages', visible: true }
];

export const initialStyles = {
  fontFamily: fonts[0].value,
  pageSize: 'a4',
  lineHeight: 1.4,
  margin: 20,
  headerAlign: 'center',

  name: {
    size: 2.2, bold: true, italic: false, color: '#000000',
    family: fonts[0].value, case: 'capitalize'
  },

  headerTitle: {
    size: 1.1, bold: false, italic: false, color: '#666666',
    family: fonts[0].value, case: 'capitalize'
  },

  subheader: {
    size: 0.95, bold: false, italic: true, color: '#666666',
    family: fonts[0].value, case: 'capitalize'
  },

  sectionTitle: { size: 1.0, bold: true, italic: false, color: '#666666', uppercase: false, fontFamily: fonts[0].value },
  jobTitle: { size: 1.1, bold: true, italic: false, color: '#000000', fontFamily: fonts[0].value },
  company: { size: 1.0, bold: false, italic: false, color: '#333333', fontFamily: fonts[0].value },
  dates: { size: 0.9, bold: false, italic: false, color: '#000000', fontFamily: fonts[0].value },
  location: { size: 0.9, bold: false, italic: false, color: '#888888', fontFamily: fonts[0].value },
  bodyText: { size: 0.95, bold: false, italic: false, color: '#333333', fontFamily: fonts[0].value },
};

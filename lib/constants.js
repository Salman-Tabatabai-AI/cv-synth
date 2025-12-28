
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
    firstName: "Salman",
    surname: "Tabatabai",
    title: "Head of GenAI and Advanced Analytics",
    email: "salman.tabatabai@gmail.com",
    phone: "+45 52793647",
    linkedin: "https://www.linkedin.com/in/salman-tabatabai",
    website: "",
    city: "Aarhus",
    country: "Denmark",
    summary: "Accomplished Head of GenAI and Advanced Analytics with expertise in strategic AI direction and digital transformation. Proven success in enhancing AI capabilities and aligning technical projects with business goals."
  },
  experience: [
    {
      id: 1,
      role: "Head of GenAI and Advanced Analytics, ",
      company: "Capgemini Denmark",
      city: "Aarhus, Denmark",
      dates: "Oct 2024 — Jul 2025",
      description: "Set strategic direction for Generative AI capabilities, advising senior stakeholders on impactful use cases and digital transformation.\n• Spearheaded initiatives to enhance AI capabilities across projects.\n• Orchestrated alignment between technical and business objectives.\n• Championed professional development through targeted training programs."
    },
    {
      id: 2,
      role: "Senior Data Scientist, ",
      company: "FLSmidth",
      city: "Copenhagen, Denmark",
      dates: "Feb 2022 — Oct 2024",
      description: "Spearheaded development of AI solutions for mining and cement industries.\n• Automated technical documentation analysis.\n• Reduced processing time by 95%."
    }
  ],
  education: [
    {
      id: 1,
      school: "Aarhus University",
      degree: "PhD Researcher and Academic Staff, ",
      dates: "Dec 2015 — Aug 2019",
      city: "Aarhus, Denmark",
      description: "Conducted advanced research in multi-sensor chemical and physical predictive models."
    }
  ],
  skills: [
    { id: 1, name: "Generative AI", level: "Expert" },
    { id: 2, name: "Data Governance", level: "Expert" },
    { id: 3, name: "Machine Learning", level: "Expert" }
  ],
  languages: [
    { id: 1, name: "English", level: "Native" },
    { id: 2, name: "Danish", level: "Intermediate" }
  ]
};

export const defaultSections = [
  { id: 'summary', label: 'Professional Summary' },
  { id: 'experience', label: 'Employment History' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'languages', label: 'Languages' }
];

export const initialStyles = {
  fontFamily: fonts[0].value,
  pageSize: 'a4',
  lineHeight: 1.4,
  margin: 20,
  headerAlign: 'center',

  name: {
    size: 2.2, bold: true, italic: false, color: '#000000',
    family: fonts[0].value, case: 'uppercase'
  },

  sectionTitle: { size: 1.0, bold: true, italic: false, color: '#666666', uppercase: true },
  jobTitle: { size: 1.1, bold: true, italic: false, color: '#000000' },
  company: { size: 1.0, bold: false, italic: false, color: '#333333' },
  dates: { size: 0.9, bold: false, italic: false, color: '#000000' },
  location: { size: 0.9, bold: false, italic: false, color: '#888888' },
  bodyText: { size: 0.95, bold: false, italic: false, color: '#333333' },
};

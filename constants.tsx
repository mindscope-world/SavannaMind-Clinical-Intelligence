
import { Testimonial, StatItem, ProductHighlight } from './types.ts';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "The speed and accuracy of the AI analysis has fundamentally changed how we triage emergency cases in our radiology department.",
    name: "Dr. Sarah Chen",
    title: "Head of Radiology",
    company: "AstraZeneca Partner Network",
    avatar: "https://picsum.photos/id/64/100/100"
  },
  {
    id: 2,
    quote: "Integrating these AI tools was seamless. We've seen a 30% increase in workflow efficiency since deployment across our clinics.",
    name: "James Miller",
    title: "Chief Innovation Officer",
    company: "Medtronic Global",
    avatar: "https://picsum.photos/id/65/100/100"
  },
  {
    id: 3,
    quote: "A true game-changer for early TB detection. The system is robust, intuitive, and most importantly, highly reliable.",
    name: "Elena Rodriguez",
    title: "Public Health Director",
    company: "Merck Group",
    avatar: "https://picsum.photos/id/91/100/100"
  },
  {
    id: 4,
    quote: "We now have the ability to scan and detect anomalies in real-time, allowing our specialists to focus on the most critical patients.",
    name: "Dr. Robert Wilson",
    title: "Neurologist",
    company: "Mayo Clinic Network",
    avatar: "https://picsum.photos/id/103/100/100"
  }
];

export const STATS: StatItem[] = [
  { label: "Countries Served", value: 90, suffix: "+" },
  { label: "Deployment Sites", value: 3000, suffix: "+" },
  { label: "Daily Scans Processed", value: 50000, suffix: "+" },
  { label: "AI Certifications", value: 15, suffix: "" }
];

export const PRODUCTS: ProductHighlight[] = [
  {
    id: "sXR",
    title: "Chest X-Ray (sXR)",
    subtitle: "Automated Chest Screening",
    description: "Our flagship AI solution detects 30+ abnormalities in chest X-rays, including TB, nodules, and pneumonia, with clinical-grade accuracy.",
    imageUrl: "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=2000",
    features: ["Instant Triage", "TB Screening", "Longitudinal Tracking"]
  },
  {
    id: "sER",
    title: "Neuro Triage (sER)",
    subtitle: "Emergency Room Triage",
    description: "Identifies life-threatening anomalies like intracranial hemorrhages, infarcts, and fractures in non-contrast head CT scans within seconds.",
    imageUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&q=80&w=2000",
    features: ["ICH Detection", "Midline Shift", "Fast-track Notifications"]
  }
];

export const CLINICAL_STUDIES = [
  {
    id: "sm-pub-001",
    title: "Deep Learning for Automated Detection of Cystic Fibrosis on Chest Radiographs",
    authors: "Chilamkurthy S., et al.",
    journal: {
      name: "The Lancet Digital Health",
      link: "https://doi.org/10.1016/S2589-7500(23)00150-1"
    },
    publication_date: "2023-11-15",
    tags: {
      care_area: ["Lung Health", "Chest X-ray"],
      modality: ["X-ray"],
      asset_type: ["Peer-Reviewed Journal"]
    },
    metrics: [
      { label: "Sensitivity", value: "94%" },
      { label: "Specificity", value: "91%" }
    ],
    abstract_preview: "This multi-center study evaluates the performance of the SavannaMind deep learning algorithm in detecting early structural changes in pediatric cystic fibrosis patients compared to expert radiologist consensus.",
    is_featured: true
  },
  {
    id: "sm-pub-002",
    title: "Validation of AI Triage for Intracranial Hemorrhage in Acute Stroke Pathways",
    authors: "Miller J., et al.",
    journal: {
      name: "Journal of Neuroimaging",
      link: "https://doi.org/10.1111/jon.12845"
    },
    publication_date: "2023-05-20",
    tags: {
      care_area: ["Neurocritical Care", "Stroke"],
      modality: ["CT"],
      asset_type: ["Peer-Reviewed Journal"]
    },
    metrics: [
      { label: "Sensitivity", value: "97%" },
      { label: "AUC", value: "0.98" }
    ],
    abstract_preview: "Evaluating the efficacy of sER in detecting acute intracranial hemorrhage across 12 emergency departments, showing significant reduction in 'scan-to-notification' time.",
    is_featured: false
  },
  {
    id: "sm-pub-003",
    title: "AI-Powered Community Screening for Tuberculosis in High-Burden Settings",
    authors: "Rodriguez E., et al.",
    journal: {
      name: "Nature Medicine",
      link: "https://www.nature.com/articles/nm.2023.01"
    },
    publication_date: "2023-01-10",
    tags: {
      care_area: ["TB", "Public Health"],
      modality: ["X-ray"],
      asset_type: ["Peer-Reviewed Journal"]
    },
    metrics: [
      { label: "NPV", value: "99.2%" },
      { label: "Sensitivity", value: "92%" }
    ],
    abstract_preview: "A landmark study involving 100,000 subjects in rural areas, proving that AI-led triage can effectively replace human readers for primary TB screening.",
    is_featured: true
  }
];

export const REGULATORY_BADGES = [
  { id: 'fda', name: 'FDA Cleared', region: 'USA', logo: 'ShieldCheck' },
  { id: 'ce', name: 'CE Mark (MDR)', region: 'Europe', logo: 'Globe' },
  { id: 'iso', name: 'ISO 13485', region: 'Global', logo: 'ShieldCheck' },
  { id: 'hipaa', name: 'HIPAA Compliant', region: 'USA', logo: 'ShieldCheck' }
];

export const CLEARANCE_TABLE = [
  { product: 'sXR', body: 'FDA', cert: 'K183145', region: 'USA' },
  { product: 'sXR', body: 'EMA', cert: 'CE 716501', region: 'EU' },
  { product: 'sER', body: 'FDA', cert: 'K201442', region: 'USA' },
  { product: 'sER', body: 'Health Canada', cert: '105231', region: 'Canada' },
  { product: 'sVascular', body: 'FDA', cert: 'Pending', region: 'USA' }
];

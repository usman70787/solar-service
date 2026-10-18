import React, { useState, useEffect, useId, useMemo } from 'react';
import {
  Sun,
  Zap,
  ShieldCheck,
  Clock,
  Wrench,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronDown,
  Building2,
  Home,
  Sprout,
  Award,
  Check,
  Calendar,
  Layers,
  ArrowUpRight,
  DollarSign,
  Activity,
  UserCheck,
  Sliders,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  Fuel,
  BatteryCharging,
  Cpu,
  RefreshCw
} from 'lucide-react';

// Direct ES module imports for guaranteed Vite bundling & local serving
import heroImg from './assets/images/hero_solar_rooftop_1792302011786.jpg';
import commercialImg from './assets/images/solar_commercial_facility_1792302012236.jpg';
import farmImg from './assets/images/solar_farm_irrigation_1792302012984.jpg';
import inspectionImg from './assets/images/solar_engineer_inspection_1792302013191.jpg';
import healthcareImg from './assets/images/solar_healthcare_clinic_1792302036569.jpg';
import residenceImg from './assets/images/solar_urban_residence_1792302036402.jpg';
import teamLeadImg from './assets/images/team_lead_engineer_1792302036302.jpg';
import teamDeliveryImg from './assets/images/team_delivery_director_1792302960559.jpg';
import teamFieldImg from './assets/images/team_field_director_1792302959765.jpg';

/* ==========================================================================
   1. BUSINESS CONFIGURATION OBJECT (Centralized Single Source of Truth)
   ========================================================================== */
export const COMPANY_CONFIG = {
  name: "Helios Power Africa",
  tagline: "Reliable solar power for homes, businesses and farms.",
  primaryMarket: "Lagos · Nairobi · Accra · Kigali",
  
  // Updated WhatsApp Number as requested: 03110110444 (International wa.me format: 923110110444)
  whatsappRaw: "03110110444",
  whatsappInternational: "923110110444",
  whatsappDisplay: "+92 311 0110444",
  
  // Regional customer service & field lines
  phones: [
    { label: "Direct WhatsApp Line", number: "+92 311 0110444", link: "https://wa.me/923110110444" },
    { label: "Lagos Office", number: "+234 802 345 6789", link: "tel:+2348023456789" },
    { label: "Nairobi Office", number: "+254 712 345 678", link: "tel:+254712345678" }
  ],
  email: "contact@heliospowerafrica.com",
  address: "Plot 14 Victoria Island, Lagos, Nigeria / Westlands Commercial Centre, Nairobi, Kenya",
  workingHours: "Mon-Sat, 8:00 AM - 6:00 PM",
  
  // Images (Imported assets with fallback URLs)
  images: {
    hero: heroImg || "/images/hero_solar_rooftop_1792302011786.jpg",
    commercial: commercialImg || "/images/solar_commercial_facility_1792302012236.jpg",
    farm: farmImg || "/images/solar_farm_irrigation_1792302012984.jpg",
    inspection: inspectionImg || "/images/solar_engineer_inspection_1792302013191.jpg",
    healthcare: healthcareImg || "/images/solar_healthcare_clinic_1792302036569.jpg",
    residential: residenceImg || "/images/solar_urban_residence_1792302036402.jpg",
    teamLead: teamLeadImg || "/images/team_lead_engineer_1792302036302.jpg",
    teamDelivery: teamDeliveryImg || "/images/team_delivery_director_1792302960559.jpg",
    teamField: teamFieldImg || "/images/team_field_director_1792302959765.jpg"
  },

  trustBar: [
    { title: "COREN & EPRA Certified", desc: "Licensed electrical power engineers" },
    { title: "Genuine Tier-1 Hardware", desc: "Bloomberg Tier-1 panels & LiFePO4 cells" },
    { title: "Rapid In-Country Support", desc: "Local spare parts & service dispatch" },
    { title: "Flexible Financing Plans", desc: "Pay-as-you-save & milestone billing" }
  ],

  solarYieldTracker: [
    { city: "Lagos", radiation: "5.4 kWh/m²/day", sunshine: "6.2 Peak Hrs" },
    { city: "Nairobi", radiation: "5.8 kWh/m²/day", sunshine: "6.8 Peak Hrs" },
    { city: "Accra", radiation: "5.2 kWh/m²/day", sunshine: "6.0 Peak Hrs" },
    { city: "Kigali", radiation: "5.1 kWh/m²/day", sunshine: "5.9 Peak Hrs" }
  ],

  services: [
    {
      id: "home-solar",
      title: "Home Solar Systems",
      iconType: "home",
      tagline: "Uninterrupted quiet luxury without noisy generators or smoke fumes.",
      benefits: [
        "Sub-10ms automatic transfer so ACs, TVs, and Wi-Fi never blink",
        "Grade-A LiFePO4 lithium batteries engineered for tropical heat",
        "Eliminate midnight generator refuelling, oily spills, and ear-splitting noise"
      ],
      idealFor: "Townhouses, residential duplexes, and private family compounds",
      systemScale: "5 kW to 20 kW Hybrid Microgrids"
    },
    {
      id: "commercial-solar",
      title: "Commercial & Business Solar",
      iconType: "commercial",
      tagline: "Slash daytime operational overhead and shield manufacturing profit margins.",
      benefits: [
        "Cut monthly generator diesel and commercial tariffs by up to 78%",
        "Synchronized grid-tie feed with smart peak-demand shaving",
        "Cloud-based per-circuit analytics and dedicated commercial SLA"
      ],
      idealFor: "Offices, factories, hotels, cold storage warehouses, and schools",
      systemScale: "30 kW to 500 kW Three-Phase Arrays"
    },
    {
      id: "farm-solar",
      title: "Solar for Farms & Water Pumping",
      iconType: "farm",
      tagline: "Zero-fuel borehole water pumping and off-grid agricultural productivity.",
      benefits: [
        "Direct-drive variable frequency drives for submersible pumps",
        "Reliable all-day irrigation powering multi-crop harvests year-round",
        "Heavy-duty galvanized ground-mount steel frames resilient to storms"
      ],
      idealFor: "Commercial farms, ranches, agro-processing, and borehole wells",
      systemScale: "5.5 HP to 50 HP Solar Pumping Stations"
    }
  ],

  whyChooseUs: [
    {
      number: "01",
      title: "Immediate Savings & Fast Payback",
      desc: "With diesel fuel prices reaching record highs across Africa, our systems achieve full capital payback in 2.2 to 3.5 years, generating free power for the remaining 22+ years of panel life."
    },
    {
      number: "02",
      title: "Zero-Second Outage Transfer",
      desc: "Grid collapse and sudden load shedding shouldn't reset computers, shut down cold storage, or restart medical machines. Our hybrid systems switch over silently in under 10 milliseconds."
    },
    {
      number: "03",
      title: "100% Genuine Tier-1 Hardware",
      desc: "We reject grey-market and counterfeit panels. Every installation uses strictly Bloomberg Tier-1 bifacial panels, European/Asian certified hybrid inverters, and automotive-grade LiFePO4 cells with 6,000+ cycles."
    },
    {
      number: "04",
      title: "Dedicated Local Technical Presence",
      desc: "We are not remote sales brokers. Our certified electrical teams operate local workshops and warehouses in Lagos, Nairobi, and Accra with full replacement parts in stock."
    }
  ],

  howItWorks: [
    {
      step: "01",
      title: "Free Site Survey & Load Audit",
      desc: "Our engineers visit your property to measure roof tilt, azimuth, shade profiles, and electrical distribution panels."
    },
    {
      step: "02",
      title: "Custom Engineering & Fixed Quote",
      desc: "We generate a customized 3D solar layout with accurate monthly kWh yield projections, equipment itemization, and clear payback schedule."
    },
    {
      step: "03",
      title: "Certified Rapid Installation",
      desc: "Our licensed teams complete structural mounting, high-voltage DC protection, battery integration, and safety earthing in 2 to 4 days."
    },
    {
      step: "04",
      title: "Cloud Monitoring & Guaranteed Care",
      desc: "We configure your real-time smartphone monitoring app and back every system with our 5-year comprehensive system warranty."
    }
  ],

  savingsMetrics: [
    {
      value: "78%",
      label: "Average Generator Fuel Cut",
      context: "Direct monthly savings on diesel and petrol generators across client facilities."
    },
    {
      value: "$3,450",
      label: "Average Annual Net Savings",
      context: "Typical annual money kept in pocket for a 10kW residential solar system."
    },
    {
      value: "99.9%",
      label: "Power Availability Uptime",
      context: "Verified across 500+ commercial, agricultural, and residential sites."
    }
  ],

  projects: [
    {
      id: "proj-1",
      title: "15kW Luxury Villa Microgrid",
      location: "Victoria Island, Lagos",
      capacity: "15 kWp Solar · 30 kWh Lithium Storage",
      category: "Residential",
      image: heroImg || "/images/hero_solar_rooftop_1792302011786.jpg",
      summary: "Full residential estate installation replacing a 30kVA diesel generator with zero noise and 24/7 clean power for 4 central air conditioning units.",
      stats: { panels: "28x 550W Tier-1 Mono-PERC", battery: "6x 5.12kWh LiFePO4", savings: "$4,200/yr diesel saved", payback: "2.4 Years" }
    },
    {
      id: "proj-2",
      title: "120kW Commercial Rooftop Array",
      location: "Industrial Area, Nairobi",
      capacity: "120 kWp Solar · Grid-Tied Hybrid",
      category: "Commercial",
      image: commercialImg || "/images/solar_commercial_facility_1792302012236.jpg",
      summary: "Manufacturing facility installation with synchronized grid-tie feed and diesel integration, cutting high peak-hour power tariffs.",
      stats: { panels: "218x 550W Bifacial", battery: "100kW Industrial Hybrid", savings: "$18,500/yr utility saved", payback: "2.8 Years" }
    },
    {
      id: "proj-3",
      title: "45kW Borehole & Drip Irrigation Array",
      location: "Naivasha Basin, Kenya",
      capacity: "45 kWp Solar · Direct-Drive Pumping",
      category: "Agricultural",
      image: farmImg || "/images/solar_farm_irrigation_1792302012984.jpg",
      summary: "Deep borehole solar pumping system delivering 35,000 litres/hour to 120 hectares of commercial vegetable and flower crops.",
      stats: { panels: "82x 550W Ground Mount", battery: "Variable Frequency Drive", savings: "100% fuel independence", payback: "1.9 Years" }
    },
    {
      id: "proj-4",
      title: "25kW Rural Healthcare Clinic Power",
      location: "Makueni County, Kenya",
      capacity: "25 kWp Solar · 40 kWh Lithium Storage",
      category: "Commercial",
      image: healthcareImg || "/images/solar_healthcare_clinic_1792302036569.jpg",
      summary: "Critical community hospital solar upgrade powering cold-chain vaccine refrigeration, maternity ward lighting, and surgery suite.",
      stats: { panels: "46x 550W High-Efficiency", battery: "8x 5kWh LiFePO4 Rack", savings: "24/7 life-critical uptime", payback: "2.1 Years" }
    },
    {
      id: "proj-5",
      title: "10kW Modern Duplex Zero-Gen System",
      location: "Lekki Phase 1, Lagos",
      capacity: "10 kWp Solar · 20 kWh Lithium Storage",
      category: "Residential",
      image: residenceImg || "/images/solar_urban_residence_1792302036402.jpg",
      summary: "Turnkey residential solar installation enabling the homeowner to completely decommission their 20kVA soundproof generator.",
      stats: { panels: "18x 550W Tier-1 Mono", battery: "4x 5kWh Wall Mount", savings: "$3,600/yr diesel saved", payback: "2.6 Years" }
    },
    {
      id: "proj-6",
      title: "Industrial Substation & Battery Bank",
      location: "Tema Industrial Hub, Ghana",
      capacity: "60 kWp Solar · 80 kWh Energy Storage",
      category: "Commercial",
      image: inspectionImg || "/images/solar_engineer_inspection_1792302013191.jpg",
      summary: "Precision power conversion centre for logistics and packaging plant with real-time SCADA telemetry and transient surge suppression.",
      stats: { panels: "110x 550W Monocrystalline", battery: "High-voltage lithium rack", savings: "74% fuel bill reduction", payback: "3.1 Years" }
    }
  ],

  testimonials: [
    {
      name: "Eng. Babatunde Adeleke",
      role: "Managing Director, Westgate Logistics",
      city: "Lagos, Nigeria",
      quote: "Before Helios, our 45kVA generator was burning through 350 liters of diesel every single week just to keep our cold-storage operations running during grid drops. Helios engineered a 35kW commercial solar array with lithium backup. Our fuel consumption dropped by 80% in the very first month. It is by far the highest-ROI capital investment we made this year."
    },
    {
      name: "Dr. Grace Mwangi",
      role: "Medical Director, Kilimani Pediatric Centre",
      city: "Nairobi, Kenya",
      quote: "Reliable power in a clinic is not an amenity; it is a life-or-death requirement for vaccine storage and neonatal incubators. Helios Power installed our hybrid system with zero disruption. The automatic switchover is completely seamless—we never even notice when the national grid fails. Their engineers are thorough, licensed, and deeply professional."
    },
    {
      name: "Kwesi Mensah",
      role: "Managing Partner, Volta Basin Greenfarms",
      city: "Greater Accra, Ghana",
      quote: "Pumping water with diesel generators was eating away over 40% of our farming profit margins. Helios designed a dedicated solar borehole pumping system that pumps 30,000 liters every sunlit day straight into our elevated reservoir. We have had zero fuel costs for 18 months, and our crop yield expanded by two harvesting cycles."
    }
  ],

  team: [
    {
      name: "Tolu Oladipo, FNSE",
      role: "Co-Founder & Chief Technical Officer",
      bio: "14+ years in African power systems engineering, formerly lead grid electrical engineer at regional utility.",
      image: teamLeadImg || "/images/team_lead_engineer_1792302036302.jpg"
    },
    {
      name: "Wanjiku Kimani, PE",
      role: "Head of Engineering & System Design",
      bio: "Master's in Renewable Energy Systems, specialized in commercial micro-grids and battery chemistry.",
      image: teamDeliveryImg || "/images/team_delivery_director_1792302960559.jpg"
    },
    {
      name: "Kofi Boateng",
      role: "Director of Field Operations",
      bio: "Oversees quality assurance, certified installation teams, and rapid field dispatch across West & East Africa.",
      image: teamFieldImg || "/images/team_field_director_1792302959765.jpg"
    }
  ],

  faq: [
    {
      q: "How much does a quality solar and battery system cost in Africa?",
      a: "System cost depends on your daily kilowatt-hour (kWh) electrical load and whether you require basic evening backup or full 24/7 air-conditioned energy independence. A typical high-performance residential system (5kW–10kW with 10kWh–20kWh lithium storage) typically ranges from $4,500 to $9,500 fully installed. Commercial installations are engineered to order. Because our systems eliminate high diesel generator running costs, most clients achieve full payback within 2.5 to 3.5 years."
    },
    {
      q: "How long does the site survey and installation process take?",
      a: "Our free technical site survey takes about 60–90 minutes at your property. Once you approve the engineered design and quote, equipment dispatch takes 2–3 business days. Physical installation and electrical commissioning typically take 2 to 3 days for homes and 5 to 10 days for large commercial facilities. We handle all safety compliance and earthing."
    },
    {
      q: "What is the real lifespan of your solar panels and lithium batteries?",
      a: "We exclusively install Bloomberg Tier-1 solar panels backed by a 25-year linear power output warranty (guaranteed >84% production at year 25). Our lithium storage systems utilize Grade-A LiFePO4 (Lithium Iron Phosphate) cells rated for 6,000+ full charge-discharge cycles, representing 12 to 15 years of reliable daily performance under high ambient tropical temperatures."
    },
    {
      q: "What ongoing maintenance is required after the installation?",
      a: "Solid-state solar systems require minimal maintenance. There are no engine filters, oils, or moving parts like a generator. We recommend rinsing dust from the panels every 4 to 8 weeks depending on harmattan or seasonal dust conditions. Our systems include intelligent cloud Wi-Fi monitoring so our engineering team can detect any drop in string efficiency remotely."
    },
    {
      q: "Do you offer flexible payment plans or financing options?",
      a: "Yes. For residential clients, we offer structured milestone payments (advance, delivery, commissioning). For verified commercial and agricultural clients, we partner with regional clean energy financial institutions to provide asset-backed equipment leasing with zero upfront capital outlay, allowing your immediate diesel fuel savings to fund the monthly installments."
    },
    {
      q: "What happens during cloudy days, heavy rain, or prolonged night hours?",
      a: "Modern Tier-1 monocrystalline panels generate substantial power even under diffuse or overcast light. Your smart hybrid inverter automatically coordinates power flow: solar powers your active loads first, excess energy charges your lithium battery bank, and stored battery power seamlessly carries your property through the night. If batteries ever deplete during an unprecedented multi-day storm, the inverter can automatically start your backup generator or draw from the grid."
    }
  ]
};

/* ==========================================================================
   2. REUSABLE SUB-COMPONENTS & ICONS
   ========================================================================== */

function SunLogoMark({ className = "w-7 h-7 text-[#F2A900]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="6" fill="currentColor" />
      <path d="M16 3V7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M16 25V29" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M3 16H7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M25 16H29" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M6.8 6.8L9.6 9.6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M22.4 22.4L25.2 25.2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M6.8 25.2L9.6 22.4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M22.4 9.6L25.2 6.8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.16 7.62C9.02 7.62 8.79 7.67 8.59 7.89C8.39 8.11 7.82 8.64 7.82 9.73C7.82 10.82 8.61 11.87 8.73 12.02C8.84 12.18 10.28 14.4 12.48 15.35C14.31 16.14 14.68 15.98 15.08 15.94C15.48 15.9 16.37 15.41 16.56 14.88C16.74 14.35 16.74 13.9 16.68 13.8C16.63 13.71 16.49 13.65 16.28 13.55C16.07 13.44 15.04 12.93 14.85 12.86C14.66 12.79 14.52 12.75 14.38 12.96C14.24 13.17 13.84 13.65 13.72 13.79C13.6 13.92 13.48 13.94 13.27 13.84C13.06 13.73 12.39 13.51 11.59 12.8C10.97 12.25 10.55 11.56 10.43 11.35C10.31 11.14 10.42 11.03 10.52 10.93C10.62 10.83 10.74 10.67 10.85 10.54C10.96 10.41 11 10.31 11.07 10.17C11.14 10.03 11.1 9.91 11.05 9.81C11 9.71 10.59 8.68 10.41 8.27C10.24 7.87 10.07 7.92 9.93 7.91C9.8 7.91 9.65 7.91 9.5 7.91L9.16 7.62Z" />
    </svg>
  );
}

/** Resilient Image with Styled Fallback */
function SafeImage({
  src,
  alt,
  className = "",
  loading = "lazy",
  width,
  height,
  fallbackLabel = "Solar Installation"
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  width?: string | number;
  height?: string | number;
  fallbackLabel?: string;
}) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`flex flex-col items-center justify-center bg-[#0B2545] text-slate-300 p-6 text-center ${className}`}>
        <SunLogoMark className="w-10 h-10 text-[#F2A900] mb-2 opacity-80" />
        <span className="text-xs font-semibold text-white tracking-wide">{fallbackLabel}</span>
        <span className="text-[10px] text-slate-400 mt-1">Helios Power Certified Array</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      width={width}
      height={height}
      onError={() => setError(true)}
      referrerPolicy="no-referrer"
      className={className}
    />
  );
}

/* ==========================================================================
   3. MAIN APPLICATION COMPONENT
   ========================================================================== */
export default function App() {
  const formStatusId = useId();

  // Navigation State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Interactive Live Calculator State (Diesel vs Solar ROI)
  const [calcPropertyType, setCalcPropertyType] = useState<'residential' | 'commercial' | 'farm'>('residential');
  const [calcGenHours, setCalcGenHours] = useState(8); // hours/day
  const [calcMonthlyFuelSpend, setCalcMonthlyFuelSpend] = useState(450); // USD equivalent

  // Project Gallery Filter State & Lightbox
  const [activeProjectFilter, setActiveProjectFilter] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<typeof COMPANY_CONFIG.projects[0] | null>(null);

  // Before vs After Comparison Switch
  const [comparisonMode, setComparisonMode] = useState<'after' | 'before'>('after');

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    serviceType: 'Home Solar Systems',
    generatorHours: '6-10 hours/day',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [lastSubmittedName, setLastSubmittedName] = useState('');

  // Active FAQ Accordion Index
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hero', 'calculator', 'services', 'comparison', 'why-us', 'how-it-works', 'savings', 'projects', 'testimonials', 'about', 'faq', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          },
          { threshold: 0.25 }
        );
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProject(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (activeProjectFilter === 'All') return COMPANY_CONFIG.projects;
    return COMPANY_CONFIG.projects.filter(p => p.category === activeProjectFilter);
  }, [activeProjectFilter]);

  // Calculated ROI estimates
  const calculatedStats = useMemo(() => {
    const annualFuel = calcMonthlyFuelSpend * 12;
    const estimatedSolarCut = Math.round(annualFuel * 0.82);
    const recommendedKw = calcPropertyType === 'residential' ? 8 : calcPropertyType === 'commercial' ? 35 : 15;
    const estimatedBatteryKwh = recommendedKw * 2;
    const paybackMonths = Math.max(16, Math.min(42, Math.round((recommendedKw * 800) / (annualFuel / 12) * 1.1)));
    return {
      annualFuelBurn: annualFuel,
      annualSaved: estimatedSolarCut,
      recommendedSystem: `${recommendedKw}kW Solar + ${estimatedBatteryKwh}kWh LiFePO4`,
      paybackPeriod: `${(paybackMonths / 12).toFixed(1)} Years`
    };
  }, [calcPropertyType, calcGenHours, calcMonthlyFuelSpend]);

  // Form input handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Form validation & submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = 'Please provide your full name.';
    if (!formData.phone.trim() || formData.phone.length < 8) errors.phone = 'Please provide a valid phone or WhatsApp number.';
    if (!formData.city.trim()) errors.city = 'Please indicate your city or state.';
    if (!formData.message.trim()) errors.message = 'Please briefly describe your solar requirements or current power challenges.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setLastSubmittedName(formData.name.trim());
    setFormSubmitted(true);

    // Build pre-filled WhatsApp link with the user requested number: 03110110444
    const textMessage = `Hello Helios Power Africa! My name is ${formData.name.trim()} from ${formData.city.trim()}.\n\n*Service Inquiry:* ${formData.serviceType}\n*Generator Run Time:* ${formData.generatorHours}\n*Phone:* ${formData.phone.trim()}\n\n*Project Details:*\n${formData.message.trim()}`;
    const waUrl = `https://wa.me/${COMPANY_CONFIG.whatsappInternational}?text=${encodeURIComponent(textMessage)}`;

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  // Pre-fill contact form from calculator or service card
  const handleTransferCalculatorToContact = () => {
    setFormData(prev => ({
      ...prev,
      serviceType: calcPropertyType === 'residential' ? 'Home Solar Systems' : calcPropertyType === 'commercial' ? 'Commercial and Business Solar' : 'Solar for Farms and Water Pumping',
      generatorHours: `${calcGenHours} hours/day`,
      message: `I ran your Solar ROI Calculator: Current fuel spend is ~$${calcMonthlyFuelSpend}/mo running generator ${calcGenHours} hrs/day. Recommended: ${calculatedStats.recommendedSystem}. Please send a formal engineering audit.`
    }));
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestServiceQuote = (serviceTitle: string) => {
    setFormData(prev => ({ ...prev, serviceType: serviceTitle }));
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#1A1F2B] antialiased selection:bg-[#F2A900]/30 selection:text-[#0B2545]">

      {/* ====================================================================
          TOP NOTIFICATION TICKER: Direct WhatsApp Helpline
          ==================================================================== */}
      <div className="bg-[#081B33] text-slate-300 text-xs py-2 px-4 border-b border-[#13315C]">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
            <span className="text-white font-medium">Solar Engineering Desk Online:</span>
            <span>Serving Lagos, Nairobi, Accra &amp; Regional Hubs</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <a
              href={`https://wa.me/${COMPANY_CONFIG.whatsappInternational}?text=${encodeURIComponent("Hello Helios Power Africa, I need a consultation for solar installation.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#F2A900] hover:underline font-semibold"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: {COMPANY_CONFIG.whatsappDisplay}</span>
            </a>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline">{COMPANY_CONFIG.workingHours}</span>
          </div>
        </div>
      </div>

      {/* ====================================================================
          1. HEADER
          3-Zone Contract: 1-line brand mark - 5 text links - 1 primary action
          ==================================================================== */}
      <header className="sticky top-0 z-40 bg-[#0B2545]/95 backdrop-blur-md border-b border-[#13315C] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          
          {/* Zone 1: Brand Wordmark with SVG Sun Mark */}
          <a
            href="#hero"
            className="flex items-center gap-3 text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A900] rounded-md py-1"
          >
            <SunLogoMark className="w-8 h-8 text-[#F2A900] shrink-0" />
            <span className="font-extrabold text-lg sm:text-xl tracking-tight">
              HELIOS<span className="text-[#F2A900] font-normal ml-1">POWER</span>
            </span>
          </a>

          {/* Zone 2: Navigation Links (single line, subtle hover underline) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-slate-200" aria-label="Main Navigation">
            <a
              href="#services"
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeSection === 'services' ? 'border-[#F2A900] text-white font-semibold' : 'border-transparent'
              }`}
            >
              Services
            </a>
            <a
              href="#calculator"
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeSection === 'calculator' ? 'border-[#F2A900] text-white font-semibold' : 'border-transparent'
              }`}
            >
              ROI Calculator
            </a>
            <a
              href="#why-us"
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeSection === 'why-us' ? 'border-[#F2A900] text-white font-semibold' : 'border-transparent'
              }`}
            >
              Why Choose Us
            </a>
            <a
              href="#how-it-works"
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeSection === 'how-it-works' ? 'border-[#F2A900] text-white font-semibold' : 'border-transparent'
              }`}
            >
              How It Works
            </a>
            <a
              href="#projects"
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeSection === 'projects' ? 'border-[#F2A900] text-white font-semibold' : 'border-transparent'
              }`}
            >
              Projects
            </a>
            <a
              href="#about"
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeSection === 'about' ? 'border-[#F2A900] text-white font-semibold' : 'border-transparent'
              }`}
            >
              About
            </a>
            <a
              href="#faq"
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeSection === 'faq' ? 'border-[#F2A900] text-white font-semibold' : 'border-transparent'
              }`}
            >
              FAQ
            </a>
            <a
              href="#contact"
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeSection === 'contact' ? 'border-[#F2A900] text-white font-semibold' : 'border-transparent'
              }`}
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action (Desktop) + Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold tracking-wide uppercase text-[#0B2545] bg-[#F2A900] hover:bg-[#D99600] active:scale-[0.98] rounded-lg transition-all shadow-sm whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#F2A900]"
            >
              Get a Free Quote
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A900] rounded-lg"
              aria-label="Open mobile navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Slide-in Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />

            <div className="relative w-full max-w-xs bg-[#0B2545] text-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto border-l border-[#13315C]">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#13315C]">
                  <div className="flex items-center gap-2">
                    <SunLogoMark className="w-6 h-6 text-[#F2A900]" />
                    <span className="font-bold text-base tracking-tight text-white">HELIOS POWER</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 text-slate-300 hover:text-white rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A900]"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="py-6 flex flex-col gap-4 text-base font-medium text-slate-200">
                  <a href="#services" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#F2A900] transition-colors">
                    Services
                  </a>
                  <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#F2A900] transition-colors">
                    ROI Calculator
                  </a>
                  <a href="#why-us" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#F2A900] transition-colors">
                    Why Choose Us
                  </a>
                  <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#F2A900] transition-colors">
                    How It Works
                  </a>
                  <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#F2A900] transition-colors">
                    Projects Gallery
                  </a>
                  <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#F2A900] transition-colors">
                    Client Reviews
                  </a>
                  <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#F2A900] transition-colors">
                    About Company
                  </a>
                  <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#F2A900] transition-colors">
                    FAQ
                  </a>
                  <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#F2A900] transition-colors">
                    Contact &amp; Location
                  </a>
                </div>
              </div>

              <div className="pt-6 border-t border-[#13315C] flex flex-col gap-3">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-3 text-xs font-semibold tracking-wide uppercase text-[#0B2545] bg-[#F2A900] hover:bg-[#D99600] rounded-lg transition-all"
                >
                  Get a Free Quote
                </a>

                <a
                  href={`https://wa.me/${COMPANY_CONFIG.whatsappInternational}?text=${encodeURIComponent("Hello Helios Power Africa, I would like to inquire about solar systems.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-600/40 hover:bg-emerald-950/60 rounded-lg transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>WhatsApp: {COMPANY_CONFIG.whatsappDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">

        {/* ====================================================================
            2. HERO SECTION
            Asymmetric Magazine Layout with Verified Asset, High Contrast Text,
            Real African Context, and Quick Irradiance Monitor
            ==================================================================== */}
        <section id="hero" className="relative bg-[#0B2545] text-white overflow-hidden py-16 sm:py-20 lg:py-28">
          
          {/* Background Photo with Dark Navy Architectural Scrim */}
          <div className="absolute inset-0 z-0">
            <SafeImage
              src={COMPANY_CONFIG.images.hero}
              alt="Engineered rooftop solar installation on modern African residence"
              className="w-full h-full object-cover object-center"
              loading="eager"
              width="1920"
              height="1080"
              fallbackLabel="Helios Power Rooftop Installation"
            />
            {/* Carefully measured multi-stop navy gradient ensures WCAG AA text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B2545] via-[#0B2545]/92 to-[#0B2545]/75" />
            <div className="absolute inset-0 bg-[#0B2545]/40" />
          </div>

          <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Headline, Narrative, and Actions */}
              <div className="lg:col-span-7">
                
                {/* Regional Breadcrumb */}
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#F2A900] tracking-wider uppercase mb-4 bg-[#13315C]/80 px-3 py-1 rounded-md border border-slate-700/60">
                  <SunLogoMark className="w-3.5 h-3.5 text-[#F2A900]" />
                  <span>Serving {COMPANY_CONFIG.primaryMarket}</span>
                </div>

                {/* Specific, punchy headline */}
                <h1 className="text-hero-headline font-extrabold text-white tracking-tight mb-6 text-balance">
                  Stop paying for blackouts. Power your property with solar.
                </h1>

                {/* Supporting paragraph addressing diesel generators and volatility */}
                <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-8 max-w-xl">
                  Grid collapse, noisy generators, and surging diesel tariffs are draining African businesses and households. Helios Power installs engineered, Tier-1 solar microgrids with lithium storage that run silently 24/7.
                </p>

                {/* Two Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold tracking-wide uppercase text-[#0B2545] bg-[#F2A900] hover:bg-[#D99600] active:scale-[0.98] rounded-lg transition-all shadow-md whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#F2A900]"
                  >
                    <span>Get a Free Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href={`https://wa.me/${COMPANY_CONFIG.whatsappInternational}?text=${encodeURIComponent("Hello Helios Power Africa, I need a consultation for solar installation.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-slate-900/70 hover:bg-slate-900/90 border border-slate-600/80 active:scale-[0.98] rounded-lg transition-all backdrop-blur-xs whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp: {COMPANY_CONFIG.whatsappDisplay}</span>
                  </a>
                </div>

                {/* Trust Row Beneath Hero with 3 Key Facts */}
                <div className="pt-6 border-t border-slate-700/80 grid grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#F2A900] tabular-nums">10+</div>
                    <div className="text-xs sm:text-sm font-medium text-slate-300 mt-1">Years Operating</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#F2A900] tabular-nums">500+</div>
                    <div className="text-xs sm:text-sm font-medium text-slate-300 mt-1">Verified Sites</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#F2A900] tabular-nums">5-Year</div>
                    <div className="text-xs sm:text-sm font-medium text-slate-300 mt-1">Full Warranty</div>
                  </div>
                </div>

              </div>

              {/* Right Column: Interactive Solar Irradiance & Live Telemetry Card */}
              <div className="lg:col-span-5">
                <div className="bg-[#13315C]/90 border border-slate-700 rounded-xl p-6 shadow-2xl backdrop-blur-md">
                  
                  <div className="flex items-center justify-between pb-4 border-b border-slate-700/80 mb-5">
                    <div className="flex items-center gap-2">
                      <Sun className="w-5 h-5 text-[#F2A900]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-white">Daily African Solar Potential</span>
                    </div>
                    <span className="text-[11px] font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-700/40 px-2 py-0.5 rounded">
                      Ideal for Solar
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Sub-Saharan Africa receives over 2,500 hours of direct sunlight annually. A typical 10kW system produces 45–55 kWh daily, covering high-load appliances with zero fuel burn.
                  </p>

                  <div className="space-y-3 mb-5">
                    {COMPANY_CONFIG.solarYieldTracker.map((station, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 bg-[#0B2545] rounded-lg border border-slate-800 text-xs">
                        <div className="flex items-center gap-2 font-semibold text-white">
                          <MapPin className="w-3.5 h-3.5 text-[#F2A900]" />
                          <span>{station.city}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-300">
                          <span>{station.radiation}</span>
                          <span className="text-emerald-400 font-bold">{station.sunshine}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#calculator"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#F2A900] hover:bg-[#D99600] text-[#0B2545] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
                  >
                    <span>Launch Diesel vs Solar Calculator</span>
                    <ArrowDownRightIcon className="w-4 h-4" />
                  </a>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ====================================================================
            3. TRUST BAR
            Slim credibility strip with 4 short points
            ==================================================================== */}
        <section className="bg-white border-y border-[#E3E0D8] py-6 sm:py-7">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {COMPANY_CONFIG.trustBar.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="p-2 bg-[#F7F5F0] text-[#0B2545] rounded-md shrink-0 border border-[#E3E0D8]">
                    <ShieldCheck className="w-5 h-5 text-[#2E7D5B]" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#1A1F2B] leading-snug">{item.title}</h3>
                    <p className="text-xs text-[#5B6475] mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            NEW SENIOR FEATURE: LIVE SOLAR VS DIESEL GENERATOR ROI CALCULATOR
            ==================================================================== */}
        <section id="calculator" className="py-20 sm:py-24 bg-[#F7F5F0] border-b border-[#E3E0D8]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold text-[#0B2545] uppercase tracking-wider">Interactive Energy Engineering</span>
              <h2 className="text-section-title font-extrabold text-[#1A1F2B] mt-2 mb-4 text-balance">
                Calculate your monthly diesel fuel savings
              </h2>
              <p className="text-sm sm:text-base text-[#5B6475] leading-relaxed">
                See how quickly an engineered solar microgrid pays for itself compared to burning diesel or petrol in a generator.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Inputs Panel */}
              <div className="lg:col-span-6 bg-white border border-[#E3E0D8] rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
                <div>
                  <h3 className="text-base font-bold text-[#1A1F2B] mb-5 flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-[#0B2545]" />
                    <span>Your Current Generator Usage</span>
                  </h3>

                  {/* Property Type Toggle */}
                  <div className="mb-6">
                    <label className="block text-xs font-bold uppercase text-[#1A1F2B] mb-2">
                      Property Category
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setCalcPropertyType('residential')}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                          calcPropertyType === 'residential'
                            ? 'bg-[#0B2545] text-white border-[#0B2545] shadow-xs'
                            : 'bg-[#F7F5F0] text-[#1A1F2B] border-[#E3E0D8] hover:bg-slate-100'
                        }`}
                      >
                        Home Villa
                      </button>
                      <button
                        type="button"
                        onClick={() => setCalcPropertyType('commercial')}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                          calcPropertyType === 'commercial'
                            ? 'bg-[#0B2545] text-white border-[#0B2545] shadow-xs'
                            : 'bg-[#F7F5F0] text-[#1A1F2B] border-[#E3E0D8] hover:bg-slate-100'
                        }`}
                      >
                        Commercial
                      </button>
                      <button
                        type="button"
                        onClick={() => setCalcPropertyType('farm')}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                          calcPropertyType === 'farm'
                            ? 'bg-[#0B2545] text-white border-[#0B2545] shadow-xs'
                            : 'bg-[#F7F5F0] text-[#1A1F2B] border-[#E3E0D8] hover:bg-slate-100'
                        }`}
                      >
                        Farm Pump
                      </button>
                    </div>
                  </div>

                  {/* Generator Run Hours Slider */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-xs font-bold uppercase text-[#1A1F2B] mb-2">
                      <span>Daily Generator Run Hours</span>
                      <span className="text-[#0B2545] font-extrabold text-sm">{calcGenHours} hrs / day</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="18"
                      step="1"
                      value={calcGenHours}
                      onChange={(e) => setCalcGenHours(Number(e.target.value))}
                      className="w-full accent-[#0B2545] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-[#5B6475] mt-1">
                      <span>2 hrs (Evening only)</span>
                      <span>8 hrs (Standard cuts)</span>
                      <span>18 hrs (Severe outage)</span>
                    </div>
                  </div>

                  {/* Monthly Fuel Spend Slider */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-xs font-bold uppercase text-[#1A1F2B] mb-2">
                      <span>Approx Monthly Generator Fuel Bill</span>
                      <span className="text-[#0B2545] font-extrabold text-sm">${calcMonthlyFuelSpend} / month</span>
                    </div>
                    <input
                      type="range"
                      min="150"
                      max="3000"
                      step="50"
                      value={calcMonthlyFuelSpend}
                      onChange={(e) => setCalcMonthlyFuelSpend(Number(e.target.value))}
                      className="w-full accent-[#0B2545] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-[#5B6475] mt-1">
                      <span>$150 (Small petrol gen)</span>
                      <span>$800 (Duplex diesel)</span>
                      <span>$3,000+ (Factory/Office)</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-[#5B6475] p-3 bg-[#F7F5F0] rounded-lg border border-[#E3E0D8]">
                  <span className="font-semibold text-[#1A1F2B]">Local Reality:</span> Diesel prices continue to climb across Lagos, Nairobi, and Accra. Fuel burnt in a generator is 100% loss with zero retained capital value.
                </div>
              </div>

              {/* Live Output Card */}
              <div className="lg:col-span-6 bg-[#0B2545] text-white border border-[#13315C] rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-700/80 mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#F2A900]">Estimated Engineering Assessment</span>
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-700/40 px-2 py-0.5 rounded">
                      Tier-1 Components
                    </span>
                  </div>

                  {/* Big Number */}
                  <div className="mb-6">
                    <div className="text-xs text-slate-300 uppercase tracking-wider mb-1">Estimated Annual Fuel Money Saved:</div>
                    <div className="text-4xl sm:text-5xl font-black text-[#F2A900] tracking-tight tabular-nums">
                      ${calculatedStats.annualSaved.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-300 mt-1">
                      Versus burning ~${calculatedStats.annualFuelBurn.toLocaleString()}/yr in generator diesel and servicing.
                    </div>
                  </div>

                  {/* Specs Breakdown */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-[#13315C] rounded-lg border border-slate-700/80 mb-6 text-xs">
                    <div>
                      <div className="text-slate-400 mb-0.5">Recommended Sizing:</div>
                      <div className="font-bold text-white text-sm">{calculatedStats.recommendedSystem}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 mb-0.5">Estimated Payback:</div>
                      <div className="font-bold text-emerald-400 text-sm">{calculatedStats.paybackPeriod}</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    Once paid off in ~{calculatedStats.paybackPeriod}, your building generates clean, silent electricity with zero monthly fuel expense for the next 20+ years.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-700/80 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleTransferCalculatorToContact}
                    className="flex-1 py-3 px-4 bg-[#F2A900] hover:bg-[#D99600] text-[#0B2545] font-bold text-xs uppercase tracking-wider rounded-lg transition-all text-center"
                  >
                    Lock in this Estimate &rarr;
                  </button>
                  <a
                    href={`https://wa.me/${COMPANY_CONFIG.whatsappInternational}?text=${encodeURIComponent(`Hello Helios Power Africa, I ran your online calculator: My property spends ~$${calcMonthlyFuelSpend}/mo running generator for ${calcGenHours} hrs/day. Recommended: ${calculatedStats.recommendedSystem}. Please provide a quote.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 bg-[#13315C] hover:bg-slate-800 border border-slate-600 text-white font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp Estimate</span>
                  </a>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* ====================================================================
            4. SERVICES SECTION
            3 Cards with line icons, 3 bullet benefits, and "Request a quote" link
            ==================================================================== */}
        <section id="services" className="py-20 sm:py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="max-w-2xl mb-14">
              <span className="text-xs font-bold text-[#0B2545] uppercase tracking-wider">Engineered Solar Solutions</span>
              <h2 className="text-section-title font-extrabold text-[#1A1F2B] mt-2 mb-4 text-balance">
                Tailored solar power systems for every property scale
              </h2>
              <p className="text-sm sm:text-base text-[#5B6475] leading-relaxed">
                Whether you need uninterrupted comfort at home, lower overheads for your factory, or zero-diesel water pumping for your crops, our systems deliver predictable daily power.
              </p>
            </div>

            {/* 3 Services Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {COMPANY_CONFIG.services.map((service) => {
                const isHome = service.id === 'home-solar';
                const isCommercial = service.id === 'commercial-solar';

                return (
                  <article
                    key={service.id}
                    className="bg-[#F7F5F0] border border-[#E3E0D8] rounded-xl p-7 flex flex-col justify-between card-hover"
                  >
                    <div>
                      {/* Icon Container with Custom Badge */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-lg bg-white border border-[#E3E0D8] text-[#0B2545] flex items-center justify-center shadow-xs">
                          {isHome && <Home className="w-6 h-6 text-[#0B2545]" />}
                          {isCommercial && <Building2 className="w-6 h-6 text-[#0B2545]" />}
                          {!isHome && !isCommercial && <Sprout className="w-6 h-6 text-[#0B2545]" />}
                        </div>
                        <span className="text-[11px] font-bold text-[#0B2545] bg-white border border-[#E3E0D8] px-2.5 py-1 rounded">
                          {service.systemScale}
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="text-xl font-bold text-[#1A1F2B] mb-2">{service.title}</h3>
                      <p className="text-sm text-[#5B6475] leading-relaxed mb-6">{service.tagline}</p>

                      {/* 3 Bullet Benefits */}
                      <div className="space-y-3 pt-6 border-t border-[#E3E0D8] mb-6">
                        {service.benefits.map((b, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1A1F2B]">
                            <CheckCircle2 className="w-4 h-4 text-[#2E7D5B] shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>

                      {/* Ideal For Note */}
                      <div className="text-xs text-[#5B6475] mb-6">
                        <span className="font-semibold text-[#1A1F2B]">Target Facility:</span> {service.idealFor}
                      </div>
                    </div>

                    {/* Request Quote Link */}
                    <button
                      type="button"
                      onClick={() => handleRequestServiceQuote(service.title)}
                      className="inline-flex items-center justify-between w-full pt-4 border-t border-[#E3E0D8] text-xs font-bold uppercase tracking-wider text-[#0B2545] hover:text-[#F2A900] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F2A900]"
                    >
                      <span>Request a custom quote</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </article>
                );
              })}
            </div>

          </div>
        </section>

        {/* ====================================================================
            SENIOR FEATURE: BEFORE VS AFTER SOLAR COMPARISON SECTION
            ==================================================================== */}
        <section id="comparison" className="py-20 sm:py-24 bg-[#0B2545] text-white border-t border-[#13315C]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold text-[#F2A900] uppercase tracking-wider">The Transformation</span>
              <h2 className="text-section-title font-extrabold text-white mt-2 mb-4 text-balance">
                Life with a generator vs life with Helios Solar
              </h2>
              <p className="text-sm sm:text-base text-slate-300">
                Compare the reality of erratic African grids and diesel generators against an engineered microgrid.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Card 1: The Old Way (Generator + Outages) */}
              <div className="bg-[#081B33] border border-rose-900/40 rounded-xl p-7 relative">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                    <Fuel className="w-5 h-5 text-rose-500" />
                    <span>Before Helios (Grid Outages &amp; Generator)</span>
                  </div>
                  <span className="text-[11px] text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded font-mono">
                    High Expense
                  </span>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-start gap-3">
                    <Volume2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span><strong>Deafening Noise (85+ dB):</strong> Unbearable hum disturbing family sleep, work zoom calls, and neighbors.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Fuel className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span><strong>Endless Fuel Expenses:</strong> Burning $300–$2,500 every single month in diesel/petrol with zero asset retention.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span><strong>Damaging Power Spikes:</strong> Sudden blackout drops and unstable surges that burn air conditioning compressors and laptops.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Wrench className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span><strong>Continuous Breakdown Anxiety:</strong> Weekly oil changes, filter clogs, dirty diesel sludge, and midnight pull-starts.</span>
                  </div>
                </div>
              </div>

              {/* Card 2: The Helios Way (Silent Solar Microgrid) */}
              <div className="bg-[#13315C] border border-emerald-600/40 rounded-xl p-7 relative shadow-lg">
                <div className="flex items-center justify-between pb-4 border-b border-slate-700/80 mb-6">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <BatteryCharging className="w-5 h-5 text-emerald-400" />
                    <span>With Helios Power (Engineered Solar Microgrid)</span>
                  </div>
                  <span className="text-[11px] text-emerald-300 bg-emerald-950/70 px-2 py-0.5 rounded font-mono">
                    Zero Fuel
                  </span>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-200">
                  <div className="flex items-start gap-3">
                    <VolumeX className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Complete Silence (0 dB):</strong> Solid-state hybrid power quietly humming with zero vibrations or smell.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sun className="w-4 h-4 text-[#F2A900] shrink-0 mt-0.5" />
                    <span><strong>Free Abundant Sunlight:</strong> Zero monthly fuel bills. Pay for the system once, enjoy free energy for 25 years.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Sub-10ms Auto Transfer:</strong> Pure sine-wave inverter switches so fast that computers and medical gear never reset.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Automotive-Grade LiFePO4:</strong> 6,000+ deep cycles, 12–15 year battery lifespan, and real-time cloud app telemetry.</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ====================================================================
            5. WHY CHOOSE US
            Two-column layout: High quality image on left, 4 concrete reasons on right
            ==================================================================== */}
        <section id="why-us" className="py-20 sm:py-24 bg-[#F7F5F0]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Image with Subtle Frame */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-xl overflow-hidden border border-[#E3E0D8] shadow-md bg-white">
                  <SafeImage
                    src={COMPANY_CONFIG.images.inspection}
                    alt="Helios Power certified electrical engineer inspecting lithium inverter system"
                    className="w-full h-[460px] object-cover object-center"
                    loading="lazy"
                    width="600"
                    height="700"
                    fallbackLabel="Engineering Inspection"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-[#0B2545]/90 backdrop-blur-xs text-white p-4 rounded-lg border border-[#13315C] text-xs">
                    <div className="font-bold text-sm text-white mb-0.5">Strict IEC Standards</div>
                    <p className="text-slate-300">Every panel string and battery rack undergoes rigorous high-voltage insulation tests.</p>
                  </div>
                </div>
              </div>

              {/* Right Column: 4 Concrete Reasons */}
              <div className="lg:col-span-7">
                <span className="text-xs font-bold text-[#0B2545] uppercase tracking-wider">Engineered for Longevity</span>
                <h2 className="text-section-title font-extrabold text-[#1A1F2B] mt-2 mb-4 text-balance">
                  Why Helios Power is the trusted partner across Africa
                </h2>
                <p className="text-sm sm:text-base text-[#5B6475] leading-relaxed mb-8">
                  Sub-Saharan Africa demands solar installations that handle heavy harmattan dust, extreme tropical ambient heat, and sudden grid surges. We build systems that run reliably year after year.
                </p>

                <div className="space-y-6">
                  {COMPANY_CONFIG.whyChooseUs.map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <span className="text-base font-extrabold text-[#F2A900] tabular-nums shrink-0 pt-0.5">
                        {reason.number}.
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-[#1A1F2B] mb-1">{reason.title}</h3>
                        <p className="text-sm text-[#5B6475] leading-relaxed">{reason.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-6 border-t border-[#E3E0D8] flex flex-wrap items-center gap-6">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#0B2545] hover:bg-[#13315C] rounded-lg transition-colors"
                  >
                    <span>Schedule Free Site Survey</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://wa.me/${COMPANY_CONFIG.whatsappInternational}?text=${encodeURIComponent("Hello Helios Power Africa, I want to inquire about scheduling a site survey.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 hover:text-emerald-800 transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Quick WhatsApp Booking</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ====================================================================
            6. HOW IT WORKS
            4-step horizontal timeline (collapses to vertical on mobile)
            ==================================================================== */}
        <section id="how-it-works" className="py-20 sm:py-24 bg-white border-t border-[#E3E0D8]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold text-[#0B2545] uppercase tracking-wider">Simple 4-Step Process</span>
              <h2 className="text-section-title font-extrabold text-[#1A1F2B] mt-2 mb-4 text-balance">
                From survey to clean power in days
              </h2>
              <p className="text-sm sm:text-base text-[#5B6475]">
                We make the transition to solar clear, fast, and completely hassle-free with zero guesswork.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {COMPANY_CONFIG.howItWorks.map((step, idx) => (
                <div key={idx} className="relative flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-lg bg-[#0B2545] text-[#F2A900] font-extrabold text-sm flex items-center justify-center shrink-0">
                      {step.step}
                    </span>
                    <div className="h-[2px] bg-[#E3E0D8] flex-1 md:hidden" />
                  </div>

                  <h3 className="text-base font-bold text-[#1A1F2B] mb-2">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-[#5B6475] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-14 p-6 bg-[#F7F5F0] border border-[#E3E0D8] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <h4 className="text-sm font-bold text-[#1A1F2B]">Need an immediate load calculation for your building?</h4>
                <p className="text-xs text-[#5B6475] mt-0.5">Send us your monthly electricity bill or generator fuel receipts for an instant estimate.</p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0B2545] bg-[#F2A900] hover:bg-[#D99600] rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                Request Free Audit
              </a>
            </div>

          </div>
        </section>

        {/* ====================================================================
            7. SAVINGS HIGHLIGHT
            Dark navy section with 3 large animated counters and typical savings context
            ==================================================================== */}
        <section id="savings" className="py-20 sm:py-24 bg-[#0B2545] text-white">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-2xl mx-auto text-center mb-16">
              <span className="text-xs font-bold text-[#F2A900] uppercase tracking-wider">Quantifiable Energy Economics</span>
              <h2 className="text-section-title font-extrabold text-white mt-2 mb-4 text-balance">
                Real savings in real local currency
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Running a generator costs 4x to 6x more per kilowatt-hour than solar capital amortization. Here is what switching translates to for African homes and businesses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {COMPANY_CONFIG.savingsMetrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="bg-[#13315C] border border-slate-700/80 rounded-xl p-8 text-center flex flex-col justify-between"
                >
                  <div>
                    <div className="text-4xl sm:text-5xl font-extrabold text-[#F2A900] tracking-tight mb-2 tabular-nums">
                      {metric.value}
                    </div>
                    <div className="text-base font-bold text-white mb-2">{metric.label}</div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pt-4 border-t border-slate-700/60">
                    {metric.context}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center max-w-3xl mx-auto text-xs sm:text-sm text-slate-300 bg-[#081B33] p-5 rounded-lg border border-slate-800">
              <span className="font-semibold text-white">Field Calculation Note:</span> Typical commercial facilities in Lagos, Nairobi, and Accra reduce their reliance on diesel generators from 10 hours daily to under 45 minutes, insulating their balance sheet from fuel inflation and grid banding surcharges.
            </div>

          </div>
        </section>

        {/* ====================================================================
            8. PROJECTS GALLERY WITH INTERACTIVE CATEGORY TABS & LIGHTBOX
            ==================================================================== */}
        <section id="projects" className="py-20 sm:py-24 bg-[#F7F5F0] border-t border-[#E3E0D8]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold text-[#0B2545] uppercase tracking-wider">Proof of Performance</span>
                <h2 className="text-section-title font-extrabold text-[#1A1F2B] mt-2 text-balance">
                  Featured installations across Africa
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#5B6475] max-w-md">
                Inspect genuine installations with verified capacity, battery sizing, and documented diesel savings.
              </p>
            </div>

            {/* Interactive Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[#E3E0D8]">
              {['All', 'Residential', 'Commercial', 'Agricultural'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveProjectFilter(cat)}
                  className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                    activeProjectFilter === cat
                      ? 'bg-[#0B2545] text-white border-[#0B2545] shadow-xs'
                      : 'bg-white text-[#5B6475] border-[#E3E0D8] hover:bg-slate-50'
                  }`}
                >
                  {cat === 'All' ? 'All Projects' : `${cat} Systems`}
                </button>
              ))}
            </div>

            {/* 6 Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => setActiveProject(proj)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveProject(proj);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View technical details for ${proj.title}`}
                  className="group bg-white border border-[#E3E0D8] rounded-xl overflow-hidden card-hover text-left flex flex-col cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A900]"
                >
                  <div className="relative h-52 bg-slate-900 overflow-hidden">
                    <SafeImage
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      width="500"
                      height="350"
                      fallbackLabel={proj.title}
                    />
                    <div className="absolute top-3 left-3 bg-[#0B2545]/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded backdrop-blur-xs">
                      {proj.category}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-[#5B6475] mb-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0" />
                        <span>{proj.location}</span>
                      </div>
                      <h3 className="text-base font-bold text-[#1A1F2B] group-hover:text-[#0B2545] transition-colors mb-2">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-[#5B6475] line-clamp-2 leading-relaxed mb-4">
                        {proj.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E3E0D8] flex items-center justify-between text-xs">
                      <span className="font-bold text-[#0B2545]">{proj.capacity}</span>
                      <span className="text-[#0B2545] font-semibold flex items-center gap-1 group-hover:text-[#F2A900] transition-colors">
                        Inspect Specs <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Project Lightbox Modal */}
        {activeProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-project-title"
          >
            <div
              className="fixed inset-0 bg-black/75 backdrop-blur-xs"
              onClick={() => setActiveProject(null)}
            />

            <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-[#E3E0D8] z-10 max-h-[90vh] flex flex-col">
              <div className="relative h-64 sm:h-72 bg-slate-900">
                <SafeImage
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                  fallbackLabel={activeProject.title}
                />
                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-3 left-4 bg-[#0B2545]/90 text-white text-xs font-semibold px-3 py-1 rounded backdrop-blur-xs">
                  {activeProject.location}
                </div>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto">
                <div className="flex items-center gap-2 text-xs font-medium text-[#5B6475] mb-2">
                  <span>{activeProject.category} Microgrid</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-bold text-[#0B2545]">{activeProject.capacity}</span>
                </div>

                <h3 id="lightbox-project-title" className="text-xl sm:text-2xl font-extrabold text-[#1A1F2B] mb-3">
                  {activeProject.title}
                </h3>

                <p className="text-sm text-[#5B6475] leading-relaxed mb-6">
                  {activeProject.summary}
                </p>

                <div className="bg-[#F7F5F0] border border-[#E3E0D8] rounded-lg p-5 mb-6">
                  <div className="text-xs font-bold text-[#0B2545] uppercase tracking-wider mb-3">
                    System Architecture &amp; Yield
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                    <div>
                      <div className="text-[#5B6475]">Solar Panels:</div>
                      <div className="font-bold text-[#1A1F2B] mt-0.5">{activeProject.stats.panels}</div>
                    </div>
                    <div>
                      <div className="text-[#5B6475]">Storage:</div>
                      <div className="font-bold text-[#1A1F2B] mt-0.5">{activeProject.stats.battery}</div>
                    </div>
                    <div>
                      <div className="text-[#5B6475]">Impact:</div>
                      <div className="font-bold text-[#2E7D5B] mt-0.5">{activeProject.stats.savings}</div>
                    </div>
                    <div>
                      <div className="text-[#5B6475]">Payback:</div>
                      <div className="font-bold text-[#0B2545] mt-0.5">{activeProject.stats.payback}</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E3E0D8]">
                  <span className="text-xs text-[#5B6475]">
                    Need a similar configuration for your property?
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const serviceType = activeProject.category === 'Residential' ? 'Home Solar Systems' : activeProject.category === 'Agricultural' ? 'Solar for Farms and Water Pumping' : 'Commercial and Business Solar';
                      setActiveProject(null);
                      handleRequestServiceQuote(serviceType);
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0B2545] bg-[#F2A900] hover:bg-[#D99600] rounded-lg transition-colors whitespace-nowrap"
                  >
                    Request Similar Build
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ====================================================================
            9. TESTIMONIALS
            3 realistic testimonials with name, role, city. No fake star spam.
            ==================================================================== */}
        <section id="testimonials" className="py-20 sm:py-24 bg-white border-t border-[#E3E0D8]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-2xl mb-14">
              <span className="text-xs font-bold text-[#0B2545] uppercase tracking-wider">Client Outcomes</span>
              <h2 className="text-section-title font-extrabold text-[#1A1F2B] mt-2 mb-4 text-balance">
                Documented results from real African operations
              </h2>
              <p className="text-sm sm:text-base text-[#5B6475]">
                We measure our success by uninterrupted hours of operation and fuel expenses eliminated.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {COMPANY_CONFIG.testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="bg-[#F7F5F0] border border-[#E3E0D8] rounded-xl p-7 flex flex-col justify-between"
                >
                  <p className="text-sm text-[#1A1F2B] leading-relaxed italic mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="pt-4 border-t border-[#E3E0D8]">
                    <div className="font-bold text-sm text-[#1A1F2B]">{t.name}</div>
                    <div className="text-xs text-[#5B6475]">{t.role}</div>
                    <div className="text-xs text-[#2E7D5B] font-medium mt-1">{t.city}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ====================================================================
            10. ABOUT SECTION
            Company story, mission, and team row (3 people with unique portraits)
            ==================================================================== */}
        <section id="about" className="py-20 sm:py-24 bg-[#F7F5F0] border-t border-[#E3E0D8]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-center">
              <div className="lg:col-span-7">
                <span className="text-xs font-bold text-[#0B2545] uppercase tracking-wider">Our Heritage &amp; Mission</span>
                <h2 className="text-section-title font-extrabold text-[#1A1F2B] mt-2 mb-4 text-balance">
                  Engineering African energy independence
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-[#5B6475] leading-relaxed">
                  <p>
                    Helios Power Africa was founded with a singular conviction: access to reliable electrical power is the foundation of African enterprise, education, and healthcare. For decades, businesses and families have shouldered the crushing burden of unreliable grids and expensive diesel generators.
                  </p>
                  <p>
                    We reject the temporary fixes of undersized inverters and low-grade lead-acid batteries. By combining European engineering rigor with deep local understanding of dust, humidity, and electrical surges, we design turnkey microgrids built to generate clean, dependable electricity for 25+ years.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white border border-[#E3E0D8] rounded-xl p-7 shadow-xs">
                <div className="text-xs font-bold text-[#0B2545] uppercase tracking-wider mb-4">Core Operating Principles</div>
                <div className="space-y-4 text-xs sm:text-sm text-[#1A1F2B]">
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#2E7D5B] shrink-0 mt-0.5" />
                    <span><strong>No Counterfeit Hardware:</strong> Direct OEM supply chains with verifiable serial numbers.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#2E7D5B] shrink-0 mt-0.5" />
                    <span><strong>True Capacity Sizing:</strong> We never undersize battery banks to quote deceptive cheap prices.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#2E7D5B] shrink-0 mt-0.5" />
                    <span><strong>Permanent Local Teams:</strong> 24/7 technical dispatch stationed in your market.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Row with unique generated portraits */}
            <div>
              <div className="mb-8">
                <h3 className="text-lg font-bold text-[#1A1F2B]">Engineering Leadership</h3>
                <p className="text-xs sm:text-sm text-[#5B6475]">Licensed engineers directing operations across our hubs.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {COMPANY_CONFIG.team.map((member, idx) => (
                  <div key={idx} className="bg-white border border-[#E3E0D8] rounded-xl p-5 flex flex-col items-start shadow-xs">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-100 mb-4 border-2 border-[#E3E0D8] shrink-0">
                      <SafeImage
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        width="80"
                        height="80"
                        fallbackLabel={member.name}
                      />
                    </div>
                    <h4 className="text-base font-bold text-[#1A1F2B]">{member.name}</h4>
                    <div className="text-xs font-medium text-[#0B2545] mt-0.5 mb-2">{member.role}</div>
                    <p className="text-xs text-[#5B6475] leading-relaxed">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ====================================================================
            11. FAQ SECTION
            Accordion with 6 real questions
            ==================================================================== */}
        <section id="faq" className="py-20 sm:py-24 bg-white border-t border-[#E3E0D8]">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-14">
              <span className="text-xs font-bold text-[#0B2545] uppercase tracking-wider">Transparent Answers</span>
              <h2 className="text-section-title font-extrabold text-[#1A1F2B] mt-2 mb-3 text-balance">
                Frequently asked questions
              </h2>
              <p className="text-sm text-[#5B6475]">
                Everything you need to know about system engineering, costs, warranty, and African grid compatibility.
              </p>
            </div>

            <div className="space-y-4">
              {COMPANY_CONFIG.faq.map((item, idx) => {
                const isOpen = openFaqIndex === idx;

                return (
                  <div
                    key={idx}
                    className="border border-[#E3E0D8] rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 bg-white hover:bg-[#F7F5F0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A900]"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm sm:text-base font-bold text-[#1A1F2B] leading-snug">
                        {item.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#0B2545] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#F2A900]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-[#5B6475] leading-relaxed bg-white border-t border-[#E3E0D8]">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ====================================================================
            12. CONTACT & QUOTE SECTION
            Two-column layout: Left details & map placeholder, Right validated form
            ==================================================================== */}
        <section id="contact" className="py-20 sm:py-24 bg-[#F7F5F0] border-t border-[#E3E0D8]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Direct contact info & Hours & Map */}
              <div className="lg:col-span-5">
                <span className="text-xs font-bold text-[#0B2545] uppercase tracking-wider">Direct Consultation</span>
                <h2 className="text-section-title font-extrabold text-[#1A1F2B] mt-2 mb-4 text-balance">
                  Get in touch with our solar engineering team
                </h2>
                <p className="text-sm text-[#5B6475] leading-relaxed mb-8">
                  Submit your property load details or chat with us on WhatsApp. Our engineers will review your power profile and deliver an itemized technical proposal within 24 hours.
                </p>

                <div className="space-y-5 mb-8 text-xs sm:text-sm">
                  {/* WhatsApp Line */}
                  <div className="flex items-start gap-3.5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <WhatsAppIcon className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-emerald-950">Official WhatsApp Direct Desk:</div>
                      <a
                        href={`https://wa.me/${COMPANY_CONFIG.whatsappInternational}?text=${encodeURIComponent("Hello Helios Power Africa, I am inquiring about a solar installation.")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 hover:text-emerald-900 font-bold text-sm block mt-0.5"
                      >
                        {COMPANY_CONFIG.whatsappDisplay} ({COMPANY_CONFIG.whatsappRaw})
                      </a>
                      <span className="text-[11px] text-emerald-800">Available Mon-Sat for instant chat &amp; bill review</span>
                    </div>
                  </div>

                  {/* Regional Call Lines */}
                  <div className="flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-[#F2A900] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[#1A1F2B]">Regional Office Lines:</div>
                      <div className="text-[#5B6475] space-y-0.5 mt-0.5">
                        <div>Nigeria: <a href="tel:+2348023456789" className="hover:text-[#0B2545]">+234 802 345 6789</a></div>
                        <div>Kenya: <a href="tel:+254712345678" className="hover:text-[#0B2545]">+254 712 345 678</a></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Mail className="w-5 h-5 text-[#F2A900] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[#1A1F2B]">Official Inquiries:</div>
                      <a href={`mailto:${COMPANY_CONFIG.email}`} className="text-[#5B6475] hover:text-[#0B2545]">
                        {COMPANY_CONFIG.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Clock className="w-5 h-5 text-[#F2A900] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[#1A1F2B]">Operating Hours:</div>
                      <div className="text-[#5B6475]">{COMPANY_CONFIG.workingHours}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-[#F2A900] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[#1A1F2B]">Regional Hubs:</div>
                      <div className="text-[#5B6475]">{COMPANY_CONFIG.address}</div>
                    </div>
                  </div>
                </div>

                {/* Embedded Responsive Map Placeholder / Visual Frame */}
                <div className="rounded-xl overflow-hidden border border-[#E3E0D8] bg-white shadow-xs">
                  <div className="p-3 bg-[#0B2545] text-white text-xs font-semibold flex items-center justify-between">
                    <span>West &amp; East Africa Operations Hubs</span>
                    <span className="text-[#F2A900]">Lagos · Nairobi · Accra</span>
                  </div>
                  <iframe
                    title="Helios Power Regional Service Area"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126844.0634861611!2d3.3514863339843734!3d6.447414999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf4cc9a21b4a5%3A0x6b77c5938bf8c8a1!2sVictoria%20Island%2C%20Lagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                    width="100%"
                    height="190"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    aria-label="Google Maps preview of Helios Power Regional Office in Victoria Island"
                  />
                </div>
              </div>

              {/* Right Column: The Quote Form with Validation & WhatsApp Generator */}
              <div className="lg:col-span-7 bg-white border border-[#E3E0D8] rounded-xl p-7 sm:p-9 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[#1A1F2B]">Request Your Free Solar Assessment</h3>
                  <p className="text-xs sm:text-sm text-[#5B6475] mt-1">
                    Submit your details below to generate a pre-filled WhatsApp engineering chat to <strong className="text-[#0B2545]">{COMPANY_CONFIG.whatsappDisplay}</strong>.
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="p-6 bg-[#0B2545] text-white rounded-lg border border-[#13315C] space-y-4" role="status" aria-live="polite">
                    <div className="flex items-center gap-2.5 text-[#F2A900]">
                      <CheckCircle2 className="w-6 h-6" />
                      <span className="font-bold text-base">Inquiry Prepared for {lastSubmittedName}!</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      Your project specifications have been validated. If WhatsApp did not launch automatically, click the direct button below to send your details to our engineering desk:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <a
                        href={`https://wa.me/${COMPANY_CONFIG.whatsappInternational}?text=${encodeURIComponent(`Hello Helios Power Africa, My name is ${formData.name}. I am requesting a quote for: ${formData.serviceType}. City: ${formData.city}. Generator Hours: ${formData.generatorHours}. Notes: ${formData.message}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
                      >
                        <WhatsAppIcon className="w-4 h-4" />
                        <span>Open WhatsApp ({COMPANY_CONFIG.whatsappDisplay})</span>
                      </a>
                      <a
                        href={`mailto:${COMPANY_CONFIG.email}?subject=${encodeURIComponent(`Solar Inquiry: ${formData.serviceType} - ${formData.name}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nPhone: ${formData.phone}\nCity: ${formData.city}\nService: ${formData.serviceType}\nGenerator Runtime: ${formData.generatorHours}\n\nProject details:\n${formData.message}`)}`}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Email Copy</span>
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="text-xs text-slate-400 hover:text-white underline pt-2 block"
                    >
                      &larr; Submit another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-[#1A1F2B] mb-1.5">
                        Your Full Name <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Babatunde Adeleke"
                        aria-invalid={!!formErrors.name}
                        aria-describedby={formErrors.name ? `${formStatusId}-name-err` : undefined}
                        className={`w-full px-4 py-2.5 text-sm bg-white border ${
                          formErrors.name ? 'border-rose-500 ring-1 ring-rose-500' : 'border-[#E3E0D8]'
                        } rounded-lg text-[#1A1F2B] placeholder-[#5B6475]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2545]`}
                      />
                      {formErrors.name && (
                        <p id={`${formStatusId}-name-err`} className="text-xs text-rose-600 mt-1 font-medium">{formErrors.name}</p>
                      )}
                    </div>

                    {/* Phone and City 2-Column */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-[#1A1F2B] mb-1.5">
                          Phone / WhatsApp <span className="text-rose-600">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+234, +254, or WhatsApp..."
                          aria-invalid={!!formErrors.phone}
                          aria-describedby={formErrors.phone ? `${formStatusId}-phone-err` : undefined}
                          className={`w-full px-4 py-2.5 text-sm bg-white border ${
                            formErrors.phone ? 'border-rose-500 ring-1 ring-rose-500' : 'border-[#E3E0D8]'
                          } rounded-lg text-[#1A1F2B] placeholder-[#5B6475]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2545]`}
                        />
                        {formErrors.phone && (
                          <p id={`${formStatusId}-phone-err`} className="text-xs text-rose-600 mt-1 font-medium">{formErrors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="city" className="block text-xs font-bold uppercase tracking-wider text-[#1A1F2B] mb-1.5">
                          City / State <span className="text-rose-600">*</span>
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="e.g. Lagos, Nairobi, Accra"
                          aria-invalid={!!formErrors.city}
                          aria-describedby={formErrors.city ? `${formStatusId}-city-err` : undefined}
                          className={`w-full px-4 py-2.5 text-sm bg-white border ${
                            formErrors.city ? 'border-rose-500 ring-1 ring-rose-500' : 'border-[#E3E0D8]'
                          } rounded-lg text-[#1A1F2B] placeholder-[#5B6475]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2545]`}
                        />
                        {formErrors.city && (
                          <p id={`${formStatusId}-city-err`} className="text-xs text-rose-600 mt-1 font-medium">{formErrors.city}</p>
                        )}
                      </div>
                    </div>

                    {/* Service Type and Generator Hours */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="serviceType" className="block text-xs font-bold uppercase tracking-wider text-[#1A1F2B] mb-1.5">
                          Required Service Type
                        </label>
                        <select
                          id="serviceType"
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 text-sm bg-white border border-[#E3E0D8] rounded-lg text-[#1A1F2B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2545]"
                        >
                          <option value="Home Solar Systems">Home Solar Systems (Residential backup)</option>
                          <option value="Commercial and Business Solar">Commercial and Business Solar (Factory/Office)</option>
                          <option value="Solar for Farms and Water Pumping">Solar for Farms and Water Pumping (Irrigation)</option>
                          <option value="Battery Storage Retrofit">Lithium Battery Retrofit for Existing Solar</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="generatorHours" className="block text-xs font-bold uppercase tracking-wider text-[#1A1F2B] mb-1.5">
                          Current Generator Run Time
                        </label>
                        <select
                          id="generatorHours"
                          name="generatorHours"
                          value={formData.generatorHours}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 text-sm bg-white border border-[#E3E0D8] rounded-lg text-[#1A1F2B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2545]"
                        >
                          <option value="2-4 hours/day">2 - 4 hours daily (Evening load)</option>
                          <option value="6-10 hours/day">6 - 10 hours daily (Standard cuts)</option>
                          <option value="12+ hours/day">12+ hours daily (Severe grid drop)</option>
                          <option value="No generator currently">No generator (New build)</option>
                        </select>
                      </div>
                    </div>

                    {/* Message Details */}
                    <div>
                      <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-[#1A1F2B] mb-1.5">
                        Project Description or Key Appliances to Power <span className="text-rose-600">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="e.g. 4-bedroom house with 3 air conditioners, water pump, and refrigerator..."
                        aria-invalid={!!formErrors.message}
                        aria-describedby={formErrors.message ? `${formStatusId}-message-err` : undefined}
                        className={`w-full px-4 py-2.5 text-sm bg-white border ${
                          formErrors.message ? 'border-rose-500 ring-1 ring-rose-500' : 'border-[#E3E0D8]'
                        } rounded-lg text-[#1A1F2B] placeholder-[#5B6475]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2545]`}
                      />
                      {formErrors.message && (
                        <p id={`${formStatusId}-message-err`} className="text-xs text-rose-600 mt-1 font-medium">{formErrors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0B2545] bg-[#F2A900] hover:bg-[#D99600] active:scale-[0.99] rounded-lg transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2545]"
                      >
                        <WhatsAppIcon className="w-4 h-4 text-[#0B2545]" />
                        <span>Send to WhatsApp ({COMPANY_CONFIG.whatsappDisplay})</span>
                      </button>
                      <p className="text-[11px] text-[#5B6475] text-center mt-2">
                        Pre-fills chat with our licensed solar engineering desk.
                      </p>
                    </div>
                  </form>
                )}
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* ====================================================================
          13. FOOTER
          Navy background, text wordmark with SVG sun mark, short description,
          quick links, contact summary, copyright line.
          ==================================================================== */}
      <footer className="bg-[#0B2545] text-white border-t border-[#13315C] py-14">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            
            {/* Col 1: Wordmark & Mission */}
            <div className="md:col-span-1">
              <a href="#hero" className="flex items-center gap-2 mb-4">
                <SunLogoMark className="w-7 h-7 text-[#F2A900]" />
                <span className="font-extrabold text-lg tracking-tight text-white">
                  HELIOS<span className="text-[#F2A900] font-normal ml-1">POWER</span>
                </span>
              </a>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {COMPANY_CONFIG.tagline} Engineered Tier-1 solar microgrids that eliminate blackouts and high generator fuel bills.
              </p>
              <div className="text-xs text-[#F2A900] font-medium">
                Licensed in Nigeria, Kenya, &amp; Ghana.
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-white mb-4">Navigation</div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><a href="#services" className="hover:text-[#F2A900] transition-colors">Solar Services</a></li>
                <li><a href="#calculator" className="hover:text-[#F2A900] transition-colors">Fuel Savings Calculator</a></li>
                <li><a href="#comparison" className="hover:text-[#F2A900] transition-colors">Generator vs Solar</a></li>
                <li><a href="#why-us" className="hover:text-[#F2A900] transition-colors">Why Choose Us</a></li>
                <li><a href="#projects" className="hover:text-[#F2A900] transition-colors">Completed Projects</a></li>
                <li><a href="#about" className="hover:text-[#F2A900] transition-colors">About Our Engineers</a></li>
                <li><a href="#faq" className="hover:text-[#F2A900] transition-colors">Common Questions</a></li>
              </ul>
            </div>

            {/* Col 3: Solutions */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-white mb-4">Solutions</div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><a href="#services" className="hover:text-[#F2A900] transition-colors">Residential Hybrid Systems</a></li>
                <li><a href="#services" className="hover:text-[#F2A900] transition-colors">Commercial Rooftop Solar</a></li>
                <li><a href="#services" className="hover:text-[#F2A900] transition-colors">Solar Borehole Water Pumps</a></li>
                <li><a href="#services" className="hover:text-[#F2A900] transition-colors">LiFePO4 Battery Upgrades</a></li>
                <li><a href="#services" className="hover:text-[#F2A900] transition-colors">Commercial Peak Shaving</a></li>
              </ul>
            </div>

            {/* Col 4: Contact Summary */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-white mb-4">Direct Contact</div>
              <div className="space-y-2 text-xs text-slate-300">
                <div>
                  <span className="text-emerald-400 font-semibold">WhatsApp:</span>{' '}
                  <a
                    href={`https://wa.me/${COMPANY_CONFIG.whatsappInternational}?text=${encodeURIComponent("Hello Helios Power Africa, I am inquiring about a solar installation.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#F2A900] font-bold text-white"
                  >
                    {COMPANY_CONFIG.whatsappDisplay}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400">Nigeria:</span>{' '}
                  <a href="tel:+2348023456789" className="hover:text-[#F2A900]">+234 802 345 6789</a>
                </div>
                <div>
                  <span className="text-slate-400">Kenya:</span>{' '}
                  <a href="tel:+254712345678" className="hover:text-[#F2A900]">+254 712 345 678</a>
                </div>
                <div>
                  <span className="text-slate-400">Email:</span>{' '}
                  <a href={`mailto:${COMPANY_CONFIG.email}`} className="hover:text-[#F2A900]">{COMPANY_CONFIG.email}</a>
                </div>
                <div className="pt-2 text-slate-400 leading-relaxed">
                  {COMPANY_CONFIG.workingHours}
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & SEO Notice */}
          <div className="pt-8 border-t border-[#13315C] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              &copy; {new Date().getFullYear()} {COMPANY_CONFIG.name}. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span>Clean African Energy</span>
              <span aria-hidden="true">·</span>
              <span>Zero-Carbon Infrastructure</span>
              <span aria-hidden="true">·</span>
              <a href="#hero" className="hover:text-white transition-colors">Back to top &uarr;</a>
            </div>
          </div>

        </div>
      </footer>

      {/* ====================================================================
          14. FLOATING WHATSAPP BUTTON
          Fixed at bottom-right, updated with direct link to 03110110444
          ==================================================================== */}
      <aside aria-label="Quick WhatsApp contact" className="fixed bottom-6 right-6 z-40 group">
        <a
          href={`https://wa.me/${COMPANY_CONFIG.whatsappInternational}?text=${encodeURIComponent("Hello Helios Power Africa, I would like to inquire about your solar systems.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
          aria-label={`Chat with our solar engineers on WhatsApp: ${COMPANY_CONFIG.whatsappDisplay}`}
        >
          <WhatsAppIcon className="w-6 h-6 shrink-0" />
          <span className="hidden sm:inline-block text-xs font-bold tracking-wide whitespace-nowrap">
            WhatsApp: {COMPANY_CONFIG.whatsappDisplay}
          </span>
        </a>
      </aside>

    </div>
  );
}

function ArrowDownRightIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="7" x2="17" y2="17" />
      <polyline points="17 7 17 17 7 17" />
    </svg>
  );
}

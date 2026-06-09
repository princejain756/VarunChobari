import { Project, ProcessStep, ExperienceMilestone, Award, Testimonial } from "./types";

export const projects: Project[] = [
  {
    id: "dior-sauvage",
    title: "Dior Sauvage Accent",
    subtitle: "The scent of raw luxury confidence",
    category: "Brand Campaign",
    role: "Lead Digital Art Director",
    year: "2024",
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop",
    description: "An immersive sensory-driven campaign that redefined Sauvage's digital narrative. Orchestrated an interactive layout built around dark obsidian textures and cinematic elements.",
    keyOutcome: "+142% engagement rate across primary luxury portals"
  },
  {
    id: "bmw-ix",
    title: "BMW iX Narrative",
    subtitle: "The silent transition into pure electric status",
    category: "Digital Experience",
    role: "Interactive Architect",
    year: "2024",
    imageUrl: "https://images.unsplash.com/photo-1542362567-b07eac79094d?q=80&w=800&auto=format&fit=crop",
    description: "Designed a premium web experience focusing on luxury sustainability. Engineered smooth motion layouts that respond organically to user interaction and scroll velocity.",
    keyOutcome: "4.2 minute average high-intent session length"
  },
  {
    id: "rolex",
    title: "Rolex Heritage Exhibition",
    subtitle: "Swiss accuracy, curated for digital immortality",
    category: "Luxury Digital Exhibition",
    role: "Creative Director",
    year: "2023",
    imageUrl: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=800&auto=format&fit=crop",
    description: "A minimalist digital exhibition celebrating the timeless physics of Swiss craftsmanship. Modeled a slow-revealing mechanical watch movement fully built inside a lightweight web viewport.",
    keyOutcome: "12M global impressions; 8.4% purchase intent conversion"
  }
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Diagnose",
    tagline: "Analyze current market friction and locate potential prestige.",
    description: "We locate where the competitor gets standard. We identify the silent spaces where your brand can exist with absolute uncontested high-status authority."
  },
  {
    number: "02",
    title: "Distill",
    tagline: "Subtract the noise until only the elemental truth remains.",
    description: "Decoration is weakness. We strip away any component that is designed only to take up space. We leave only the message, crafted to be highly expensive."
  },
  {
    number: "03",
    title: "Design",
    tagline: "Shape atmosphere, visual rhythm, and editorial density.",
    description: "We choose typography that speaks in quiet power and contrast that forces focused gaze. The resulting interface behaves like a luxury high-end physical asset."
  },
  {
    number: "04",
    title: "Build",
    tagline: "Uncompromised frontend engineering with seamless execution.",
    description: "Vaporware is a tragedy. We write robust, fluid code to translate breathtaking design designs into high-performance web products that run instantly."
  },
  {
    number: "05",
    title: "Elevate",
    tagline: "Launch with standard presence and brand longevity.",
    description: "We deploy. We don't just put code on a server; we curate an experience that builds long-term prestige, making your brand remembered before it is understood."
  }
];

export const experienceMilestones: ExperienceMilestone[] = [
  {
    period: "2022 — Present",
    role: "Principal Creative Director",
    company: "Zenith Prestige Directives",
    location: "New York City",
    description: "Led an impossible creative squad of designers and technologists to build digital presence for elite luxury brands. Curated international campaigns across luxury fashion, EV automotive, and precision horology."
  },
  {
    period: "2019 — 2022",
    role: "Senior Visual & UI Strategist",
    company: "Monolith Brand Group",
    location: "London — Paris",
    description: "Spearheaded the design language systems for high-status European brands. Collaborated with Vogue art editors and luxury scent houses to modernize their digital checkout and editorial storytelling."
  },
  {
    period: "2016 — 2019",
    role: "Interactive Art Director",
    company: "Elysian Digital Labs",
    location: "San Francisco",
    description: "Fused high-concept photography and bleeding-edge WebGL setups. Won 3 FWA of the Day awards and a Webby for outstanding interaction design."
  }
];

export const awards: Award[] = [
  {
    year: "2025",
    title: "Site of the Year",
    institution: "Awwwards Jury",
    category: "Best Editorial UX"
  },
  {
    year: "2024",
    title: "Grand Prix Creative Mastery",
    institution: "Cannes Lions Digital",
    category: "Prestige Brand Launch"
  },
  {
    year: "2023",
    title: "Best Mobile Storytelling",
    institution: "The Webby Awards",
    category: "Luxury Portfolio"
  },
  {
    year: "2022",
    title: "Red Dot Best of the Best",
    institution: "Design Zentrum",
    category: "Interactive Interface Systems"
  }
];

export const testimonials: Testimonial[] = [
  {
    quote: "Aaron Vega does not build websites. He designs digital presence. Our reservation queue filled within twenty-four hours of our brand overhaul. Uncompromised talent.",
    author: "Maximilian Vane",
    role: "VP of Brand Strategy",
    company: "Aether EV Systems"
  },
  {
    quote: "The strategic rigor Aaron brings is unmatched. He understands that looking beautiful is only five percent of the directive; commanding attention is the rest.",
    author: "Camille Laurent",
    role: "Global Creative Lead",
    company: "Scent & Obsidian Group"
  }
];

export const corePhilosophy = {
  headline: "Presence is not decoration. It is strategy.",
  body: "In a digital landscape hyper-saturated with momentary hype and visual noise, absolute restraint is the ultimate high-status separator. I do not design to blend into modern patterns. I construct systems where typography command, precise spacing, and uncompromised negative space force intense gaze.\n\nMy work does not seek approval; it demands memory."
};

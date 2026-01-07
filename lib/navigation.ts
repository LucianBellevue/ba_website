import { FiShield, FiHelpCircle, FiMap, FiClock, FiCheckCircle, FiBook } from "react-icons/fi";
import { IconType } from "react-icons";

export interface NavLink {
  href: string;
  label: string;
  description?: string;
  icon?: IconType;
}

export interface NavDropdown {
  id: string;
  label: string;
  items: NavLink[];
  featured?: {
    title: string;
    description: string;
    href: string;
    cta: string;
  };
}

export interface NavItem {
  type: "link" | "dropdown";
  label: string;
  href?: string;
  dropdown?: NavDropdown;
}

// Products/Services dropdown
export const productsDropdown: NavDropdown = {
  id: "products",
  label: "Products",
  items: [
    {
      href: "/final-expense-insurance",
      label: "Final Expense Insurance",
      description: "Coverage for end-of-life costs",
      icon: FiShield,
    },
    {
      href: "/term-life-insurance",
      label: "Term Life Insurance",
      description: "Affordable coverage for a set period",
      icon: FiShield,
    },
    {
      href: "/burial-insurance",
      label: "Burial Insurance",
      description: "Funeral and burial coverage",
      icon: FiShield,
    },
    {
      href: "/guaranteed-issue-life-insurance",
      label: "Guaranteed Issue",
      description: "No health questions asked",
      icon: FiCheckCircle,
    },
  ],
  featured: {
    title: "Free Quote Calculator",
    description: "Get an instant estimate online — no contact info required to start.",
    href: "/quotes",
    cta: "Try Calculator",
  },
};

// Resources dropdown
export const resourcesDropdown: NavDropdown = {
  id: "resources",
  label: "Resources",
  items: [
    {
      href: "/how-it-works",
      label: "How It Works",
      description: "Our simple 3-step process",
      icon: FiClock,
    },
    {
      href: "/guides",
      label: "Insurance Guides",
      description: "Learn about your options",
      icon: FiBook,
    },
    {
      href: "/faq",
      label: "FAQ",
      description: "Common questions answered",
      icon: FiHelpCircle,
    },
    {
      href: "/states",
      label: "Coverage Areas",
      description: "See availability by state",
      icon: FiMap,
    },
  ],
  featured: {
    title: "Talk to an Expert",
    description: "Get personalized guidance from a licensed insurance agent.",
    href: "/get-a-quote",
    cta: "Request Callback",
  },
};

// Main navigation config
export const mainNavigation: NavItem[] = [
  {
    type: "dropdown",
    label: "Products",
    dropdown: productsDropdown,
  },
  {
    type: "dropdown",
    label: "Resources",
    dropdown: resourcesDropdown,
  },
  {
    type: "link",
    label: "Get Estimate",
    href: "/quotes",
  },
];

// Mobile navigation - flattened structure
export const mobileNavSections = [
  {
    title: "Insurance Products",
    links: productsDropdown.items,
  },
  {
    title: "Resources",
    links: resourcesDropdown.items,
  },
];

// Quick actions for header
export const headerActions = {
  phone: {
    label: "Call Now",
    shortLabel: "Call",
  },
  quote: {
    label: "Get a Quote",
    href: "/get-a-quote",
  },
};

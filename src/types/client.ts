export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  profilePicture: string;
  title: string;
  subtitle: string;
  requirements: string[];
  competitors: CompetitorLink[];
  designs: Design[];
  selectedDesigns: Design[];
  proposalDetails: ProposalDetails;
  pricing: {
    basePrice: number;
    discount?: number;
  };
}

export interface CompetitorLink {
  id: string;
  name: string;
  url: string;
  description: string;
}

export interface Design {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  category: string;
}

export interface ProposalDetails {
  projectName: string;
  timeline: string;
  deliverables: string[];
  nextSteps: string[];
  terms: string;
}

export interface ConfirmationForm {
  name: string;
  email: string;
  price: number;
  discount?: number;
  accepted: boolean;
}
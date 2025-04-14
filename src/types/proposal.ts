
export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
}

export interface ProposalData {
  client: ContactInfo;
  salesperson: ContactInfo;
  problem: string;
  solution: string;
  cost: number;
  platformCost: number;
  timeframe: string;
  sendToCustomer: boolean;
}

export interface ProposalResponse {
  id: string;
  proposalLink: string;
  generatedAt: string;
  emailContent?: string;
}

export interface SavedProposal extends ProposalData, ProposalResponse {}

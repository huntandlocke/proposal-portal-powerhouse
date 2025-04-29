
import { ProposalData, ProposalResponse } from "@/types/proposal";

const WEBHOOK_URL = "https://hook.us2.make.com/jlfc1nshc6g9ewk9fgfucksczlke3mij";

export async function submitProposal(data: ProposalData): Promise<ProposalResponse> {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting proposal:", error);
    throw error;
  }
}

// Mock response for testing
export async function mockSubmitProposal(data: ProposalData): Promise<ProposalResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `PROP-${Math.floor(Math.random() * 10000)}`,
        proposalLink: "https://example.com/proposal/123456",
        generatedAt: new Date().toISOString(),
        emailContent: data.sendToCustomer 
          ? `Dear ${data.client.firstName},\n\nThank you for your interest. Please find your proposal attached.\n\nBest regards,\n${data.salesperson.firstName} ${data.salesperson.lastName}`
          : undefined
      });
    }, 2000); // 2 second delay to simulate network request
  });
}

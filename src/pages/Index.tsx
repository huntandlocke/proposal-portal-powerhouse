
import React, { useState } from "react";
import ProposalForm from "@/components/ProposalForm";
import ProposalResults from "@/components/ProposalResults";
import { ProposalData, SavedProposal } from "@/types/proposal";
import { submitProposal, mockSubmitProposal } from "@/services/proposalService";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("form");
  const [proposals, setProposals] = useState<SavedProposal[]>([]);

  const handleSubmit = async (data: ProposalData) => {
    setIsSubmitting(true);
    try {
      // Use the mock service for now, switch to real service when ready
      // const response = await submitProposal(data);
      const response = await mockSubmitProposal(data);
      
      // Combine the form data with the response
      const savedProposal: SavedProposal = {
        ...data,
        ...response
      };
      
      // Add to proposals list
      setProposals([savedProposal, ...proposals]);
      
      // Show success message
      toast({
        title: "Success!",
        description: "Proposal has been generated successfully",
      });
      
      // Switch to results tab
      setActiveTab("results");
    } catch (error) {
      console.error("Error generating proposal:", error);
      toast({
        title: "Error",
        description: "Failed to generate proposal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateNew = () => {
    setActiveTab("form");
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-[#121212]">
      <header className="bg-secondary/10 dark:bg-secondary/20 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <img 
            src="https://cdn.prod.website-files.com/67e2dccd1ec24c6d87343b35/67e2de0abb4f936ad7c24364_HL%20Logo%20Slug.png" 
            alt="Client Logo" 
            className="h-12 mr-auto"
          />
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">Proposal Generator</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-secondary/10 dark:bg-secondary/20">
            <TabsTrigger value="form">Create Proposal</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="form" className="space-y-4">
            <ProposalForm 
              onSubmit={handleSubmit} 
              isSubmitting={isSubmitting} 
            />
          </TabsContent>
          
          <TabsContent value="results">
            <ProposalResults 
              proposals={proposals} 
              onCreateNew={handleCreateNew} 
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;


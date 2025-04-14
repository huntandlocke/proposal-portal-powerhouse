
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
      const response = await submitProposal(data);
      // const response = await mockSubmitProposal(data);
      
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
    <div className="min-h-screen bg-[#0C1320] text-white">
      <header className="bg-[#0C1320]/90 shadow-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <img 
            src="/lovable-uploads/575d8419-b9b8-4dcb-bee6-57f5482bbcda.png" 
            alt="Hunt & Locke Logo" 
            className="h-12 mr-auto"
          />
          <h1 className="text-xl md:text-2xl font-bold text-white/90">Proposal Generator</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-[#0C1320]/50 border border-white/10">
            <TabsTrigger value="form" className="text-white/80 hover:text-white data-[state=active]:bg-[#1A2433] data-[state=active]:text-white">
              Create Proposal
            </TabsTrigger>
            <TabsTrigger value="results" className="text-white/80 hover:text-white data-[state=active]:bg-[#1A2433] data-[state=active]:text-white">
              Results
            </TabsTrigger>
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


import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SavedProposal } from "@/types/proposal";
import { Button } from "@/components/ui/button";
import { ExternalLink, Clock, Mail, RotateCw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ProposalResultsProps {
  proposals: SavedProposal[];
  onCreateNew: () => void;
}

const ProposalResults: React.FC<ProposalResultsProps> = ({ proposals, onCreateNew }) => {
  if (proposals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <p className="text-muted-foreground mb-4">No proposals generated yet</p>
        <Button onClick={onCreateNew}>Create New Proposal</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Recent Proposals</h2>
        <Button onClick={onCreateNew}>
          <RotateCw className="mr-2 h-4 w-4" />
          New Proposal
        </Button>
      </div>

      <div className="grid gap-4">
        {proposals.map((proposal, index) => {
          const date = new Date(proposal.generatedAt);
          const timeAgo = formatDistanceToNow(date, { addSuffix: true });
          
          return (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="bg-slate-50">
                <CardTitle className="flex justify-between items-center text-lg">
                  <span>
                    Proposal for {proposal.client.company}
                  </span>
                  <span className="text-sm font-normal text-muted-foreground">
                    ID: {proposal.id}
                  </span>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-50 p-2 rounded-md">
                      <ExternalLink className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Proposal Link</p>
                      <a 
                        href={proposal.proposalLink} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-blue-600 hover:underline break-all"
                      >
                        {proposal.proposalLink}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-50 p-2 rounded-md">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Generated</p>
                      <p className="text-sm text-gray-600" title={date.toLocaleString()}>
                        {timeAgo}
                      </p>
                    </div>
                  </div>
                  
                  {proposal.emailContent && (
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-50 p-2 rounded-md">
                        <Mail className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Email Sent</p>
                        <div className="bg-gray-50 p-3 rounded-md text-sm whitespace-pre-line">
                          {proposal.emailContent}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Client:</span>{" "}
                      {proposal.client.firstName} {proposal.client.lastName}, {proposal.client.company}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Solution Cost:</span> ${proposal.cost.toFixed(2)}
                      {proposal.platformCost > 0 && ` + $${proposal.platformCost.toFixed(2)} (platforms)`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ProposalResults;

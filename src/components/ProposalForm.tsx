
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import ContactForm from "./ContactForm";
import { ProposalData, ContactInfo } from "@/types/proposal";
import { Loader2 } from "lucide-react";

interface ProposalFormProps {
  onSubmit: (data: ProposalData) => Promise<void>;
  isSubmitting: boolean;
}

const ProposalForm: React.FC<ProposalFormProps> = ({ onSubmit, isSubmitting }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ProposalData>({
    client: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
    },
    salesperson: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
    },
    problem: "",
    solution: "",
    cost: 0,
    platformCost: 0,
    timeframe: "",
    sendToCustomer: false,
  });

  const updateClientInfo = (field: keyof ContactInfo, value: string) => {
    setFormData({
      ...formData,
      client: {
        ...formData.client,
        [field]: value,
      },
    });
  };

  const updateSalespersonInfo = (field: keyof ContactInfo, value: string) => {
    setFormData({
      ...formData,
      salesperson: {
        ...formData.salesperson,
        [field]: value,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.client.firstName || !formData.client.email || !formData.salesperson.firstName || 
        !formData.salesperson.email || !formData.problem || !formData.solution || 
        formData.cost <= 0 || !formData.timeframe) {
      toast({
        title: "Error",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }
    
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <ContactForm 
            title="Client Information" 
            data={formData.client} 
            onChange={updateClientInfo}
          />
          
          <ContactForm 
            title="Salesperson Information" 
            data={formData.salesperson} 
            onChange={updateSalespersonInfo}
          />
          
          <div className="form-section">
            <h3 className="section-title">Proposal Details</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="problem">Problem Statement</Label>
                <Textarea
                  id="problem"
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  placeholder="Describe the problem the client is facing"
                  rows={3}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="solution">Proposed Solution</Label>
                <Textarea
                  id="solution"
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  placeholder="Describe your proposed solution"
                  rows={4}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cost">Solution Cost ($)</Label>
                  <Input
                    id="cost"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="platformCost">Platform Costs ($)</Label>
                  <Input
                    id="platformCost"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.platformCost}
                    onChange={(e) => setFormData({ ...formData, platformCost: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timeframe">Implementation Timeframe</Label>
                <Input
                  id="timeframe"
                  value={formData.timeframe}
                  onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                  placeholder="e.g., 2-3 weeks"
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="sendToCustomer"
                  checked={formData.sendToCustomer}
                  onCheckedChange={(checked) => setFormData({ ...formData, sendToCustomer: checked })}
                />
                <Label htmlFor="sendToCustomer">Send proposal to customer</Label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Proposal"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default ProposalForm;

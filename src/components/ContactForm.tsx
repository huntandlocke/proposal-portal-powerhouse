
import React from "react";
import { ContactInfo } from "@/types/proposal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactFormProps {
  title: string;
  data: ContactInfo;
  onChange: (field: keyof ContactInfo, value: string) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ title, data, onChange }) => {
  return (
    <div className="form-section">
      <h3 className="section-title">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`${title}-firstName`}>First Name</Label>
          <Input
            id={`${title}-firstName`}
            value={data.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            placeholder="First Name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${title}-lastName`}>Last Name</Label>
          <Input
            id={`${title}-lastName`}
            value={data.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            placeholder="Last Name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${title}-email`}>Email</Label>
          <Input
            id={`${title}-email`}
            type="email"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${title}-phone`}>Phone Number</Label>
          <Input
            id={`${title}-phone`}
            type="tel"
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="Phone Number"
            required
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor={`${title}-company`}>Company</Label>
          <Input
            id={`${title}-company`}
            value={data.company}
            onChange={(e) => onChange("company", e.target.value)}
            placeholder="Company Name"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

import { useState } from "react";
import { ApiError, ServiceRequest, EmergencyRequest } from "@/types";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function useServiceForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const submitQuoteRequest = async (data: ServiceRequest) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    
    try {
      await apiRequest("POST", "/api/quote-requests", data);
      setSuccess(true);
      
      toast({
        title: "Request submitted successfully!",
        description: "We'll be in touch with you shortly.",
        variant: "default",
      });
      
      return true;
    } catch (err) {
      console.error("Error submitting quote request:", err);
      setError("Failed to submit your request. Please try again or call us directly.");
      
      toast({
        title: "Failed to submit request",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitEmergencyRequest = async (data: EmergencyRequest) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    
    try {
      await apiRequest("POST", "/api/emergency-requests", data);
      setSuccess(true);
      
      toast({
        title: "Emergency request sent!",
        description: "A technician will contact you shortly.",
        variant: "default",
      });
      
      return true;
    } catch (err) {
      console.error("Error submitting emergency request:", err);
      setError("Failed to submit your emergency request. Please call us directly.");
      
      toast({
        title: "Failed to send emergency request",
        description: "Please try calling our emergency number directly.",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    error,
    success,
    submitQuoteRequest,
    submitEmergencyRequest,
  };
}

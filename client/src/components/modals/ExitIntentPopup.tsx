import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

interface ExitIntentPopupProps {
  onClose: () => void;
}

const exitIntentSchema = z.object({
  phone: z.string().min(10, "Valid phone number is required"),
});

type ExitIntentFormValues = z.infer<typeof exitIntentSchema>;

export default function ExitIntentPopup({ onClose }: ExitIntentPopupProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ExitIntentFormValues>({
    resolver: zodResolver(exitIntentSchema),
    defaultValues: {
      phone: "",
    },
  });

  async function onSubmit(data: ExitIntentFormValues) {
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/exit-intent", {
        phone: data.phone,
        discount: "$50 off emergency service",
      });
      
      toast({
        title: "Discount claimed!",
        description: "We'll call you shortly to schedule your service.",
        variant: "default",
      });
      
      onClose();
    } catch (error) {
      console.error("Failed to submit exit intent form:", error);
      toast({
        title: "Failed to claim discount",
        description: "Please try calling us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="bg-white rounded-xl p-8 max-w-md mx-4 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <i className="fas fa-times text-xl"></i>
        </button>
        
        <div className="text-center">
          <div className="text-[#DC2626] text-4xl mb-4">
            <i className="fas fa-exclamation-circle"></i>
          </div>
          <h3 className="text-2xl font-bold text-[#121212] mb-2">Wait! Don't Leave Yet!</h3>
          <p className="text-gray-600 mb-4">Get $50 off your emergency service call when you book online right now.</p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        type="tel" 
                        placeholder="Your Phone Number" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#DC2626] focus:border-[#DC2626]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-[#DC2626] text-white font-bold py-3 rounded-md hover:bg-red-700 transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Claim My Discount"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

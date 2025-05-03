import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const emergencyFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  issueType: z.string().min(1, "Please select an issue type"),
  description: z.string().min(5, "Please describe your emergency"),
});

type EmergencyFormData = z.infer<typeof emergencyFormSchema>;

const EmergencyForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmergencyFormData>({
    resolver: zodResolver(emergencyFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      issueType: "",
      description: "",
    },
  });

  const onSubmit = async (data: EmergencyFormData) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/emergency-requests", data);
      
      toast({
        title: "Emergency request sent!",
        description: "Our team will contact you within 15 minutes.",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send your request. Please call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-center mb-4">
        <span className="bg-primary text-white text-sm font-bold py-1 px-3 rounded-full animate-pulse">
          24/7 EMERGENCY SERVICE
        </span>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-white text-sm font-medium mb-1" htmlFor="name">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            className={`w-full px-4 py-2 bg-gray-800 border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white`}
            placeholder="John Smith"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-white text-sm font-medium mb-1" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            className={`w-full px-4 py-2 bg-gray-800 border ${errors.phone ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white`}
            placeholder="(403) 123-4567"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-white text-sm font-medium mb-1" htmlFor="issueType">
            Emergency Type
          </label>
          <select
            id="issueType"
            className={`w-full px-4 py-2 bg-gray-800 border ${errors.issueType ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white`}
            {...register("issueType")}
          >
            <option value="">Select Issue Type</option>
            <option value="no-heat">No Heat</option>
            <option value="no-ac">No Air Conditioning</option>
            <option value="water-leak">Water Leak</option>
            <option value="unusual-noise">Unusual Noise</option>
            <option value="other">Other Emergency</option>
          </select>
          {errors.issueType && (
            <p className="text-red-500 text-xs mt-1">{errors.issueType.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-white text-sm font-medium mb-1" htmlFor="description">
            Brief Description
          </label>
          <textarea
            id="description"
            rows={3}
            className={`w-full px-4 py-2 bg-gray-800 border ${errors.description ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white`}
            placeholder="Please describe your emergency..."
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
          )}
        </div>
        
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-70"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Send Emergency Request"
          )}
        </motion.button>
      </form>
      
      <div className="mt-4 text-center text-gray-400 text-sm">
        <p>Our emergency team will contact you within 15 minutes</p>
      </div>
    </motion.div>
  );
};

export default EmergencyForm;

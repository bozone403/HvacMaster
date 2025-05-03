import { MaintenancePlan } from "@/types";

export const maintenancePlans: MaintenancePlan[] = [
  {
    id: "bronze",
    name: "Bronze",
    price: 199,
    color: "copper",
    features: [
      "1 Furnace Tune-Up",
      "10% Off Repairs",
      "Priority Scheduling"
    ]
  },
  {
    id: "gold",
    name: "Gold",
    price: 349,
    color: "yellow-500",
    popular: true,
    features: [
      "Furnace + A/C Clean",
      "Priority Booking",
      "Filter Supply",
      "12% Off All Work"
    ]
  },
  {
    id: "platinum",
    name: "Platinum",
    price: 499,
    color: "gray-800",
    features: [
      "Full Spring + Fall Clean",
      "15% Off All Work",
      "Emergency Fee Waived",
      "24/7 Direct Tech Line"
    ]
  }
];

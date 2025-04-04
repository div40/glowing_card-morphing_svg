"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTheme } from "next-themes";
import { Check } from "lucide-react";

export default function Home() {
  const { setTheme } = useTheme();

  const pricingPlans = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for getting started",
      features: [
        "1 User",
        "2 Projects",
        "5GB Storage",
        "Basic Support",
        "Community Access",
      ],
    },
    {
      name: "Pro",
      price: "9.99",
      description: "Best for professionals",
      features: [
        "5 Users",
        "20 Projects",
        "50GB Storage",
        "Priority Support",
        "Advanced Analytics",
        "Custom Domains",
      ],
    },
    {
      name: "Business",
      price: "Contact Us",
      description: "For large enterprises",
      features: [
        "Unlimited Users",
        "Unlimited Projects",
        "1TB Storage",
        "24/7 Support",
        "Custom Solutions",
        "SLA Agreement",
        "Dedicated Manager",
      ],
    },
  ];

  return (
    <div className="container mx-auto py-10 px-4 font-sora">
      <div className="flex justify-end mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTheme("light")}
          className="mr-2 cursor-pointer"
        >
          Light
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTheme("dark")}
          className={`cursor-pointer`}
        >
          Dark
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pricingPlans.map((plan) => (
          <Card key={plan.name} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl font-semibold tracking-tight">
                {plan.name}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {plan.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-4xl md:text-6xl font-bold mb-4 flex items-center w-full justify-center">
                {plan.name !== "Business" && (
                  <span className="md:text-3xl text-xl mr-1">$</span>
                )}
                {plan.price}
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 text-green-500" />

                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full text-sm font-medium cursor-pointer"
                size="lg"
              >
                {plan.name === "Business" ? "Contact Sales" : "Get Started"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

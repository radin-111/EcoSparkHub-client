"use client";

import { BuyIdeaData } from "@/types&enums&interfaces/idea.interface";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { initiatePayment } from "@/Actions/idea.action";
import { toast } from "sonner";
import { ApiResponse } from "@/types&enums&interfaces/api.types";

export default function BuyIdea({ idea }: { idea: BuyIdeaData }) {
  const handleBuy = async () => {
    const toastId = toast.loading("Processing payment...");
    try {
      const response = await initiatePayment(idea.id) as ApiResponse<any>;
      if (response.success) {
        toast.success("Payment successful", {
          id: toastId,
        });

        window.location.href = response.data.url;
      } else {
        toast.error("Payment failed", {
          id: toastId,
        });
      }


    } catch (error) {
      toast.error("Payment failed", {
        id: toastId,
      });
      
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-2xl shadow-md space-y-4">
      <div className="relative w-full h-48">
        <Image
          src={idea.imageUrl}
          alt={idea.name}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      <h2 className="text-xl font-semibold">{idea.name}</h2>

      <p className="text-gray-600">Price: ${idea.price}</p>

      <Button onClick={handleBuy} className="w-full">
        Buy now
      </Button>
    </div>
  );
}

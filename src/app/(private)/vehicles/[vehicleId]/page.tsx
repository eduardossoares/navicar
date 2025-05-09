"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { VehicleProps } from "@/@types/Vehicle";

import Contact from "@/components/contact";
import FavoriteShare from "@/components/favorite-share";
import Return from "@/components/return";
import Profile from "@/components/profile";
import SecurityTips from "@/components/security-tips";
import Tags from "@/components/tags";
import CarouselCard from "@/components/carousel-card";
import CarDescription from "@/components/car-description";
import SimilarVehicles from "@/components/similar-vehicles";
import { LoaderCircle } from "lucide-react";

export default function Page() {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const [vehicle, setVehicle] = useState<VehicleProps>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getVehicle = async () => {
      try {
        const response = await api.get(`/ads/${vehicleId}`);
        const data = response.data;
        setVehicle(data);
      } catch (error) {
        console.log(`Erro ao pegar dados do veículo: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    getVehicle();
  }, []);

  return (
    <div className="p-4 w-full bg-zinc-100/60 md:pl-[340px]">
      {isLoading ? (
        <LoaderCircle
          size={54}
          className="animate-spin repeat-infinite absolute transform duration-
        text-zinc-400/50 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 m-0 md:ml-42"
        />
      ) : (
        <div className="2xl:px-48 2xl:py-2 space-y-4">
          <div className="max-lg:gap-y-4 flex flex-col lg:flex-row lg:w-full lg:items-center justify-between">
            <Return brand={vehicle?.brand!} model={vehicle?.model!} />
            <FavoriteShare />
          </div>
          <div className="w-full flex flex-col lg:flex-row gap-x-4 gap-y-4">
            <div className="lg:w-[65%] space-y-4">
              <CarouselCard images={vehicle?.images} />
              <CarDescription
                model={vehicle?.model!}
                brand={vehicle?.brand!}
                year={vehicle?.year!}
                color={vehicle?.color!}
                milage={vehicle?.milage!}
                description={vehicle?.description!}
              />
              <SimilarVehicles id={vehicleId} />
            </div>
            <div className="lg:w-[35%] space-y-4">
              <Contact
                city={vehicle?.city!}
                phone={vehicle?.phone!}
                price={vehicle?.price!}
                milage={vehicle?.milage!}
                year={vehicle?.year!}
              />
              <Profile />
              <SecurityTips />
              <Tags />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

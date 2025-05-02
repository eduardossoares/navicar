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

export default function Page() {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const [vehicle, setVehicle] = useState<VehicleProps>();

  useEffect(() => {
    const getVehicle = async () => {
      try {
        const response = await api.get(`/ads/${vehicleId}`);
        const data = response.data;
        setVehicle(data);
      } catch (error) {
        console.log(`Erro ao pegar dados do veículo: ${error}`);
      }
    };
    getVehicle();
  }, []);

  return (
    <div className="p-4 w-full bg-zinc-100/60">
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
            <SimilarVehicles />
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
    </div>
  );
}

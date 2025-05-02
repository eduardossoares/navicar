"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { VehicleProps } from "@/@types/Vehicle";
import { api } from "@/services/api";
import VehicleCard from "./vehicle-card";

interface SimilarVehiclesProps {
  id: string;
}

export default function SimilarVehicles({ id }: SimilarVehiclesProps) {
  const [vehicles, setVehicles] = useState<VehicleProps[]>([]);
  useEffect(() => {
    const getVehicles = async () => {
      try {
        const response = await api.get("/ads");
        const data = response.data;
        const filteredVehicles = data.filter(
          (vehicle: VehicleProps) => vehicle.id !== id
        );
        if (filteredVehicles.length > 1) {
          setVehicles(filteredVehicles.slice(0, 2));
        }
      } catch (error) {
        console.log(`Erro ao buscar veículos similares: ${error}`);
      }
    };
    getVehicles();
  }, [id]);
  {
    vehicles && (
      <motion.div className="w-full space-y-2">
        <h2 className="font-semibold text-zinc-700 text-lg">
          Veículos Similares
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {vehicles.map((vehicle) => (
            <VehicleCard
              brand={vehicle.brand}
              model={vehicle.model}
              key={vehicle.id}
              images={vehicle.images}
              price={vehicle.price}
              id={vehicle.id}
              year={vehicle.year}
            />
          ))}
        </div>
      </motion.div>
    );
  }
}

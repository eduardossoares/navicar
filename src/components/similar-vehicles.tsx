"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { VehicleProps } from "@/@types/Vehicle";
import { api } from "@/services/api";
import VehicleCard from "./vehicle-card";

export default function SimilarVehicles() {
  const [vehicles, setVehicles] = useState<VehicleProps[]>([]);
  useEffect(() => {
    const getVehicles = async () => {
      try {
        const response = await api.get("/ads");
        const data = response.data;
        setVehicles(data);
      } catch (error) {
        console.log(`Erro ao buscar veículos: ${error}`);
      }
    };
    getVehicles();
  }, []);
  return (
    <motion.div className="w-full">
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

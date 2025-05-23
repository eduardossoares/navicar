"use client";
import { useAuth } from "@/hooks/useAuth";
import { Plus, Search, LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import VehicleCard from "@/components/vehicle-card";
import { api } from "@/services/api";
import { useEffect, useState, useRef } from "react";
import { VehicleProps } from "@/@types/Vehicle";
import VehicleFormModal from "@/components/vehicle-form-modal";

export default function Home() {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState<VehicleProps[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<VehicleProps[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const vehicleCreatedTrigger = useRef<number>(0);

  useEffect(() => {
    const getVehicles = async () => {
      try {
        const response = await api.get("/ads");
        const data = response.data;
        setVehicles(data);
      } catch (error) {
        console.log(`Erro ao buscar veículos: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    getVehicles();
  }, [user?.id, vehicleCreatedTrigger.current]);

  useEffect(() => {
    const getFilteredVehicles = () => {
      const filtered = vehicles.filter(
        (vehicle) =>
          vehicle.brand.toLowerCase().includes(search.toLowerCase()) ||
          vehicle.model.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredVehicles(filtered);
    };
    getFilteredVehicles();
  }, [search]);

  const handleVehicleCreated = () => {
    vehicleCreatedTrigger.current++;
  };

  return (
    <div className="p-4 md:p-8 w-full space-y-4 bg-zinc-100/60 md:ml-[320px]">
      <div>
        <h1 className="text-xl md:text-2xl font-bold md:w-[60%]">
          Explore os melhores carros para você
        </h1>
        <p className="md:text-lg text-zinc-500">
          Veja todas as opções e escolha a sua
        </p>
      </div>

      {user && (
        <Button
          className="bg-blue-500 md:absolute md:top-8 md:right-8 w-full md:w-auto
      transition-colors cursor-pointer duration-300 ease-in rounded-sm
      hover:bg-blue-500/90"
          onClick={() => setIsModalOpened(true)}
        >
          <Plus />
          Anunciar Veículo
        </Button>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-3 text-zinc-400" size={18} />
        <Input
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 w-full placeholder:text-zinc-400 text-zinc-400 py-5 max-sm:text-sm"
          placeholder="Atrás de algum veículo em específico?"
        />
      </div>

      {isLoading ? (
        <LoaderCircle
          size={54}
          className="animate-spin repeat-infinite absolute transform duration-
        text-zinc-400/40 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 m-0 md:ml-42"
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {search.length > 0 &&
            filteredVehicles.map((vehicle) => (
              <div key={vehicle.id}>
                <VehicleCard
                  id={vehicle.id}
                  model={vehicle.model}
                  brand={vehicle.brand}
                  year={vehicle.year}
                  price={vehicle.price}
                  phone={vehicle.phone}
                  createdAt={vehicle.createdAt}
                  updatedAt={vehicle.updatedAt}
                  city={vehicle.city}
                  ownerId={vehicle.ownerId}
                  color={vehicle.color}
                  description={vehicle.description}
                  milage={vehicle.milage}
                  images={vehicle.images}
                />
              </div>
            ))}

          {search.length < 1 &&
            vehicles.map((vehicle) => (
              <div key={vehicle.id}>
                <VehicleCard
                  id={vehicle.id}
                  model={vehicle.model}
                  brand={vehicle.brand}
                  year={vehicle.year}
                  price={vehicle.price}
                  phone={vehicle.phone}
                  createdAt={vehicle.createdAt}
                  updatedAt={vehicle.updatedAt}
                  city={vehicle.city}
                  ownerId={vehicle.ownerId}
                  color={vehicle.color}
                  description={vehicle.description}
                  milage={vehicle.milage}
                  images={vehicle.images}
                />
              </div>
            ))}
        </div>
      )}

      <VehicleFormModal
        vehicleCreatedTrigger={handleVehicleCreated}
        isOpen={isModalOpened}
        onClose={() => setIsModalOpened(false)}
      />
    </div>
  );
}

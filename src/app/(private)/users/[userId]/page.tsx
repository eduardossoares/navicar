import VehicleCard from "@/components/vehicle-card";
import "../../../globals.css";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Page() {
  return (
    <div className="p-4 md:p-8 w-full space-y-4">
      <div>
        <h1 className="text-xl md:text-2xl font-bold md:w-[60%]">
          Seus anúncios
        </h1>
        <p className="md:text-lg text-zinc-500">
          Gerencie seus veículos anunciados
        </p>
      </div>
      <Button
        className="bg-blue-500 md:absolute md:right-4 md:top-4 w-full md:w-auto
      transition-colors cursor-pointer duration-300 ease-in
      hover:bg-blue-500/90"
      >
        <Plus />
        Anunciar Veículo
      </Button>

      <div className="relative">
        <Search className="absolute left-3 top-3 text-zinc-400" size={18} />
        <Input
          className="pl-10 w-full placeholder:text-zinc-400 text-zinc-400 py-5"
          placeholder="Atrás de algum veículo em específico?"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
      </div>
    </div>
  );
}

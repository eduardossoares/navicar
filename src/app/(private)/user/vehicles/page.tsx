"use client";

import VehicleCard from "@/components/vehicle-card";
import "../../../globals.css";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { VehicleProps } from "@/@types/Vehicle";
import { api } from "@/services/api";
import { useAuth } from "@/hooks/useAuth";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import VehicleEditModal from "@/components/vehicle-edit-modal";
import VehicleFormModal from "@/components/vehicle-form-modal";

export default function Page() {
  const [vehicles, setVehicles] = useState<VehicleProps[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<VehicleProps[]>([]);
  const [search, setSearch] = useState("");
  const [isDialogDeleteOpened, setIsDialogDeleteOpened] = useState(false);
  const [isEditModalOpened, setIsEditModalOpened] = useState(false);
  const [vehicleIdToDelete, setVehicleIdToDelete] = useState<string>("");
  const [vehicleIdToUpdate, setVehicleIdToUpdate] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [updateTrigger, setUpsdateTrigger] = useState(0);
  const [isCreationModalOpened, setIsCreationModalOpened] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const getVehicles = async () => {
      try {
        const response = await api.get(`/ads`);
        const data = response.data;
        const userVehicles = data.filter(
          (vehicle: VehicleProps) => vehicle.ownerId === user?.id
        );
        setVehicles(userVehicles);
      } catch (error) {
        console.log(`Erro ao buscar veículos: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    getVehicles();
  }, [vehicleIdToDelete, user?.id, updateTrigger]);

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
  }, [search, user?.id, updateTrigger, vehicles]);

  const openDeleteDialog = (vehicleId: string) => {
    setIsDialogDeleteOpened(true);
    setVehicleIdToDelete(vehicleId);
  };

  const openEditVehicleModal = (vehicleId: string) => {
    setIsEditModalOpened(true);
    setVehicleIdToUpdate(vehicleId);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/ads/${user?.id}/${vehicleIdToDelete}`);
      setIsDialogDeleteOpened(false);
      setVehicleIdToDelete("");
      toast.success("Veículo deletado com sucesso.", {
        style: {
          backgroundColor: "#22C55E",
          color: "#FFF",
        },
        position: "top-right",
        duration: 2000,
      });
    } catch (error) {
      console.log(`Erro ao deletar veículo: ${error}`);
    }
  };

  const handleTriggerUpdate = () => {
    setUpsdateTrigger(updateTrigger + 1);
  };

  return (
    <div className="p-4 md:p-8 w-full space-y-4 md:pl-[340px]">
      <div>
        <h1 className="text-xl md:text-2xl font-bold md:w-[60%]">
          Seus anúncios
        </h1>
        <p className="md:text-lg text-zinc-500">
          Gerencie seus veículos anunciados
        </p>
      </div>
      <Button
        className="bg-blue-500 md:absolute md:right-8 md:top-8 w-full md:w-auto
      transition-colors cursor-pointer duration-300 ease-in rounded-sm
      hover:bg-blue-500/90"
        onClick={() => setIsCreationModalOpened(true)}
      >
        <Plus />
        Anunciar Veículo
      </Button>

      <div className="relative">
        <Search className="absolute left-3 top-3 text-zinc-400" size={18} />
        <Input
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 w-full placeholder:text-zinc-400 text-zinc-400 py-5"
          placeholder="Atrás de algum veículo em específico?"
        />
      </div>

      {isLoading ? (
        <p className="text-zinc-400">Carregando veículos...</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {vehicles.length < 1 && (
            <p className="text-zinc-400">Nenhum veículo cadastrado...</p>
          )}

          {search.length > 0 &&
            filteredVehicles.map((vehicle) => (
              <div key={vehicle.id}>
                <VehicleCard
                  isCarOwner={true}
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
                  onDelete={() => openDeleteDialog(vehicle.id)}
                  onEdit={() => setIsEditModalOpened(true)}
                />
              </div>
            ))}

          {search.length < 1 &&
            vehicles.map((vehicle) => (
              <div key={vehicle.id}>
                <VehicleCard
                  isCarOwner={true}
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
                  onDelete={() => openDeleteDialog(vehicle.id)}
                  onEdit={() => openEditVehicleModal(vehicle.id)}
                />
              </div>
            ))}
        </div>
      )}

      {/* Modal de exclusão */}
      {isDialogDeleteOpened && (
        <AlertDialog
          open={isDialogDeleteOpened}
          onOpenChange={setIsDialogDeleteOpened}
        >
          <AlertDialogContent>
            <AlertDialogTitle>Excluir Anúncio</AlertDialogTitle>
            <AlertDialogHeader>
              <AlertDialogDescription>
                Tem certeza que deseja excluir esse anúncio?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="max-sm:flex max-sm:flex-col">
              <AlertDialogCancel className="cursor-pointer">
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 cursor-pointer hover:bg-red-500/90"
                onClick={handleDelete}
              >
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Modal de edição */}
      {isEditModalOpened && (
        <VehicleEditModal
          vehicleIdToUpdate={vehicleIdToUpdate}
          userId={user?.id || ""}
          isOpen={isEditModalOpened}
          onClose={() => setIsEditModalOpened(false)}
          onUpdate={handleTriggerUpdate}
        />
      )}

      <VehicleFormModal
        isOpen={isCreationModalOpened}
        onClose={() => setIsCreationModalOpened(false)}
      />
    </div>
  );
}

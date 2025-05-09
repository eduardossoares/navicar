"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { api } from "@/services/api";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

type vehicleEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  vehicleIdToUpdate: string;
  userId: string;
  onUpdate?: () => void;
};

const schema = z.object({
  model: z.string().nonempty(),
  brand: z.string().nonempty(),
  year: z.string().nonempty(),
  price: z.string().nonempty(),
  city: z.string().nonempty(),
  description: z.string().nonempty(),
  phone: z.string().nonempty(),
  milage: z.string().nonempty(),
  color: z.string().nonempty(),
});

type FormData = z.infer<typeof schema>;

export default function VehicleEditModal({
  isOpen,
  onClose,
  vehicleIdToUpdate,
  userId,
  onUpdate,
}: vehicleEditModalProps) {
  const [phone, setPhone] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [milage, setMilage] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getVehicle = async () => {
      try {
        const response = await api.get(`/ads/${vehicleIdToUpdate}`);
        const data = response.data;
        setPrice(data.price);
        setYear(data.year);
        setMilage(data.milage);
        setColor(data.color);
        setCity(data.city);
        setBrand(data.brand);
        setModel(data.model);
        setPhone(data.phone);
        setDescription(data.description);
        // Sincronizando com o Schema
        setValue("model", data.model);
        setValue("brand", data.brand);
        setValue("year", data.year);
        setValue("price", data.price);
        setValue("city", data.city);
        setValue("description", data.description);
        setValue("phone", data.phone);
        setValue("milage", data.milage);
        setValue("color", data.color);
      } catch (error) {
        console.log(`Erro ao pegar dados do veículo: ${error}`);
      }
    };
    getVehicle();
  }, [vehicleIdToUpdate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    shouldFocusError: false,
  });

  const handleCloseModal = () => {
    setPhone("");
    setDescription("");
    setPrice("");
    setYear("");
    setMilage("");
    setColor("");
    setCity("");
    setBrand("");
    setModel("");
    onClose();
  };

  const handleUpdateVehicle = async (data: FormData) => {
    try {
      setIsLoading(true);
      await api.put(`/ads/${userId}/${vehicleIdToUpdate}`, {
        price: data.price,
        year: data.year,
        milage: data.milage,
        color: data.color,
        city: data.city,
        brand: data.brand,
        model: data.model,
        phone: data.phone,
        description: data.description,
      });
      handleCloseModal();
      onUpdate?.();
      toast.success("Veículo atualizado com sucesso.", {
        style: {
          backgroundColor: "#22C55E",
          color: "#FFF",
        },
        position: "top-right",
        duration: 2000,
      });
    } catch (error) {
      console.log(`Erro ao atualizar veículo: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent
        className={cn(
          "sm:max-w-[500px] max-h-[90vh] overflow-y-auto",
          isLoading && "sm:max-w-[300px] py-8"
        )}
      >
        <DialogHeader>
          <DialogTitle className={cn(isLoading && "animate-pulse text-center")}>
            {isLoading ? "Veículo sendo editado..." : "Editar veículo"}
          </DialogTitle>
          <DialogDescription
            className={cn(isLoading && "animate-pulse text-center")}
          >
            {isLoading
              ? "Aguarde um instante..."
              : "Preencha os campos abaixo para editar o veículo."}
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="w-full flex justify-center items-center">
            <LoaderCircle size={28} className="animate-spin text-zinc-400/50" />
          </div>
        ) : (
          <form onSubmit={handleSubmit(handleUpdateVehicle)}>
            <div className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-y-1">
                  <Label
                    className={cn(
                      "text-sm font-medium",
                      errors?.brand ? "text-red-500" : "text-black"
                    )}
                  >
                    <span>Marca*</span>
                    {errors?.brand && (
                      <span className="text-xs font-light">(obrigatório)</span>
                    )}
                  </Label>
                  <Input
                    {...register("brand")}
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="rounded-sm shadow-none max-sm:text-sm"
                    placeholder="Ex: Toyota"
                  />
                </div>
                <div className="flex flex-col gap-y-1">
                  <Label
                    className={cn(
                      "text-sm font-medium",
                      errors?.model ? "text-red-500" : "text-black"
                    )}
                  >
                    <span>Modelo*</span>
                    {errors?.model && (
                      <span className="text-xs font-light">(obrigatório)</span>
                    )}
                  </Label>
                  <Input
                    {...register("model")}
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="rounded-sm shadow-none max-sm:text-sm"
                    placeholder="Ex: Corolla"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-y-1">
                  <Label
                    className={cn(
                      "text-sm font-medium",
                      errors?.year ? "text-red-500" : "text-black"
                    )}
                  >
                    <span>Ano*</span>
                    {errors?.year && (
                      <span className="text-xs font-light">(obrigatório)</span>
                    )}
                  </Label>
                  <Input
                    type="number"
                    {...register("year")}
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    min={1900}
                    className="rounded-sm shadow-none max-sm:text-sm"
                    placeholder="Ex: 2022"
                  />
                </div>
                <div className="flex flex-col gap-y-1">
                  <Label
                    className={cn(
                      "text-sm font-medium",
                      errors?.color ? "text-red-500" : "text-black"
                    )}
                  >
                    <span>Cor*</span>
                    {errors?.color && (
                      <span className="text-xs font-light">(obrigatório)</span>
                    )}
                  </Label>
                  <Input
                    {...register("color")}
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="rounded-sm shadow-none max-sm:text-sm"
                    placeholder="Ex: Vermelho"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-y-1">
                  <Label
                    className={cn(
                      "text-sm font-medium",
                      errors?.milage ? "text-red-500" : "text-black"
                    )}
                  >
                    <span>Quilometragem*</span>
                    {errors?.milage && (
                      <span className="text-xs font-light">(obrigatório)</span>
                    )}
                  </Label>
                  <Input
                    type="number"
                    {...register("milage")}
                    value={milage}
                    onChange={(e) => setMilage(e.target.value)}
                    min={1}
                    className="rounded-sm shadow-none max-sm:text-sm"
                    placeholder="Ex: 15000"
                  />
                </div>
                <div className="flex flex-col gap-y-1">
                  <Label
                    className={cn(
                      "text-sm font-medium",
                      errors?.city ? "text-red-500" : "text-black"
                    )}
                  >
                    <span>Localização*</span>
                    {errors?.city && (
                      <span className="text-xs font-light">(obrigatório)</span>
                    )}
                  </Label>
                  <Input
                    {...register("city")}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="rounded-sm shadow-none max-sm:text-sm"
                    placeholder="Ex: Eldorado do Sul - RS"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-y-1">
                  <Label
                    className={cn(
                      "text-sm font-medium",
                      errors?.phone ? "text-red-500" : "text-black"
                    )}
                  >
                    <span>Telefone*</span>
                    {errors?.phone && (
                      <span className="text-xs font-light">(obrigatório)</span>
                    )}
                  </Label>
                  <Input
                    {...register("phone")}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="rounded-sm shadow-none max-sm:text-sm"
                    placeholder="Ex: 5412345678"
                  />
                </div>
                <div className="flex flex-col gap-y-1">
                  <Label
                    className={cn(
                      "text-sm font-medium",
                      errors?.price ? "text-red-500" : "text-black"
                    )}
                  >
                    <span>Preço*</span>
                    {errors?.price && (
                      <span className="text-xs font-light">(obrigatório)</span>
                    )}
                  </Label>
                  <Input
                    type="number"
                    {...register("price")}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    min={1}
                    className="rounded-sm shadow-none max-sm:text-sm"
                    placeholder="Ex: 150000"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-y-1">
                <Label
                  className={cn(
                    "text-sm font-medium",
                    errors?.description ? "text-red-500" : "text-black"
                  )}
                >
                  <span>Descrição do Veículo*</span>
                  {errors?.description && (
                    <span className="text-xs font-light">(obrigatório)</span>
                  )}
                </Label>
                <Textarea
                  {...register("description")}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ex: Carro bom para passeios e muito confortável..."
                  className="h-24 resize-none text-sm shadow-none rounded-sm"
                />
              </div>

              <div className="flex justify-end gap-x-2">
                <Button
                  variant={"outline"}
                  className="rounded-sm cursor-pointer"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="rounded-sm bg-blue-500 hover:bg-blue-500/90 cursor-pointer duration-100"
                >
                  Editar
                </Button>
              </div>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

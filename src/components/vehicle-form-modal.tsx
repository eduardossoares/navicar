"use client";

import { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import { Image as ImageIcon, LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Image from "next/image";
import { Trash, Star, AlertCircle } from "lucide-react";
import { api } from "@/services/api";

const schema = z.object({
  model: z.string().nonempty(),
  brand: z.string().nonempty(),
  year: z.string().nonempty(),
  price: z.string().nonempty(),
  city: z.string().nonempty(),
  color: z.string().nonempty(),
  milage: z.string().nonempty(),
  description: z.string().nonempty(),
  phone: z.string().nonempty(),
  images: z.array(z.instanceof(File)).min(1),
});

export type VehicleFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  vehicleCreatedTrigger: () => void;
};

type FormData = z.infer<typeof schema>;

export default function VehicleFormModal({
  isOpen,
  onClose,
  vehicleCreatedTrigger,
}: VehicleFormModalProps) {
  const [images, setImages] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    files.map((file) => {
      if (
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg"
      ) {
        setImages([...images, file]);
        setImagesPreview([...imagesPreview, URL.createObjectURL(file)]);
        setValue("images", [...images, file], { shouldValidate: true });
      } else {
        toast.error("Formato de imagem inválido.");
      }
    });
  };

  const handleCloseModal = () => {
    setImages([]);
    setImagesPreview([]);
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

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    const newImagesPreview = [...imagesPreview];
    newImages.splice(index, 1);
    newImagesPreview.splice(index, 1);
    setImages(newImages);
    setImagesPreview(newImagesPreview);
    setValue("images", newImages, { shouldValidate: true });
  };

  const handleCreateVehicle = async (data: FormData) => {
    const formData = new FormData();
    formData.append("model", data.model);
    formData.append("brand", data.brand);
    formData.append("year", data.year.toString());
    formData.append("price", data.price.toString());
    formData.append("city", data.city);
    formData.append("color", data.color);
    formData.append("milage", data.milage.toString());
    formData.append("description", data.description);
    formData.append("phone", data.phone.toString());
    images.map((image) => formData.append("image", image));

    try {
      setIsLoading(true);
      await api.post("/ads", formData);
      toast.success("Veículo anunciado com sucesso.", {
        style: {
          backgroundColor: "#22C55E",
          color: "#FFF",
        },
        position: "top-right",
        duration: 2000,
      });
      vehicleCreatedTrigger();
      handleCloseModal();
    } catch (error) {
      console.log(`Erro ao criar veículo: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent
        className={cn(
          "sm:max-w-[500px] max-h-[90vh] overflow-y-auto",
          isLoading && "sm:max-w-[360px] py-10"
        )}
      >
        <DialogHeader>
          <DialogTitle
            className={cn(
              "text-start",
              isLoading && "text-center animate-pulse"
            )}
          >
            {isLoading
              ? "Seu veículo está sendo anunciado!"
              : "Anuncie seu veículo"}
          </DialogTitle>
          <DialogDescription
            className={cn(
              "text-start",
              isLoading && "text-center animate-pulse"
            )}
          >
            {isLoading
              ? "Aguarde alguns instantes..."
              : "Preencha os dados do veículo que deseja anunciar."}
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="flex items-center justify-center w-full">
            <LoaderCircle size={28} className="animate-spin text-zinc-400/50" />
          </div>
        ) : (
          <form onSubmit={handleSubmit(handleCreateVehicle)}>
            <div className="grid gap-4">
              {imagesPreview.length > 2 ? (
                <div className="flex flex-row gap-x-1 items-center">
                  <AlertCircle size={14} className="text-yellow-500" />
                  <span className="text-xs text-gray-500">
                    Limite de imagens atingido.
                  </span>
                </div>
              ) : (
                <label htmlFor="images" className="flex flex-col gap-y-1">
                  <Label
                    className={cn(
                      "text-sm font-medium",
                      errors.images ? "text-red-500" : ""
                    )}
                  >
                    Imagens do Veículo*
                  </Label>
                  <div
                    className="flex h-40 items-center justify-center border-2 border-dashed border-zinc-300 rounded-sm
                hover:bg-zinc-200/25 cursor-pointer duration-300 ease-in transition-colors flex-col gap-y-3"
                  >
                    <div className="bg-zinc-200/60 w-10 h-10 flex items-center justify-center rounded-full">
                      <ImageIcon size={20} className="text-zinc-400" />
                    </div>
                    <div>
                      <div className="-space-y-1 text-center">
                        <p className="text-sm font-medium">
                          Clique aqui para adicionar imagens do seu veículo(máx
                          3).
                        </p>
                        <span className="text-xs text-zinc-500">
                          PNG, JPG ou JPEG (máx. 5MB)
                        </span>
                      </div>
                      <input
                        id="images"
                        type="file"
                        className="hidden"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handleFile}
                        multiple
                      />
                    </div>
                  </div>
                </label>
              )}

              {imagesPreview.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {imagesPreview.map((image, index) => (
                    <div key={index} className="relative w-full h-22">
                      {image === imagesPreview[0] && (
                        <span
                          className="absolute z-40 top-2 left-2 bg-blue-500 text-white 
                      text-xs font-medium w-6 h-6 rounded-sm flex items-center justify-center"
                        >
                          <Star size={14} />
                        </span>
                      )}
                      <div
                        className="absolute cursor-pointer z-40 top-2 right-2 rounded-sm 
                    bg-red-500/80 w-6 h-6 flex items-center justify-center"
                      >
                        <Trash
                          color="white"
                          size={14}
                          onClick={() => handleRemoveImage(index)}
                        />
                      </div>
                      <Image
                        src={image}
                        alt="Imagem do veículo"
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  ))}
                </div>
              )}

              <p className="text-xs text-gray-500">
                A primeira imagem será usada como imagem principal do anúncio.
              </p>

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
                  Anunciar
                </Button>
              </div>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

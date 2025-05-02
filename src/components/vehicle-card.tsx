import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { VehicleProps } from "@/@types/Vehicle";

export default function VehicleCard({
  id,
  brand,
  model,
  year,
  price,
  city,
  milage,
  images,
}: VehicleProps) {
  const formatCurrency = (value: string) => {
    const valueAsNumber = Number(value);
    return valueAsNumber.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const formatMilage = (value: string) => {
    const valueAsNumber = Number(value);
    return valueAsNumber.toLocaleString("pt-BR", {
      style: "decimal",
    });
  };

  return (
    <Card className="overflow-hidden p-0 shadow-none rounded-sm">
      <div className={`relative w-full ${milage ? "h-48" : "h-28"}`}>
        <Image className="object-cover" src={images[0]} alt="Car" fill />
      </div>
      <CardContent className="pb-6 flex flex-col gap-y-2">
        <div className="-space-y-2">
          <h3 className="font-bold">
            {brand} {model}
          </h3>
          <span className="text-sm text-zinc-500">{year}</span>
        </div>

        {city && <span className="text-sm text-zinc-500">{city}</span>}

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">{formatCurrency(price)}</span>
          {!milage && (
            <Link
              href={`/vehicles/${id}`}
              className="flex items-center justify-end text-blue-500 gap-x-1.5
          cursor-pointer text-sm hover:text-blue-700 transition-colors duration-300"
            >
              <span className="hover:underline">Veja mais detalhes</span>
              <ArrowRight size={16} />
            </Link>
          )}
          {milage && (
            <span className="text-sm text-zinc-500">
              {formatMilage(milage)} km
            </span>
          )}
        </div>

        {milage && (
          <Link
            href={`/vehicles/${id}`}
            className="flex items-center justify-end text-blue-500 gap-x-1.5
          cursor-pointer text-sm hover:text-blue-700 transition-colors duration-300"
          >
            <span className="hover:underline">Veja mais detalhes</span>
            <ArrowRight size={16} />
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

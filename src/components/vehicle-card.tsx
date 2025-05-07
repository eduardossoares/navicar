import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { VehicleProps } from "@/@types/Vehicle";
import { Button } from "./ui/button";
import { Trash, Edit } from "lucide-react";

interface isCarOwner extends VehicleProps {
  isCarOwner?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function VehicleCard({
  id,
  brand,
  model,
  year,
  price,
  city,
  milage,
  images,
  isCarOwner = false,
  onDelete,
  onEdit,
}: isCarOwner) {
  const formatCurrency = (value: string) => {
    const valueAsNumber = Number(value);
    return valueAsNumber.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Converts a string representing a number into a localized string
   * with decimal formatting for Brazilian Portuguese.
   *
   * @param value - The string representation of a number to be formatted.
   * @returns The formatted string with Brazilian Portuguese decimal style.
   */

  /*******  b2b2f6a7-59c5-4264-b964-8dc09b177951  *******/
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
        <div className="-space-y-1">
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
              className="text-blue-500 cursor-pointer text-sm hover:text-blue-700 transition-colors duration-300"
            >
              <span className="hover:underline">Veja mais detalhes</span>
            </Link>
          )}
          {milage && (
            <span className="text-sm text-zinc-500">
              {formatMilage(milage)} km
            </span>
          )}
        </div>

        {milage && !isCarOwner && (
          <Link
            href={`/vehicles/${id}`}
            className="flex items-center justify-end text-blue-500 gap-x-1.5
          cursor-pointer text-sm hover:text-blue-700 transition-colors duration-300"
          >
            <span className="hover:underline">Veja mais detalhes</span>
            <ArrowRight size={16} />
          </Link>
        )}

        {isCarOwner && (
          <div className="space-x-2 w-full flex">
            <Button
              variant={"outline"}
              className="flex-1 space-x-1 rounded-sm cursor-pointer shadow-none"
              onClick={onEdit}
            >
              <Edit color="black" />
              <span>Editar</span>
            </Button>
            <Button
              onClick={onDelete}
              variant={"outline"}
              className="flex-1 text-red-500 rounded-sm cursor-pointer shadow-none"
            >
              <Trash />
              <span>Apagar</span>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

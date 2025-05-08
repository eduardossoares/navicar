import Link from "next/link";
import { Copy, MapPin, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";

import { motion } from "framer-motion";
import { toast } from "sonner";

interface ContactProps {
  price: string;
  milage: string;
  year: string;
  city: string;
  phone: string;
}

export default function Contact({
  price,
  milage,
  year,
  city,
  phone,
}: ContactProps) {
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
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phone);
      toast.success("Telefone copiado com sucesso.", {
        style: {
          backgroundColor: "#22C55E",
          color: "#FFF",
        },
        position: "top-right",
        duration: 2000,
      });
    } catch (error) {
      console.log(`Erro ao copiar telefone: ${error}`);
    }
  };

  const initial = {
    opacity: 0,
    x: 20,
  };

  const animate = {
    opacity: 1,
    x: 0,
  };

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Card className="rounded-md shadow bg-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            {formatCurrency(price)}
          </CardTitle>
          <CardDescription className="space-x-1.5 text-sm -mt-1">
            <span>{year}</span>
            <span>•</span>
            <span>{formatMilage(milage)} km</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Separator />
          <div className="flex items-center gap-x-2 mt-3">
            <MapPin className="text-zinc-500" size={20} />
            <span className="">{city}</span>
          </div>

          <div className="mt-3 space-y-2">
            <Button
              className="bg-blue-500 w-full cursor-pointer hover:bg-blue-500/90 duration-100 ease-in py-5 rounded-sm shadow"
              onClick={handleCopy}
            >
              <Copy size={18} />
              <span>Copiar Telefone</span>
            </Button>

            <Button
              variant={"outline"}
              className="w-full cursor-pointer py-5 rounded-sm shadow"
            >
              <Link
                href={`https://wa.me/+55${phone}`}
                target="_blank"
                className="flex items-center gap-x-2"
              >
                <MessageSquare size={18} />
                <span>Enviar Mensagem</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

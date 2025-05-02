"use client";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";

interface CarDescriptionProps {
  description: string;
  model: string;
  brand: string;
  year: string;
  color: string;
  milage: string;
}

interface DetailProps {
  title: string;
  value: string;
}

export default function CarDescription({
  description,
  model,
  brand,
  year,
  color,
  milage,
}: CarDescriptionProps) {
  const [activeTab, setActiveTab] = useState("details");

  const formatMilage = (value: string) => {
    const valueAsNumber = Number(value);
    return valueAsNumber.toLocaleString("pt-BR", {
      style: "decimal",
    });
  };

  const details: DetailProps[] = [
    {
      title: "Marca",
      value: brand?.toLocaleUpperCase(),
    },
    {
      title: "Modelo",
      value: model?.toLocaleUpperCase(),
    },
    {
      title: "Ano",
      value: year,
    },
    {
      title: "Cor",
      value: color && color[0].toLocaleUpperCase() + color.slice(1),
    },
    {
      title: "Quilometragem",
      value: formatMilage(milage),
    },
  ];

  const initial = {
    opacity: 0,
    x: -20,
  };

  const animate = {
    opacity: 1,
    x: 0,
  };

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <Tabs
        defaultValue="details"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 bg-zinc-100 rounded-sm h-10">
          <TabsTrigger
            className={`cursor-pointer rounded-sm opacity-40 text-zinc-700 text-sm font-semibold ${
              activeTab === "details" && "bg-black opacity-100"
            }`}
            value="details"
          >
            Detalhes
          </TabsTrigger>
          <TabsTrigger
            className={`cursor-pointer rounded-sm opacity-40 text-zinc-700 text-sm font-semibold ${
              activeTab === "description" && "bg-black opacity-100"
            }`}
            value="description"
          >
            Descrição
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <Card className="rounded-sm shadow-none">
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {details.map((detail) => (
                  <div key={detail.title} className="flex flex-col">
                    <span className="text-zinc-400 text-sm">
                      {detail.title}
                    </span>
                    <span className="font-medium">{detail.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="description">
          <Card className="rounded-sm shadow-none">
            <CardContent>
              <p className="text-zinc-700 text-sm font-medium">{description}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

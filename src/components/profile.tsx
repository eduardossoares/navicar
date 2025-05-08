import { Info, MapPin, Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

export default function Profile() {
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
      <Card className="rounded-md shadow">
        <CardContent className="space-y-4">
          <div className="flex flex-row gap-x-4">
            <div className="h-8 w-8 p-6 rounded-full flex items-center justify-center bg-zinc-200">
              <span className="font-bold">E</span>
            </div>
            <div className="space-y-1">
              <p className="font-semibold">Eduardo Soares</p>
              <div className="flex flex-row gap-x-2 items-center">
                <div className="flex flex-row items-center gap-x-1">
                  <Star className="text-yellow-500" size={16} />
                  <span className="text-sm">4.8</span>
                </div>
                <span className="text-[10px]">•</span>
                <span className="text-sm">Desde 2025</span>
              </div>
            </div>
          </div>

          <Button
            variant={"outline"}
            className="w-full h-10 cursor-pointer rounded-sm shadow"
          >
            <Info size={18} />
            <span>Ver Perfil do Vendedor</span>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

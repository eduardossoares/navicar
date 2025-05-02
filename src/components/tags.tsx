import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { Calendar, Car, Fuel, Truck } from "lucide-react";

export default function Tags() {
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
      className="flex flex-wrap gap-1"
      initial={initial}
      animate={animate}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <Badge variant={"outline"} className="cursor-pointer space-x-0.5">
        <Calendar />
        <span>Anunciado recentemente</span>
      </Badge>
      <Badge variant={"outline"} className="cursor-pointer space-x-0.5">
        <Truck />
        <span>Único dono</span>
      </Badge>
      <Badge variant={"outline"} className="cursor-pointer space-x-0.5">
        <Car />
        <span>IPVA pago</span>
      </Badge>
      <Badge variant={"outline"} className="cursor-pointer space-x-0.5">
        <Fuel />
        <span>Flex</span>
      </Badge>
    </motion.div>
  );
}

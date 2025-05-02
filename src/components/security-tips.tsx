import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Check, Shield } from "lucide-react";

export default function SecurityTips() {
  const initial = {
    opacity: 0,
    x: 20,
  };

  const animate = {
    opacity: 1,
    x: 0,
  };
  return (
    <motion.div initial={initial} animate={animate} transition={{ duration: 0.5, delay: 0.7 }}>
      <Card className="shadow-none rounded-md -space-y-4">
        <CardHeader>
          <CardTitle className="flex flex-row items-center gap-x-2">
            <Shield size={20} className="text-blue-500" />
            <h2>Dicas de Segurança</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex flex-row gap-x-2">
              <Check size={18} className="text-green-500" />
              <span className="text-xs sm:text-[13px]">
                Verifique o histórico do veículo antes de comprar
              </span>
            </li>
            <li className="flex flex-row gap-x-2">
              <Check size={18} className="text-green-500" />
              <span className="text-xs sm:text-[13px]">
                Veja o veículo pessoalmente antes de fechar negócio
              </span>
            </li>
            <li className="flex flex-row gap-x-2">
              <Check size={18} className="text-green-500" />
              <span className="text-xs sm:text-[13px]">
                Desconfie de preços muito abaixo do mercado
              </span>
            </li>
            <li className="flex flex-row gap-x-2">
              <Check size={18} className="text-green-500" />
              <span className="text-xs sm:text-[13px]">
                Nunca envie dinheiro antecipadamente
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}

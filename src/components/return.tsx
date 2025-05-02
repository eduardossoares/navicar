import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface ReturnProps {
  brand: string;
  model: string;
}

export default function Return({ brand, model }: ReturnProps) {
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
      transition={{ duration: 0.5, delay: 0.4 }}
      className="flex items-center gap-x-1 sm:gap-x-2"
    >
      <Link
        href={"/"}
        className="text-zinc-500 flex items-center gap-x-1 hover:text-blue-500 cursor-pointer duration-300"
      >
        <ArrowLeft size={16} />
        <span className="text-sm">Voltar para resultados</span>
      </Link>
      <ChevronRight size={16} className="text-zinc-500" />
      <p className="text-sm font-semibold">
        {brand} {model}
      </p>
    </motion.div>
  );
}

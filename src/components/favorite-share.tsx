"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Heart, Share2 } from "lucide-react";
import { FaHeart } from "react-icons/fa";

export default function FavoriteShare() {
  const [favorited, setFavorited] = useState<boolean>(false);

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
      transition={{ duration: 0.5, delay: 0.4 }}
      className="space-x-2"
    >
      <Button
        variant={"outline"}
        className="cursor-pointer shadow space-x-1.5 rounded-sm"
        onClick={() => setFavorited(!favorited)}
      >
        {favorited ? <FaHeart className="text-red-500" /> : <Heart />}
        <span>Favoritar</span>
      </Button>
      <Button
        variant={"outline"}
        className="cursor-pointer shadow space-x-1 rounded-sm"
      >
        <Share2 />
        <span>Compartilhar</span>
      </Button>
    </motion.div>
  );
}

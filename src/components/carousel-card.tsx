import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import Image from "next/image";

interface CarouselCardProps {
  images?: string[];
}

export default function CarouselCard({ images = [] }: CarouselCardProps) {
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
    className="shadow-sm"
      initial={initial}
      animate={animate}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Carousel className="w-full" opts={{ slidesToScroll: 1, align: "start" }}>
        <CarouselContent>
          {images.length > 0 ? (
            images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-72 lg:h-[300px] xl:h-[400px]">
                  <Image
                    src={image}
                    alt={`Veículo ${index + 1}`}
                    fill
                    objectFit="cover"
                    className="rounded-sm"
                  />
                </div>
              </CarouselItem>
            ))
          ) : (
            <div className="text-center p-4">Nenhuma imagem disponível</div>
          )}
        </CarouselContent>
        <CarouselPrevious className="cursor-pointer absolute ml-10 sm:ml-8" />
        <CarouselNext className="cursor-pointer absolute mr-10 sm:mr-8" />
      </Carousel>
    </motion.div>
  );
}

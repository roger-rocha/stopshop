"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80",
    alt: "Interior do Stop Shop",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
    alt: "Compras de moda",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&q=80",
    alt: "Praça de alimentação",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=600&q=80",
    alt: "Estacionamento",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&q=80",
    alt: "Vitrines de moda",
    span: "",
  },
];

export function GallerySection() {
  return (
    <section className="bg-white py-[var(--spacing-section-y)]">
      <div className="mx-auto max-w-7xl px-[var(--spacing-section-x)]">
        <SectionHeader
          label="Nosso Espaço"
          title="Conheça o Stop Shop"
          highlight="Stop Shop"
          subtitle="Ambientes planejados para facilitar a circulação, valorizar as lojas e tornar a visita mais confortável."
          light
        />
      </div>

      <StaggerChildren className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2">
        {galleryImages.map((img, i) => (
          <StaggerItem
            key={img.src}
            className={i === 0 ? "col-span-2 row-span-2" : ""}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="group relative h-full min-h-[180px] overflow-hidden rounded-xl sm:min-h-[220px]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes={i === 0 ? "50vw" : "25vw"}
              />
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}

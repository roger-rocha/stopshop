"use client";

import { motion } from "motion/react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { whatsappLink } from "@/lib/utils";

interface FloatingWhatsAppProps {
  whatsapp?: string;
}

export function FloatingWhatsApp({
  whatsapp = "554732557000",
}: FloatingWhatsAppProps) {
  return (
    <motion.a
      href={whatsappLink(
        whatsapp,
        "Olá! Gostaria de informações sobre o Stop Shop."
      )}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-whatsapp text-white shadow-whatsapp hover:shadow-whatsapp-hover"
      aria-label="Fale pelo WhatsApp"
    >
      <WhatsAppIcon className="h-9 w-9" />
    </motion.a>
  );
}

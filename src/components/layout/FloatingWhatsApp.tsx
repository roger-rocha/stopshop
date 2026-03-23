"use client";

import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/554732557000?text=Olá! Gostaria de informações sobre o Stop Shop."
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-whatsapp text-white shadow-whatsapp hover:shadow-whatsapp-hover"
      aria-label="Fale pelo WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </motion.a>
  );
}

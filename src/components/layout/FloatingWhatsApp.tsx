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
      transition={{ delay: 2, type: "spring", stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-[#25D366] text-white shadow-[0_12px_30px_rgba(37,211,102,0.32)] hover:shadow-[0_18px_36px_rgba(37,211,102,0.42)]"
      aria-label="Fale pelo WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </motion.a>
  );
}

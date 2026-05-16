import { motion } from "motion/react";
import { SiWhatsapp } from "react-icons/si";

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/919776376441"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      data-ocid="whatsapp.button"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] backdrop-blur-md border border-[#25D366]/60 shadow-[0_0_25px_rgba(37,211,102,0.35)] transition-smooth"
    >
      <SiWhatsapp className="h-7 w-7 text-white" />
    </motion.a>
  );
}

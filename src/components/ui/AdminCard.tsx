"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Ornament } from "@/components/decorative/Ornament";

interface AdminCardProps {
  index: number;
}

export function AdminCard({ index }: AdminCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.9,
        delay: 0.2 + index * 0.15,
        ease: "easeOut",
      }}
      className="sm:col-start-2"
    >
      <Link
        href="/admin"
        className="group relative block overflow-hidden touch-manipulation"
        aria-label="Panel de Pedro"
      >
        <div className="relative aspect-[1949/3048] overflow-hidden">
          {/* Fotografía */}
          <Image
            src="/media/pedro/pedro.jpeg"
            alt="Pedro"
            fill
            priority
            className="
              object-cover
              transition-transform duration-1000 ease-out
              group-hover:scale-105
              group-active:scale-105
            "
            sizes="(max-width: 768px) 80vw, 30vw"
          />

          {/* Oscurecimiento cinematográfico */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-t
              from-black/80
              via-black/15
              to-black/5
            "
          />

          {/* Brillo especial */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.08, 0] }}
            transition={{
              duration: 4,
              delay: 1.8,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "easeInOut",
            }}
            style={{
              background:
                "radial-gradient(circle at 50% 35%, rgba(201,168,76,0.8), transparent 55%)",
            }}
          />

          {/* Hover */}
          <div
            className="
              absolute inset-0
              bg-black/0
              group-hover:bg-black/20
              group-active:bg-black/25
              transition-colors duration-500
            "
          />

          {/* Ornamentos */}
          <Ornament
            position="top-left"
            size={32}
            opacity={0.45}
            className="top-3 left-3"
          />

          <Ornament
            position="top-right"
            size={32}
            opacity={0.45}
            className="top-3 right-3"
          />

          {/* Borde dorado */}
          <div
            className="
              absolute inset-0
              border
              opacity-20
              group-hover:opacity-60
              group-active:opacity-70
              transition-opacity duration-500
              pointer-events-none
            "
            style={{ borderColor: "var(--auralia-gold)" }}
          />

          {/* Nombre */}
          <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
            <p
              className="
                font-display text-[10px]
                tracking-[0.35em]
                uppercase mb-1
              "
              style={{
                color: "var(--auralia-gold)",
                opacity: 0.85,
              }}
            >
              el guardián
            </p>

            <h2
              className="font-display text-2xl md:text-3xl"
              style={{
                color: "var(--auralia-parchment)",
              }}
            >
              Pedro
            </h2>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
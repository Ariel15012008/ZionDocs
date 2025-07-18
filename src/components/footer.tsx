"use client"

import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import {
  Mail,
  Phone,
  Home,
  HelpCircle,
  FileText,
  User,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full bg-slate-900/90 backdrop-blur-xl border-t border-blue-500/20 relative overflow-hidden"
    >

      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Marca */}
          <motion.div variants={itemVariants} className="flex flex-col space-y-4">
            <motion.div whileHover={{ scale: 1.05 }}>
              <div className="flex items-center gap-3">
                <User className="w-8 h-8 text-blue-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  ZionDocs
                </span>
              </div>
            </motion.div>
            <p className="text-blue-200 leading-relaxed">
              Conectando colaboradores ao RH com tecnologia e transparência.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -3, scale: 1.1 }}
                  href="#"
                  className="w-10 h-10 rounded-full bg-blue-900/50 border border-blue-500/30 flex items-center justify-center text-blue-300 hover:text-white"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-400 mb-4">Links</h3>
            <ul className="space-y-3">
              {[
                { to: "/", icon: <Home className="w-4 h-4" />, label: "Início" },
                { to: "/documents", icon: <FileText className="w-4 h-4" />, label: "Documentos" },
                { to: "/contact", icon: <Mail className="w-4 h-4" />, label: "Contato" },
                { to: "/help", icon: <HelpCircle className="w-4 h-4" />, label: "Ajuda" },
              ].map((link) => (
                <motion.li key={link.to} whileHover={{ x: 5 }}>
                  <a
                    href={link.to}
                    className="text-blue-200 hover:text-blue-300 flex items-center gap-2 transition-colors"
                  >
                    {link.icon}
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contato */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-400 mb-4">Contato</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-blue-200">Email</p>
                  <a
                    href="mailto:contato@ZionDocs.com"
                    className="text-blue-300 hover:text-white hover:underline transition-colors"
                  >
                    contato@ZionDocs.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-blue-200">Telefone</p>
                  <a
                    href="tel:+5511999999999"
                    className="text-blue-300 hover:text-white hover:underline transition-colors"
                  >
                    (11) 99999-9999
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-400 mb-4">Newsletter</h3>
            <p className="text-blue-200">Cadastre-se para receber atualizações do RH.</p>
            <div className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Seu email"
                className="px-4 py-2 bg-blue-900/50 border border-blue-500/30 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-medium py-2 rounded-lg shadow-md transition-all">
                  Assinar
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div variants={itemVariants} className="border-t border-blue-500/30 py-6">
        <div className="container mx-auto px-6 text-center text-blue-300 text-sm">
          © {currentYear} <span className="text-blue-400 font-semibold">ZionDocs</span>. Todos os direitos reservados.
        </div>
      </motion.div>
    </motion.footer>
  )
}

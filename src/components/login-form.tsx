"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import type { Variants } from "framer-motion";
import { easeOut } from "framer-motion";
import FloatingParticles from "./floating-particles";

// Mock components for demonstration
const Button = ({ children, onClick, className, style, type }: any) => (
  <button onClick={onClick} className={className} style={style} type={type}>
    {children}
  </button>
);

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  className,
  required,
}: any) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={className}
    required={required}
  />
);

const SocialIcons = () => <div></div>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: easeOut,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-[#0a0e17] to-[#1a1f2e] flex justify-center items-center relative overflow-hidden">
      <FloatingParticles />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileHover={{
          y: -5,
          boxShadow:
            "0 15px 75px rgba(6, 128, 241, 0.5), 0 0 30px rgba(64, 156, 255, 0.3)",
          transition: {
            duration: 0.3,
            ease: "easeOut",
          },
        }}
        className="relative w-full max-w-md p-8 bg-slate-900/85 backdrop-blur-xl rounded-2xl border border-blue-500/20 shadow-2xl overflow-hidden z-10 mx-4"
        style={{
          boxShadow:
            "0 5px 75px rgba(6, 128, 241, 0.3), 0 0 20px rgba(64, 156, 255, 0.1)",
        }}
      >
        {/* Shine Effect */}
        <motion.div
          initial={{ x: "-100%", y: "-100%" }}
          animate={{ x: "100%", y: "100%" }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom right, transparent 0%, transparent 50%, rgba(64, 156, 255, 0.1) 50%, rgba(64, 156, 255, 0.1) 100%)",
            transform: "rotate(30deg) scale(2)",
          }}
        />

        {/* Header com ícone */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            <User className="w-12 h-12 text-blue-400 drop-shadow-lg" />
          </motion.div>

          <motion.h1
            className="text-2xl font-semibold text-gray-100 mb-3 tracking-wide"
            style={{ textShadow: "0 2px 5px rgba(0, 0, 0, 0.2)" }}
          >
            Acesso
          </motion.h1>
          <motion.p className="text-gray-300 text-lg font-medium ">
            Por favor, faça login para continuar
          </motion.p>
          <motion.div
            className="w-16 h-1 mx-auto mt-4 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, #409cff, transparent)",
            }}
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.div>

        {/* Formulário */}
        <div className="space-y-6">
          <motion.div variants={itemVariants}>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 z-10" />
              <Input
                type="text"
                placeholder="Nome de usuário ou e-mail"
                value={formData.username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full pl-12 pr-4 py-3 text-sm bg-slate-800/70 border border-blue-500/20 rounded-lg text-gray-100 focus:border-blue-500/80 focus:ring-2 focus:ring-blue-500/20 focus:bg-slate-700/70 transition-all duration-300"
                required
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-4 h-4" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={formData.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="text-gray-100 w-full pl-10 pr-8 py-2.5 text-sm bg-slate-800/70 border border-blue-500/20 rounded-lg focus:border-blue-500/80 focus:ring-2 focus:ring-blue-500/20 focus:bg-slate-700/70 transition-all duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-blue-400 rounded-md hover:bg-slate-700/30 transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex justify-end items-center text-sm"
          >
            <motion.a
              href="#"
              className="text-[#646cff] hover:text-blue-500 hover:underline transition-all duration-300 hover:scale-105"
            >
              Esqueceu a senha?
            </motion.a>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{
                y: -2,
                boxShadow: "0 6px 20px rgba(64, 156, 255, 0.4)",
              }}
              whileTap={{ y: 0 }}
              className="relative overflow-hidden rounded-lg"
            >
              <Button
                type="submit"
                className="w-full py-3 text-sm bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-medium rounded-lg transition-all duration-300 relative overflow-hidden"
                style={{ boxShadow: "0 4px 15px rgba(64, 156, 255, 0.3)" }}
                onClick={handleSubmit}
              >
                <span className="relative text-[20px] z-10">Entrar</span>
                <motion.div
                  className="absolute inset-0 w-full h-full opacity-0 hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(to bottom right, transparent 0%, transparent 45%, rgba(255, 255, 255, 0.3) 50%, transparent 55%, transparent 100%)",
                    transform: "rotate(30deg) scale(2)",
                  }}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <SocialIcons />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="text-center text-sm text-gray-400"
          >
            Não tem uma conta?{" "}
            <motion.a
              href="#"
              className="text-blue-400 font-medium hover:text-blue-300 hover:underline transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              Registre-se
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

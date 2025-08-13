"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import type { Variants } from "framer-motion";
import { easeOut } from "framer-motion";
import FloatingParticles from "./floating-particles";
import api from "@/utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.email("E-mail inválido"),
  senha: z.string().min(6, "Mínimo de 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
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

  const onSubmit = async (data: FormData) => {
    try {
      const response = await api.post("/users/login", data);
      console.log("Login realizado:", response.data);
      alert("Login realizado com sucesso!");
      navigate("/"); // ✅ REDIRECIONAMENTO ADICIONADO
    } catch (error: any) {
      console.error("Erro no login:", error.response?.data || error.message);
      alert("Falha no login: verifique seu e-mail e senha.");
    }
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
          boxShadow: "0 15px 75px rgba(6, 128, 241, 0.5), 0 0 30px rgba(64, 156, 255, 0.3)",
          transition: {
            duration: 0.3,
            ease: "easeOut",
          },
        }}
        className="relative w-full max-w-md p-8 bg-slate-900/85 backdrop-blur-xl rounded-2xl border border-blue-500/20 shadow-2xl overflow-hidden z-10 mx-4"
        style={{
          boxShadow: "0 5px 75px rgba(6, 128, 241, 0.3), 0 0 20px rgba(64, 156, 255, 0.1)",
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

        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            <User className="w-12 h-12 text-blue-400 drop-shadow-lg" />
          </motion.div>

          <motion.h1 className="text-2xl font-semibold text-gray-100 mb-3 tracking-wide">
            Acesso
          </motion.h1>
          <motion.p className="text-gray-300 text-lg font-medium">
            Por favor, faça login para continuar
          </motion.p>
          <motion.div
            className="w-16 h-1 mx-auto mt-4 rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, #409cff, transparent)" }}
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <motion.div variants={itemVariants}>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 z-10" />
              <input
                type="email"
                {...register("email")}
                placeholder="E-mail"
                className="w-full pl-12 pr-4 py-3 text-sm bg-slate-800/70 border border-blue-500/20 rounded-lg text-gray-100"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </motion.div>

          {/* Senha */}
          <motion.div variants={itemVariants}>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-4 h-4" />
              <input
                type={showPassword ? "text" : "password"}
                {...register("senha")}
                placeholder="Senha"
                className="text-gray-100 w-full pl-10 pr-8 py-2.5 text-sm bg-slate-800/70 border border-blue-500/20 rounded-lg"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              {errors.senha && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.senha.message}
                </p>
              )}
            </div>
          </motion.div>

          {/* Esqueceu a senha */}
          <motion.div variants={itemVariants} className="flex justify-end text-sm">
            <motion.a
              href="#"
              className="text-[#646cff] hover:text-blue-500 hover:underline transition-all duration-300 hover:scale-105"
            >
              Esqueceu a senha?
            </motion.a>
          </motion.div>

          {/* Botão Login */}
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ y: -2, boxShadow: "0 6px 20px rgba(64, 156, 255, 0.4)" }}
              whileTap={{ y: 0 }}
              className="relative overflow-hidden rounded-lg"
            >
              <button
                type="submit"
                className="w-full py-3 text-sm bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-medium rounded-lg"
                style={{ boxShadow: "0 4px 15px rgba(64, 156, 255, 0.3)" }}
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
              </button>
            </motion.div>
          </motion.div>

          {/* Criar conta */}
          <motion.div variants={itemVariants} className="text-center text-sm text-gray-400">
            Não tem uma conta?{" "}
            <motion.a
              href="/register"
              className="text-blue-400 font-medium hover:text-blue-300 hover:underline transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              Registre-se
            </motion.a>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
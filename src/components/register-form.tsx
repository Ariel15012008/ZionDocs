"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IMaskInput } from "react-imask";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { easeOut } from "framer-motion";

import FloatingParticles from "@/components/floating-particles";
import api from "@/utils/axiosInstance";

const schema = z
  .object({
    nome: z.string().min(3, "Nome é obrigatório"),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
    email: z.string().email("E-mail inválido"),
    senha: z.string().min(6, "Mínimo de 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.senha === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const { confirmPassword, ...payload } = data;
      const response = await api.post("/users/registro", payload);
      alert("Registro realizado com sucesso!");
      console.log(response.data);
    } catch (error: any) {
      console.error(
        "Erro ao registrar:",
        error.response?.data || error.message
      );
      alert("Erro ao registrar usuário.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
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

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-[#0a0e17] to-[#1a1f2e] flex justify-center items-center relative overflow-hidden">
      <FloatingParticles />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-md p-8 bg-slate-900/85 backdrop-blur-xl rounded-2xl border border-blue-500/20 shadow-2xl overflow-hidden z-10 mx-4"
        style={{
          boxShadow:
            "0 5px 75px rgba(6, 128, 241, 0.3), 0 0 20px rgba(64, 156, 255, 0.1)",
        }}
      >
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
            Criar Conta
          </motion.h1>
          <motion.p className="text-gray-300 text-lg font-medium">
            Preencha seus dados para se registrar
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nome */}
          <motion.div variants={itemVariants}>
            <div className="relative">
              <User className="absolute left-4 top-3.5 text-blue-400 w-5 h-5 z-10" />
              <input
                {...register("nome")}
                placeholder="Nome completo"
                onInput={(e) => {
                  const input = e.currentTarget;
                  input.value = input.value.replace(/[0-9]/g, "");
                }}
                className="w-full pl-12 pr-4 py-3 text-sm bg-slate-800/70 border border-blue-500/20 rounded-lg text-gray-100"
              />
              {errors.nome && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.nome.message}
                </p>
              )}
            </div>
          </motion.div>

          {/* CPF */}
          <motion.div variants={itemVariants}>
            <div className="relative">
              <User className="absolute left-4 top-3.5 text-blue-400 w-5 h-5 z-10" />
              <IMaskInput
                mask="000.000.000-00"
                placeholder="CPF"
                onAccept={(value: any) => setValue("cpf", value)}
                className="w-full pl-12 pr-4 py-3 text-sm bg-slate-800/70 border border-blue-500/20 rounded-lg text-gray-100"
              />
              {errors.cpf && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.cpf.message}
                </p>
              )}
            </div>
          </motion.div>

          {/* Email */}
          <motion.div variants={itemVariants}>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-blue-400 w-5 h-5 z-10" />
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
              <Lock className="absolute left-3 top-3 text-blue-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                {...register("senha")}
                placeholder="Senha"
                className="text-gray-100 w-full pl-10 pr-8 py-2.5 text-sm bg-slate-800/70 border border-blue-500/20 rounded-lg"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 p-1 text-gray-400"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
              {errors.senha && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.senha.message}
                </p>
              )}
            </div>
          </motion.div>

          {/* Botão */}
          <motion.div variants={itemVariants} className="pt-2">
            <button
              type="submit"
              className="w-full py-3 text-sm bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-medium rounded-lg transition-all duration-300"
              style={{ boxShadow: "0 4px 15px rgba(64, 156, 255, 0.3)" }}
            >
              Registrar
            </button>
          </motion.div>

          {/* Link Login */}
          <motion.div
            variants={itemVariants}
            className="text-center text-sm text-gray-400 pt-2"
          >
            Já tem uma conta?{" "}
            <motion.a
              href="/Login"
              className="text-blue-400 font-medium hover:text-blue-300 hover:underline transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              Faça login
            </motion.a>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { User, Mail, Home, HelpCircle, Menu, X, FileText } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "@/utils/axiosInstance";
import { Button } from "@/components/ui/button";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ✅ Lógica de autenticação
  const [user, setUser] = useState<{ nome: string; email: string } | null>(
    null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);
  const didRun = useRef(false);

  type UserData = {
    nome: string;
    email: string;
  };

  const silentAuth = async () => {
    try {
      const res = await api.get<UserData>("/user00s/me");
      if (res.status === 200) {
        setUser({ nome: res.data.nome, email: res.data.email });
        setIsAuthenticated(true);
      }
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoadingUserInfo(false);
    }
  };

  useEffect(() => {
    if (!didRun.current) {
      silentAuth();
      didRun.current = true;
    }
  }, []);

  const logout = async () => {
    try {
      await api.post("/users/logout");
      setUser(null);
      setIsAuthenticated(false);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const mobileMenuVariants: Variants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const navItems = [
    { path: "/", icon: <Home className="w-5 h-5" />, label: "Início" },
    {
      path: "/documents",
      icon: <FileText className="w-5 h-5" />,
      label: "Documentos",
    },
    { path: "/contact", icon: <Mail className="w-5 h-5" />, label: "Contato" },
    { path: "/help", icon: <HelpCircle className="w-5 h-5" />, label: "Ajuda" },
  ];

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="fixed top-0 w-full bg-slate-900/90 backdrop-blur-xl z-50 border-b border-blue-500/20 shadow-lg"
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
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom right, transparent 0%, transparent 50%, rgba(64, 156, 255, 0.1) 50%, rgba(64, 156, 255, 0.1) 100%)",
          transform: "rotate(30deg) scale(2)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center gap-2">
              <User className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                ZionDocs
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                variants={itemVariants}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? "bg-blue-900/30 text-blue-400"
                      : "text-gray-300 hover:text-blue-300 hover:bg-blue-900/20"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Auth Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated && !loadingUserInfo ? (
              <div className="text-sm text-blue-300 flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{user?.nome}</span>
                <button
                  onClick={logout}
                  className="text-red-400 hover:text-red-300 text-xs border border-red-400 px-2 py-1 rounded"
                >
                  Sair
                </button>
              </div>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                className="text-sm bg-white text-blue-600 hover:bg-blue-100 hover:cursor-pointer"
              >
                Entrar
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.div variants={itemVariants} className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-blue-900/50 border border-blue-500/30 text-blue-300 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial="hidden"
          animate={mobileMenuOpen ? "visible" : "hidden"}
          exit="exit"
          variants={mobileMenuVariants}
          className="md:hidden overflow-hidden"
        >
          <div className="pt-2 pb-4 space-y-2">
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                variants={itemVariants}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? "bg-blue-900/30 text-blue-400"
                      : "text-gray-300 hover:bg-blue-900/20"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              </motion.div>
            ))}

            {isAuthenticated && !loadingUserInfo ? (
              <div className="text-sm text-blue-300 text-center mt-2">
                <p>
                  Olá, <strong>{user?.nome}</strong>
                </p>
                <button
                  onClick={logout}
                  className="mt-2 text-red-400 hover:text-red-300 text-xs border border-red-400 px-2 py-1 rounded"
                >
                  Sair
                </button>
              </div>
            ) : (
              <div className="flex justify-center mt-2">
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/login");
                  }}
                  className="text-sm bg-white text-blue-600 hover:bg-blue-100"
                >
                  Entrar
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}

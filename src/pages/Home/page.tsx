"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Bell, HelpCircle, Receipt, FileSearch, Settings } from "lucide-react"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import api from "@/utils/axiosInstance"
import { Button } from "@/components/ui/button"

interface Documento {
  id: number
  nome: string
  icone?: string
  descricao?: string
}

interface TemplateGED {
  id_tipo: string
}

export default function Home() {
  const [documentos, setDocumentos] = useState<Documento[]>([])
  const [idTemplate, setIdTemplate] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [loadingDocs, setLoadingDocs] = useState<boolean>(false)
  const [notificacoes] = useState<number>(3)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Painel do Trabalhador"
    const verificarSessao = async () => {
      try {
        await api.get("/users/me")
        setIsAuthenticated(true)
        setLoadingDocs(true)
        const [resDocs, resTemplates] = await Promise.all([
          api.get<Documento[]>("/documents"),
          api.get<TemplateGED[]>("/searchdocuments/templates"),
        ])
        const documentosCompletos = resDocs.data.map((doc) => ({
          ...doc,
          icone: getRandomIcon(),
          descricao: getRandomDescription(doc.nome),
        }))
        setDocumentos(documentosCompletos)
        setIdTemplate(resTemplates.data[0]?.id_tipo || null)
      } catch (error) {
        setIsAuthenticated(false)
        console.warn("Usuário não autenticado:", error)
      } finally {
        setLoadingDocs(false)
      }
    }
    verificarSessao()
  }, [])

  const getRandomIcon = () => {
    const icons = ["📄", "📑", "📊", "📝", "🗂️", "📎", "📌", "🏷️"]
    return icons[Math.floor(Math.random() * icons.length)]
  }

  const getRandomDescription = (nome: string) => {
    const descricoes = [
      `Acesse seus ${nome.toLowerCase()} mais recentes`,
      `Visualize e baixe ${nome.toLowerCase()}`,
      `Todos os ${nome.toLowerCase()} disponíveis`,
      `Documentos relacionados a ${nome.toLowerCase()}`,
    ]
    return descricoes[Math.floor(Math.random() * descricoes.length)]
  }

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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0a0e17] to-[#184dec]">
      <div className="fixed inset-0 bg-gradient-to-br from-[#0a0e17] to-[#1a1f2e] z-0" />

      <Header />

      <main className="flex-grow flex items-center justify-center relative pt-24 pb-16">
        {isAuthenticated === null ? (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white text-2xl font-bold">
            Carregando dados...
          </motion.p>
        ) : !isAuthenticated ? (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-4xl mx-4"
          >
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-slate-900/10 backdrop-blur-lg rounded-xl border border-blue-500/20 shadow-xl p-6"
            >
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-24 h-24 rounded-full overflow-hidden"
                >
                  <img
                    src="https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-aa78-61f7-bf97-e0fef6566eb9/raw?se=2025-07-18T13%3A12%3A30Z&sp=r&sv=2024-08-04&sr=b&scid=9960c8e7-01eb-5d29-b0e9-2c3d70151ae0&skoid=9ccea605-1409-4478-82eb-9c83b25dc1b0&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-07-18T02%3A38%3A09Z&ske=2025-07-19T02%3A38%3A09Z&sks=b&skv=2024-08-04&sig=geYoIBlSlZG8hmIGy%2Bl3QAP1V2v%2BK6R2no7yts6dlWQ%3D"
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl font-bold text-blue-300 mb-2">SEJA BEM-VINDO AO ZionDocs</h1>
                  <p className="text-gray-300">O ZionDocs é o seu portal de comunicação com o RH da Empresa.</p>
                </div>
              </div>

              {/* NOVO BOTÃO DE LOGIN */}
              <motion.div whileHover={{ scale: 1.02 }} className="mt-6 flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => navigate("/login")}
                  className="border-blue-400 text-blue-300 hover:text-white hover:bg-blue-600 transition-all"
                >
                  Faça login para acessar seu painel
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : loadingDocs ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
              className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mb-4 mx-auto"
            />
            <p className="text-xl font-bold text-white">Carregando seus documentos...</p>
          </motion.div>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-7xl px-4">
            <motion.div variants={itemVariants} className="flex justify-between items-center mb-10">
              <div>
                <h1 className="text-3xl font-bold text-white">Olá, Trabalhador!</h1>
                <p className="text-gray-400">Bem-vindo ao seu painel de documentos</p>
              </div>
              <motion.div whileHover={{ scale: 1.1 }} className="relative cursor-pointer">
                <Bell className="w-6 h-6 text-blue-400" />
                {notificacoes > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                    {notificacoes}
                  </span>
                )}
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {[
                { icon: <Receipt size={20} />, label: "Recibos", color: "from-green-500 to-green-600" },
                { icon: <FileSearch size={20} />, label: "Consultas", color: "from-purple-500 to-purple-600" },
                { icon: <HelpCircle size={20} />, label: "Ajuda", color: "from-blue-500 to-blue-600" },
                { icon: <Settings size={20} />, label: "Configurações", color: "from-yellow-500 to-yellow-600" },
              ].map((action, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`bg-gradient-to-r ${action.color} rounded-lg p-4 flex items-center gap-3 cursor-pointer shadow-md`}
                >
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">{action.icon}</div>
                  <span className="text-white font-medium">{action.label}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {documentos.map(({ id, nome, icone, descricao }) => (
                <motion.div
                  key={id}
                  variants={itemVariants}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
                  onClick={() => navigate(`/documentos/${idTemplate}?valor=${encodeURIComponent(nome)}`)}
                  className="bg-slate-900/80 backdrop-blur-sm rounded-xl border border-blue-500/20 overflow-hidden cursor-pointer"
                >
                  <div className="p-6 flex flex-col items-center">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20 mb-4 text-2xl">
                      {icone}
                    </div>
                    <h3 className="text-lg font-semibold text-center text-white mb-2">{nome}</h3>
                    <p className="text-gray-400 text-sm text-center">{descricao}</p>
                  </div>
                  <div className="bg-blue-500/10 border-t border-blue-500/20 p-3 text-center text-blue-400 text-sm">
                    Clique para acessar
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </main>
        <div className="w-screen">
          <Footer />
        </div>
    </div>
  )
}

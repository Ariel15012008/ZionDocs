"use client"

import { motion } from "framer-motion"

const socialIcons = [
  { name: "Google", icon: "🔍", color: "hover:text-red-400" },
  { name: "Facebook", icon: "📘", color: "hover:text-blue-400" },
  { name: "Twitter", icon: "🐦", color: "hover:text-sky-400" },
  { name: "LinkedIn", icon: "💼", color: "hover:text-blue-600" },
]

export default function SocialIcons() {
  return (
    <div className="mt-8 text-center">
      <div className="relative mb-6">
        <p className="text-gray-400 text-sm relative z-10 bg-slate-900 px-4 inline-block">Ou entre com</p>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        {socialIcons.map((social, index) => (
          <motion.div
            key={social.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            whileHover={{
              y: -3,
              scale: 1.1,
              boxShadow: "0 5px 15px rgba(64, 156, 255, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            className={`w-12 h-12 rounded-full bg-slate-800/70 border border-blue-500/20 flex items-center justify-center text-gray-400 cursor-pointer transition-all duration-300 ${social.color} hover:border-blue-500/50 hover:bg-blue-500/10`}
          >
            <span className="text-xl">{social.icon}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

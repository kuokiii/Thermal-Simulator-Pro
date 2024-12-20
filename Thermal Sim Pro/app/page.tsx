"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, BarChart3, Database, Gauge, Settings } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative min-h-screen">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-20 w-20 rounded-full bg-gradient-to-br from-emerald-200/20 to-cyan-200/20 blur-xl"
              initial={{
                x: Math.random() * windowSize.width,
                y: Math.random() * windowSize.height,
              }}
              animate={{
                x: Math.random() * windowSize.width,
                y: Math.random() * windowSize.height,
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <div className="container flex h-screen items-center justify-center">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-5xl font-bold tracking-tighter text-transparent sm:text-6xl xl:text-7xl/none"
            >
              Industrial Heat Transfer
              <br />
              Simulation Made Simple
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mt-6 max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400"
            >
              Advanced simulation tools for analyzing and optimizing heat exchangers in industrial applications.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <Link href="/simulation">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="container py-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent"
        >
          Key Features
        </motion.h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/10">
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-emerald-500" />
                  <CardTitle className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                    {feature.title}
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

const features = [
  {
    icon: Gauge,
    title: "Heat Transfer Calculations",
    description: "Accurate calculations for conduction, convection, and radiation principles",
  },
  {
    icon: BarChart3,
    title: "Efficiency Analysis",
    description: "Evaluate system efficiency and get optimization recommendations",
  },
  {
    icon: Database,
    title: "Material Database",
    description: "Comprehensive library of thermal properties for common materials",
  },
  {
    icon: Settings,
    title: "System Optimization",
    description: "Advanced tools for cost and performance optimization",
  },
]


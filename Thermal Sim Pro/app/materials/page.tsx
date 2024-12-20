"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const materials = [
  {
    name: "Copper",
    category: "Metal",
    thermalConductivity: 385,
    specificHeat: 0.385,
    density: 8960,
    maxTemp: 1085,
  },
  {
    name: "Aluminum",
    category: "Metal",
    thermalConductivity: 205,
    specificHeat: 0.900,
    density: 2700,
    maxTemp: 660,
  },
  {
    name: "Steel (AISI 304)",
    category: "Metal",
    thermalConductivity: 16.2,
    specificHeat: 0.500,
    density: 8000,
    maxTemp: 1450,
  },
  {
    name: "Titanium",
    category: "Metal",
    thermalConductivity: 21.9,
    specificHeat: 0.523,
    density: 4500,
    maxTemp: 1668,
  },
  {
    name: "Graphite",
    category: "Carbon",
    thermalConductivity: 168,
    specificHeat: 0.720,
    density: 2200,
    maxTemp: 3000,
  },
  {
    name: "Silicon Carbide",
    category: "Ceramic",
    thermalConductivity: 120,
    specificHeat: 0.670,
    density: 3210,
    maxTemp: 2730,
  },
  {
    name: "Stainless Steel 316",
    category: "Metal",
    thermalConductivity: 16.3,
    specificHeat: 0.500,
    density: 8000,
    maxTemp: 1375,
  },
  {
    name: "Brass",
    category: "Metal",
    thermalConductivity: 109,
    specificHeat: 0.380,
    density: 8500,
    maxTemp: 900,
  },
  {
    name: "Nickel",
    category: "Metal",
    thermalConductivity: 90.7,
    specificHeat: 0.444,
    density: 8908,
    maxTemp: 1455,
  },
  {
    name: "Alumina",
    category: "Ceramic",
    thermalConductivity: 30,
    specificHeat: 0.880,
    density: 3960,
    maxTemp: 2072,
  },
]

export default function MaterialsPage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(materials.map((m) => m.category)))

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch = material.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = !selectedCategory || material.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container min-h-screen py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Materials Database</h1>
            <p className="text-muted-foreground">
              Comprehensive database of material properties for heat exchangers
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search materials..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          <Badge
            variant={selectedCategory === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="rounded-lg border bg-gradient-to-br from-emerald-50 to-cyan-50">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Thermal Conductivity (W/m·K)</TableHead>
                <TableHead>Specific Heat (kJ/kg·K)</TableHead>
                <TableHead>Density (kg/m³)</TableHead>
                <TableHead>Max Temperature (°C)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMaterials.map((material, index) => (
                <motion.tr
                  key={material.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group cursor-pointer transition-colors hover:bg-muted/50"
                >
                  <TableCell className="font-medium">{material.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{material.category}</Badge>
                  </TableCell>
                  <TableCell>{material.thermalConductivity}</TableCell>
                  <TableCell>{material.specificHeat}</TableCell>
                  <TableCell>{material.density}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {material.maxTemp}
                      <div className="h-2 w-20 overflow-hidden rounded-full bg-muted">
                        <motion.div
                          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(material.maxTemp / 3000) * 100}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </div>
  )
}


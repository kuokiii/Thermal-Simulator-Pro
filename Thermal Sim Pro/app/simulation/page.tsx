"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertCircle, HelpCircle, ThermometerSun } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface SimulationResults {
  heatTransferRate: number
  effectiveness: number
  pressureDrop: number
  reynoldsNumber: number
  nusseltNumber: number
  heatTransferCoefficient: number
  overallHeatTransferCoefficient: number
  frictionFactor: number
  pressureDropRatio: number
  capacityRatio: number
  NTU: number
}

const fluidProperties = {
  water: { density: 997, specificHeat: 4186, viscosity: 0.001, thermalConductivity: 0.598, prandtlNumber: 7.01, criticalPoint: 647.13 },
  oil: { density: 900, specificHeat: 1900, viscosity: 0.03, thermalConductivity: 0.145, prandtlNumber: 394.48, criticalPoint: 600 }, // Added critical point for oil
  air: { density: 1.225, specificHeat: 1005, viscosity: 0.0000181, thermalConductivity: 0.024, prandtlNumber: 0.76, criticalPoint: 132.2 }, // Added critical point for air
  "ethylene-glycol": { density: 1113, specificHeat: 2460, viscosity: 0.0157, thermalConductivity: 0.258, prandtlNumber: 150, criticalPoint: 500 }, // Added critical point for ethylene-glycol
  steam: { density: 0.590, specificHeat: 2080, viscosity: 0.0000134, thermalConductivity: 0.0248, prandtlNumber: 1.13, criticalPoint: 647.13 }, // Added critical point for steam
  "refrigerant-r134a": { density: 1206, specificHeat: 1424, viscosity: 0.000211, thermalConductivity: 0.0824, prandtlNumber: 3.64, criticalPoint: 374.21 }, // Added critical point for refrigerant-r134a
  glycerin: { density: 1261, specificHeat: 2427, viscosity: 1.412, thermalConductivity: 0.285, prandtlNumber: 12022, criticalPoint: 564 }, // Added critical point for glycerin
  methanol: { density: 792, specificHeat: 2484, viscosity: 0.00059, thermalConductivity: 0.203, prandtlNumber: 7.2, criticalPoint: 512.6 }, // Added critical point for methanol
  ammonia: { density: 681.9, specificHeat: 4700, viscosity: 0.00025, thermalConductivity: 0.52, prandtlNumber: 2.26, criticalPoint: 405.5 }, // Added critical point for ammonia
  helium: { density: 0.1785, specificHeat: 5193, viscosity: 0.0000186, thermalConductivity: 0.1513, prandtlNumber: 0.64, criticalPoint: 5.2 }, // Added critical point for helium
  nitrogen: { density: 1.251, specificHeat: 1040, viscosity: 0.0000179, thermalConductivity: 0.0259, prandtlNumber: 0.72, criticalPoint: 126.2 }, // Added critical point for nitrogen
  hydrogen: { density: 0.0899, specificHeat: 14304, viscosity: 0.0000087, thermalConductivity: 0.1805, prandtlNumber: 0.69, criticalPoint: 33.2 }, // Added critical point for hydrogen
  oxygen: { density: 1.429, specificHeat: 919, viscosity: 0.0000203, thermalConductivity: 0.0262, prandtlNumber: 0.71, criticalPoint: 154.6 }, // Added critical point for oxygen
  "carbon-dioxide": { density: 1.98, specificHeat: 844, viscosity: 0.0000147, thermalConductivity: 0.0146, prandtlNumber: 0.85, criticalPoint: 304.2 }, // Added critical point for carbon-dioxide
  mercury: { density: 13534, specificHeat: 139, viscosity: 0.00152, thermalConductivity: 8.34, prandtlNumber: 0.025, criticalPoint: 1750 }, // Added critical point for mercury
  "engine-oil": { density: 885, specificHeat: 1909, viscosity: 0.29, thermalConductivity: 0.145, prandtlNumber: 3800, criticalPoint: 600 }, // Added critical point for engine-oil
  "transformer-oil": { density: 880, specificHeat: 1860, viscosity: 0.019, thermalConductivity: 0.12, prandtlNumber: 295, criticalPoint: 600 }, // Added critical point for transformer-oil
  "ethanol": { density: 789, specificHeat: 2470, viscosity: 0.0012, thermalConductivity: 0.171, prandtlNumber: 17.3, criticalPoint: 514 }, // Added critical point for ethanol
  "propylene-glycol": { density: 1036, specificHeat: 2510, viscosity: 0.042, thermalConductivity: 0.2, prandtlNumber: 528, criticalPoint: 500 } // Added critical point for propylene-glycol
}

export default function SimulationPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<SimulationResults | null>(null)
  const [formData, setFormData] = useState({
    type: "",
    fluidType: "",
    inletTemp: "",
    outletTemp: "",
    flowRate: "",
    diameter: "",
    length: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError(null)
  }

  const calculateResults = () => {
    try {
      const {
        type,
        fluidType,
        inletTemp,
        outletTemp,
        flowRate,
        diameter,
        length,
      } = formData

      if (!type || !fluidType || !inletTemp || !outletTemp || !flowRate || !diameter || !length) {
        throw new Error("Please fill in all required fields")
      }

      const fluid = fluidProperties[fluidType as keyof typeof fluidProperties]
      const maxAllowableTemp = 0.9 * fluid.criticalPoint // Assuming 90% of critical point as max safe temperature
      if (parseFloat(inletTemp) > maxAllowableTemp || parseFloat(outletTemp) > maxAllowableTemp) {
        throw new Error(`Temperature exceeds maximum allowable temperature for ${fluidType}`)
      }
      const area = Math.PI * Math.pow(parseFloat(diameter) / 2, 2)
      const velocity = parseFloat(flowRate) / (fluid.density * area)
      const reynoldsNumber = (fluid.density * velocity * parseFloat(diameter)) / fluid.viscosity
      const deltaT = Math.abs(parseFloat(inletTemp) - parseFloat(outletTemp))
      //const heatTransferRate = fluid.density * parseFloat(flowRate) * fluid.specificHeat * deltaT
      
      const prandtlNumber = fluid.prandtlNumber

      // Calculate friction factor
      let frictionFactor
      if (reynoldsNumber < 2300) {
        frictionFactor = 64 / reynoldsNumber
      } else {
        frictionFactor = Math.pow(0.790 * Math.log(reynoldsNumber) - 1.64, -2)
      }

      // Calculate Nusselt number
      let nusseltNumber
      if (reynoldsNumber < 2300) {
        // Laminar flow
        nusseltNumber = 3.66 + (0.0668 * (parseFloat(diameter) / parseFloat(length)) * reynoldsNumber * prandtlNumber) / (1 + 0.04 * Math.pow((parseFloat(diameter) / parseFloat(length)) * reynoldsNumber * prandtlNumber, 2/3))
      } else if (reynoldsNumber < 10000) {
        // Transition flow
        const f = (0.790 * Math.log(reynoldsNumber) - 1.64) ** -2
        nusseltNumber = ((f / 8) * (reynoldsNumber - 1000) * prandtlNumber) / (1 + 12.7 * Math.sqrt(f / 8) * (prandtlNumber ** (2/3) - 1)) * (1 + (parseFloat(diameter) / parseFloat(length)) ** (2/3))
      } else {
        // Turbulent flow
        const f = (0.790 * Math.log(reynoldsNumber) - 1.64) ** -2
        nusseltNumber = ((f / 8) * reynoldsNumber * prandtlNumber) / (1 + 12.7 * Math.sqrt(f / 8) * (prandtlNumber ** (2/3) - 1)) * (1 + (parseFloat(diameter) / parseFloat(length)) ** (2/3))
      }

      const heatTransferCoefficient = (nusseltNumber * fluid.thermalConductivity) / parseFloat(diameter)

      const wallThickness = 0.002 // Assuming a 2mm wall thickness
      const wallThermalConductivity = 50 // Assuming stainless steel, W/(m·K)
      const overallHeatTransferCoefficient = 1 / ((1 / heatTransferCoefficient) + (wallThickness / wallThermalConductivity) + (1 / heatTransferCoefficient))

      // Calculate NTU and capacity ratio
      const heatCapacityRate = fluid.density * parseFloat(flowRate) * fluid.specificHeat
      const surfaceArea = Math.PI * parseFloat(diameter) * parseFloat(length)
      const NTU = (heatTransferCoefficient * surfaceArea) / heatCapacityRate
      const capacityRatio = 1 // Assuming single fluid stream for simplicity

      // Calculate effectiveness based on heat exchanger type
      let effectiveness
      switch (type) {
        case "counter":
          if (capacityRatio === 1) {
            effectiveness = NTU / (1 + NTU)
          } else {
            effectiveness = (1 - Math.exp(-NTU * (1 - capacityRatio))) / (1 - capacityRatio * Math.exp(-NTU * (1 - capacityRatio)))
          }
          break
        case "parallel":
          effectiveness = (1 - Math.exp(-NTU * (1 + capacityRatio))) / (1 + capacityRatio)
          break
        case "cross":
          if (capacityRatio < 1) {
            effectiveness = 1 - Math.exp((1 / capacityRatio) * Math.pow(NTU, 0.22) * (Math.exp(-capacityRatio * Math.pow(NTU, 0.78)) - 1))
          } else {
            effectiveness = 1 - Math.exp(-1 * (1 - Math.exp(-capacityRatio * Math.pow(NTU, 0.78))))
          }
          break
        default:
          throw new Error("Invalid heat exchanger type")
      }

      // Recalculate heat transfer rate based on effectiveness
      const maxPossibleHeatTransfer = heatCapacityRate * Math.abs(parseFloat(inletTemp) - parseFloat(outletTemp))
      const heatTransferRate = effectiveness * maxPossibleHeatTransfer

      const pressureDrop = (frictionFactor * parseFloat(length) * fluid.density * Math.pow(velocity, 2)) / (2 * parseFloat(diameter))
      const pressureDropRatio = pressureDrop / (0.5 * fluid.density * Math.pow(velocity, 2))

      setResults({
        heatTransferRate,
        effectiveness,
        pressureDrop,
        reynoldsNumber,
        nusseltNumber,
        heatTransferCoefficient,
        overallHeatTransferCoefficient,
        frictionFactor,
        pressureDropRatio,
        capacityRatio,
        NTU
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during calculation")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    setTimeout(() => {
      calculateResults()
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="container min-h-screen py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ThermometerSun className="h-5 w-5 text-emerald-500" />
                Heat Exchanger Simulation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="type">Heat Exchanger Type</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="counter">Counter Flow</SelectItem>
                      <SelectItem value="parallel">Parallel Flow</SelectItem>
                      <SelectItem value="cross">Cross Flow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="fluid">Working Fluid</Label>
                  <Select value={formData.fluidType} onValueChange={(value) => handleInputChange("fluidType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fluid" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(fluidProperties).map((fluid) => (
                        <SelectItem key={fluid} value={fluid}>
                          {fluid.charAt(0).toUpperCase() + fluid.slice(1).replace('-', ' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <TooltipProvider>
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="inlet-temp">Inlet Temperature (°C)</Label>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Temperature of fluid entering the system</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Input
                        id="inlet-temp"
                        type="number"
                        value={formData.inletTemp}
                        onChange={(e) => handleInputChange("inletTemp", e.target.value)}
                        placeholder="Enter temperature"
                      />
                    </div>
                  </TooltipProvider>

                  <TooltipProvider>
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="outlet-temp">Outlet Temperature (°C)</Label>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Temperature of fluid leaving the system</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Input
                        id="outlet-temp"
                        type="number"
                        value={formData.outletTemp}
                        onChange={(e) => handleInputChange("outletTemp", e.target.value)}
                        placeholder="Enter temperature"
                      />
                    </div>
                  </TooltipProvider>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="flow-rate">Flow Rate (m³/s)</Label>
                    <Input
                      id="flow-rate"
                      type="number"
                      value={formData.flowRate}
                      onChange={(e) => handleInputChange("flowRate", e.target.value)}
                      placeholder="Enter flow rate"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="diameter">Pipe Diameter (m)</Label>
                    <Input
                      id="diameter"
                      type="number"
                      value={formData.diameter}
                      onChange={(e) => handleInputChange("diameter", e.target.value)}
                      placeholder="Enter diameter"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="length">Pipe Length (m)</Label>
                  <Input
                    id="length"
                    type="number"
                    value={formData.length}
                    onChange={(e) => handleInputChange("length", e.target.value)}
                    placeholder="Enter length"
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button disabled={loading} className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600">
                  {loading ? "Calculating..." : "Run Simulation"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Simulation Results</CardTitle>
            </CardHeader>
            <CardContent>
              {results ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid gap-4"
                >
                  <div className="grid gap-2">
                    <Label>Heat Transfer Rate</Label>
                    <div className="text-2xl font-bold text-emerald-500">
                      {results.heatTransferRate.toFixed(2)} W
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Heat Exchanger Effectiveness</Label>
                    <div className="text-2xl font-bold text-cyan-500">
                      {(results.effectiveness * 100).toFixed(2)}%
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Pressure Drop</Label>
                    <div className="text-2xl font-bold text-emerald-500">
                      {results.pressureDrop.toFixed(2)} Pa
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Reynolds Number</Label>
                    <div className="text-2xl font-bold text-cyan-500">
                      {results.reynoldsNumber.toFixed(2)}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Nusselt Number</Label>
                    <div className="text-2xl font-bold text-emerald-500">
                      {results.nusseltNumber.toFixed(2)}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Heat Transfer Coefficient</Label>
                    <div className="text-2xl font-bold text-cyan-500">
                      {results.heatTransferCoefficient.toFixed(2)} W/(m²·K)
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Overall Heat Transfer Coefficient</Label>
                    <div className="text-2xl font-bold text-emerald-500">
                      {results.overallHeatTransferCoefficient.toFixed(2)} W/(m²·K)
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Friction Factor</Label>
                    <div className="text-2xl font-bold text-emerald-500">
                      {results.frictionFactor.toFixed(4)}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Pressure Drop Ratio</Label>
                    <div className="text-2xl font-bold text-cyan-500">
                      {results.pressureDropRatio.toFixed(4)}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Capacity Ratio</Label>
                    <div className="text-2xl font-bold text-emerald-500">
                      {results.capacityRatio.toFixed(2)}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Number of Transfer Units (NTU)</Label>
                    <div className="text-2xl font-bold text-cyan-500">
                      {results.NTU.toFixed(2)}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Run the simulation to see results
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}


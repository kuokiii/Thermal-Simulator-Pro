"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, RefreshCcw, Thermometer } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const temperatureUnits = ["Celsius", "Fahrenheit", "Kelvin"]
const pressureUnits = ["Pascal", "Bar", "PSI", "kPa"]
const flowRateUnits = ["m³/s", "L/min", "CFM", "GPM"]

export default function ToolsPage() {
  const [temperature, setTemperature] = useState("")
  const [fromTempUnit, setFromTempUnit] = useState("Celsius")
  const [toTempUnit, setToTempUnit] = useState("Fahrenheit")
  const [convertedTemp, setConvertedTemp] = useState<number | null>(null)

  const convertTemperature = () => {
    const value = parseFloat(temperature)
    if (isNaN(value)) return

    let kelvin: number

    // Convert to Kelvin first
    switch (fromTempUnit) {
      case "Celsius":
        kelvin = value + 273.15
        break
      case "Fahrenheit":
        kelvin = (value + 459.67) * (5/9)
        break
      case "Kelvin":
        kelvin = value
        break
      default:
        return
    }

    // Convert from Kelvin to target unit
    let result: number
    switch (toTempUnit) {
      case "Celsius":
        result = kelvin - 273.15
        break
      case "Fahrenheit":
        result = kelvin * (9/5) - 459.67
        break
      case "Kelvin":
        result = kelvin
        break
      default:
        return
    }

    setConvertedTemp(parseFloat(result.toFixed(2)))
  }

  const swapUnits = () => {
    const temp = fromTempUnit
    setFromTempUnit(toTempUnit)
    setToTempUnit(temp)
    convertTemperature()
  }

  return (
    <div className="container min-h-screen py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl space-y-8"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Engineering Tools</h1>
          <p className="text-muted-foreground">
            Useful calculators and converters for heat transfer calculations
          </p>
        </div>

        <Tabs defaultValue="temperature" className="space-y-4">
          <TabsList>
            <TabsTrigger value="temperature" className="space-x-2">
              <Thermometer className="h-4 w-4" />
              <span>Temperature</span>
            </TabsTrigger>
            <TabsTrigger value="pressure">Pressure</TabsTrigger>
            <TabsTrigger value="flow">Flow Rate</TabsTrigger>
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
          </TabsList>

          <TabsContent value="temperature">
            <Card>
              <CardHeader>
                <CardTitle>Temperature Converter</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="flex items-end gap-4">
                    <div className="grid flex-1 gap-2">
                      <Label>From</Label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          value={temperature}
                          onChange={(e) => setTemperature(e.target.value)}
                          placeholder="Enter value"
                          className="flex-1"
                        />
                        <Select value={fromTempUnit} onValueChange={setFromTempUnit}>
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {temperatureUnits.map((unit) => (
                              <SelectItem key={unit} value={unit}>
                                {unit}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={swapUnits}
                      className="mb-2"
                    >
                      <RefreshCcw className="h-4 w-4" />
                    </Button>

                    <div className="grid flex-1 gap-2">
                      <Label>To</Label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          value={convertedTemp?.toString() ?? ""}
                          readOnly
                          placeholder="Result"
                          className="flex-1"
                        />
                        <Select value={toTempUnit} onValueChange={setToTempUnit}>
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {temperatureUnits.map((unit) => (
                              <SelectItem key={unit} value={unit}>
                                {unit}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={convertTemperature}
                    className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
                  >
                    Convert
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add similar content for pressure and flow rate tabs */}
        </Tabs>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Water boiling point: 100°C (212°F)</li>
                <li>Water freezing point: 0°C (32°F)</li>
                <li>Standard pressure: 101.325 kPa</li>
                <li>Room temperature: 20°C (68°F)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Conversions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>1 bar = 100 kPa</li>
                <li>1 PSI = 6.895 kPa</li>
                <li>1 m³/s = 60,000 L/min</li>
                <li>1 GPM = 0.0631 L/s</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}


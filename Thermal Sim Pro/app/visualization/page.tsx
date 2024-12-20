"use client"

import { Suspense, useState } from "react"
import { motion } from "framer-motion"
import { Download, Share2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import dynamic from 'next/dynamic'
import { LoadingView } from "./loading-view"
import { ErrorBoundary } from "./error-boundary"

const DynamicHeatExchangerView = dynamic(
  () => import('./3d-view').then((mod) => mod.HeatExchangerView),
  {
    ssr: false,
    loading: () => <LoadingView />
  }
)

export default function VisualizationPage() {
  const [flowRate, setFlowRate] = useState(1)
  const [temperature, setTemperature] = useState(50)
  const [exchangerType, setExchangerType] = useState<"counter" | "parallel" | "cross">("counter")

  // Calculate efficiency based on type and parameters
  const calculateEfficiency = () => {
    const baseEfficiency = {
      counter: 0.85,
      parallel: 0.5,
      cross: 0.65
    }[exchangerType]

    // Adjust for flow rate and temperature
    const flowFactor = 1 - Math.abs(flowRate - 2.5) / 5 // Optimal at 2.5 m/s
    const tempFactor = temperature / 100 // Higher temp = higher efficiency

    return baseEfficiency * flowFactor * tempFactor
  }

  const efficiency = calculateEfficiency()

  return (
    <div className="container min-h-screen py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl space-y-8"
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Heat Exchanger Visualization</CardTitle>
              <CardDescription>
                Fluid: Water (Default)
              </CardDescription>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="aspect-video rounded-lg border bg-[#161F25]">
              <ErrorBoundary>
                <Suspense fallback={<LoadingView />}>
                  <DynamicHeatExchangerView
                    flowRate={flowRate}
                    temperature={temperature}
                    type={exchangerType}
                  />
                </Suspense>
              </ErrorBoundary>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Flow Rate</Label>
                  <Slider
                    value={[flowRate]}
                    onValueChange={([value]) => setFlowRate(value)}
                    min={0.1}
                    max={5}
                    step={0.1}
                    className="bg-gradient-to-r from-blue-500 to-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Temperature (°C)</Label>
                  <Slider
                    value={[temperature]}
                    onValueChange={([value]) => setTemperature(value)}
                    min={0}
                    max={100}
                    className="bg-gradient-to-r from-blue-500 to-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Exchanger Type</Label>
                  <Select 
                    value={exchangerType} 
                    onValueChange={(value: "counter" | "parallel" | "cross") => 
                      setExchangerType(value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="counter">Counter Flow</SelectItem>
                      <SelectItem value="parallel">Parallel Flow</SelectItem>
                      <SelectItem value="cross">Cross Flow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card className="bg-gradient-to-br from-emerald-50 to-cyan-50">
                <CardHeader>
                  <CardTitle className="text-sm">Real-time Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <span>Flow Rate:</span>
                      <span className="font-bold text-emerald-600">
                        {flowRate.toFixed(1)} m/s
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Temperature:</span>
                      <span className="font-bold text-emerald-600">
                        {temperature}°C
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Heat Transfer Rate:</span>
                      <span className="font-bold text-emerald-600">
                        {(flowRate * temperature * 4.186).toFixed(1)} kW
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reynolds Number:</span>
                      <span className="font-bold text-emerald-600">
                        {(flowRate * 1000 * 0.05 / 0.001).toFixed(0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Efficiency:</span>
                      <span className="font-bold text-emerald-600">
                        {(efficiency * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Flow Regime</Label>
                    <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 via-yellow-500 to-red-500">
                      <div
                        className="h-3 w-2 -translate-y-0.5 transform rounded-full bg-white shadow-lg"
                        style={{
                          marginLeft: `${(flowRate / 5) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Laminar</span>
                      <span>Transition</span>
                      <span>Turbulent</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}


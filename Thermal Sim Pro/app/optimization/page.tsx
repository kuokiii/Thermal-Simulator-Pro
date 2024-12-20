"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface OptimizationResult {
  flowRate: number
  efficiency: number
  cost: number
  score: number
}

export default function OptimizationPage() {
  const [results, setResults] = useState<OptimizationResult[]>([])
  const [loading, setLoading] = useState(false)
  const [parameters, setParameters] = useState({
    minFlowRate: "0.1",
    maxFlowRate: "5",
    targetEfficiency: "85",
    maxCost: "1000",
  })

  const runOptimization = () => {
    setLoading(true)
    const newResults: OptimizationResult[] = []
    
    // Simulate optimization process
    const steps = 10
    const flowRateStep = (parseFloat(parameters.maxFlowRate) - parseFloat(parameters.minFlowRate)) / steps

    for (let i = 0; i <= steps; i++) {
      const flowRate = parseFloat(parameters.minFlowRate) + flowRateStep * i
      const efficiency = 90 - Math.pow(flowRate - 2.5, 2) + Math.random() * 5
      const cost = flowRate * 200 + Math.random() * 100
      const score = (efficiency / parseFloat(parameters.targetEfficiency)) * 
                   (1 - cost / parseFloat(parameters.maxCost))

      newResults.push({
        flowRate,
        efficiency,
        cost,
        score,
      })
    }

    setTimeout(() => {
      setResults(newResults)
      setLoading(false)
    }, 1500)
  }

  const getBestResult = () => {
    if (results.length === 0) return null
    return results.reduce((prev, current) => 
      current.score > prev.score ? current : prev
    )
  }

  const bestResult = getBestResult()

  return (
    <div className="container min-h-screen py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl space-y-8"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Optimization Parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="min-flow">Minimum Flow Rate (m³/s)</Label>
                <Input
                  id="min-flow"
                  type="number"
                  value={parameters.minFlowRate}
                  onChange={(e) => setParameters(prev => ({ ...prev, minFlowRate: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="max-flow">Maximum Flow Rate (m³/s)</Label>
                <Input
                  id="max-flow"
                  type="number"
                  value={parameters.maxFlowRate}
                  onChange={(e) => setParameters(prev => ({ ...prev, maxFlowRate: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="target-efficiency">Target Efficiency (%)</Label>
                <Input
                  id="target-efficiency"
                  type="number"
                  value={parameters.targetEfficiency}
                  onChange={(e) => setParameters(prev => ({ ...prev, targetEfficiency: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="max-cost">Maximum Cost ($)</Label>
                <Input
                  id="max-cost"
                  type="number"
                  value={parameters.maxCost}
                  onChange={(e) => setParameters(prev => ({ ...prev, maxCost: e.target.value }))}
                />
              </div>
              <Button
                onClick={runOptimization}
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
              >
                {loading ? "Optimizing..." : "Run Optimization"}
              </Button>
            </CardContent>
          </Card>

          {bestResult && (
            <Card>
              <CardHeader>
                <CardTitle>Optimal Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label>Optimal Flow Rate</Label>
                    <div className="mt-1 text-2xl font-bold text-emerald-500">
                      {bestResult.flowRate.toFixed(2)} m³/s
                    </div>
                  </div>
                  <div>
                    <Label>Expected Efficiency</Label>
                    <div className="mt-1 text-2xl font-bold text-cyan-500">
                      {bestResult.efficiency.toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <Label>Estimated Cost</Label>
                    <div className="mt-1 text-2xl font-bold text-emerald-500">
                      ${bestResult.cost.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <Label>Optimization Score</Label>
                    <div className="mt-1">
                      <Badge variant="outline" className="text-lg">
                        {(bestResult.score * 100).toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {results.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Optimization Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="flowRate"
                      label={{ value: "Flow Rate (m³/s)", position: "bottom" }}
                    />
                    <YAxis yAxisId="left" label={{ value: "Efficiency (%)", angle: -90, position: "insideLeft" }} />
                    <YAxis yAxisId="right" orientation="right" label={{ value: "Cost ($)", angle: 90, position: "insideRight" }} />
                    <Tooltip />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="efficiency"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ fill: "#10b981" }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="cost"
                      stroke="#06b6d4"
                      strokeWidth={2}
                      dot={{ fill: "#06b6d4" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  )
}


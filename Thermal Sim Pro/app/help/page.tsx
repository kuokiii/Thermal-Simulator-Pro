"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How do I choose the right heat exchanger type?",
    answer: "The choice depends on your specific application. Counter-flow exchangers are most efficient but may be more complex. Parallel-flow are simpler but less efficient. Cross-flow exchangers are good for gas-to-gas heat transfer.",
  },
  {
    question: "What do the simulation results mean?",
    answer: "Heat Transfer Rate shows the amount of heat transferred per unit time. Effectiveness indicates how close the exchanger is to ideal performance. Pressure Drop helps evaluate pumping requirements. Reynolds Number indicates flow characteristics (laminar vs turbulent).",
  },
  {
    question: "How accurate are the simulations?",
    answer: "Our simulations use industry-standard equations and validated models. However, real-world performance may vary due to factors like fouling, manufacturing tolerances, and operating conditions.",
  },
  {
    question: "What are the typical ranges for input parameters?",
    answer: "Inlet temperatures typically range from 0°C to 400°C. Flow rates depend on your application but usually range from 0.001 to 10 m³/s. Pipe diameters commonly range from 0.01 to 1 meter.",
  },
]

const guides = [
  {
    title: "Getting Started",
    description: "Learn the basics of heat exchanger simulation",
    steps: [
      "Choose your heat exchanger type",
      "Enter fluid properties and operating conditions",
      "Review simulation results",
      "Optimize based on recommendations",
    ],
  },
  {
    title: "Advanced Features",
    description: "Explore advanced simulation capabilities",
    steps: [
      "Custom material properties",
      "Multi-pass configurations",
      "Thermal stress analysis",
      "Cost optimization",
    ],
  },
  {
    title: "Best Practices",
    description: "Tips for accurate simulations",
    steps: [
      "Verify input data accuracy",
      "Consider safety factors",
      "Account for fouling",
      "Regular validation",
    ],
  },
]

export default function HelpPage() {
  return (
    <div className="container min-h-screen py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl space-y-8"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Help & Guides</h1>
          <p className="text-muted-foreground">
            Learn how to use ThermalSim Pro effectively for your heat transfer simulations
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {guides.map((guide, index) => (
            <motion.div
              key={guide.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-inside list-disc space-y-2">
                    {guide.steps.map((step) => (
                      <li key={step} className="text-sm text-muted-foreground">
                        {step}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}


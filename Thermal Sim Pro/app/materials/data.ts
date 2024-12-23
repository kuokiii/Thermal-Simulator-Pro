export interface Material {
    id: string
    name: string
    category: string
    thermalConductivity: number
    specificHeat: number
    density: number
    maxTemp: number
    minTemp: number
    thermalExpansion: number
    cost: number
    corrosionResistance: "Low" | "Medium" | "High"
    applications: string[]
  }
  
  export const categories = [
    "Metals",
    "Alloys",
    "Ceramics",
    "Polymers",
    "Composites",
    "Carbon-based",
  ] as const
  
  export const materials: Material[] = [
    {
      id: "copper",
      name: "Copper",
      category: "Metals",
      thermalConductivity: 385,
      specificHeat: 0.385,
      density: 8960,
      maxTemp: 1085,
      minTemp: -273,
      thermalExpansion: 16.5,
      cost: 7,
      corrosionResistance: "Medium",
      applications: [
        "Heat exchangers",
        "Radiators",
        "Cooling systems",
        "Electronics cooling",
      ],
    },
    {
      id: "aluminum",
      name: "Aluminum",
      category: "Metals",
      thermalConductivity: 205,
      specificHeat: 0.900,
      density: 2700,
      maxTemp: 660,
      minTemp: -273,
      thermalExpansion: 23.1,
      cost: 3,
      corrosionResistance: "High",
      applications: [
        "Automotive heat exchangers",
        "Air conditioning",
        "Aerospace components",
      ],
    },
    {
      id: "stainless-304",
      name: "Stainless Steel 304",
      category: "Alloys",
      thermalConductivity: 16.2,
      specificHeat: 0.500,
      density: 8000,
      maxTemp: 1450,
      minTemp: -273,
      thermalExpansion: 17.3,
      cost: 5,
      corrosionResistance: "High",
      applications: [
        "Chemical processing",
        "Food industry",
        "Marine environments",
      ],
    },
    {
      id: "titanium",
      name: "Titanium",
      category: "Metals",
      thermalConductivity: 21.9,
      specificHeat: 0.523,
      density: 4500,
      maxTemp: 1668,
      minTemp: -273,
      thermalExpansion: 8.6,
      cost: 9,
      corrosionResistance: "High",
      applications: [
        "Aerospace",
        "Chemical processing",
        "Marine heat exchangers",
      ],
    },
    {
      id: "silicon-carbide",
      name: "Silicon Carbide",
      category: "Ceramics",
      thermalConductivity: 120,
      specificHeat: 0.670,
      density: 3210,
      maxTemp: 2730,
      minTemp: -273,
      thermalExpansion: 4.0,
      cost: 8,
      corrosionResistance: "High",
      applications: [
        "High temperature heat exchangers",
        "Nuclear applications",
        "Chemical processing",
      ],
    },
    {
      id: "graphene",
      name: "Graphene",
      category: "Carbon-based",
      thermalConductivity: 5000,
      specificHeat: 0.720,
      density: 2200,
      maxTemp: 3000,
      minTemp: -273,
      thermalExpansion: 1.0,
      cost: 10,
      corrosionResistance: "High",
      applications: [
        "Micro heat exchangers",
        "Electronics cooling",
        "Thermal interface materials",
      ],
    },
    {
      id: "inconel-625",
      name: "Inconel 625",
      category: "Alloys",
      thermalConductivity: 9.8,
      specificHeat: 0.410,
      density: 8440,
      maxTemp: 1350,
      minTemp: -273,
      thermalExpansion: 12.8,
      cost: 9,
      corrosionResistance: "High",
      applications: [
        "Chemical processing equipment",
        "Aerospace components",
        "Marine applications",
      ],
    },
    {
      id: "boron-nitride",
      name: "Boron Nitride",
      category: "Ceramics",
      thermalConductivity: 70,
      specificHeat: 1.610,
      density: 2100,
      maxTemp: 2800,
      minTemp: -273,
      thermalExpansion: 1.0,
      cost: 10,
      corrosionResistance: "High",
      applications: [
        "High-temperature insulators",
        "Semiconductor manufacturing",
        "Aerospace components",
      ],
    },
    {
      id: "peek",
      name: "PEEK (Polyether Ether Ketone)",
      category: "Polymers",
      thermalConductivity: 0.25,
      specificHeat: 1.340,
      density: 1320,
      maxTemp: 260,
      minTemp: -60,
      thermalExpansion: 47,
      cost: 8,
      corrosionResistance: "High",
      applications: [
        "Chemical processing equipment",
        "Automotive components",
        "Medical implants",
      ],
    },
    {
      id: "carbon-fiber-composite",
      name: "Carbon Fiber Composite",
      category: "Composites",
      thermalConductivity: 21,
      specificHeat: 0.710,
      density: 1600,
      maxTemp: 315,
      minTemp: -273,
      thermalExpansion: -0.1,
      cost: 9,
      corrosionResistance: "High",
      applications: [
        "Aerospace structures",
        "Automotive components",
        "Sporting goods",
      ],
    },
    {
      id: "diamond",
      name: "Diamond",
      category: "Carbon-based",
      thermalConductivity: 2200,
      specificHeat: 0.502,
      density: 3515,
      maxTemp: 3550,
      minTemp: -273,
      thermalExpansion: 1.0,
      cost: 10,
      corrosionResistance: "High",
      applications: [
        "Heat spreaders in electronics",
        "Cutting tools",
        "High-pressure experiments",
      ],
    },
    {
      id: "monel-400",
      name: "Monel 400",
      category: "Alloys",
      thermalConductivity: 21.8,
      specificHeat: 0.427,
      density: 8800,
      maxTemp: 1300,
      minTemp: -273,
      thermalExpansion: 13.9,
      cost: 8,
      corrosionResistance: "High",
      applications: [
        "Marine engineering",
        "Chemical processing",
        "Oil and gas industry",
      ],
    },
    {
      id: "zirconium-oxide",
      name: "Zirconium Oxide",
      category: "Ceramics",
      thermalConductivity: 2,
      specificHeat: 0.450,
      density: 5680,
      maxTemp: 2700,
      minTemp: -273,
      thermalExpansion: 10.5,
      cost: 9,
      corrosionResistance: "High",
      applications: [
        "Thermal barrier coatings",
        "Fuel cells",
        "Oxygen sensors",
      ],
    },
    {
      id: "polyimide",
      name: "Polyimide",
      category: "Polymers",
      thermalConductivity: 0.12,
      specificHeat: 1.090,
      density: 1420,
      maxTemp: 400,
      minTemp: -269,
      thermalExpansion: 20,
      cost: 7,
      corrosionResistance: "High",
      applications: [
        "Aerospace insulation",
        "Flexible printed circuits",
        "High-temperature adhesives",
      ],
    },
    {
      id: "ceramic-matrix-composite",
      name: "Ceramic Matrix Composite",
      category: "Composites",
      thermalConductivity: 15,
      specificHeat: 0.750,
      density: 2700,
      maxTemp: 1200,
      minTemp: -273,
      thermalExpansion: 4.5,
      cost: 10,
      corrosionResistance: "High",
      applications: [
        "Aerospace propulsion systems",
        "High-temperature structural components",
        "Brake discs",
      ],
    },
    {
      id: "nickel",
      name: "Nickel",
      category: "Metals",
      thermalConductivity: 90.7,
      specificHeat: 0.444,
      density: 8908,
      maxTemp: 1455,
      minTemp: -273,
      thermalExpansion: 13.4,
      cost: 6,
      corrosionResistance: "High",
      applications: [
        "Chemical processing equipment",
        "Electronics",
        "Battery technology",
      ],
    },
    {
      id: "silver",
      name: "Silver",
      category: "Metals",
      thermalConductivity: 429,
      specificHeat: 0.235,
      density: 10500,
      maxTemp: 962,
      minTemp: -273,
      thermalExpansion: 18.9,
      cost: 10,
      corrosionResistance: "High",
      applications: [
        "Electronics cooling",
        "Thermal interface materials",
        "Jewelry",
      ],
    },
    {
      id: "tungsten",
      name: "Tungsten",
      category: "Metals",
      thermalConductivity: 173,
      specificHeat: 0.132,
      density: 19300,
      maxTemp: 3422,
      minTemp: -273,
      thermalExpansion: 4.5,
      cost: 8,
      corrosionResistance: "High",
      applications: [
        "High-temperature furnaces",
        "X-ray tubes",
        "Rocket nozzles",
      ],
    },
    {
      id: "alumina",
      name: "Alumina (Aluminum Oxide)",
      category: "Ceramics",
      thermalConductivity: 30,
      specificHeat: 0.880,
      density: 3960,
      maxTemp: 2072,
      minTemp: -273,
      thermalExpansion: 8.4,
      cost: 6,
      corrosionResistance: "High",
      applications: [
        "Refractory linings",
        "Electrical insulators",
        "Wear-resistant components",
      ],
    },
    {
      id: "beryllium",
      name: "Beryllium",
      category: "Metals",
      thermalConductivity: 200,
      specificHeat: 1.825,
      density: 1850,
      maxTemp: 1287,
      minTemp: -273,
      thermalExpansion: 11.3,
      cost: 10,
      corrosionResistance: "Medium",
      applications: [
        "Aerospace structures",
        "X-ray windows",
        "Nuclear reactors",
      ],
    },
  ]
  
  
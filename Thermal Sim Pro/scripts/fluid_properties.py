class Fluid:
    def __init__(self, name, density, specific_heat, viscosity, thermal_conductivity, prandtl_number, critical_point):
        self.name = name
        self.density = density  # kg/m^3
        self.specific_heat = specific_heat  # J/(kg·K)
        self.viscosity = viscosity  # Pa·s
        self.thermal_conductivity = thermal_conductivity  # W/(m·K)
        self.prandtl_number = prandtl_number
        self.critical_point = critical_point  # K

# Define fluid properties
water = Fluid("Water", 997, 4186, 0.001, 0.598, 7.01, 647.13)
oil = Fluid("Oil", 900, 1900, 0.03, 0.145, 394.48, 600)
air = Fluid("Air", 1.225, 1005, 0.0000181, 0.024, 0.76, 132.2)

def get_fluid_properties(fluid_name):
    fluids = {
        "water": water,
        "oil": oil,
        "air": air
    }
    return fluids.get(fluid_name.lower())

def print_fluid_properties(fluid):
    print(f"Properties of {fluid.name}:")
    print(f"Density: {fluid.density} kg/m^3")
    print(f"Specific Heat: {fluid.specific_heat} J/(kg·K)")
    print(f"Viscosity: {fluid.viscosity} Pa·s")
    print(f"Thermal Conductivity: {fluid.thermal_conductivity} W/(m·K)")
    print(f"Prandtl Number: {fluid.prandtl_number}")
    print(f"Critical Point: {fluid.critical_point} K")

if __name__ == "__main__":
    for fluid_name in ["water", "oil", "air"]:
        fluid = get_fluid_properties(fluid_name)
        if fluid:
            print_fluid_properties(fluid)
            print()


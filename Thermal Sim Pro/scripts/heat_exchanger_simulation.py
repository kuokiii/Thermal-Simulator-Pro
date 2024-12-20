import math
from fluid_properties import get_fluid_properties

class HeatExchangerSimulation:
    def __init__(self, exchanger_type, fluid_hot, fluid_cold, flow_rate_hot, flow_rate_cold, inlet_temp_hot, inlet_temp_cold, pipe_diameter, pipe_length):
        self.exchanger_type = exchanger_type
        self.fluid_hot = get_fluid_properties(fluid_hot)
        self.fluid_cold = get_fluid_properties(fluid_cold)
        self.flow_rate_hot = flow_rate_hot
        self.flow_rate_cold = flow_rate_cold
        self.inlet_temp_hot = inlet_temp_hot
        self.inlet_temp_cold = inlet_temp_cold
        self.pipe_diameter = pipe_diameter
        self.pipe_length = pipe_length

    def calculate_reynolds_number(self, fluid, flow_rate):
        velocity = flow_rate / (math.pi * (self.pipe_diameter/2)**2)
        return (fluid.density * velocity * self.pipe_diameter) / fluid.viscosity

    def calculate_nusselt_number(self, reynolds, prandtl):
        if reynolds < 2300:
            return 3.66
        else:
            f = (0.790 * math.log(reynolds) - 1.64) ** -2
            return ((f / 8) * (reynolds - 1000) * prandtl) / (1 + 12.7 * math.sqrt(f / 8) * (prandtl**(2/3) - 1))

    def calculate_heat_transfer_coefficient(self, fluid, reynolds):
        nusselt = self.calculate_nusselt_number(reynolds, fluid.prandtl_number)
        return (nusselt * fluid.thermal_conductivity) / self.pipe_diameter

    def calculate_overall_heat_transfer_coefficient(self):
        re_hot = self.calculate_reynolds_number(self.fluid_hot, self.flow_rate_hot)
        re_cold = self.calculate_reynolds_number(self.fluid_cold, self.flow_rate_cold)
        h_hot = self.calculate_heat_transfer_coefficient(self.fluid_hot, re_hot)
        h_cold = self.calculate_heat_transfer_coefficient(self.fluid_cold, re_cold)
        
        # Assuming negligible wall resistance
        return 1 / ((1/h_hot) + (1/h_cold))

    def calculate_effectiveness(self):
        U = self.calculate_overall_heat_transfer_coefficient()
        A = math.pi * self.pipe_diameter * self.pipe_length
        C_hot = self.fluid_hot.specific_heat * self.flow_rate_hot * self.fluid_hot.density
        C_cold = self.fluid_cold.specific_heat * self.flow_rate_cold * self.fluid_cold.density
        C_min = min(C_hot, C_cold)
        C_max = max(C_hot, C_cold)
        
        NTU = (U * A) / C_min
        Cr = C_min / C_max

        if self.exchanger_type == 'counter':
            if Cr < 1:
                return (1 - math.exp(-NTU * (1 - Cr))) / (1 - Cr * math.exp(-NTU * (1 - Cr)))
            else:
                return NTU / (1 + NTU)
        elif self.exchanger_type == 'parallel':
            return (1 - math.exp(-NTU * (1 + Cr))) / (1 + Cr)
        elif self.exchanger_type == 'cross':
            return 1 - math.exp((1 / Cr) * NTU**0.22 * (math.exp(-Cr * NTU**0.78) - 1))

    def simulate(self):
        effectiveness = self.calculate_effectiveness()
        C_hot = self.fluid_hot.specific_heat * self.flow_rate_hot * self.fluid_hot.density
        C_cold = self.fluid_cold.specific_heat * self.flow_rate_cold * self.fluid_cold.density
        C_min = min(C_hot, C_cold)
        
        q_max = C_min * (self.inlet_temp_hot - self.inlet_temp_cold)
        q_actual = effectiveness * q_max
        
        outlet_temp_hot = self.inlet_temp_hot - q_actual / C_hot
        outlet_temp_cold = self.inlet_temp_cold + q_actual / C_cold

        return {
            'effectiveness': effectiveness,
            'heat_transfer_rate': q_actual,
            'outlet_temp_hot': outlet_temp_hot,
            'outlet_temp_cold': outlet_temp_cold
        }

def main():
    simulation = HeatExchangerSimulation(
        exchanger_type='counter',
        fluid_hot='water',
        fluid_cold='oil',
        flow_rate_hot=0.1,  # m^3/s
        flow_rate_cold=0.05,  # m^3/s
        inlet_temp_hot=80,  # °C
        inlet_temp_cold=20,  # °C
        pipe_diameter=0.05,  # m
        pipe_length=5  # m
    )

    results = simulation.simulate()
    
    print("Simulation Results:")
    print(f"Effectiveness: {results['effectiveness']:.4f}")
    print(f"Heat Transfer Rate: {results['heat_transfer_rate']:.2f} W")
    print(f"Hot Fluid Outlet Temperature: {results['outlet_temp_hot']:.2f} °C")
    print(f"Cold Fluid Outlet Temperature: {results['outlet_temp_cold']:.2f} °C")

if __name__ == "__main__":
    main()


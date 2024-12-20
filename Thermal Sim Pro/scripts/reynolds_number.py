import math

def calculate_reynolds_number(density, velocity, characteristic_length, dynamic_viscosity):
    """
    Calculate the Reynolds number for a fluid flow.
    
    :param density: Fluid density (kg/m^3)
    :param velocity: Fluid velocity (m/s)
    :param characteristic_length: Characteristic length of the geometry (m)
    :param dynamic_viscosity: Dynamic viscosity of the fluid (Pa·s or kg/(m·s))
    :return: Reynolds number (dimensionless)
    """
    return (density * velocity * characteristic_length) / dynamic_viscosity

def determine_flow_regime(reynolds_number):
    """
    Determine the flow regime based on the Reynolds number.
    
    :param reynolds_number: Calculated Reynolds number
    :return: String describing the flow regime
    """
    if reynolds_number < 2300:
        return "Laminar flow"
    elif 2300 <= reynolds_number < 4000:
        return "Transitional flow"
    else:
        return "Turbulent flow"

def main():
    # Example calculation for water in a pipe
    density = 997  # kg/m^3 (water at room temperature)
    velocity = 1.5  # m/s
    pipe_diameter = 0.05  # m
    dynamic_viscosity = 0.001  # Pa·s (water at room temperature)

    re = calculate_reynolds_number(density, velocity, pipe_diameter, dynamic_viscosity)
    flow_regime = determine_flow_regime(re)

    print(f"Reynolds Number: {re:.2f}")
    print(f"Flow Regime: {flow_regime}")

if __name__ == "__main__":
    main()


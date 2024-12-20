import math

def calculate_friction_factor(reynolds_number):
    """
    Calculate the Darcy friction factor for pipe flow.
    
    :param reynolds_number: Reynolds number of the flow
    :return: Darcy friction factor (dimensionless)
    """
    if reynolds_number < 2300:
        # Laminar flow
        return 64 / reynolds_number
    else:
        # Turbulent flow (Blasius correlation)
        return 0.316 * reynolds_number ** -0.25

def calculate_pressure_drop(friction_factor, pipe_length, pipe_diameter, fluid_density, fluid_velocity):
    """
    Calculate the pressure drop in a pipe.
    
    :param friction_factor: Darcy friction factor (dimensionless)
    :param pipe_length: Length of the pipe (m)
    :param pipe_diameter: Diameter of the pipe (m)
    :param fluid_density: Density of the fluid (kg/m^3)
    :param fluid_velocity: Average velocity of the fluid (m/s)
    :return: Pressure drop (Pa)
    """
    return friction_factor * (pipe_length / pipe_diameter) * (fluid_density * fluid_velocity**2) / 2

def main():
    # Example calculation
    reynolds_number = 10000
    pipe_length = 10  # m
    pipe_diameter = 0.05  # m
    fluid_density = 997  # kg/m^3 (water at room temperature)
    fluid_velocity = 2  # m/s

    friction_factor = calculate_friction_factor(reynolds_number)
    pressure_drop = calculate_pressure_drop(friction_factor, pipe_length, pipe_diameter, fluid_density, fluid_velocity)

    print(f"Friction Factor: {friction_factor:.4f}")
    print(f"Pressure Drop: {pressure_drop:.2f} Pa")

if __name__ == "__main__":
    main()


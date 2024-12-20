import math

def calculate_nusselt_number(reynolds_number, prandtl_number, pipe_length, pipe_diameter):
    """
    Calculate the Nusselt number for internal flow in a pipe.
    
    :param reynolds_number: Reynolds number of the flow
    :param prandtl_number: Prandtl number of the fluid
    :param pipe_length: Length of the pipe (m)
    :param pipe_diameter: Diameter of the pipe (m)
    :return: Nusselt number (dimensionless)
    """
    if reynolds_number < 2300:
        # Laminar flow
        return 3.66 + (0.0668 * (pipe_diameter / pipe_length) * reynolds_number * prandtl_number) / \
               (1 + 0.04 * ((pipe_diameter / pipe_length) * reynolds_number * prandtl_number) ** (2/3))
    elif reynolds_number < 10000:
        # Transition flow
        f = (0.790 * math.log(reynolds_number) - 1.64) ** -2
        return ((f / 8) * (reynolds_number - 1000) * prandtl_number) / \
               (1 + 12.7 * math.sqrt(f / 8) * (prandtl_number ** (2/3) - 1)) * \
               (1 + (pipe_diameter / pipe_length) ** (2/3))
    else:
        # Turbulent flow
        f = (0.790 * math.log(reynolds_number) - 1.64) ** -2
        return ((f / 8) * reynolds_number * prandtl_number) / \
               (1 + 12.7 * math.sqrt(f / 8) * (prandtl_number ** (2/3) - 1)) * \
               (1 + (pipe_diameter / pipe_length) ** (2/3))

def calculate_heat_transfer_coefficient(nusselt_number, thermal_conductivity, characteristic_length):
    """
    Calculate the heat transfer coefficient.
    
    :param nusselt_number: Nusselt number (dimensionless)
    :param thermal_conductivity: Thermal conductivity of the fluid (W/(m·K))
    :param characteristic_length: Characteristic length (m), typically the pipe diameter for internal flow
    :return: Heat transfer coefficient (W/(m^2·K))
    """
    return (nusselt_number * thermal_conductivity) / characteristic_length

def main():
    # Example calculation
    reynolds_number = 10000
    prandtl_number = 7  # Approximate value for water
    pipe_length = 2  # m
    pipe_diameter = 0.05  # m
    thermal_conductivity = 0.6  # W/(m·K), approximate value for water

    nusselt_number = calculate_nusselt_number(reynolds_number, prandtl_number, pipe_length, pipe_diameter)
    h = calculate_heat_transfer_coefficient(nusselt_number, thermal_conductivity, pipe_diameter)

    print(f"Nusselt Number: {nusselt_number:.2f}")
    print(f"Heat Transfer Coefficient: {h:.2f} W/(m^2·K)")

if __name__ == "__main__":
    main()


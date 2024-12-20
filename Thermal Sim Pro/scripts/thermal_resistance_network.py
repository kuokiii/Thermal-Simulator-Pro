class ThermalResistance:
    def __init__(self, name, value):
        self.name = name
        self.value = value  # K/W

def series_resistance(*resistances):
    """Calculate the total thermal resistance for resistances in series."""
    return sum(r.value for r in resistances)

def parallel_resistance(*resistances):
    """Calculate the total thermal resistance for resistances in parallel."""
    return 1 / sum(1/r.value for r in resistances)

def calculate_heat_transfer(total_resistance, temp_diff):
    """Calculate the heat transfer rate given the total thermal resistance and temperature difference."""
    return temp_diff / total_resistance

def main():
    # Example: Heat transfer through a composite wall
    R_conv1 = ThermalResistance("Convection (inner)", 0.1)
    R_cond1 = ThermalResistance("Conduction (layer 1)", 0.2)
    R_cond2 = ThermalResistance("Conduction (layer 2)", 0.15)
    R_conv2 = ThermalResistance("Convection (outer)", 0.05)

    # Total thermal resistance (series)
    R_total = series_resistance(R_conv1, R_cond1, R_cond2, R_conv2)

    print("Thermal Resistance Network:")
    print(f"R_total = {R_total:.4f} K/W")

    # Calculate heat transfer
    T_hot = 80  # °C
    T_cold = 20  # °C
    Q = calculate_heat_transfer(R_total, T_hot - T_cold)

    print(f"Heat Transfer Rate: {Q:.2f} W")

    # Temperature at each interface
    T1 = T_hot - Q * R_conv1.value
    T2 = T1 - Q * R_cond1.value
    T3 = T2 - Q * R_cond2.value

    print("\nTemperature Distribution:")
    print(f"T_hot (fluid) = {T_hot:.2f} °C")
    print(f"T1 (wall inner surface) = {T1:.2f} °C")
    print(f"T2 (interface between layers) = {T2:.2f} °C")
    print(f"T3 (wall outer surface) = {T3:.2f} °C")
    print(f"T_cold (fluid) = {T_cold:.2f} °C")

if __name__ == "__main__":
    main()


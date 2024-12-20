class FoulingFactor:
    def __init__(self, material, value):
        self.material = material
        self.value = value  # m^2·K/W

# Common fouling factors (in m^2·K/W)
fouling_factors = {
    "clean_water": FoulingFactor("Clean Water", 0.0001),
    "seawater": FoulingFactor("Seawater", 0.0002),
    "fuel_oil": FoulingFactor("Fuel Oil", 0.0009),
    "engine_oil": FoulingFactor("Engine Oil", 0.0002),
    "refrigerant_vapor": FoulingFactor("Refrigerant Vapor", 0.0002),
    "steam": FoulingFactor("Steam", 0.0001),
}

def calculate_fouled_heat_transfer_coefficient(clean_coefficient, *fouling_factors):
    """
    Calculate the fouled heat transfer coefficient.
    
    :param clean_coefficient: Clean overall heat transfer coefficient (W/(m^2·K))
    :param fouling_factors: FoulingFactor objects for different materials
    :return: Fouled heat transfer coefficient (W/(m^2·K))
    """
    total_fouling_resistance = sum(ff.value for ff in fouling_factors)
    return 1 / ((1 / clean_coefficient) + total_fouling_resistance)

def main():
    # Example: Heat exchanger with water and oil
    clean_coefficient = 500  # W/(m^2·K)
    water_ff = fouling_factors["clean_water"]
    oil_ff = fouling_factors["engine_oil"]

    fouled_coefficient = calculate_fouled_heat_transfer_coefficient(clean_coefficient, water_ff, oil_ff)

    print("Heat Exchanger Fouling Analysis:")
    print(f"Clean Heat Transfer Coefficient: {clean_coefficient:.2f} W/(m^2·K)")
    print(f"Water Fouling Factor: {water_ff.value:.6f} m^2·K/W")
    print(f"Oil Fouling Factor: {oil_ff.value:.6f} m^2·K/W")
    print(f"Fouled Heat Transfer Coefficient: {fouled_coefficient:.2f} W/(m^2·K)")

    efficiency_loss = (1 - fouled_coefficient / clean_coefficient) * 100
    print(f"Efficiency Loss due to Fouling: {efficiency_loss:.2f}%")

if __name__ == "__main__":
    main()


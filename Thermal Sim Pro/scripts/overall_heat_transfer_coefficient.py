def calculate_overall_heat_transfer_coefficient(h_hot, h_cold, k_wall, wall_thickness):
    """
    Calculate the overall heat transfer coefficient for a simple heat exchanger.
    
    :param h_hot: Heat transfer coefficient of the hot fluid (W/(m^2·K))
    :param h_cold: Heat transfer coefficient of the cold fluid (W/(m^2·K))
    :param k_wall: Thermal conductivity of the wall material (W/(m·K))
    :param wall_thickness: Thickness of the wall separating the fluids (m)
    :return: Overall heat transfer coefficient (W/(m^2·K))
    """
    return 1 / ((1 / h_hot) + (wall_thickness / k_wall) + (1 / h_cold))

def main():
    # Example calculation
    h_hot = 5000  # W/(m^2·K)
    h_cold = 3000  # W/(m^2·K)
    k_wall = 50  # W/(m·K) (e.g., for stainless steel)
    wall_thickness = 0.002  # m

    U = calculate_overall_heat_transfer_coefficient(h_hot, h_cold, k_wall, wall_thickness)

    print(f"Overall Heat Transfer Coefficient: {U:.2f} W/(m^2·K)")

if __name__ == "__main__":
    main()


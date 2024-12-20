import math

def calculate_effectiveness(NTU, Cr, exchanger_type):
    """
    Calculate the effectiveness of a heat exchanger using the NTU method.
    
    :param NTU: Number of Transfer Units
    :param Cr: Heat capacity ratio (Cmin/Cmax)
    :param exchanger_type: Type of heat exchanger ('counter', 'parallel', or 'cross')
    :return: Effectiveness (dimensionless)
    """
    if exchanger_type == 'counter':
        if Cr < 1:
            return (1 - math.exp(-NTU * (1 - Cr))) / (1 - Cr * math.exp(-NTU * (1 - Cr)))
        else:
            return NTU / (1 + NTU)
    elif exchanger_type == 'parallel':
        return (1 - math.exp(-NTU * (1 + Cr))) / (1 + Cr)
    elif exchanger_type == 'cross':
        return 1 - math.exp((1 / Cr) * math.pow(NTU, 0.22) * (math.exp(-Cr * math.pow(NTU, 0.78)) - 1))
    else:
        raise ValueError("Invalid exchanger type. Use 'counter', 'parallel', or 'cross'.")

def calculate_NTU(U, A, Cmin):
    """
    Calculate the Number of Transfer Units (NTU).
    
    :param U: Overall heat transfer coefficient (W/(m^2·K))
    :param A: Heat transfer surface area (m^2)
    :param Cmin: Minimum heat capacity rate (W/K)
    :return: Number of Transfer Units (dimensionless)
    """
    return (U * A) / Cmin

def main():
    # Example calculation
    U = 500  # W/(m^2·K)
    A = 10  # m^2
    Cmin = 2000  # W/K
    Cmax = 2500  # W/K
    
    Cr = Cmin / Cmax
    NTU = calculate_NTU(U, A, Cmin)

    print(f"NTU: {NTU:.2f}")
    print(f"Cr: {Cr:.2f}")
    
    for exchanger_type in ['counter', 'parallel', 'cross']:
        effectiveness = calculate_effectiveness(NTU, Cr, exchanger_type)
        print(f"Effectiveness ({exchanger_type} flow): {effectiveness:.4f}")

if __name__ == "__main__":
    main()


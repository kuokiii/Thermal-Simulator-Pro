from enum import Enum

class HeatExchangerType(Enum):
    COUNTER_FLOW = "counter"
    PARALLEL_FLOW = "parallel"
    CROSS_FLOW = "cross"

class HeatExchanger:
    def __init__(self, type: HeatExchangerType):
        self.type = type

    def calculate_effectiveness(self, NTU, Cr):
        if self.type == HeatExchangerType.COUNTER_FLOW:
            if Cr < 1:
                return (1 - math.exp(-NTU * (1 - Cr))) / (1 - Cr * math.exp(-NTU * (1 - Cr)))
            else:
                return NTU / (1 + NTU)
        elif self.type == HeatExchangerType.PARALLEL_FLOW:
            return (1 - math.exp(-NTU * (1 + Cr))) / (1 + Cr)
        elif self.type == HeatExchangerType.CROSS_FLOW:
            return 1 - math.exp((1 / Cr) * math.pow(NTU, 0.22) * (math.exp(-Cr * math.pow(NTU, 0.78)) - 1))
        else:
            raise ValueError("Invalid heat exchanger type")

def print_effectiveness_comparison(NTU, Cr):
    print(f"Effectiveness comparison for NTU = {NTU}, Cr = {Cr}")
    for exchanger_type in HeatExchangerType:
        exchanger = HeatExchanger(exchanger_type)
        effectiveness = exchanger.calculate_effectiveness(NTU, Cr)
        print(f"{exchanger_type.value.capitalize()} Flow: {effectiveness:.4f}")

if __name__ == "__main__":
    print_effectiveness_comparison(NTU=2, Cr=0.8)


export interface Medicine {
  name: string;
  description: string;
  suspension: {
    mg: number;
    ml: number;
  };
  dosage: {
    low: number;
    high: number;
  };
}

const Ibuprofen: Medicine = {
  name: "Equate Ibuprofen",
  description: "Pain reliever and fever reducer",
  suspension: {
    mg: 100,
    ml: 5,
  },
  dosage: {
    low: 10,
    high: 15,
  },
};

const Diphenhydramine: Medicine = {
  name: "Diphenhydramine",
  description: "",
  suspension: {
    mg: 12.5,
    ml: 5,
  },
  dosage: {
    low: 1,
    high: 2,
  },
};

const Acetaminophen: Medicine = {
  name: "Acetaminophen",
  description: "",
  suspension: {
    mg: 160,
    ml: 5,
  },
  dosage: {
    low: 10,
    high: 15,
  },
};

type LB = number;
type KG = number;

export function calculateDosage(
  weight: LB,
  dosage: number,
  suspension: Medicine["suspension"]
): string {
  return (
    (convertLbToKg(weight) * dosage * suspension.ml) /
    suspension.mg
  ).toFixed(2);
}

export function convertLbToKg(lb: number): number {
  return lb / 2.205;
}

export function convertKgToLb(kg: number): number {
  return kg * 2.205;
}

export const Medicines: Medicine[] = [
  Ibuprofen,
  Diphenhydramine,
  Acetaminophen,
];

"use client";

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
  recommendedDosage?: [low: number, high: number, dosage: number][];
}

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
  recommendedDosage: [
    [20, 24, 4],
    [25, 37, 5],
    [38, 49, 7.5],
    [50, 99, 10],
  ],
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
  recommendedDosage: [
    [6, 11, 1.25],
    [12, 17, 2.5],
    [18, 23, 3.75],
    [24, 35, 5],
    [36, 47, 7.5],
    [48, 59, 10],
    [60, 71, 12.5],
    [72, 95, 15],
    [96, 143, 20],
  ],
};

const Ibuprofen: Medicine = {
  name: "Equate Ibuprofen",
  description: "Pain reliever and fever reducer",
  suspension: {
    mg: 100,
    ml: 5,
  },
  dosage: {
    low: 4,
    high: 10,
  },
  recommendedDosage: [
    [24, 35, 5],
    [36, 47, 7.5],
    [48, 59, 10],
    [60, 71, 12.5],
    [72, 95, 15],
  ],
};

export function calculateDosage(
  weight: number,
  dosage: number,
  suspension: Medicine["suspension"]
): string {
  // Get the base dosage
  const raw = (convertLbToKg(weight) * dosage * suspension.ml) / suspension.mg;
  // Round the dosage to the nearest 1/4, 1/3, or 1/2
  const rounded = Math.round(raw * 4) / 4;
  return rounded.toFixed(2);
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

/**
 * Motrin === Ibprofen === Equate Ibuprofen
 * Diphenhydramine === Benadryl (antihistamine)
 * Acetaminophen === Tylenol
 *
 * Alongside the low and high, add the brands recommended dosage for their weight
 * Round numbers to 1/4 or 1/3 or 1/2
 *
 * Scan a barcode for medicine and it brings up the inactive ingredients
 */

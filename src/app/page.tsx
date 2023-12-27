"use client";

import { Box } from "@/components/Box";
import { HStack, VStack } from "@/components/Flex";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Medicine, Medicines, calculateDosage } from "@/types/medicine";
import clsx from "clsx";
import { useState } from "react";

export default function Home() {
  const [weight, setWeight] = useLocalStorage<number>("weight", 0);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setWeight(Number(e.target.value));
  }

  return (
    <>
      <Box>
        <VStack gap={16}>
          <VStack align="flex-start" gap={8}>
            <label className="label" htmlFor="weight">
              Weight (lb):{" "}
            </label>
            <input
              className="input"
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              type="number"
              id="weight"
              placeholder="weight (lb)"
              onChange={onChange}
              defaultValue={weight}
            />
          </VStack>

          <VStack gap={8} w="100%">
            {Medicines.map((medicine) => {
              return (
                <MedicineView
                  medicine={medicine}
                  weight={weight}
                  key={medicine.name}
                />
              );
            })}
          </VStack>
        </VStack>
      </Box>

      <style jsx>{`
        .label {
          flex: 1 0 auto;
          font-weight: bold;
        }

        .input {
          width: 100%;
          border: 1px solid #222;
          border-radius: 4px;
          padding: 8px 12px;
          text-align: right;
        }
      `}</style>
    </>
  );
}

function MedicineView({
  medicine,
  weight = 0,
}: {
  medicine: Medicine;
  weight?: number;
}) {
  const [open, setOpen] = useState(true);

  const low = calculateDosage(weight, medicine.dosage.low, medicine.suspension);
  const high = calculateDosage(
    weight,
    medicine.dosage.high,
    medicine.suspension
  );

  const recommended = medicine.recommendedDosage?.find(
    ([min, max]) => weight >= min && weight <= max
  );

  const constricted = (
    <>
      <p>Low: {low}ml</p>
      <p>High: {high}ml</p>
      <p>Pharma Recommended: {recommended ? `${recommended?.[2]}ml` : "-"}</p>
    </>
  );

  const expanded = (
    <VStack gap={4}>
      <HStack justify="space-between">
        <span>Low:</span> <span>{low}ml</span>
      </HStack>
      <HStack justify="space-between">
        <span>High:</span> <span>{high}ml</span>
      </HStack>
      <p>Pharma Recommended:</p>
      <VStack gap={2} component="ul">
        {medicine.recommendedDosage?.map(([low, high, rec]) => (
          <li
            key={`${medicine.name}-${rec}`}
            className={clsx("li", { active: rec === recommended?.[2] })}>
            <HStack justify="space-between">
              <span>
                {low}lb - {high}lb:
              </span>{" "}
              <span>{rec}ml</span>
            </HStack>
          </li>
        ))}
      </VStack>

      <style jsx>{`
        .li {
          list-style: none;
          background: transparent;
          padding: 4px 8px;
          border-radius: 4px;
          margin-left: 8px;
        }

        .active {
          background: rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </VStack>
  );

  return (
    <Box border>
      <button onClick={() => setOpen(!open)}>
        <h3>{medicine.name}</h3>
      </button>

      {open ? expanded : constricted}
    </Box>
  );
}

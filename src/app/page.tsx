"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Medicines, calculateDosage } from "@/types/medicine";

export default function Home() {
  const [weight, setWeight] = useLocalStorage<number>("weight", 0);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setWeight(Number(e.target.value));
  }

  return (
    <main className="vstack">
      <div>
        <label htmlFor="weight">Weight (lb): </label>
        <input
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          type="number"
          id="weight"
          placeholder="weight"
          onChange={onChange}
          value={weight}
        />
      </div>

      <div className="vstack">
        {Medicines.map((medicine) => {
          return (
            <div key={medicine.name}>
              <h3>{medicine.name}</h3>
              <p>
                Low:{" "}
                {calculateDosage(
                  weight,
                  medicine.dosage.low,
                  medicine.suspension
                )}
              </p>
              <p>
                High:{" "}
                {calculateDosage(
                  weight,
                  medicine.dosage.high,
                  medicine.suspension
                )}
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
}

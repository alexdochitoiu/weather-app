import { describe, it, expect, beforeEach, mock } from "bun:test";
import { addCity, updateCity } from "../cities.service";
import { CityError } from "../../types/errors";
import type { City } from "../../types/city";

const mockRun = mock();

mock.module("../../db/connection", () => ({
  db: {
    run: mockRun,
  },
}));

describe("Cities Service", () => {
  beforeEach(() => {
    mockRun.mockReset();
  });

  it("should add a city successfully", async () => {
    const mockCity: City = {
      id: 0,
      name: "Tokyo",
      country: "Japan",
      tourist_rating: 4,
    };

    mockRun.mockImplementation(
      (query: string, params: any[], callback: Function) => {
        // Simulate successful database response
        setTimeout(() => {
          const context = { lastID: 1 };
          callback.call(context, null);
        }, 0);
      }
    );

    const result = await addCity(mockCity);

    expect(result).toBe(1);
    expect(mockRun).toHaveBeenCalledTimes(1);
  });

  it("should throw NotFound error when updating non-existent city", async () => {
    const updates = {
      tourist_rating: 5,
      date_established: "1850-01-01",
      estimated_population: 500000,
    };

    // Mock the database to return 0 changes (city not found)
    mockRun.mockImplementation(
      (query: string, params: any[], callback: Function) => {
        setTimeout(() => {
          const context = { changes: 0 };
          callback.call(context, null);
        }, 0);
      }
    );

    await expect(updateCity(999, updates)).rejects.toThrow(CityError.NotFound);
    expect(mockRun).toHaveBeenCalledTimes(1);
  });
});

import { db } from "@/db/connection";
import { City } from "@/types/city";
import { CityError } from "@/types/errors";
import { ExternalApisService } from "./external-apis.service";

export function addCity(city: City): Promise<number> {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO cities (name, state, country, tourist_rating, date_established, estimated_population)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.run(
      query,
      [
        city.name,
        city.state,
        city.country,
        city.tourist_rating ?? null,
        city.date_established ?? null,
        city.estimated_population ?? null,
      ],
      function (err) {
        if (err) return reject(err);
        resolve(this.lastID);
      }
    );
  });
}

export function getAllCities(): Promise<City[]> {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM cities
    `;
    db.all(query, [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows as City[]);
    });
  });
}

export function searchCitiesByName(name: string): Promise<City[]> {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM cities WHERE name LIKE ?
    `;
    db.all(query, [`%${name}%`], (err, rows) => {
      if (rows.length === 0) return reject(new Error(CityError.NotFound));
      if (err) return reject(err);
      resolve(rows as City[]);
    });
  });
}

export async function searchCitiesWithExternalData(name: string): Promise<City[]> {
  // First, get cities from database
  const cities = await searchCitiesByName(name);
  
  // Get countries data for mapping country codes
  let countriesData;
  try {
    countriesData = await ExternalApisService.getCountriesData();
  } catch (error) {
    console.warn('Failed to fetch countries data, returning cities without external data');
    return cities;
  }

  // Enhance each city with external data
  const enhancedCities = await Promise.all(
    cities.map(async (city) => {
      try {
        // Find country data
        const countryData = ExternalApisService.findCountryByName(countriesData, city.country);
        
        // Get weather data
        const weatherData = await ExternalApisService.getWeatherData(
          city.name,
          countryData?.cca2
        );

        // Create enhanced city object
        const enhancedCity: City = {
          ...city,
          country_code_2: countryData?.cca2,
          country_code_3: countryData?.cca3,
          currency_code: countryData ? ExternalApisService.getMainCurrency(countryData) || undefined : undefined,
          flag: countryData?.flags?.png,
        };

        // Add weather data if available
        if (weatherData) {
          enhancedCity.weather = {
            temperature: weatherData.main.temp,
            description: weatherData.weather[0]?.description || 'Unknown',
            humidity: weatherData.main.humidity,
            wind_speed: weatherData.wind.speed,
          };
        }

        return enhancedCity;
      } catch (error) {
        console.warn(`Failed to enhance city ${city.name} with external data:`, error);
        return city; // Return original city if enhancement fails
      }
    })
  );

  return enhancedCities;
}


export function updateCity(
  id: number,
  updates: Pick<
    City,
    "tourist_rating" | "date_established" | "estimated_population"
  >
): Promise<void> {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE cities
      SET tourist_rating = ?, date_established = ?, estimated_population = ?
      WHERE id = ?
    `;
    db.run(
      query,
      [
        updates.tourist_rating ?? null,
        updates.date_established ?? null,
        updates.estimated_population ?? null,
        id,
      ],
      function (err) {
        if (err) return reject(err);
        if (this.changes === 0) return reject(new Error(CityError.NotFound));
        resolve();
      }
    );
  });
}

export function deleteCity(id: number): Promise<number> {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM cities WHERE id = ?`, [id], function (err) {
      if (err) return reject(err);
      if (this.changes === 0) return reject(new Error(CityError.NotFound));
      resolve(id);
    });
  });
}

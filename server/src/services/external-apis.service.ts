import axios from 'axios';

interface CountryData {
  name: {
    common: string;
    official: string;
  };
  flags: {
    png: string;
    svg: string;
  };
  cca2: string;
  cca3: string;
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
}

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
}

// Cache for country data to avoid repeated API calls
let countriesCache: CountryData[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export class ExternalApisService {
  private static readonly OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
  private static readonly COUNTRIES_API_URL = 'https://restcountries.com/v3.1/all?fields=name,flags,cca2,cca3,currencies';
  private static readonly WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

  static async getCountriesData(): Promise<CountryData[]> {
    const now = Date.now();
    
    // Check if cache is still valid
    if (countriesCache && cacheTimestamp && (now - cacheTimestamp < CACHE_DURATION)) {
      return countriesCache;
    }

    try {
      const response = await axios.get<CountryData[]>(this.COUNTRIES_API_URL, {
        timeout: 10000,
      });
      
      countriesCache = response.data;
      cacheTimestamp = now;
      
      return response.data;
    } catch (error) {
      console.error('Failed to fetch countries data:', error);
      // Return cache if available, even if stale
      if (countriesCache) {
        return countriesCache;
      }
      throw new Error('Failed to fetch countries data');
    }
  }

  static async getWeatherData(cityName: string, countryCode?: string): Promise<WeatherData | null> {
    if (!this.OPENWEATHER_API_KEY) {
      console.warn('OpenWeatherMap API key not provided');
      return null;
    }

    try {
      const query = countryCode ? `${cityName},${countryCode}` : cityName;
      const response = await axios.get<WeatherData>(this.WEATHER_API_URL, {
        params: {
          q: query,
          appid: this.OPENWEATHER_API_KEY,
          units: 'metric', // Celsius
        },
        timeout: 10000,
      });

      return response.data;
    } catch (error) {
      console.error(`Failed to fetch weather data for ${cityName}:`, error);
      return null;
    }
  }

  static findCountryByName(countries: CountryData[], countryName: string): CountryData | null {
    const normalizedSearch = countryName.toLowerCase().trim();
    
    return countries.find(country => 
      country.name.common.toLowerCase() === normalizedSearch ||
      country.name.official.toLowerCase() === normalizedSearch ||
      country.name.common.toLowerCase().includes(normalizedSearch) ||
      country.name.official.toLowerCase().includes(normalizedSearch)
    ) || null;
  }

  static getMainCurrency(country: CountryData): string | null {
    if (!country.currencies) return null;
    
    const currencyKeys = Object.keys(country.currencies);
    if (currencyKeys.length === 0) return null;
    
    return currencyKeys[0]; // Return the first currency code
  }
}

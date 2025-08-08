export interface City {
  id: number;
  name: string;
  state?: string;
  country: string;
  tourist_rating?: number;
  date_established?: string;
  estimated_population?: number;
  country_code_2?: string;
  country_code_3?: string;
  currency_code?: string;
  flag?: string;
  weather?: {
    temperature: number;
    description: string;
    humidity: number;
    wind_speed: number;
  };
}

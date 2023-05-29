import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export const fetchWeatherForCity = createAsyncThunk(
    'cities/fetchWeather',
    async (city: string) => {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=425107192997d3e9ce6be2c05c915cef`
        );
        return response.data;
    }
);

export const updateCityWeather = createAsyncThunk(
    'cities/updateWeather',
    async (cityId: number, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        const city = state.city.cities.find((city: City) => city.id === cityId);

        if (!city) {
            throw new Error('City not found');
        }

        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=425107192997d3e9ce6be2c05c915cef`
        );
        return { cityId, data: response.data };
    }
);

export const fetchHourlyForecastForCity = createAsyncThunk(
    'cities/fetchHourlyForecast',
    async (city: string) => {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=425107192997d3e9ce6be2c05c915cef`
        );
        return response.data;
    }
);

interface WeatherData {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface MainData {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

export interface City {
    id: number;
    name: string;
    timezone: number;
    weather: WeatherData[];
    main: MainData;
    clouds?: {
        all: number;
    };
    wind?: {
        speed: number;
        deg: number;
    };
    forecast: any;
    lastUpdated: number | null;
}

interface CityState {
    cities: City[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CityState = {
    cities: [],
    status: 'idle',
    error: null,
};

export const citySlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        removeCity: (state, action: PayloadAction<number>) => {
            state.cities = state.cities.filter(city => city.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeatherForCity.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchWeatherForCity.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const existingCity = state.cities.find(city => city.id === action.payload.id)
                if (!existingCity) {
                    const newCity: City = {
                        id: action.payload.id,
                        name: action.payload.name,
                        weather: action.payload.weather,
                        main: action.payload.main,
                        wind: action.payload.wind,
                        clouds: action.payload.clouds,
                        timezone: action.payload.timezone,
                        forecast: [],
                        lastUpdated: null,
                    };
                    state.cities.push(newCity);
                }
            })
            .addCase(fetchWeatherForCity.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(updateCityWeather.fulfilled, (state, action) => {
                const city = state.cities.find((city) => city.id === action.payload.cityId);
                if (city) {
                    city.weather = action.payload.data.weather;
                    city.main = action.payload.data.main;
                    city.wind = action.payload.data.wind;
                    city.timezone = action.payload.data.timezone;
                    city.clouds = action.payload.data.clouds;
                }
            })
            .addCase(fetchHourlyForecastForCity.fulfilled, (state, action) => {
                const existingCity = state.cities.find(city => city.name === action.payload.city.name)
                if (existingCity) {
                    existingCity.forecast = action.payload.list;
                    existingCity.lastUpdated = new Date().getTime();
                }
            });
    },
});

export const { removeCity } = citySlice.actions;

export default citySlice.reducer;

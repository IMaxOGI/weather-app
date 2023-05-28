import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export const fetchWeatherForCity = createAsyncThunk(
    'cities/fetchWeather',
    async (city: string) => {
        const response = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=77c95e9192af44d04f364f7dc1286ed9`
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
            `http://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=77c95e9192af44d04f364f7dc1286ed9`
        );
        return { cityId, data: response.data };
    }
);

interface City {
    id: number;
    name: string;
    weather: any;
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
                    state.cities.push(action.payload);
                }
            })
            .addCase(fetchWeatherForCity.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(updateCityWeather.fulfilled, (state, action) => {
                const existingCity = state.cities.find(city => city.id === action.payload.cityId)
                if (existingCity) {
                    existingCity.weather = action.payload.data.weather;
                }
            });
    },
});

export const { removeCity } = citySlice.actions;

export default citySlice.reducer;

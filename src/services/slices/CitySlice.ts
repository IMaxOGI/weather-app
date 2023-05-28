import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWeatherForCity = createAsyncThunk(
    'cities/fetchWeather',
    async (city: string) => {
        const response = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=77c95e9192af44d04f364f7dc1286ed9`
        );
        return response.data;
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
            });
    },
});

export const { removeCity } = citySlice.actions;

export default citySlice.reducer;

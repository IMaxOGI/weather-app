import { AppDispatch } from "./store";
import axios from 'axios';
import { fetchWeatherForCity } from "./slices/CitySlice";

export const fetchInitialCities = async (dispatch: AppDispatch) => {
    const storedCities = JSON.parse(localStorage.getItem('cities') || '[]');
    if (storedCities.length === 0) {
        if (navigator.geolocation) {
            const position = await new Promise<GeolocationPosition>((resolve, reject) =>
                navigator.geolocation.getCurrentPosition(resolve, reject)
            );

            const response = await axios.get(
                `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=77c95e9192af44d04f364f7dc1286ed9`
            );

            dispatch(fetchWeatherForCity(response.data.name));
        }
    } else {
        storedCities.forEach((city: string) => dispatch(fetchWeatherForCity(city)));
    }
}

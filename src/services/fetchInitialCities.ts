import { AppDispatch } from "./store";
import axios from 'axios';
import { fetchWeatherForCity } from "./slices/сitySlice";

export const fetchInitialCities = async (dispatch: AppDispatch) => {
    const storedCities = JSON.parse(localStorage.getItem('cities') || '[]');
    if (storedCities.length === 0) {
        if (navigator.geolocation) {
            const position = await new Promise<GeolocationPosition>((resolve, reject) =>
                navigator.geolocation.getCurrentPosition(resolve, reject)
            );

            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=425107192997d3e9ce6be2c05c915cef`
            );

            dispatch(fetchWeatherForCity(response.data.name));
        }
    } else {
        storedCities.forEach((city: string) => dispatch(fetchWeatherForCity(city)));
    }
}

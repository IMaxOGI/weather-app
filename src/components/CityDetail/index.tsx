import React from 'react';
import { Typography, Card, CardContent, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import {kelvinToCelsius} from "../../services/kelvinToCelsius";

interface WeatherData {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface CityData {
    id: number;
    name: string;
    weather: WeatherData[];
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    wind: {
        speed: number;
        deg: number;
    };
    clouds: {
        all: number;
    };
}

const CityDetail: React.FC = () => {
    const { city: cityName } = useParams<{ city: string }>();
    const city = useSelector((state: RootState) =>
        state.city.cities.find((city: any) => city.name === cityName)
    ) as CityData;

    if (!city) {
        return <Typography variant="h5">City not found</Typography>;
    }

    const temperature = kelvinToCelsius(city.main.temp);
    const feelsLike = kelvinToCelsius(city.main.feels_like);
    const tempMin = kelvinToCelsius(city.main.temp_min);
    const tempMax = kelvinToCelsius(city.main.temp_max);

    return (
        <Card sx={{ minWidth: 275, marginTop: 2 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {city.name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Weather: {city.weather[0].description}
                </Typography>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">
                        Temperature: {temperature.toFixed(2)}°C
                    </Typography>
                    <Typography variant="body2">
                        Feels Like: {feelsLike.toFixed(2)}°C
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">
                        Min Temperature: {tempMin.toFixed(2)}°C
                    </Typography>
                    <Typography variant="body2">
                        Max Temperature: {tempMax.toFixed(2)}°C
                    </Typography>
                </Box>
                <Typography variant="body2">
                    Pressure: {city.main.pressure} hPa
                </Typography>
                <Typography variant="body2">
                    Humidity: {city.main.humidity}%
                </Typography>
                <Typography variant="body2">
                    Wind Speed: {city.wind.speed} m/s
                </Typography>
                <Typography variant="body2">
                    Wind Direction: {city.wind.deg}°
                </Typography>
                <Typography variant="body2">
                    Cloudiness: {city.clouds.all}%
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CityDetail;

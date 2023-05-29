import React, { useEffect } from 'react';
import { Typography, Card, CardContent, Box, List, ListItem, ListItemText } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../services/store';
import { kelvinToCelsius } from "../../services/kelvinToCelsius";
import { fetchHourlyForecastForCity } from '../../services/slices/сitySlice';
import { AppDispatch } from "../../services/store";


const CityDetail = () => {
    const dispatch: AppDispatch = useDispatch();
    const { city: cityName } = useParams<{ city: string }>();
    const city = useSelector((state: RootState) =>
        state.city.cities.find((city: any) => city.name === cityName)
    );


    useEffect(() => {
        if (city) {
            const oneHour = 60 * 60 * 1000;
            const needsUpdate =
                city?.lastUpdated &&
                new Date().getTime() - city.lastUpdated.getTime() > oneHour;
            if (!city.forecast || needsUpdate) {
                console.log(city);
                dispatch(fetchHourlyForecastForCity(city.name));
            }
        }
    }, [city, dispatch]);

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
                {city.wind && (
                    <Typography variant="body2">
                        Wind Speed: {city.wind.speed} m/s
                    </Typography>
                )}
                {city.wind && (
                    <Typography variant="body2">
                        Wind Direction: {city.wind.deg}°
                    </Typography>
                )}
                {city.clouds && (
                    <Typography variant="body2">
                        Cloudiness: {city.clouds.all}%
                    </Typography>
                )}
                <Box display="flex" flexDirection="column">
                    <Typography variant="body2">
                        Hourly Forecast:
                    </Typography>
                    <Box sx={{ marginTop: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Hourly Forecast:
                        </Typography>
                        <List>
                            {city.forecast && city.forecast.slice(0, 12).map((forecast: any, index: number) => (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={`${new Date(forecast.dt * 1000).toLocaleTimeString()}: ${kelvinToCelsius(forecast.main.temp).toFixed(2)}°C`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CityDetail;

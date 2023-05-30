import React, { useEffect } from 'react';
import { Typography, Card, CardContent, Box, Grid, List, ListItem, ListItemText } from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../services/store';
import { formatLocalTime, kelvinToCelsius } from "../../services/utils";
import { fetchHourlyForecastForCity } from '../../services/slices/сitySlice';
import { AppDispatch } from "../../services/store";
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CityDetail = () => {
    const dispatch: AppDispatch = useDispatch();
    const { city: cityName } = useParams<{ city: string }>();
    const navigate = useNavigate();
    const city = useSelector((state: RootState) =>
        state.city.cities.find((city: any) => city.name === cityName)
    );

    useEffect(() => {
        if (city) {
            const halfHour = 30 * 60 * 1000;
            const lastUpdated = city.lastUpdated ? new Date(city.lastUpdated) : null;
            const needsUpdate =
                !city.lastUpdated ||
                (lastUpdated && (new Date().getTime() - lastUpdated.getTime() > halfHour));
            if (!city.forecast || needsUpdate) {
                dispatch(fetchHourlyForecastForCity(city.name));
            }
        }
    }, [city, dispatch]);

    if (!city) {
        return <Typography variant="h5">City not found</Typography>;
    }

    const goBack = () => {
        navigate(-1);
    };

    const timeString = formatLocalTime(city.timezone);
    const temperature = kelvinToCelsius(city.main.temp);
    const feelsLike = kelvinToCelsius(city.main.feels_like);
    const tempMin = kelvinToCelsius(city.main.temp_min);
    const tempMax = kelvinToCelsius(city.main.temp_max);

    return (
        <Card sx={{ minWidth: 275, marginTop: 2, backgroundColor: '#1e213a', color: '#e7e7eb', borderRadius: '1em' }}>
            <CardContent sx={{ padding: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                    <IconButton onClick={goBack} sx={{ color: '#e7e7eb', marginRight: 2 }} size="large">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', marginBottom: 0, color: '#e7e7eb' }}>
                        {city.name} ({timeString})
                    </Typography>
                </Box>
                <Typography variant="subtitle1" gutterBottom sx={{ marginBottom: 2, color: '#a09fb1' }}>
                    Weather: {city.weather[0].description}
                </Typography>
                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                    <Grid item xs={6}>
                        <Typography variant="body2">
                            Max Temperature: {tempMax.toFixed(2)}°C
                        </Typography>
                        <Typography variant="body2">
                            Min Temperature: {tempMin.toFixed(2)}°C
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{textAlign: "end"}}>
                        <Typography variant="body2">
                            Temperature: {temperature.toFixed(2)}°C
                        </Typography>
                        <Typography variant="body2">
                            Feels Like: {feelsLike.toFixed(2)}°C
                        </Typography>
                    </Grid>
                </Grid>
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                    Pressure: {city.main.pressure} hPa
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                    Humidity: {city.main.humidity}%
                </Typography>
                {city.wind && (
                    <Typography variant="body2" sx={{ marginBottom: 2 }}>
                        Wind Speed: {city.wind.speed} m/s
                    </Typography>
                )}
                {city.wind && (
                    <Typography variant="body2" sx={{ marginBottom: 2 }}>
                        Wind Direction: {city.wind.deg}°
                    </Typography>
                )}
                {city.clouds && (
                    <Typography variant="body2" sx={{ marginBottom: 2 }}>
                        Cloudiness: {city.clouds.all}%
                    </Typography>
                )}
                <Box sx={{ marginTop: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#e7e7eb' }}>
                        Hourly Forecast:
                    </Typography>
                    <List sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, flexWrap: 'nowrap' }}>
                        {city.forecast && city.forecast.slice(0, 12).map((forecast: any, index: number) => (
                            <ListItem key={index} sx={{ padding: 0, minWidth: { xs: 'auto', sm: 150 }, textAlign: 'center' }}>
                                <ListItemText sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Typography variant="body2" color="text.white" sx={{ marginBottom: 1 }}>
                                        {new Date(forecast.dt * 1000).toLocaleTimeString()}
                                    </Typography>
                                    <Typography variant="body2" color="text.white">
                                        {kelvinToCelsius(forecast.main.temp).toFixed(2)}°C
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CityDetail;

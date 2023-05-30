import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { useDispatch as useReduxDispatch } from 'react-redux';
import { removeCity, updateCityWeather } from '../../services/slices/сitySlice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../services/store';
import {formatLocalTime, kelvinToCelsius} from "../../services/utils";

interface CityCardProps {
    city: {
        id: number;
        name: string;
        weather: {
            main: string;
            description: string;
            icon: string;
        }[];
        main: {
            temp: number;
            temp_min: number;
            temp_max: number;
        };
        timezone: number;
    };
}

const CityCard: React.FC<CityCardProps> = ({ city }) => {
    const useDispatch = () => useReduxDispatch<AppDispatch>();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const timeString = formatLocalTime(city.timezone);

    const handleRemove = (event: React.MouseEvent) => {
        event.stopPropagation();
        dispatch(removeCity(city.id));
    };

    const handleUpdate = async (event: React.MouseEvent) => {
        event.stopPropagation();
        try {
            await dispatch(updateCityWeather(city.id));
        } catch (error) {
            console.error('Update failed:', error);
        }
    };

    const handleClick = () => {
        navigate(`/detail/${city.name}`);
    };

    const tempMin = kelvinToCelsius(city.main.temp_min);
    const tempMax = kelvinToCelsius(city.main.temp_max);

    return (
        <Card onClick={handleClick} sx={{ minWidth: 275, marginTop: "15px", cursor: 'pointer', backgroundColor: '#1e213a', color: '#e7e7eb', borderRadius: '1em' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#e7e7eb' }}>
                    {city.name} ({timeString})
                </Typography>
                <Typography variant="body2" gutterBottom sx={{ marginBottom: 2, color: '#a09fb1' }}>
                    Weather: {city.weather[0].description}
                </Typography>
                <Box display="flex" flexDirection="column">
                    <Typography variant="body2">
                        Min Temperature: {tempMin.toFixed(2)}°C
                    </Typography>
                    <Typography variant="body2">
                        Max Temperature: {tempMax.toFixed(2)}°C
                    </Typography>
                    <Box sx={{ marginTop: 2 }}>
                        <Button variant="outlined" onClick={handleUpdate} sx={{ marginRight: 1, borderColor: '#e7e7eb', color: '#e7e7eb' }}>
                            Update
                        </Button>
                        <Button variant="outlined" onClick={handleRemove} sx={{ borderColor: '#e7e7eb', color: '#e7e7eb' }}>
                            Remove
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CityCard;

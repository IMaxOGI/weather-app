import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { AppDispatch } from "../../services/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../services/store';
import { fetchWeatherForCity, updateCityWeather } from "../../services/slices/сitySlice";

const AddCity = () => {
    const dispatch: AppDispatch = useDispatch();
    const [city, setCity] = useState("");
    const [error, setError] = useState("");
    const cities = useSelector((state: RootState) => state.city.cities);

    useEffect(() => {
        if (city && cities.find(c => c.name.toLowerCase() === city.toLowerCase())) {
            setError("This city is already added.");
        } else {
            setError("");
        }
    }, [city, cities]);

    const handleAdd = () => {
        if (error) {
            return;
        }

        dispatch(fetchWeatherForCity(city))
            .unwrap()
            .then(() => setCity(""))
            .catch((error) => {
                setError("This city does not exist.");
            });
    };

    const handleUpdateAll = () => {
        cities.forEach(city => {
            dispatch(updateCityWeather(city.id));
        });
    };

    return (
        <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            <Box sx={{ display: 'flex' }}>
                <TextField
                    label="Add City"
                    variant="outlined"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    error={!!error}
                />
                <Button
                    variant="contained"
                    onClick={handleAdd}
                    sx={{ minHeight: '100%', marginLeft: '8px', backgroundColor: '#3c47e9', color: '#e7e7eb', borderRadius: '1em' }}
                >
                    Add
                </Button>
                <Button
                    variant="contained"
                    onClick={handleUpdateAll}
                    sx={{ minHeight: '100%', marginLeft: '8px', backgroundColor: '#3c47e9', color: '#e7e7eb', borderRadius: '1em' }}
                >
                    Update All
                </Button>
            </Box>
            {error && (
                <Typography variant="body2" color="error" sx={{ position: 'absolute', bottom: '-20px' }}>
                    {error}
                </Typography>
            )}
        </Box>
    );
};

export default AddCity;

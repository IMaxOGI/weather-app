import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { AppDispatch } from "../../services/store";
import { useDispatch } from "react-redux";
import { fetchWeatherForCity } from "../../services/slices/CitySlice";

const AddCity = () => {
    const dispatch: AppDispatch = useDispatch();
    const [city, setCity] = useState("");

    const handleAdd = () => {
        dispatch(fetchWeatherForCity(city));
        setCity("");
    };

    return (
        <Box sx={{ marginTop: 2, display: 'flex' }}>
            <TextField
                label="Add City"
                variant="outlined"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleAdd}
                sx={{ minHeight: '100%', marginLeft: '8px' }}
            >
                Add
            </Button>
        </Box>
    );
};

export default AddCity;

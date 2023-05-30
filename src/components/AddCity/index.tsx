import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { AppDispatch } from "../../services/store";
import { useDispatch } from "react-redux";
import { fetchWeatherForCity } from "../../services/slices/сitySlice";

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
                onClick={handleAdd}
                sx={{ minHeight: '100%', marginLeft: '8px', backgroundColor: '#3c47e9', color: '#e7e7eb', borderRadius: '1em' }}
            >
                Add
            </Button>
        </Box>
    );
};

export default AddCity;

import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import CityCard from '../CityCard';
import AddCity from '../AddCity';
import { AppDispatch, RootState } from "../../services/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchInitialCities } from "../../services/fetchInitialCities";

interface CityData {
    id: number;
    name: string;
    weather: {
        main: string;
        description: string;
        icon: string;
    }[];
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
}

const CityList = () => {
    const dispatch: AppDispatch = useDispatch();
    const cities: CityData[] = useSelector((state: RootState) => state.city.cities) as CityData[];

    useEffect(() => {
        fetchInitialCities(dispatch);
    }, [dispatch]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <AddCity />
            <Grid container spacing={2} justifyContent="center">
                {cities.map((city: CityData) => (
                    <Grid item key={city.id} xs={12} sm={6} md={4} lg={3}>
                        <CityCard city={city} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CityList;

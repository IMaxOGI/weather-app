import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import CityCard from '../CityCard';
import AddCity from '../AddCity';
import { AppDispatch, RootState } from "../../services/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchInitialCities } from "../../services/fetchInitialCities";

interface Weather {
    main: string;
    description: string;
    icon: string;
}

interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

interface CityData {
    id: number;
    name: string;
    timezone: number,
    weather: Weather[];
    main: Main;
    forecast: any;

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
            <Grid container spacing={2} justifyContent="center" sx={{marginTop: "5px"}}>
                {cities.map((city: CityData) => (
                    <Grid item key={city.id} xs={12} sm={6} md={4} lg={3}>
                        <CityCard city={city}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CityList;

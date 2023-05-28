import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import CityCard from '../CityCard';
import AddCity from '../AddCity';
import { AppDispatch, RootState } from "../../services/store";
import { useDispatch, useSelector } from "react-redux";
import {fetchInitialCities} from "../../services/fetchInitialCities";

const CityList = () => {
    const dispatch: AppDispatch = useDispatch();
    const cities = useSelector((state: RootState) => state.city.cities);

    useEffect(() => {
        fetchInitialCities(dispatch);
    }, [dispatch]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <AddCity />
            {cities.map(city => (
                <CityCard key={city.id} city={city} />
            ))}
        </Box>
    );
};

export default CityList;

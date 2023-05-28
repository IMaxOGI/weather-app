import React, {useState} from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import {AppDispatch} from "../../services/store";
import {useDispatch} from "react-redux";
import {removeCity} from "../../services/slices/CitySlice";

interface CityCardProps {
    city: {
        id: number;
        name: string;
        weather: any;
    };
}

const CityCard: React.FC<CityCardProps> = ({ city }) => {
    const dispatch: AppDispatch = useDispatch()
    const handleRemove = () => {
        dispatch(removeCity(city.id))
    }

    return (
        <Card sx={{ minWidth: 275, marginTop: 2 }}>
            <CardContent>
                <Typography variant="h5">{city.name}</Typography>
                <button onClick={handleRemove}>Remove</button>
            </CardContent>
        </Card>
    );
};

export default CityCard;

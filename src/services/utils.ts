export const kelvinToCelsius = (temp: number) => {
    return temp - 273.15;
};

export const formatLocalTime = (timezone: number): string => {
    const localTime = new Date(new Date().getTime() + timezone * 1000);
    return localTime.toTimeString().split(' ')[0].substring(0, 5);
};

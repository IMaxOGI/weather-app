export const loadState = (): any => {
    try {
        const serializedState = localStorage.getItem('cities');
        if (serializedState === null) {
            return undefined;
        }
        return { city: { cities: JSON.parse(serializedState), status: 'idle', error: null } };
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state: any): void => {
    try {
        const serializedState = JSON.stringify(state.city.cities);
        localStorage.setItem('cities', serializedState);
    } catch {
        // ignore write errors
    }
};

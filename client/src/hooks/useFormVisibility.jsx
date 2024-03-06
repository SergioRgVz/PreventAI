// hooks/useFormVisibility.js
import { useState } from 'react';

export const useFormVisibility = (initialState = false) => {
    const [isVisible, setIsVisible] = useState(initialState);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return [isVisible, toggleVisibility];
};

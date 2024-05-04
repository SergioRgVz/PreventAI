import { createContext, useContext, useState } from 'react';

const ImageUploadContext = createContext({ images: [], handleImageChange: () => {} });

export const useImages = () => useContext(ImageUploadContext);


export const ImageUploadProvider = ({ children }) => {
    const [images, setImages] = useState([]);
    const handleImageChange = (event) => {
        setImages([...images, ...Array.from(event.target.files)]);
    };

    return (
        <ImageUploadContext.Provider value={{ images, handleImageChange }}>
            {children}
        </ImageUploadContext.Provider>
    );
};
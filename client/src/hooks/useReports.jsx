import apiClient from './useAxiosAuth';

export const getReports = async () => {
    const response = await apiClient.get('/report');
    return response.data;
}

export const createReportGINSHT = async (data) => {
    const formData = new FormData();

    // Añadir datos planos al formData
    for (const key in data) {
        if (typeof data[key] === 'object' && data[key] !== null && !(data[key] instanceof File)) {
            // Convertir el objeto a una cadena JSON
            formData.append(key, JSON.stringify(data[key]));
        } else {
            formData.append(key, data[key]);
        }
    }

    // Añadir los archivos de imagen
    if (data.images && data.images.length) {
        data.images.forEach((image, index) => {
            formData.append(`images`, image, image.name);
        });
    }

    try {
        const response = await apiClient.post('/report/createGINSHT', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al enviar el reporte PVD:', error);
        throw error;
    }
}

export const createReportPVD = async (data) => {
    // console.log("SENDING PVD REPORT", data);
    const formData = new FormData();

    // Añadir datos planos al formData
    for (const key in data) {
        if (typeof data[key] === 'object' && data[key] !== null && !(data[key] instanceof File)) {
            // Convertir el objeto a una cadena JSON
            formData.append(key, JSON.stringify(data[key]));
        } else {
            formData.append(key, data[key]);
        }
    }

    // Añadir los archivos de imagen
    if (data.images && data.images.length) {
        data.images.forEach((image, index) => {
            formData.append(`images`, image, image.name);
        });
    }

    try {
        const response = await apiClient.post('/report/createPWD', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al enviar el reporte PVD:', error);
        throw error;
    }
}


export const createReportREBA = async (data) => {
    const formData = new FormData();

    // Añadir datos planos al formData
    for (const key in data) {
        if (typeof data[key] === 'object' && data[key] !== null && !(data[key] instanceof File)) {
            // Convertir el objeto a una cadena JSON
            formData.append(key, JSON.stringify(data[key]));
        } else {
            formData.append(key, data[key]);
        }
    }

    // Añadir los archivos de imagen
    if (data.images && data.images.length) {
        data.images.forEach((image, index) => {
            formData.append(`images`, image, image.name);
        });
    }

    try {
        const response = await apiClient.post('/report/createREBA', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al enviar el reporte PVD:', error);
        throw error;
    }
}

export const deleteReport = async (_id) => {
    const response = await apiClient.delete(`/report/${_id}`);
    return response.data;
}

export const reportService = {
    getReports,
    createReportGINSHT,
    createReportPVD,
    createReportREBA,
    deleteReport
};




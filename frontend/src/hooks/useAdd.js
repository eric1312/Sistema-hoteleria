
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const useAdd = (url, successMessage) => {
    const [addLoading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const addItem = async (data) => {
        setLoading(true);
        try {
            await axios.post(url, data);
            Swal.fire('Éxito', successMessage, 'success');
        } catch (err) {
            setError(err.message);
            Swal.fire('Error', 'Hubo un problema al agregar el item', 'error');
        } finally {
            setLoading(false);
        }
    };

    return { addItem, addLoading, error };
};

export default useAdd;

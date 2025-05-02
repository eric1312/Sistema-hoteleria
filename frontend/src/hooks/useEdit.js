
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const useEdit = (url, successMessage) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const editItem = async (id, data) => {
        setLoading(true);
        try {
            await axios.patch(`${url}/${id}`, data);
            Swal.fire('Éxito', successMessage, 'success');
        } catch (err) {
            setError(err.message);
            Swal.fire('Error', 'Hubo un problema al editar el item', 'error');
        } finally {
            setLoading(false);
        }
    };

    return { editItem, loading, error };
};

export default useEdit;

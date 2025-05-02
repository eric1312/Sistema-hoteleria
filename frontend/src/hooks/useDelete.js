
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const useDelete = (url, successMessage) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const deleteItem = async (id) => {
        
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo'
        });

        
        if (result.isConfirmed) {
            setLoading(true);
            try {
                await axios.delete(`${url}/${id}`);
                Swal.fire('¡Eliminado!', successMessage, 'success');
            } catch (err) {
                setError(err.message);
                Swal.fire('Error', 'Hubo un problema al eliminar el item', 'error');
            } finally {
                setLoading(false);
            }
        }
    };

    return { deleteItem, loading, error };
};

export default useDelete;

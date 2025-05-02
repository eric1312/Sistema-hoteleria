import { pool } from '../config/db.js';

export const obtenerHuespedes = async (req, res) => {
    try {
        //throw new Error('DB ERROR')
        const [rows] = await pool.query('SELECT * FROM HUESPEDES')
        console.log(rows)
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Ha ocurrido un error'
        })
    }
}
export const obtenerHuespedPorId = async (req, res) => {
    try {
        //throw new Error('DB ERROR')
        const [rows] = await pool.query('SELECT * FROM HUESPEDES WHERE id_huesped = ?',
            [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'No hay coincidencia con los huespedes registrados'
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Ha ocurrido un error'
        })
    }
}
export const registrarHuesped = async (req, res) => {
    const {Nombre, Apellido, Direccion, Telefono, Mail} = req.body;
    console.log('Datos recibidos:', req.body);
    try {
        const [rows] = await pool.query('INSERT INTO HUESPEDES (Nombre, Apellido, Direccion, Telefono, Mail) VALUES(?, ?, ?, ?, ?)', [Nombre, Apellido, Direccion, Telefono, Mail]);
        res.send({
            id: rows.insertId, // Obtengo el ID AI nuevo
            Nombre,
            Apellido,
            Direccion,
            Telefono,
            Mail
        });
    } catch (error) {
        console.error(error); // Muestra el error completo
        return res.status(500).json({
            message: 'Ha ocurrido un error',
            error: error.message
        });
    }
}
export const actualizarHuesped = async (req, res) => {
    const { id } = req.params;
    const { Nombre, Apellido, Direccion, Telefono, Mail } = req.body;

    try {
        const [result] = await pool.query('UPDATE HUESPEDES SET Nombre = IFNULL(?, Nombre), Apellido = IFNULL(?, Apellido), Direccion = IFNULL(?, Direccion), Telefono = IFNULL(?, Telefono), Mail = IFNULL(?, Mail) WHERE id_huesped = ?', 
            [Nombre, Apellido, Direccion, Telefono, Mail, id]);

        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: 'Huesped no encontrado'
            });
        }

        const [rows] = await pool.query('SELECT * FROM HUESPEDES WHERE id_huesped = ?', [id]);
        res.json(rows[0]);

    } catch (error) {
        return res.status(500).json({
            message: 'Ha ocurrido un error',
            error: error.message
        });
    }
}

export const eliminarHuesped = async(req, res) => {
    try {
        //throw new Error('DB ERROR')
        const [result] = await pool.query('DELETE FROM HUESPEDES WHERE id_huesped = ?', [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Huesped no encontrado'
        })
        //console.log(result)
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Ha ocurrido un error'
        })
    }
}
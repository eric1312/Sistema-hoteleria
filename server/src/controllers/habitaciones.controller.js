import { pool } from '../config/db.js';
export const obtenerHabitaciones = async (req, res) => {
    try {
        //throw new Error('DB ERROR')
        const [rows] = await pool.query('SELECT * FROM HABITACIONES')
        console.log(rows)
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Ha ocurrido un error'
        })
    }
}
export const obtenerHabitacionPorId = async (req, res) => {
    try {
        //throw new Error('DB ERROR')
        const [rows] = await pool.query('SELECT * FROM HABITACIONES WHERE id_habitacion = ?',
            [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'No se encontro la habitacion'
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Ha ocurrido un error'
        })
    }
}
export const crearHabitacion = async (req, res) => {
    const { Num_habitacion, Tipo_habitacion, Precio_noche, Estado } = req.body;
    try {
        //throw new Error('DB ERROR')
        const [rows] = await pool.query('INSERT INTO HABITACIONES (Num_habitacion, Tipo_habitacion, Precio_noche, Estado) VALUES(?, ?, ?, ?)', [Num_habitacion, Tipo_habitacion, Precio_noche, Estado])
        console.log(req.body)
        res.send({
            id: rows.insertId, // obtengo el id AI nuevo
            Num_habitacion,
            Tipo_habitacion,
            Precio_noche,
            Estado
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Ha ocurrido un error'
        })
    }
}
export const actualizarHabitacion = async(req, res) => {
    const { id } = req.params;
    const { Num_habitacion, Tipo_habitacion, Precio_noche, Estado } = req.body;
    try {
        //throw new Error('DB ERROR')
        const [result] = await pool.query('UPDATE HABITACIONES SET Num_habitacion = IFNULL(?, Num_habitacion), Tipo_habitacion = IFNULL(?, Tipo_habitacion), Precio_noche = IFNULL(?, Precio_noche), Estado = IFNULL(?, Estado) WHERE id_habitacion = ?',
            [Num_habitacion, Tipo_habitacion, Precio_noche, Estado, id])
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se encontro la habitacion'
        })
        const [rows] = await pool.query('SELECT * FROM HABITACIONES WHERE id_habitacion = ?', [id])
        res.json(rows[0])

    } catch (error) {
        return res.status(500).json({
            message: 'Ha ocurrido un error'
        })
    }
}
export const eliminarHabitacion = async (req, res) => {
    try {
        //throw new Error('DB ERROR')
        const [result] = await pool.query('DELETE FROM HABITACIONES WHERE id_habitacion = ?',
            [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se encontro la habitacion'
        })
        //console.log(result)
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Ha ocurrido un error'
        })
    }
}
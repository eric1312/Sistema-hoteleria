import { pool } from '../config/db.js';

export const obtenerReservas = async (req, res) => {
    try {
        //throw new Error('DB ERROR')
        const [rows] = await pool.query('SELECT * FROM RESERVAS')
        console.log(rows)
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Ha ocurrido un error'
        })
    }
}
export const obtenerReservaPorId = async (req, res) => {
    try {
        //throw new Error('DB ERROR')
        const [rows] = await pool.query('SELECT * FROM RESERVAS WHERE id_reserva = ?',
            [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'No hay coincidencia con las reservas registradas'
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Ha ocurrido un error'
        })
    }
}
export const crearReserva = async (req, res) => {
    const { Id_huesped, Id_habitacion, Fecha_llegada, Fecha_salida, Num_noches, Precio_total, Estado_reserva } = req.body;
    console.log('Datos recibidos:', req.body);
    try {
        const [rows] = await pool.query('INSERT INTO RESERVAS (Id_huesped, Id_habitacion, Fecha_llegada, Fecha_salida, Num_noches, Precio_total, Estado_reserva) VALUES(?, ?, ?, ?, ?, ?, ?)', [Id_huesped, Id_habitacion, Fecha_llegada, Fecha_salida, Num_noches, Precio_total, Estado_reserva]);
        res.send({
            id: rows.insertId, // Obtengo el ID AI nuevo
            Id_huesped,
            Id_habitacion,
            Fecha_llegada,
            Fecha_salida,
            Num_noches,
            Precio_total,
            Estado_reserva
        });
    } catch (error) {
        console.error(error); // Muestra el error completo
        return res.status(500).json({
            message: 'Ha ocurrido un error',
            error: error.message
        });
    }
}
export const actualizarReserva = async (req, res) => {
    const { id } = req.params;
    const {Id_huesped, Id_habitacion, Fecha_llegada, Fecha_salida, Num_noches, Precio_total, Estado_reserva} = req.body;

    try {
        const [result] = await pool.query('UPDATE RESERVAS SET Id_huesped = IFNULL(?, Id_huesped), Id_habitacion = IFNULL(?, Id_habitacion), Fecha_llegada = IFNULL(?, Fecha_llegada), Fecha_salida = IFNULL(?, Fecha_salida), Num_noches = IFNULL(?, Num_noches), Precio_total = IFNULL(?, Precio_total), Estado_reserva = IFNULL(?, Estado_reserva) WHERE id_reserva = ?', 
            [Id_huesped, Id_habitacion, Fecha_llegada, Fecha_salida, Num_noches, Precio_total, Estado_reserva, id]);

        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: 'Pago no encontrado'
            });
        }

        const [rows] = await pool.query('SELECT * FROM RESERVAS WHERE id_reserva = ?', [id]);
        res.json(rows[0]);

    } catch (error) {
        return res.status(500).json({
            message: 'Ha ocurrido un error',
            error: error.message
        });
    }
}
export const eliminarReserva = async(req, res) => {
    try {
        //throw new Error('DB ERROR')
        const [result] = await pool.query('DELETE FROM RESERVAS WHERE id_reserva = ?', [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se encontro la reserva'
        })
        //console.log(result)
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Ha ocurrido un error'
        })
    }
}
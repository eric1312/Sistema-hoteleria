import { pool } from '../config/db.js';

export const obtenerPagos = async (req, res) => {
    try {
        //throw new Error('DB ERROR')
        const [rows] = await pool.query('SELECT * FROM PAGOS')
        console.log(rows)
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Ha ocurrido un error'
        })
    }
}
export const obtenerPagoPorId = async (req, res) => {
    try {
        //throw new Error('DB ERROR')
        const [rows] = await pool.query('SELECT * FROM PAGOS WHERE id_pago = ?',
            [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'No hay coincidencia con los pagos registrados'
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Ha ocurrido un error'
        })
    }
}
export const registrarPago = async (req, res) => {
    const { Id_reserva, Fecha_pago, Monto_pago, Metodo_pago, Id_empleado } = req.body;
    console.log('Datos recibidos:', req.body);
    try {
        const [rows] = await pool.query('INSERT INTO PAGOS (Id_reserva, Fecha_pago, Monto_pago, Metodo_pago, Id_empleado) VALUES(?, ?, ?, ?, ?)', [Id_reserva, Fecha_pago, Monto_pago, Metodo_pago, Id_empleado]);
        res.send({
            id: rows.insertId, // Obtengo el ID AI nuevo
            Id_reserva,
            Fecha_pago,
            Monto_pago,
            Metodo_pago,
            Id_empleado
        });
    } catch (error) {
        console.error(error); // Muestra el error completo
        return res.status(500).json({
            message: 'Ha ocurrido un error',
            error: error.message
        });
    }
}
export const actualizarPago = async (req, res) => {
    const { id } = req.params;
    const {Id_reserva, Fecha_pago, Monto_pago, Metodo_pago, Id_empleado} = req.body;

    try {
        const [result] = await pool.query('UPDATE PAGOS SET Id_reserva = IFNULL(?, Id_reserva), Fecha_pago = IFNULL(?, Fecha_pago), Monto_pago = IFNULL(?, Monto_pago), Metodo_pago = IFNULL(?, Metodo_pago), Id_empleado = IFNULL(?, Id_empleado) WHERE id_pago = ?', 
            [Id_reserva, Fecha_pago, Monto_pago, Metodo_pago, Id_empleado, id]);

        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: 'Pago no encontrado'
            });
        }

        const [rows] = await pool.query('SELECT * FROM PAGOS WHERE id_pago = ?', [id]);
        res.json(rows[0]);

    } catch (error) {
        return res.status(500).json({
            message: 'Ha ocurrido un error',
            error: error.message
        });
    }

}
export const eliminarPago = async (req, res) => {
    try {
        //throw new Error('DB ERROR')
        const [result] = await pool.query('DELETE FROM PAGOS WHERE id_pago = ?', [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'No se encontro el pago'
        })
        //console.log(result)
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Ha ocurrido un error'
        })
    }
}
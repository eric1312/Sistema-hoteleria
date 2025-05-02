# Sistema de Gestión Hotelera

## Descripción
Este proyecto es un **Sistema de Gestión Hotelera** diseñado para administrar eficientemente las operaciones de un hotel. Proporciona herramientas para la gestión de reservas, habitaciones, clientes, pagos y empleados todo desde una interfaz fácil de usar.

## Características
- Gestión de habitaciones (disponibilidad, tipos de habitación, precios).
- Sistema de reservas con calendario.
- Registro de huespedes con historial de estadías.
- Registro de pagos.
- Organizacion sobre ocupación de empleados.



## Instalación
1. Clona este repositorio:
   ```bash
   git clone https://github.com/Psiquee/Sistema-Hotel.git

## Instalación
Para ejecutar el proyecto localmente, sigue estos pasos:
1. Clona este repositorio.
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```


## .env
Deberás crear en la carpeta frontend un archivo de conexion con el nombre **".env"** donde incluirás las siguientes variables con tu informacion local o url de tu api desplegada:
```javascript
REACT_APP_API_URL=http://localhost:3001/api

```


## Estructura del Proyecto
El proyecto está organizado en las siguientes secciones:

- **Home**: Página principal que muestra una banner de bienvenida.
- **Categorías de Gestion**: En este momento cuenta con 5 páginas Huespedes, Empleados, Reservas, Cobros y Habitaciones.


## Funcionalidades

- **Mostrar**: Filtra y muestra la informacion.
- **Agregar**: Los usuarios pueden agregar datos a la listas a traves de un formulario.
- **Eliminar**: Los usuarios pueden eliminar datos de las listas.
- **Actualizar**: Los usuarios pueden actualizar la informacion de las listas.
- **Responsive**: La interfaz es responsive y se adapta a diferentes tamaños de pantalla.



## Uso

1. Navega a través del navbar a las distintas categorias.
2.  Haz clic en alguna de gestiones.
3. Haz clic en el botón "Agregar" para agregar nueva informacion a las listas.
4. Esto te redireccionara a la lista principal donde podras ver la informacion agregada recientemente.



## Tecnologías Utilizadas
- **HTML**: Estructura básica de la página.
- **Bootstrap**: Framework de estilos. [Documentación de Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- **JavaScript**: Interactividad y gestión.
- **Font Awesome**: Iconos y fuentes. [Documentación de Font Awesome](https://fontawesome.com/)
- **SweetAlert2**   [Documentacion de SweetAlert](https://sweetalert2.github.io/)
- **Vercel**: Deploy del frontend [Documentacion de Vercel](https://vercel.com/docs) 
- **Railway**:  Deploy del servidor y base de datos [Documentacion de Railway](https://docs.railway.com/)
  


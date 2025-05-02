//frontend/src/ App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/layout/Navbar';
import ReservacionesList from './components/reservas/ReservacionesList';
import ReservacionesForm from './components/reservas/ReservacionesForm';
import Home from './components/home/Home';
import EmpleadosList from './components/empleados/EmpleadosList';
import EmpleadosForm from './components/empleados/EmpleadosForm';
import HuespedesForm from './components/huespedes/HuespedesForm';
import HuespedesList from './components/huespedes/HuespedesList';
import HabitacionesList from './components/habitaciones/HabitacionesList';
import HabitacionesForm from './components/habitaciones/HabitacionesForm';
import PagosList from './components/pagos/PagosList';
import PagosForm from './components/pagos/PagosForm';
import Footer from './components/layout/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Styles.css';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Error404 from './components/error404/Error404';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas con NavBar y Footer */}
        <Route 
          path="/" 
          element={
            <>
              <NavBar />
              <Home />
              <Footer />
            </>
          } 
        />

        <Route 
          path="/guests" 
          element={
            <>
              <NavBar />
              <HuespedesList />
              <Footer />
            </>
          } 
        />
        <Route 
          path="/add-guest" 
          element={
            <>
              <NavBar />
              <HuespedesForm />
              <Footer />
            </>
          } 
        />

        <Route 
          path="/employees" 
          element={
            <>
              <NavBar />
              <EmpleadosList />
              <Footer />
            </>
          } 
        />
        <Route 
          path="/add-employee" 
          element={
            <>
              <NavBar />
              <EmpleadosForm />
              <Footer />
            </>
          } 
        />
        <Route 
          path="/reservations" 
          element={
            <>
              <NavBar />
              <ReservacionesList />
              <Footer />
            </>
          } 
        />
        <Route 
          path="/add-reservation" 
          element={
            <>
              <NavBar />
              <ReservacionesForm />
              <Footer />
            </>
          } 
        />

        <Route 
          path="/payments" 
          element={
            <>
              <NavBar />
              <PagosList />
              <Footer />
            </>
          } 
        />
        <Route 
          path="/add-payment" 
          element={
            <>
              <NavBar />
              <PagosForm />
              <Footer />
            </>
          } 
        />

        <Route 
          path="/rooms" 
          element={
            <>
              <NavBar />
              <HabitacionesList />
              <Footer />
            </>
          } 
        />
        <Route 
          path="/add-room" 
          element={
            <>
              <NavBar />
              <HabitacionesForm />
              <Footer />
            </>
          } 
        />

        {/* Ruta de error 404 sin NavBar ni Footer */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;


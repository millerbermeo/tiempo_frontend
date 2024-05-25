import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, StickyNote, CircleUserRound, Trash2, ArrowLeftRight, Calendar, Settings } from "lucide-react";
import Sidebar, { SidebarItem } from "./components/Sidebar";
import { LoginPage } from './pages/LoginPage';
import { ProtectedRoute } from './configs/ProtectedRoute';
import { Navbar } from './components/Navbar';


// Lazy load the pages
const HomePage = lazy(() => import('./pages/HomePage'));
const EventosPage = lazy(() => import('./pages/EventosPage'));
const MovimientosPage = lazy(() => import('./pages/MovimientosPage'));
const CompeticionesPage = lazy(() => import('./pages/CompeticionesPage'));
const CategoriaPage = lazy(() => import('./pages/CategoriaPage'));
const UsuariosPage = lazy(() => import('./pages/UsuariosPage'));

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <HomePage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
        <Route path="/eventos" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <EventosPage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
        <Route path="/movimientos" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <MovimientosPage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
        <Route path="/competiciones" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <CompeticionesPage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
        <Route path="/categorias" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <CategoriaPage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
        <Route path="/usuarios" element={
          <ProtectedRoute>
            <WithSidebar>
              <Suspense fallback={<div>Loading...</div>}>
                <UsuariosPage />
              </Suspense>
            </WithSidebar>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
};

const WithSidebar = ({ children }) => (
  <div className="flex">
    <Sidebar>
      <SidebarItem nav="/home" icon={<Home size={20} />} text="Home" />
      <SidebarItem nav="/eventos" icon={<Trash2 size={20} />} text="Eventos"/>
      <SidebarItem nav="/movimientos" icon={<ArrowLeftRight size={20} />} text="Movimientos" />
      <SidebarItem nav="/competiciones" icon={<Calendar size={20} />} text="Competiciones"/>
      <SidebarItem nav="/categorias" icon={<Settings size={20} />} text="Categorias" />
      <SidebarItem nav="/usuarios" icon={<CircleUserRound size={20} />} text="Usuarios"/>
    </Sidebar>

    <div className='w-full h-screen overflow-y-auto'>
      <Navbar/>
    {children}
    </div>

  </div>
);

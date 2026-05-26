import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PrivateRoute from '../components/PrivateRoute'
import LoginPage from '../pages/LoginPage'
import DashboardPage from '../pages/DashboardPage'
import CaixaPage from '../pages/CaixaPage'
import ProdutosPage from '../pages/ProdutosPage'
import DoacoesPage from '../pages/DoacoesPage'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/caixa"
          element={
            <PrivateRoute>
              <CaixaPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/produtos"
          element={
            <PrivateRoute>
              <ProdutosPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/doacoes"
          element={
            <PrivateRoute>
              <DoacoesPage />
            </PrivateRoute>
          }
        />

        <Route path="/gastos" element={<Navigate to="/caixa" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

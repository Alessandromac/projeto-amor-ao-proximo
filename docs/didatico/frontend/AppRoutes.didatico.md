// Importa componentes de roteamento do React Router:
// BrowserRouter = controla histórico no navegador.
// Routes/Route = define caminhos e componentes.
// Navigate = redireciona para outra rota.
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

// Componente que protege rotas privadas (exige autenticação).
import PrivateRoute from '../../components/PrivateRoute'

// Páginas da aplicação.
import LoginPage from '../../pages/LoginPage'
import DashboardPage from '../../pages/DashboardPage'
import CaixaPage from '../../pages/CaixaPage'
import DoacoesPage from '../../pages/DoacoesPage'
import ProdutosPage from '../../pages/ProdutosPage'

// Componente que concentra todas as rotas do app.
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública: login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rota privada: dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        {/* Rota privada: caixa */}
        <Route
          path="/caixa"
          element={
            <PrivateRoute>
              <CaixaPage />
            </PrivateRoute>
          }
        />

        {/* Rota privada: doações */}
        <Route
          path="/doacoes"
          element={
            <PrivateRoute>
              <DoacoesPage />
            </PrivateRoute>
          }
        />

        {/* Rota privada: produtos */}
        <Route
          path="/produtos"
          element={
            <PrivateRoute>
              <ProdutosPage />
            </PrivateRoute>
          }
        />

        {/* Compatibilidade:
            se acessar rota antiga /gastos, redireciona para /caixa */}
        <Route path="/gastos" element={<Navigate to="/caixa" replace />} />

        {/* Rota curinga:
            qualquer caminho não encontrado vai para /login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
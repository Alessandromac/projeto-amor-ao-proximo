// Importa hooks do React:
// useEffect = dispara ações quando componente monta/atualiza.
// useState = guarda dados que mudam com o tempo.
import { useEffect, useState } from 'react'

// Importa elementos de navegação:
import { Link, useNavigate } from 'react-router-dom'

// Cliente HTTP configurado para chamadas na API.
import httpClient from '../../api/httpClient'

// Importa CSS específico da página de dashboard.
import '../../styles/pages/dashboard.css'

// Componente da página inicial autenticada.
function DashboardPage() {
  // Hook que permite navegar via código.
  const navigate = useNavigate()

  // Lê usuário salvo no localStorage (string JSON).
  const usuarioSalvo = localStorage.getItem('usuario')

  // Converte JSON para objeto; se não existir, fica null.
  const usuario = usuarioSalvo ? JSON.parse(usuarioSalvo) : null

  // Estado com resumo de saldo (entradas/saídas/saldo).
  const [saldo, setSaldo] = useState(null)

  // Estado com últimas movimentações.
  const [movimentacoes, setMovimentacoes] = useState([])

  // Estado para loading inicial/atualizações.
  const [carregando, setCarregando] = useState(true)

  // Estado para mensagens de erro.
  const [erro, setErro] = useState('')

  // Função de logout:
  // remove token + usuário e redireciona para login.
  function sair() {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    navigate('/login')
  }

  // useEffect para carregar dados do dashboard:
  // - na abertura da tela
  // - a cada 10 segundos
  // - quando usuário volta para a aba.
  useEffect(() => {
    // Flag para evitar update após desmontar componente.
    let ativo = true

    // Variável para guardar ID do setInterval.
    let intervaloId

    // Função assíncrona de carregamento.
    async function carregarDados() {
      try {
        // Recupera token atual.
        const token = localStorage.getItem('token')

        // Sem token, sai da área autenticada.
        if (!token) {
          navigate('/login')
          return
        }

        // Header com Bearer token.
        const headers = {
          Authorization: `Bearer ${token}`
        }

        // Busca saldo e movimentações em paralelo.
        const [resSaldo, resMovs] = await Promise.all([
          httpClient.get('/caixa/saldo', { headers }),
          httpClient.get('/caixa', { headers })
        ])

        // Se componente já desmontou, interrompe.
        if (!ativo) return

        // Atualiza estados com dados da API.
        setSaldo(resSaldo.data?.dados || null)
        setMovimentacoes(resMovs.data?.dados || [])

        // Limpa erro antigo se sucesso.
        setErro('')
      } catch (error) {
        // Tenta ler status HTTP da resposta.
        const status = error?.response?.status

        // Se 401, sessão expirou; limpa local e redireciona.
        if (status === 401) {
          localStorage.removeItem('token')
          localStorage.removeItem('usuario')
          navigate('/login')
          return
        }

        // Outros erros: mostra mensagem para usuário.
        if (ativo) {
          setErro(
            error?.response?.data?.mensagem ||
              'Erro ao carregar dados do dashboard'
          )
        }
      } finally {
        // Finaliza loading quando terminar.
        if (ativo) {
          setCarregando(false)
        }
      }
    }

    // Função que só atualiza se aba estiver visível.
    function atualizarSeVisivel() {
      if (document.visibilityState === 'visible') {
        carregarDados()
      }
    }

    // Carrega imediatamente.
    carregarDados()

    // Atualiza automaticamente a cada 10 segundos.
    intervaloId = setInterval(carregarDados, 10000)

    // Atualiza quando janela volta ao foco.
    window.addEventListener('focus', carregarDados)

    // Atualiza quando aba volta a ficar visível.
    document.addEventListener('visibilitychange', atualizarSeVisivel)

    // Limpeza do efeito:
    // remove listeners, para interval e marca componente como inativo.
    return () => {
      ativo = false
      clearInterval(intervaloId)
      window.removeEventListener('focus', carregarDados)
      document.removeEventListener('visibilitychange', atualizarSeVisivel)
    }
  }, [navigate])

  // Render da interface.
  return (
    <main className="page">
      <h1>Controle de caixa</h1>
      <h3>Projeto Amor ao proximo</h3>

      <p>Bem-vindo{usuario?.nome ? `, ${usuario.nome}` : ''}.</p>
      <p>
        Perfil atual: <strong>{usuario?.perfil || 'nao identificado'}</strong>
      </p>

      <nav className="nav-row">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/caixa">Caixa</Link>
        <Link to="/doacoes">Doacoes</Link>
        <Link to="/produtos">Produtos</Link>
      </nav>

      <div className="actions-row">
        <button type="button" onClick={sair} className="btn btn-muted">
          Sair
        </button>
      </div>

      <div className="section-space" />

      {carregando ? <p className="muted">Carregando dados...</p> : null}
      {erro ? <p className="error">{erro}</p> : null}

      {!carregando && !erro && saldo ? (
        <section className="card section-space">
          <h2>Resumo de Caixa</h2>

          <div className="dashboard-kpis">
            <article className="kpi-item">
              <p className="kpi-label">Total entradas</p>
              <p className="kpi-value">
                R$ {Number(saldo.total_entradas || 0).toFixed(2)}
              </p>
            </article>

            <article className="kpi-item">
              <p className="kpi-label">Total saidas</p>
              <p className="kpi-value">
                R$ {Number(saldo.total_saidas || 0).toFixed(2)}
              </p>
            </article>

            <article className="kpi-item">
              <p className="kpi-label">Saldo atual</p>
              <p className="kpi-value kpi-value--saldo">
                R$ {Number(saldo.saldo_atual || 0).toFixed(2)}
              </p>
            </article>
          </div>
        </section>
      ) : null}

      {!carregando && !erro ? (
        <section className="card section-space">
          <h2>Ultimas Movimentacoes</h2>
          {movimentacoes.length === 0 ? (
            <p className="muted">Nenhuma movimentacao encontrada.</p>
          ) : (
            <ul>
              {movimentacoes.slice(0, 5).map(item => (
                <li key={item.id}>
                  {new Intl.DateTimeFormat('pt-BR').format(
                    new Date(item.data_movimento)
                  )}{' '}
                  - {item.tipo} - {item.descricao} - R${' '}
                  {Number(item.valor).toFixed(2)}
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : null}
    </main>
  )
}

export default DashboardPage
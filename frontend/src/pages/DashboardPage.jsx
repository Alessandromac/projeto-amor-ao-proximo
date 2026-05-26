import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { startRegistration } from '@simplewebauthn/browser'
import httpClient from '../api/httpClient'
import '../styles/pages/dashboard.css'

function DashboardPage() {
  const navigate = useNavigate()

  const usuarioSalvo = localStorage.getItem('usuario')
  const usuario = usuarioSalvo ? JSON.parse(usuarioSalvo) : null

  const [saldo, setSaldo] = useState(null)
  const [movimentacoes, setMovimentacoes] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [processandoPasskey, setProcessandoPasskey] = useState(false)
  const [erro, setErro] = useState('')
  const [info, setInfo] = useState('')

  function sair() {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    navigate('/login')
  }

  function obterHeaders() {
    const token = localStorage.getItem('token')
    return {
      Authorization: `Bearer ${token}`
    }
  }

  async function cadastrarImpressaoDigital() {
    setErro('')
    setInfo('')

    try {
      setProcessandoPasskey(true)
      setInfo('Confirme no dispositivo para cadastrar a impressao digital...')

      const optionsResp = await httpClient.post(
        '/passkey/me/register/options',
        {},
        { headers: obterHeaders() }
      )
      const options = optionsResp.data?.dados?.options

      const cred = await startRegistration({ optionsJSON: options })

      await httpClient.post(
        '/passkey/me/register/verify',
        { cred },
        { headers: obterHeaders() }
      )

      setInfo('Impressao digital/passkey cadastrada com sucesso para este usuario.')
    } catch (error) {
      const status = error?.response?.status
      if (status === 401) {
        sair()
        return
      }

      const mensagemApi = error?.response?.data?.mensagem
      const detalhe = error?.response?.data?.erro || error?.message
      setErro(
        `${mensagemApi || 'Erro ao cadastrar impressao digital'}${detalhe ? `: ${detalhe}` : ''}`
      )
    } finally {
      setProcessandoPasskey(false)
    }
  }

  useEffect(() => {
    let ativo = true
    let intervaloId

    async function carregarDados() {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          navigate('/login')
          return
        }

        const headers = {
          Authorization: `Bearer ${token}`
        }

        const [resSaldo, resMovs] = await Promise.all([
          httpClient.get('/caixa/saldo', { headers }),
          httpClient.get('/caixa', { headers })
        ])

        if (!ativo) return

        setSaldo(resSaldo.data?.dados || null)
        setMovimentacoes(resMovs.data?.dados || [])
        setErro('')
      } catch (error) {
        const status = error?.response?.status

        if (status === 401) {
          localStorage.removeItem('token')
          localStorage.removeItem('usuario')
          navigate('/login')
          return
        }

        if (ativo) {
          setErro(
            error?.response?.data?.mensagem ||
              'Erro ao carregar dados do dashboard'
          )
        }
      } finally {
        if (ativo) {
          setCarregando(false)
        }
      }
    }

    function atualizarSeVisivel() {
      if (document.visibilityState === 'visible') {
        carregarDados()
      }
    }

    carregarDados()

    // Atualiza automaticamente a cada 10 segundos
    intervaloId = setInterval(carregarDados, 10000)

    // Atualiza quando voltar para a aba/janela
    window.addEventListener('focus', carregarDados)
    document.addEventListener('visibilitychange', atualizarSeVisivel)

    return () => {
      ativo = false
      clearInterval(intervaloId)
      window.removeEventListener('focus', carregarDados)
      document.removeEventListener('visibilitychange', atualizarSeVisivel)
    }
  }, [navigate])

  return (
    <main className="page">
      <h1>Controle de caixa</h1>
      <h3>Projeto Amor ao próximo</h3>

      <p>Bem-vindo{usuario?.nome ? `, ${usuario.nome}` : ''}.</p>
      <p>
        Perfil atual: <strong>{usuario?.perfil || 'nao identificado'}</strong>
      </p>

      <nav className="nav-row">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/caixa">Caixa</Link>
        <Link to="/produtos">Produtos</Link>
        <Link to="/doacoes">Doacoes</Link>
      </nav>

      <div className="actions-row">
        <button type="button" onClick={sair} className="btn btn-muted">
          Sair
        </button>
        <button
          type="button"
          onClick={cadastrarImpressaoDigital}
          className="btn btn-primary"
          disabled={processandoPasskey}
        >
          {processandoPasskey
            ? 'Processando impressao digital...'
            : 'Cadastrar impressao digital'}
        </button>
      </div>

      <div className="section-space" />

      {carregando ? <p className="muted">Carregando dados...</p> : null}
      {erro ? <p className="error">{erro}</p> : null}
      {info ? (
        <p
          style={{
            color: '#86efac',
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            borderRadius: '8px',
            padding: '10px 12px',
            maxWidth: '700px'
          }}
        >
          {info}
        </p>
      ) : null}

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

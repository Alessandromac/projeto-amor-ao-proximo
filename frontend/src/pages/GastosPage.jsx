import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import httpClient from '../api/httpClient'

function GastosPage() {
  const navigate = useNavigate()

  const [gastos, setGastos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [salvando, setSalvando] = useState(false)
  const [editandoId, setEditandoId] = useState(null)

  const [descricao, setDescricao] = useState('')
  const [categoria, setCategoria] = useState('')
  const [valor, setValor] = useState('')
  const [dataGasto, setDataGasto] = useState('')
  const [observacao, setObservacao] = useState('')

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

  function limparFormulario() {
    setDescricao('')
    setCategoria('')
    setValor('')
    setDataGasto('')
    setObservacao('')
    setEditandoId(null)
  }

  const carregarGastos = useCallback(async () => {
    try {
      setErro('')
      setCarregando(true)

      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
        return
      }

      const resposta = await httpClient.get('/gastos', {
        headers: obterHeaders()
      })

      setGastos(resposta.data?.dados || [])
    } catch (error) {
      const status = error?.response?.status
      if (status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('usuario')
        navigate('/login')
        return
      }

      setErro(error?.response?.data?.mensagem || 'Erro ao carregar gastos')
    } finally {
      setCarregando(false)
    }
  }, [navigate])

  useEffect(() => {
    let ativo = true

    async function carregarInicial() {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          navigate('/login')
          return
        }

        const resposta = await httpClient.get('/gastos', {
          headers: obterHeaders()
        })

        if (!ativo) return
        setGastos(resposta.data?.dados || [])
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
          setErro(error?.response?.data?.mensagem || 'Erro ao carregar gastos')
        }
      } finally {
        if (ativo) {
          setCarregando(false)
        }
      }
    }

    carregarInicial()

    return () => {
      ativo = false
    }
  }, [navigate])

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setErro('')
      setSalvando(true)

      const payload = {
        descricao,
        categoria,
        valor: Number(valor),
        data_gasto: dataGasto,
        observacao
      }

      if (editandoId) {
        await httpClient.put(`/gastos/${editandoId}`, payload, {
          headers: obterHeaders()
        })
      } else {
        await httpClient.post('/gastos', payload, {
          headers: obterHeaders()
        })
      }

      limparFormulario()
      await carregarGastos()
    } catch (error) {
      const status = error?.response?.status
      if (status === 401) {
        sair()
        return
      }

      setErro(error?.response?.data?.mensagem || 'Erro ao salvar gasto')
    } finally {
      setSalvando(false)
    }
  }

  function iniciarEdicao(gasto) {
    setEditandoId(gasto.id)
    setDescricao(gasto.descricao || '')
    setCategoria(gasto.categoria || '')
    setValor(gasto.valor || '')
    setDataGasto((gasto.data_gasto || '').slice(0, 10))
    setObservacao(gasto.observacao || '')
  }

  async function excluirGasto(id) {
    const confirmou = window.confirm('Deseja realmente excluir este gasto?')
    if (!confirmou) return

    try {
      setErro('')

      await httpClient.delete(`/gastos/${id}`, {
        headers: obterHeaders()
      })

      if (editandoId === id) {
        limparFormulario()
      }

      await carregarGastos()
    } catch (error) {
      const status = error?.response?.status
      if (status === 401) {
        sair()
        return
      }

      setErro(error?.response?.data?.mensagem || 'Erro ao excluir gasto')
    }
  }

  return (
    <main className="page">
      <h1>Gastos</h1>

      <nav className="nav-row">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/gastos">Gastos</Link>
        <Link to="/produtos">Produtos</Link>
      </nav>

      <div className="actions-row">
        <button type="button" onClick={sair} className="btn btn-muted">
          Sair
        </button>
      </div>

      <section className="card section-space">
        <h2>{editandoId ? 'Editar Gasto' : 'Novo Gasto'}</h2>

        <form onSubmit={handleSubmit} className="form-grid">
          <input
            className="input"
            type="text"
            placeholder="Descricao"
            value={descricao}
            onChange={event => setDescricao(event.target.value)}
            required
          />

          <input
            className="input"
            type="text"
            placeholder="Categoria"
            value={categoria}
            onChange={event => setCategoria(event.target.value)}
            required
          />

          <input
            className="input"
            type="number"
            step="0.01"
            placeholder="Valor"
            value={valor}
            onChange={event => setValor(event.target.value)}
            required
          />

          <input
            className="input"
            type="date"
            value={dataGasto}
            onChange={event => setDataGasto(event.target.value)}
            required
          />

          <textarea
            className="input"
            placeholder="Observacao"
            value={observacao}
            onChange={event => setObservacao(event.target.value)}
            rows={3}
          />

          <div className="actions-row">
            <button
              type="submit"
              disabled={salvando}
              className="btn btn-primary"
            >
              {salvando
                ? 'Salvando...'
                : editandoId
                  ? 'Atualizar gasto'
                  : 'Cadastrar gasto'}
            </button>

            {editandoId ? (
              <button
                type="button"
                onClick={limparFormulario}
                className="btn btn-muted"
              >
                Cancelar edicao
              </button>
            ) : null}
          </div>
        </form>
      </section>

      {erro ? <p className="error section-space">{erro}</p> : null}
      {carregando ? (
        <p className="muted section-space">Carregando gastos...</p>
      ) : null}

      {!carregando ? (
        <section className="card section-space">
          <h2>Lista de Gastos</h2>

          {gastos.length === 0 ? (
            <p className="muted">Nenhum gasto encontrado.</p>
          ) : (
            <ul>
              {gastos.map(gasto => (
                <li key={gasto.id} style={{ marginBottom: '12px' }}>
                  <div>
                    {gasto.data_gasto
                      ? new Intl.DateTimeFormat('pt-BR').format(
                          new Date(gasto.data_gasto)
                        )
                      : ''}{' '}
                    - {gasto.descricao} - {gasto.categoria} - R${' '}
                    {Number(gasto.valor).toFixed(2)}
                  </div>

                  <div className="actions-row" style={{ marginTop: '6px' }}>
                    <button
                      type="button"
                      onClick={() => iniciarEdicao(gasto)}
                      className="btn btn-muted"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => excluirGasto(gasto.id)}
                      className="btn btn-danger"
                    >
                      Excluir
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : null}
    </main>
  )
}

export default GastosPage

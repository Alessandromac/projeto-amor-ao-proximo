import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import httpClient from '../api/httpClient'

const TIPOS = [
  { valor: 'dinheiro', label: 'Dinheiro' },
  { valor: 'alimentos', label: 'Alimentos' },
  { valor: 'vestuario', label: 'Vestuario' },
  { valor: 'higiene', label: 'Produtos de Higiene' }
]

function DoacoesPage() {
  const navigate = useNavigate()

  const [tipoDoacao, setTipoDoacao] = useState('dinheiro')
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [produtoId, setProdutoId] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [contaCaixaId, setContaCaixaId] = useState('')

  const [produtos, setProdutos] = useState([])
  const [contasCaixa, setContasCaixa] = useState([])
  const [doacoes, setDoacoes] = useState([])

  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')
  const [info, setInfo] = useState('')

  const ehDinheiro = tipoDoacao === 'dinheiro'

  const sair = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    navigate('/login')
  }, [navigate])

  const obterHeaders = useCallback(() => {
    const token = localStorage.getItem('token')
    return { Authorization: `Bearer ${token}` }
  }, [])

  function limparFormulario() {
    setTipoDoacao('dinheiro')
    setDescricao('')
    setValor('')
    setProdutoId('')
    setQuantidade('')
    if (contasCaixa.length > 0) {
      setContaCaixaId(String(contasCaixa[0].id))
    }
  }

  const carregarDados = useCallback(async () => {
    const [resDoacoes, resProdutos, resContas] = await Promise.all([
      httpClient.get('/doacoes', { headers: obterHeaders() }),
      httpClient.get('/produtos', { headers: obterHeaders() }),
      httpClient.get('/contas-caixa', { headers: obterHeaders() })
    ])

    setDoacoes(resDoacoes.data?.dados || [])
    setProdutos(resProdutos.data?.dados || [])
    const contas = (resContas.data?.dados || []).filter(c => c.id !== 'geral')
    setContasCaixa(contas)
    if (contas.length > 0) {
      setContaCaixaId(prev => prev || String(contas[0].id))
    }
  }, [obterHeaders])
  useEffect(() => {
    let ativo = true

    async function carregarInicial() {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          navigate('/login')
          return
        }

        await carregarDados()

        if (!ativo) return
        setErro('')
      } catch (error) {
        const status = error?.response?.status
        if (status === 401) {
          sair()
          return
        }
        if (ativo) {
          setErro(
            error?.response?.data?.mensagem ||
              'Erro ao carregar dados de doacoes'
          )
        }
      } finally {
        if (ativo) setCarregando(false)
      }
    }

    carregarInicial()

    return () => {
      ativo = false
    }
  }, [carregarDados, sair, navigate])

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setErro('')
      setInfo('')
      setSalvando(true)

      const payload = {
        tipo_doacao: tipoDoacao,
        descricao
      }

      if (ehDinheiro) {
        payload.valor = Number(valor)
        payload.conta_caixa_id = Number(contaCaixaId)
      } else {
        payload.produto_id = Number(produtoId)
        payload.quantidade = Number(quantidade)
      }

      await httpClient.post('/doacoes', payload, {
        headers: obterHeaders()
      })

      setInfo('Doacao registrada com sucesso')
      limparFormulario()
      await carregarDados()
    } catch (error) {
      const status = error?.response?.status
      if (status === 401) {
        sair()
        return
      }
      setErro(error?.response?.data?.mensagem || 'Erro ao registrar doacao')
    } finally {
      setSalvando(false)
    }
  }

  return (
    <main className="page">
      <h1>Doacoes</h1>

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

      <section className="card section-space">
        <h2>Registrar Doacao</h2>

        <form onSubmit={handleSubmit} className="form-grid">
          <select
            className="input"
            value={tipoDoacao}
            onChange={event => setTipoDoacao(event.target.value)}
            required
          >
            {TIPOS.map(tipo => (
              <option key={tipo.valor} value={tipo.valor}>
                {tipo.label}
              </option>
            ))}
          </select>

          <input
            className="input"
            type="text"
            placeholder="Descricao da doacao"
            value={descricao}
            onChange={event => setDescricao(event.target.value)}
            required
          />

          {ehDinheiro ? (
            <>
              <select
                className="input"
                value={contaCaixaId}
                onChange={event => setContaCaixaId(event.target.value)}
                required
              >
                <option value="">Selecione a conta de caixa</option>
                {contasCaixa.map(conta => (
                  <option key={conta.id} value={conta.id}>
                    {conta.nome}
                  </option>
                ))}
              </select>

              <input
                className="input"
                type="number"
                step="0.01"
                placeholder="Valor em dinheiro"
                value={valor}
                onChange={event => setValor(event.target.value)}
                required
              />
            </>
          ) : (
            <>
              <select
                className="input"
                value={produtoId}
                onChange={event => setProdutoId(event.target.value)}
                required
              >
                <option value="">Selecione o produto</option>
                {produtos.map(produto => (
                  <option key={produto.id} value={produto.id}>
                    {produto.nome} ({produto.sku})
                  </option>
                ))}
              </select>

              <input
                className="input"
                type="number"
                step="0.001"
                placeholder="Quantidade"
                value={quantidade}
                onChange={event => setQuantidade(event.target.value)}
                required
              />
            </>
          )}

          <button type="submit" disabled={salvando} className="btn btn-primary">
            {salvando ? 'Salvando...' : 'Registrar doacao'}
          </button>
        </form>
      </section>

      {info ? <p style={{ color: '#86efac' }}>{info}</p> : null}
      {erro ? <p className="error">{erro}</p> : null}
      {carregando ? <p className="muted">Carregando...</p> : null}

      {!carregando ? (
        <section className="card section-space">
          <h2>Historico de Doacoes</h2>

          {doacoes.length === 0 ? (
            <p className="muted">Nenhuma doacao registrada.</p>
          ) : (
            <ul>
              {doacoes.slice(0, 20).map(item => (
                <li key={item.id} style={{ marginBottom: '10px' }}>
                  {new Intl.DateTimeFormat('pt-BR').format(
                    new Date(item.data_doacao)
                  )}{' '}
                  - {item.tipo_doacao} - {item.descricao} -{' '}
                  {item.tipo_doacao === 'dinheiro'
                    ? `R$ ${Number(item.valor || 0).toFixed(2)} (${item.conta_nome || 'Sem conta'})`
                    : `${Number(item.quantidade || 0)} de ${item.produto_nome || 'produto'}`}
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : null}
    </main>
  )
}

export default DoacoesPage

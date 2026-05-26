// Importa hooks React:
// useCallback = mantém referência estável de funções.
// useEffect = executa lógica ao montar/atualizar componente.
// useState = estados da tela.
import { useCallback, useEffect, useState } from 'react'

// Importa navegação da SPA.
import { Link, useNavigate } from 'react-router-dom'

// Cliente HTTP para API.
import httpClient from '../../api/httpClient'

// Tipos de doação disponíveis no select.
const TIPOS = [
  { valor: 'dinheiro', label: 'Dinheiro' },
  { valor: 'alimentos', label: 'Alimentos' },
  { valor: 'vestuario', label: 'Vestuario' },
  { valor: 'higiene', label: 'Produtos de Higiene' }
]

// Componente da tela de doações.
function DoacoesPage() {
  // Hook para redirecionar por código.
  const navigate = useNavigate()

  // Estado do tipo selecionado.
  const [tipoDoacao, setTipoDoacao] = useState('dinheiro')

  // Estado da descrição da doação.
  const [descricao, setDescricao] = useState('')

  // Valor (usado para doação em dinheiro).
  const [valor, setValor] = useState('')

  // Produto selecionado (para doação de item).
  const [produtoId, setProdutoId] = useState('')

  // Quantidade do item doado.
  const [quantidade, setQuantidade] = useState('')

  // Lista de produtos para dropdown.
  const [produtos, setProdutos] = useState([])

  // Lista de doações cadastradas.
  const [doacoes, setDoacoes] = useState([])

  // Loading inicial.
  const [carregando, setCarregando] = useState(true)

  // Loading do submit.
  const [salvando, setSalvando] = useState(false)

  // Mensagem de erro.
  const [erro, setErro] = useState('')

  // Mensagem de sucesso/informação.
  const [info, setInfo] = useState('')

  // Flag booleana para facilitar renderização condicional.
  const ehDinheiro = tipoDoacao === 'dinheiro'

  // Função de logout.
  const sair = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    navigate('/login')
  }, [navigate])

  // Headers com Bearer token.
  const obterHeaders = useCallback(() => {
    const token = localStorage.getItem('token')
    return { Authorization: `Bearer ${token}` }
  }, [])

  // Reseta formulário.
  function limparFormulario() {
    setTipoDoacao('dinheiro')
    setDescricao('')
    setValor('')
    setProdutoId('')
    setQuantidade('')
  }

  // Carrega dados necessários da tela em paralelo.
  const carregarDados = useCallback(async () => {
    const [resDoacoes, resProdutos] = await Promise.all([
      httpClient.get('/doacoes', { headers: obterHeaders() }),
      httpClient.get('/produtos', { headers: obterHeaders() })
    ])

    setDoacoes(resDoacoes.data?.dados || [])
    setProdutos(resProdutos.data?.dados || [])
  }, [obterHeaders])

  // Efeito inicial da tela.
  useEffect(() => {
    let ativo = true

    async function carregarInicial() {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          sair()
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
  }, [carregarDados, sair])

  // Submit da doação.
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

  // JSX da página.
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
            <input
              className="input"
              type="number"
              step="0.01"
              placeholder="Valor em dinheiro"
              value={valor}
              onChange={event => setValor(event.target.value)}
              required
            />
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
                    ? `R$ ${Number(item.valor || 0).toFixed(2)}`
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
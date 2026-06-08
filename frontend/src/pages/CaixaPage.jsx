import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import httpClient from '../api/httpClient'

const CATEGORIAS = [
  'Compra de insumos',
  'Compra de equipamentos',
  'Compra de Embalagens',
  'Gastos com transporte',
  'Compra de produtos Higiene Pessoal',
  'Compra de roupas/cobertores',
  'outros'
]

const TIPOS_DOACAO = [
  { valor: 'dinheiro', label: 'Dinheiro' },
  { valor: 'alimentos', label: 'Alimentos' },
  { valor: 'vestuario', label: 'Vestuario' },
  { valor: 'higiene', label: 'Produtos de Higiene' }
]

function paraInputDateTime(valor) {
  if (!valor) return ''
  const data = new Date(valor)
  const tzOffset = data.getTimezoneOffset() * 60000
  const local = new Date(data.getTime() - tzOffset)
  return local.toISOString().slice(0, 16)
}

function CaixaPage() {
  const navigate = useNavigate()
  const usuario = JSON.parse(localStorage.getItem('usuario') || 'null')
  const ehAdmin = usuario?.perfil === 'admin'

  const [movimentacoes, setMovimentacoes] = useState([])
  const [produtos, setProdutos] = useState([])
  const [contasCaixa, setContasCaixa] = useState([])
  const [saldoResumo, setSaldoResumo] = useState(null)

  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [salvando, setSalvando] = useState(false)
  const [criandoConta, setCriandoConta] = useState(false)
  const [editandoId, setEditandoId] = useState(null)

  const [tipo, setTipo] = useState('entrada')
  const [tipoDoacao, setTipoDoacao] = useState('dinheiro')
  const [descricao, setDescricao] = useState('')
  const [categoria, setCategoria] = useState('doacao')
  const [valor, setValor] = useState('')
  const [produtoId, setProdutoId] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [dataMovimento, setDataMovimento] = useState('')
  const [contaLancamento, setContaLancamento] = useState('')

  const [contaFiltro, setContaFiltro] = useState('geral')
  const [busca, setBusca] = useState('')
  const [novaContaNome, setNovaContaNome] = useState('')

  function sair() {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    navigate('/login')
  }

  function obterHeaders() {
    const token = localStorage.getItem('token')
    return { Authorization: `Bearer ${token}` }
  }

  function montarQuery(params) {
    const query = new URLSearchParams()
    if (params.contaId && params.contaId !== 'geral') {
      query.set('conta_id', params.contaId)
    }
    if (params.busca && params.busca.trim()) {
      query.set('busca', params.busca.trim())
    }
    const texto = query.toString()
    return texto ? `?${texto}` : ''
  }

  function limparFormulario() {
    setTipo('entrada')
    setTipoDoacao('dinheiro')
    setDescricao('')
    setCategoria('doacao')
    setValor('')
    setProdutoId('')
    setQuantidade('')
    setDataMovimento('')
    setEditandoId(null)
  }

  function contasSelecionaveis() {
    return contasCaixa.filter(item => item.id !== 'geral')
  }

  function nomeContaSelecionada() {
    const conta = contasCaixa.find(
      item => String(item.id) === String(contaFiltro)
    )
    return conta?.nome || 'Caixa Geral'
  }

  async function carregarContas() {
    const resposta = await httpClient.get('/contas-caixa', {
      headers: obterHeaders()
    })

    const contas = resposta.data?.dados || []
    setContasCaixa(contas)

    if (!contaLancamento) {
      const primeiraConta = contas.find(item => item.id !== 'geral')
      if (primeiraConta) setContaLancamento(String(primeiraConta.id))
    }
  }

  async function carregarMovimentacoes() {
    const query = montarQuery({ contaId: contaFiltro, busca })
    const resposta = await httpClient.get(`/caixa${query}`, {
      headers: obterHeaders()
    })
    setMovimentacoes(resposta.data?.dados || [])
  }

  async function carregarSaldo() {
    const query = montarQuery({ contaId: contaFiltro })
    const resposta = await httpClient.get(`/caixa/saldo${query}`, {
      headers: obterHeaders()
    })
    setSaldoResumo(resposta.data?.dados || null)
  }

  async function carregarProdutos() {
    const resposta = await httpClient.get('/produtos', {
      headers: obterHeaders()
    })
    setProdutos(resposta.data?.dados || [])
  }

  async function carregarTela() {
    await Promise.all([
      carregarMovimentacoes(),
      carregarSaldo(),
      carregarProdutos(),
      carregarContas()
    ])
  }

  useEffect(() => {
    let ativo = true

    async function carregarInicial() {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          navigate('/login')
          return
        }

        await carregarTela()

        if (!ativo) return
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
            error?.response?.data?.mensagem || 'Erro ao carregar movimentacoes'
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
  }, [navigate])

  async function aplicarFiltro() {
    try {
      setErro('')
      setCarregando(true)
      await Promise.all([carregarMovimentacoes(), carregarSaldo()])
    } catch (error) {
      const status = error?.response?.status
      if (status === 401) {
        sair()
        return
      }
      setErro(error?.response?.data?.mensagem || 'Erro ao aplicar filtro')
    } finally {
      setCarregando(false)
    }
  }

  async function criarConta(event) {
    event.preventDefault()
    try {
      setErro('')
      setCriandoConta(true)

      await httpClient.post(
        '/contas-caixa',
        { nome: novaContaNome.trim() },
        { headers: obterHeaders() }
      )

      setNovaContaNome('')
      await carregarContas()
    } catch (error) {
      const status = error?.response?.status
      if (status === 401) {
        sair()
        return
      }
      setErro(error?.response?.data?.mensagem || 'Erro ao criar conta')
    } finally {
      setCriandoConta(false)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setErro('')
      setSalvando(true)

      if (!contaLancamento || Number.isNaN(Number(contaLancamento))) {
        setErro('Selecione uma conta de caixa para o lancamento')
        return
      }

      if (tipo === 'entrada') {
        const payloadDoacao = {
          tipo_doacao: tipoDoacao,
          descricao: descricao?.trim() || 'Doacao sem descricao',
          data_doacao: dataMovimento
            ? `${dataMovimento.replace('T', ' ')}:00`
            : undefined
        }

        if (tipoDoacao === 'dinheiro') {
          payloadDoacao.valor = Number(valor)
          payloadDoacao.conta_caixa_id = Number(contaLancamento)
        } else {
          payloadDoacao.produto_id = Number(produtoId)
          payloadDoacao.quantidade = Number(quantidade)
        }

        await httpClient.post('/doacoes', payloadDoacao, {
          headers: obterHeaders()
        })
      } else {
        const payloadCaixa = {
          tipo: 'saida',
          descricao: descricao?.trim() || 'Saida sem descricao',
          categoria,
          valor: Number(valor),
          conta_caixa_id: Number(contaLancamento),
          data_movimento: dataMovimento
            ? `${dataMovimento.replace('T', ' ')}:00`
            : undefined
        }

        if (editandoId) {
          await httpClient.put(`/caixa/${editandoId}`, payloadCaixa, {
            headers: obterHeaders()
          })
        } else {
          await httpClient.post('/caixa', payloadCaixa, {
            headers: obterHeaders()
          })
        }
      }

      limparFormulario()
      await Promise.all([
        carregarMovimentacoes(),
        carregarSaldo(),
        carregarProdutos()
      ])
    } catch (error) {
      const status = error?.response?.status
      if (status === 401) {
        sair()
        return
      }

      setErro(error?.response?.data?.mensagem || 'Erro ao salvar movimentacao')
    } finally {
      setSalvando(false)
    }
  }

  function iniciarEdicao(item) {
    setEditandoId(item.id)
    setTipo(item.tipo || 'saida')
    setTipoDoacao('dinheiro')
    setDescricao(item.descricao || '')
    setCategoria(item.categoria || 'outros')
    setValor(item.valor || '')
    setProdutoId('')
    setQuantidade('')
    setContaLancamento(String(item.conta_caixa_id || ''))
    setDataMovimento(paraInputDateTime(item.data_movimento))
  }

  async function excluirMovimentacao(id) {
    const confirmou = window.confirm(
      'Deseja realmente excluir esta movimentacao?'
    )
    if (!confirmou) return

    try {
      setErro('')
      await httpClient.delete(`/caixa/${id}`, {
        headers: obterHeaders()
      })

      if (editandoId === id) limparFormulario()
      await Promise.all([carregarMovimentacoes(), carregarSaldo()])
    } catch (error) {
      const status = error?.response?.status
      if (status === 401) {
        sair()
        return
      }

      setErro(error?.response?.data?.mensagem || 'Erro ao excluir movimentacao')
    }
  }

  return (
    <main className="page">
      <h1>Movimentacao de Caixa</h1>

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
        <h2>Pesquisa e Filtro</h2>
        <div className="form-grid">
          <select
            className="input"
            value={contaFiltro}
            onChange={event => setContaFiltro(event.target.value)}
          >
            {contasCaixa.map(conta => (
              <option key={String(conta.id)} value={String(conta.id)}>
                {conta.nome}
              </option>
            ))}
          </select>

          <input
            className="input"
            type="text"
            placeholder="Pesquisar por descricao, categoria, conta ou usuario"
            value={busca}
            onChange={event => setBusca(event.target.value)}
          />

          <button
            type="button"
            className="btn btn-primary"
            onClick={aplicarFiltro}
          >
            Aplicar filtro
          </button>
        </div>
      </section>

      {saldoResumo ? (
        <section className="card section-space">
          <h2>Saldo do {nomeContaSelecionada()}</h2>
          <p>
            Total entradas: R${' '}
            {Number(saldoResumo.total_entradas || 0).toFixed(2)}
          </p>
          <p>
            Total saidas: R$ {Number(saldoResumo.total_saidas || 0).toFixed(2)}
          </p>
          <p>
            <strong>
              Saldo final: R$ {Number(saldoResumo.saldo_atual || 0).toFixed(2)}
            </strong>
          </p>
        </section>
      ) : null}

      <section className="card section-space">
        <h2>{editandoId ? 'Editar Movimentacao' : 'Novo Lancamento'}</h2>

        <form onSubmit={handleSubmit} className="form-grid">
          <select
            className="input"
            value={contaLancamento}
            onChange={event => setContaLancamento(event.target.value)}
            required
          >
            <option value="">Selecione a conta de caixa</option>
            {contasSelecionaveis().map(conta => (
              <option key={conta.id} value={conta.id}>
                {conta.nome}
              </option>
            ))}
          </select>

          <select
            className="input"
            value={tipo}
            onChange={event => setTipo(event.target.value)}
            required
          >
            <option value="entrada">Entrada (doacao)</option>
            <option value="saida">Saida (compra/gasto)</option>
          </select>

          {tipo === 'entrada' ? (
            <>
              <select
                className="input"
                value={tipoDoacao}
                onChange={event => setTipoDoacao(event.target.value)}
                required
              >
                {TIPOS_DOACAO.map(item => (
                  <option key={item.valor} value={item.valor}>
                    {item.label}
                  </option>
                ))}
              </select>

              <input
                className="input"
                type="text"
                placeholder="Descricao da doacao (opcional)"
                value={descricao}
                onChange={event => setDescricao(event.target.value)}
              />

              {tipoDoacao === 'dinheiro' ? (
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
            </>
          ) : (
            <>
              <input
                className="input"
                type="text"
                placeholder="Descricao da saida"
                value={descricao}
                onChange={event => setDescricao(event.target.value)}
              />

              <select
                className="input"
                value={categoria}
                onChange={event => setCategoria(event.target.value)}
                required
              >
                {CATEGORIAS.map(item => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <input
                className="input"
                type="number"
                step="0.01"
                placeholder="Valor da saida"
                value={valor}
                onChange={event => setValor(event.target.value)}
                required
              />

            </>
          )}

          <input
            className="input"
            type="datetime-local"
            value={dataMovimento}
            onChange={event => setDataMovimento(event.target.value)}
          />

          <div className="actions-row">
            <button
              type="submit"
              disabled={salvando}
              className="btn btn-primary"
            >
              {salvando
                ? 'Salvando...'
                : tipo === 'entrada'
                  ? 'Registrar doacao'
                  : editandoId
                    ? 'Atualizar'
                    : 'Cadastrar'}
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

      {ehAdmin ? (
        <section className="card section-space">
          <h2>Cadastro de Contas de Caixa</h2>
          <form onSubmit={criarConta} className="form-grid">
            <input
              className="input"
              type="text"
              placeholder="Ex: Caixa Euzania"
              value={novaContaNome}
              onChange={event => setNovaContaNome(event.target.value)}
              required
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={criandoConta}
            >
              {criandoConta ? 'Salvando conta...' : 'Cadastrar conta'}
            </button>
          </form>
        </section>
      ) : null}

      {erro ? <p className="error section-space">{erro}</p> : null}
      {carregando ? <p className="muted section-space">Carregando...</p> : null}

      {!carregando ? (
        <section className="card section-space">
          <h2>Lista de Movimentacoes</h2>

          {movimentacoes.length === 0 ? (
            <p className="muted">Nenhuma movimentacao encontrada.</p>
          ) : (
            <ul>
              {movimentacoes.map(item => (
                <li key={item.id} style={{ marginBottom: '12px' }}>
                  <div>
                    {new Intl.DateTimeFormat('pt-BR').format(
                      new Date(item.data_movimento)
                    )}{' '}
                    - <strong>{item.conta_nome || 'Sem conta'}</strong> -{' '}
                    {item.tipo}
                    {' - '}
                    {item.descricao} - {item.categoria} - R${' '}
                    {Number(item.valor).toFixed(2)}
                  </div>

                  <div className="actions-row" style={{ marginTop: '6px' }}>
                    <button
                      type="button"
                      onClick={() => iniciarEdicao(item)}
                      className="btn btn-muted"
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      onClick={() => excluirMovimentacao(item.id)}
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

export default CaixaPage

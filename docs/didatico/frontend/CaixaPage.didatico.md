// Importa hooks do React:
// useCallback = memoriza funções para evitar recriações desnecessárias.
// useEffect = executa efeitos colaterais (ex.: carregar API ao abrir a tela).
// useState = cria estados (dados dinâmicos da tela).
import { useCallback, useEffect, useState } from 'react'

// Importa componentes/recursos de navegação do React Router:
// Link = link entre páginas sem recarregar.
// useNavigate = redirecionamento via código.
import { Link, useNavigate } from 'react-router-dom'

// Cliente HTTP (axios configurado) para chamar a API.
import httpClient from '../../api/httpClient'

// Lista fixa de categorias para SAÍDAS de caixa.
const CATEGORIAS = [
  'Compra de insumos',
  'Compra de equipamentos',
  'Compra de Embalagens',
  'Gastos com transporte',
  'Compra de produtos Higiene Pessoal',
  'Compra de roupas/cobertores',
  'outros'
]

// Lista fixa de tipos de doação para ENTRADAS.
const TIPOS_DOACAO = [
  { valor: 'dinheiro', label: 'Dinheiro' },
  { valor: 'alimentos', label: 'Alimentos' },
  { valor: 'vestuario', label: 'Vestuario' },
  { valor: 'higiene', label: 'Produtos de Higiene' }
]

// Função utilitária:
// Converte string/data vinda da API para formato aceito por input datetime-local: YYYY-MM-DDTHH:mm
function paraInputDateTime(valor) {
  // Se não vier valor, retorna vazio.
  if (!valor) return ''

  // Cria objeto Date.
  const data = new Date(valor)

  // Ajusta fuso horário local para não deslocar hora no input.
  const tzOffset = data.getTimezoneOffset() * 60000
  const local = new Date(data.getTime() - tzOffset)

  // Retorna só até minutos.
  return local.toISOString().slice(0, 16)
}

// Componente principal da tela de Caixa.
function CaixaPage() {
  // Hook para navegar programaticamente.
  const navigate = useNavigate()

  // Lista de movimentações do caixa.
  const [movimentacoes, setMovimentacoes] = useState([])

  // Lista de produtos (usada quando entrada é doação de itens).
  const [produtos, setProdutos] = useState([])

  // Estado de carregamento inicial da tela.
  const [carregando, setCarregando] = useState(true)

  // Estado de mensagem de erro.
  const [erro, setErro] = useState('')

  // Estado para bloquear botão enquanto salva.
  const [salvando, setSalvando] = useState(false)

  // Estado que guarda ID em edição (null = cadastro novo).
  const [editandoId, setEditandoId] = useState(null)

  // Tipo geral de lançamento: entrada ou saida.
  const [tipo, setTipo] = useState('entrada')

  // Tipo da doação quando tipo=entrada.
  const [tipoDoacao, setTipoDoacao] = useState('dinheiro')

  // Descrição do lançamento.
  const [descricao, setDescricao] = useState('')

  // Categoria da saída.
  const [categoria, setCategoria] = useState('doacao')

  // Valor monetário.
  const [valor, setValor] = useState('')

  // Produto selecionado quando doação é item.
  const [produtoId, setProdutoId] = useState('')

  // Quantidade do item doado.
  const [quantidade, setQuantidade] = useState('')

  // Data/hora opcional para saída.
  const [dataMovimento, setDataMovimento] = useState('')

  // Função de logout:
  // limpa token/usuário e redireciona para login.
  const sair = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    navigate('/login')
  }, [navigate])

  // Cria objeto de headers com token Bearer para rotas protegidas.
  const obterHeaders = useCallback(() => {
    const token = localStorage.getItem('token')
    return { Authorization: `Bearer ${token}` }
  }, [])

  // Limpa formulário e volta valores padrão.
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

  // Busca movimentações do caixa na API.
  const carregarMovimentacoes = useCallback(async () => {
    const resposta = await httpClient.get('/caixa', {
      headers: obterHeaders()
    })
    setMovimentacoes(resposta.data?.dados || [])
  }, [obterHeaders])

  // Busca produtos na API (usados no select de doação de itens).
  const carregarProdutos = useCallback(async () => {
    const resposta = await httpClient.get('/produtos', {
      headers: obterHeaders()
    })
    setProdutos(resposta.data?.dados || [])
  }, [obterHeaders])

  // Efeito inicial da página.
  useEffect(() => {
    // Flag para evitar setState após desmontar componente.
    let ativo = true

    // Função assíncrona para carregar dados iniciais.
    async function carregarInicial() {
      try {
        // Verifica token salvo.
        const token = localStorage.getItem('token')

        // Se não há token, faz logout seguro.
        if (!token) {
          sair()
          return
        }

        // Carrega movimentações e produtos em paralelo (mais rápido).
        const [resMov, resProd] = await Promise.all([
          httpClient.get('/caixa', { headers: obterHeaders() }),
          httpClient.get('/produtos', { headers: obterHeaders() })
        ])

        // Se componente desmontou durante await, interrompe.
        if (!ativo) return

        // Atualiza estados com dados recebidos.
        setMovimentacoes(resMov.data?.dados || [])
        setProdutos(resProd.data?.dados || [])
        setErro('')
      } catch (error) {
        // Captura status HTTP.
        const status = error?.response?.status

        // Se token expirou/inválido, sai.
        if (status === 401) {
          sair()
          return
        }

        // Mensagem amigável para outros erros.
        if (ativo) {
          setErro(
            error?.response?.data?.mensagem || 'Erro ao carregar movimentacoes'
          )
        }
      } finally {
        // Finaliza loading se ainda ativo.
        if (ativo) setCarregando(false)
      }
    }

    // Executa carregamento inicial.
    carregarInicial()

    // Função de limpeza do efeito.
    return () => {
      ativo = false
    }
  }, [obterHeaders, sair])

  // Submit principal do formulário.
  async function handleSubmit(event) {
    // Evita reload da página.
    event.preventDefault()

    try {
      // Limpa erro antigo.
      setErro('')

      // Ativa estado de salvamento.
      setSalvando(true)

      // Regra 1: ENTRADA usa endpoint /doacoes.
      if (tipo === 'entrada') {
        // Payload base de doação.
        const payloadDoacao = {
          tipo_doacao: tipoDoacao,
          descricao: descricao?.trim() || 'Doacao sem descricao'
        }

        // Se doação em dinheiro, exige valor.
        if (tipoDoacao === 'dinheiro') {
          payloadDoacao.valor = Number(valor)
        } else {
          // Se doação de item, envia produto + quantidade.
          payloadDoacao.produto_id = Number(produtoId)
          payloadDoacao.quantidade = Number(quantidade)

          // Valor estimado opcional (se preenchido).
          if (valor !== '' && Number(valor) > 0) {
            payloadDoacao.valor = Number(valor)
          }
        }

        // Chama API de doações.
        await httpClient.post('/doacoes', payloadDoacao, {
          headers: obterHeaders()
        })
      } else {
        // Regra 2: SAÍDA usa endpoint /caixa.
        const payloadCaixa = {
          tipo: 'saida',
          descricao: descricao?.trim() || 'Saida sem descricao',
          categoria,
          valor: Number(valor),
          data_movimento: dataMovimento
            ? `${dataMovimento.replace('T', ' ')}:00`
            : undefined
        }

        // Se está editando, usa PUT.
        if (editandoId) {
          await httpClient.put(`/caixa/${editandoId}`, payloadCaixa, {
            headers: obterHeaders()
          })
        } else {
          // Se novo cadastro, usa POST.
          await httpClient.post('/caixa', payloadCaixa, {
            headers: obterHeaders()
          })
        }
      }

      // Limpa formulário.
      limparFormulario()

      // Recarrega dados da tela.
      await Promise.all([carregarMovimentacoes(), carregarProdutos()])
    } catch (error) {
      // Captura status para tratar 401.
      const status = error?.response?.status

      // Em caso de token inválido, sai.
      if (status === 401) {
        sair()
        return
      }

      // Mostra erro genérico ou erro da API.
      setErro(error?.response?.data?.mensagem || 'Erro ao salvar movimentacao')
    } finally {
      // Libera botão.
      setSalvando(false)
    }
  }

  // Preenche formulário ao clicar em "Editar".
  function iniciarEdicao(item) {
    setEditandoId(item.id)
    setTipo(item.tipo || 'saida')
    setTipoDoacao('dinheiro')
    setDescricao(item.descricao || '')
    setCategoria(item.categoria || 'outros')
    setValor(item.valor || '')
    setProdutoId('')
    setQuantidade('')
    setDataMovimento(paraInputDateTime(item.data_movimento))
  }

  // Exclui movimentação com confirmação.
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
      await carregarMovimentacoes()
    } catch (error) {
      const status = error?.response?.status
      if (status === 401) {
        sair()
        return
      }

      setErro(error?.response?.data?.mensagem || 'Erro ao excluir movimentacao')
    }
  }

  // Renderização da tela.
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
        <h2>{editandoId ? 'Editar Movimentacao' : 'Novo Lancamento'}</h2>

        <form onSubmit={handleSubmit} className="form-grid">
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

                  <input
                    className="input"
                    type="number"
                    step="0.01"
                    placeholder="Valor estimado (opcional)"
                    value={valor}
                    onChange={event => setValor(event.target.value)}
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

              <input
                className="input"
                type="datetime-local"
                value={dataMovimento}
                onChange={event => setDataMovimento(event.target.value)}
              />
            </>
          )}

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
                    - {item.tipo} - {item.descricao} - {item.categoria} - R${' '}
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
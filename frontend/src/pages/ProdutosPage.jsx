import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import httpClient from '../api/httpClient';

function ProdutosPage() {
  const navigate = useNavigate();

  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [editandoId, setEditandoId] = useState(null);

  const [nome, setNome] = useState('');
  const [sku, setSku] = useState('');
  const [unidade, setUnidade] = useState('un');
  const [estoqueMinimo, setEstoqueMinimo] = useState('');

  function sair() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/login');
  }

  function obterHeaders() {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  }

  function limparFormularioProduto() {
    setNome('');
    setSku('');
    setUnidade('un');
    setEstoqueMinimo('');
    setEditandoId(null);
  }

  async function carregarProdutos() {
    const resposta = await httpClient.get('/produtos', {
      headers: obterHeaders()
    });
    setProdutos(resposta.data?.dados || []);
  }

  useEffect(() => {
    let ativo = true;

    async function carregarInicial() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const resposta = await httpClient.get('/produtos', {
          headers: obterHeaders()
        });

        if (!ativo) return;
        setProdutos(resposta.data?.dados || []);
        setErro('');
      } catch (error) {
        const status = error?.response?.status;
        if (status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('usuario');
          navigate('/login');
          return;
        }

        if (ativo) {
          setErro(error?.response?.data?.mensagem || 'Erro ao carregar produtos');
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarInicial();

    return () => {
      ativo = false;
    };
  }, [navigate]);

  async function handleSubmitProduto(event) {
    event.preventDefault();

    try {
      setErro('');
      setSalvando(true);

      const payload = {
        nome,
        sku,
        unidade,
        estoque_minimo: Number(estoqueMinimo || 0)
      };

      if (editandoId) {
        await httpClient.put(`/produtos/${editandoId}`, payload, {
          headers: obterHeaders()
        });
      } else {
        await httpClient.post('/produtos', payload, {
          headers: obterHeaders()
        });
      }

      limparFormularioProduto();
      await carregarProdutos();
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        sair();
        return;
      }

      setErro(error?.response?.data?.mensagem || 'Erro ao salvar produto');
    } finally {
      setSalvando(false);
    }
  }

  function iniciarEdicao(produto) {
    setEditandoId(produto.id);
    setNome(produto.nome || '');
    setSku(produto.sku || '');
    setUnidade(produto.unidade || 'un');
    setEstoqueMinimo(produto.estoque_minimo ?? 0);
  }

  async function excluirProduto(id) {
    const confirmou = window.confirm('Deseja realmente excluir este produto?');
    if (!confirmou) return;

    try {
      setErro('');

      await httpClient.delete(`/produtos/${id}`, {
        headers: obterHeaders()
      });

      if (editandoId === id) {
        limparFormularioProduto();
      }

      await carregarProdutos();
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        sair();
        return;
      }

      setErro(error?.response?.data?.mensagem || 'Erro ao excluir produto');
    }
  }

  return (
    <main className="page">
      <h1>Produtos</h1>

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
        <h2>{editandoId ? 'Editar Produto' : 'Novo Produto'}</h2>

        <form onSubmit={handleSubmitProduto} className="form-grid">
          <input
            className="input"
            type="text"
            placeholder="Nome do produto"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
          />

          <input
            className="input"
            type="text"
            placeholder="SKU (codigo unico)"
            value={sku}
            onChange={(event) => setSku(event.target.value)}
            required
          />

          <input
            className="input"
            type="text"
            placeholder="Unidade (ex: un, kg, cx)"
            value={unidade}
            onChange={(event) => setUnidade(event.target.value)}
            required
          />

          <input
            className="input"
            type="number"
            step="0.001"
            placeholder="Estoque minimo"
            value={estoqueMinimo}
            onChange={(event) => setEstoqueMinimo(event.target.value)}
          />

          <div className="actions-row">
            <button type="submit" disabled={salvando} className="btn btn-primary">
              {salvando ? 'Salvando...' : editandoId ? 'Atualizar produto' : 'Cadastrar produto'}
            </button>

            {editandoId ? (
              <button type="button" onClick={limparFormularioProduto} className="btn btn-muted">
                Cancelar edicao
              </button>
            ) : null}
          </div>
        </form>
      </section>

      {carregando ? <p className="muted section-space">Carregando dados...</p> : null}
      {erro ? <p className="error section-space">{erro}</p> : null}

      {!carregando && !erro ? (
        <section className="card section-space">
          <h2>Lista de Produtos</h2>

          {produtos.length === 0 ? (
            <p className="muted">Nenhum produto encontrado.</p>
          ) : (
            <ul>
              {produtos.map((produto) => (
                <li key={produto.id} style={{ marginBottom: '12px' }}>
                  <div>
                    {produto.nome} ({produto.sku}) - Estoque: {produto.estoque_atual} {produto.unidade}
                  </div>

                  <div className="actions-row" style={{ marginTop: '6px' }}>
                    <button type="button" onClick={() => iniciarEdicao(produto)} className="btn btn-muted">
                      Editar
                    </button>

                    <button type="button" onClick={() => excluirProduto(produto.id)} className="btn btn-danger">
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
  );
}

export default ProdutosPage;
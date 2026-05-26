import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { startAuthentication, startRegistration } from '@simplewebauthn/browser';
import httpClient from '../api/httpClient';

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@controlecaixa.com');
  const [senha, setSenha] = useState('123456');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [info, setInfo] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setErro('');
    setInfo('');

    try {
      setCarregando(true);

      const resposta = await httpClient.post('/auth/login', {
        email,
        senha
      });

      const { token, usuario } = resposta.data;

      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      navigate('/dashboard');
    } catch (error) {
      const mensagemApi = error?.response?.data?.mensagem;
      const status = error?.response?.status;
      const detalhe = error?.message;

      setErro(
        mensagemApi ||
          `Falha no login (status: ${status || 'sem status'}) - ${detalhe || 'erro desconhecido'}`
      );
    } finally {
      setCarregando(false);
    }
  }

  async function cadastrarImpressaoDigital() {
    setErro('');
    setInfo('');

    try {
      if (!email) {
        setErro('Informe o email antes de cadastrar a impressao digital');
        return;
      }

      setCarregando(true);

      const optionsResp = await httpClient.post('/passkey/register/options', { email });
      const { usuario_id, options } = optionsResp.data.dados;

      const cred = await startRegistration({ optionsJSON: options });

      await httpClient.post('/passkey/register/verify', {
        usuario_id,
        cred
      });

      setInfo('Impressao digital/passkey cadastrada com sucesso');
    } catch (error) {
      const mensagemApi = error?.response?.data?.mensagem;
      const detalhe = error?.response?.data?.erro || error?.message;
      setErro(
        mensagemApi ||
          `Erro ao cadastrar impressao digital${detalhe ? `: ${detalhe}` : ''}`
      );
    } finally {
      setCarregando(false);
    }
  }

  async function entrarComImpressaoDigital() {
    setErro('');
    setInfo('');

    try {
      if (!email) {
        setErro('Informe o email para entrar com impressao digital');
        return;
      }

      setCarregando(true);

      const optionsResp = await httpClient.post('/passkey/login/options', { email });
      const { usuario_id, options } = optionsResp.data.dados;

      const cred = await startAuthentication({ optionsJSON: options });

      const loginResp = await httpClient.post('/passkey/login/verify', {
        usuario_id,
        cred
      });

      const { token, usuario } = loginResp.data;

      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      navigate('/dashboard');
    } catch (error) {
      const mensagemApi = error?.response?.data?.mensagem;
      const detalhe = error?.response?.data?.erro || error?.message;
      setErro(
        mensagemApi ||
          `Erro ao entrar com impressao digital${detalhe ? `: ${detalhe}` : ''}`
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="page">
      <h1>Login</h1>

      <form onSubmit={handleSubmit} className="form-grid" style={{ maxWidth: '420px' }}>
        <label>
          Email
          <input
            className="input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label>
          Senha
          <input
            className="input"
            type="password"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={carregando} className="btn btn-primary">
          {carregando ? 'Processando...' : 'Entrar com email e senha'}
        </button>
      </form>

      <div className="actions-row section-space">
        <button
          type="button"
          onClick={cadastrarImpressaoDigital}
          disabled={carregando}
          className="btn btn-muted"
        >
          Cadastrar impressao digital
        </button>

        <button
          type="button"
          onClick={entrarComImpressaoDigital}
          disabled={carregando}
          className="btn btn-primary"
        >
          Entrar com impressao digital
        </button>
      </div>

      {info ? <p style={{ color: '#86efac' }}>{info}</p> : null}
      {erro ? <p className="error">{erro}</p> : null}
    </main>
  );
}

export default LoginPage;

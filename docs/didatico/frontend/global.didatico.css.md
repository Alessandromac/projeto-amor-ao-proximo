/* :root guarda variáveis globais (design tokens) para padronizar cores e espaçamentos. */
:root {
  /* Cor de fundo principal (topo do gradiente). */
  --bg-1: #0b1020;

  /* Cor de fundo secundária (base do gradiente). */
  --bg-2: #111827;

  /* Cor base dos cards (não usada diretamente abaixo, mas útil para expansão). */
  --card: #1f2937;

  /* Cor da borda padrão dos blocos e inputs. */
  --line: #374151;

  /* Cor principal dos textos (texto forte). */
  --text-1: #e5e7eb;

  /* Cor secundária dos textos (texto suave/auxiliar). */
  --text-2: #9ca3af;

  /* Cor principal de ação positiva (botão primário). */
  --primary: #22c55e;

  /* Cor de hover do botão primário. */
  --primary-hover: #16a34a;

  /* Cor principal de ação destrutiva (excluir). */
  --danger: #ef4444;

  /* Cor de hover da ação destrutiva. */
  --danger-hover: #dc2626;

  /* Raio padrão dos cantos dos cards. */
  --radius: 10px;

  /* Escala de espaçamento curta. */
  --space-1: 8px;

  /* Escala de espaçamento média curta. */
  --space-2: 12px;

  /* Escala de espaçamento média. */
  --space-3: 16px;

  /* Escala de espaçamento grande. */
  --space-4: 24px;
}

/* Aplica box-model mais previsível para todos os elementos. */
* {
  box-sizing: border-box;
}

/* Garante estrutura base ocupando a altura da tela. */
html,
body,
#root {
  margin: 0;
  min-height: 100%;
}

/* Estilo visual base da aplicação. */
body {
  background: linear-gradient(180deg, var(--bg-1), var(--bg-2));
  color: var(--text-1);
  font-family: 'Segoe UI', Tahoma, sans-serif;
}

/* Estilo padrão de links. */
a {
  color: #93c5fd;
  text-decoration: none;
}

/* Efeito de hover para links. */
a:hover {
  text-decoration: underline;
}

/* Mantém tipografia consistente em controles de formulário e botões. */
button,
input,
select,
textarea {
  font: inherit;
}

/* Container principal das páginas. */
.page {
  width: min(980px, 100%);
  margin: 0 auto;
  padding: var(--space-4);
}

/* Card reutilizável para seções da tela. */
.card {
  background: rgba(31, 41, 55, 0.65);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: var(--space-3);
}

/* Linha de navegação horizontal. */
.nav-row {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
  margin: var(--space-2) 0 var(--space-3);
}

/* Linha de ações (botões) com quebra em telas menores. */
.actions-row {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

/* Grid simples para formulários. */
.form-grid {
  display: grid;
  gap: var(--space-2);
  max-width: 500px;
}

/* Estilo base dos campos de entrada. */
.input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid var(--line);
  background: #0f172a;
  color: var(--text-1);
}

/* Estilo base de botões. */
.btn {
  border: 0;
  border-radius: 8px;
  padding: 10px 14px;
  cursor: pointer;
  background-color: rgb(111, 0, 255);
}

/* Botão principal (salvar/confirmar). */
.btn-primary {
  background: var(--primary);
  color: #052e16;
  font-weight: 600;
}

/* Hover do botão principal. */
.btn-primary:hover {
  background: var(--primary-hover);
}

/* Botão de ação destrutiva. */
.btn-danger {
  background: var(--danger);
  color: #fff;
}

/* Hover do botão destrutivo. */
.btn-danger:hover {
  background: var(--danger-hover);
}

/* Botão neutro/secundário. */
.btn-muted {
  background: #6b7280;
  color: #fff;
}

/* Texto de apoio/discreto. */
.muted {
  color: var(--text-2);
}

/* Texto de erro. */
.error {
  color: #fca5a5;
}

/* Classe utilitária para espaçamento vertical entre seções. */
.section-space {
  margin-top: var(--space-4);
}

/* Ajustes responsivos para telas pequenas. */
@media (max-width: 640px) {
  /* Reduz padding lateral no mobile. */
  .page {
    padding: var(--space-3);
  }

  /* Botões ocupam largura total no mobile. */
  .btn {
    width: 100%;
  }
}
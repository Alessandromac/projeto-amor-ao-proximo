const fs = require('fs')
const path = require('path')

const raiz = path.resolve(__dirname, '..')
const destino = path.join(raiz, 'docs', 'didatico', 'codigo-linha-por-linha')

const arquivos = [
  ...listarArquivos(path.join(raiz, 'frontend', 'src'), ['.js', '.jsx', '.css']),
  ...listarArquivos(path.join(raiz, 'backend', 'src'), ['.js'])
].filter(arquivo => !arquivo.includes(`${path.sep}assets${path.sep}`))

function listarArquivos(diretorio, extensoes) {
  if (!fs.existsSync(diretorio)) return []

  return fs.readdirSync(diretorio, { withFileTypes: true }).flatMap(item => {
    const caminho = path.join(diretorio, item.name)

    if (item.isDirectory()) {
      return listarArquivos(caminho, extensoes)
    }

    if (extensoes.includes(path.extname(item.name))) {
      return [caminho]
    }

    return []
  })
}

function escaparMarkdown(valor) {
  return valor
    .replace(/\\/g, '\\\\')
    .replace(/\|/g, '\\|')
    .replace(/`/g, '\\`')
}

function explicarLinha(linha, arquivo) {
  const texto = linha.trim()
  const ext = path.extname(arquivo)

  if (!texto) return 'Linha em branco usada para separar blocos e melhorar a leitura.'

  if (ext === '.css') return explicarCss(texto)

  if (texto.startsWith('import ')) return 'Importa recursos de outro arquivo ou biblioteca para serem usados neste arquivo.'
  if (texto.startsWith('const ') && texto.includes('useState')) return 'Cria um estado do React: uma informação que pode mudar e fazer a tela atualizar.'
  if (texto.startsWith('const ') && texto.includes('useNavigate')) return 'Cria a função de navegação do React Router para trocar de tela pelo código.'
  if (texto.startsWith('const ') && texto.includes('useCallback')) return 'Cria uma função memorizada para evitar recriação desnecessária e ajudar nas dependências dos hooks.'
  if (texto.startsWith('const ')) return 'Declara uma constante, ou seja, uma variável que não deve ser reatribuída depois.'
  if (texto.startsWith('let ')) return 'Declara uma variável que pode ter o valor alterado depois.'
  if (texto.startsWith('function ')) return 'Declara uma função, que agrupa uma rotina reutilizável do sistema.'
  if (texto.startsWith('async function ')) return 'Declara uma função assíncrona, usada quando existe espera por API, banco ou outra operação demorada.'
  if (texto.includes('useEffect(')) return 'Executa uma rotina quando o componente carrega ou quando alguma dependência muda.'
  if (texto.includes('return (')) return 'Inicia o retorno visual do componente React, normalmente o JSX que aparece na tela.'
  if (texto === 'return null') return 'Retorna nada para a tela; usado quando não há o que renderizar.'
  if (texto.startsWith('return ')) return 'Retorna um valor para quem chamou a função.'
  if (texto.startsWith('if ' ) || texto.startsWith('if(')) return 'Inicia uma condição: o código interno só roda se a regra for verdadeira.'
  if (texto.startsWith('else')) return 'Define o caminho alternativo quando a condição anterior não foi verdadeira.'
  if (texto.startsWith('try')) return 'Inicia um bloco protegido para tentar executar uma operação que pode falhar.'
  if (texto.startsWith('catch')) return 'Captura erros que aconteceram dentro do bloco try.'
  if (texto.startsWith('finally')) return 'Executa uma rotina final, com ou sem erro, como desligar carregamento.'
  if (texto.includes('await ')) return 'Espera uma operação assíncrona terminar antes de continuar.'
  if (texto.includes('httpClient.get')) return 'Faz uma requisição GET para buscar dados na API.'
  if (texto.includes('httpClient.post')) return 'Faz uma requisição POST para cadastrar ou enviar dados para a API.'
  if (texto.includes('httpClient.put')) return 'Faz uma requisição PUT para atualizar um registro existente na API.'
  if (texto.includes('httpClient.delete')) return 'Faz uma requisição DELETE para remover um registro na API.'
  if (texto.includes('localStorage.getItem')) return 'Lê uma informação salva no navegador, como token ou usuário logado.'
  if (texto.includes('localStorage.setItem')) return 'Salva uma informação no navegador para usar depois.'
  if (texto.includes('localStorage.removeItem')) return 'Remove uma informação salva no navegador, muito usado no logout.'
  if (texto.includes('navigate(')) return 'Redireciona o usuário para outra rota/tela do frontend.'
  if (texto.includes('map(')) return 'Percorre uma lista para criar uma nova lista ou renderizar itens na tela.'
  if (texto.includes('filter(')) return 'Filtra uma lista mantendo apenas os itens que atendem a uma condição.'
  if (texto.includes('find(')) return 'Procura o primeiro item de uma lista que atende a uma condição.'
  if (texto.includes('Number(')) return 'Converte um valor para número, geralmente antes de enviar ou calcular.'
  if (texto.includes('JSON.stringify')) return 'Transforma um objeto JavaScript em texto JSON.'
  if (texto.includes('JSON.parse')) return 'Transforma texto JSON de volta em objeto JavaScript.'

  if (texto.startsWith('<')) return explicarJsx(texto)

  if (texto.includes('require(')) return 'Importa um módulo no backend usando CommonJS, padrão muito comum em Node.js.'
  if (texto.includes('module.exports')) return 'Exporta funções ou objetos para que outros arquivos possam importar.'
  if (texto.includes('express.Router')) return 'Cria um roteador do Express para organizar endpoints da API.'
  if (texto.startsWith('router.get')) return 'Cria uma rota GET da API, usada para consultar/listar dados.'
  if (texto.startsWith('router.post')) return 'Cria uma rota POST da API, usada para cadastrar/enviar dados.'
  if (texto.startsWith('router.put')) return 'Cria uma rota PUT da API, usada para atualizar dados.'
  if (texto.startsWith('router.delete')) return 'Cria uma rota DELETE da API, usada para excluir dados.'
  if (texto.startsWith('app.use')) return 'Registra um middleware ou conjunto de rotas dentro do Express.'
  if (texto.startsWith('app.get')) return 'Cria uma rota GET diretamente na aplicação Express.'
  if (texto.includes('db.query')) return 'Executa uma consulta SQL no banco de dados MySQL.'
  if (texto.includes('INSERT INTO')) return 'SQL de inserção: cria um novo registro no banco.'
  if (texto.includes('SELECT')) return 'SQL de consulta: busca dados no banco.'
  if (texto.includes('UPDATE')) return 'SQL de atualização: altera dados já existentes no banco.'
  if (texto.includes('DELETE FROM')) return 'SQL de exclusão: remove registros do banco.'
  if (texto.includes('response.status')) return 'Define o status HTTP e envia a resposta da API para o frontend.'
  if (texto.includes('request.body')) return 'Lê dados enviados pelo frontend no corpo da requisição.'
  if (texto.includes('request.params')) return 'Lê parâmetros da URL, como o id em /usuarios/:id.'
  if (texto.includes('request.query')) return 'Lê filtros enviados na URL, como ?conta_id=1.'

  if (texto === '{' || texto === '}' || texto === ');' || texto === '}' || texto === '},') {
    return 'Fecha ou organiza um bloco de código iniciado anteriormente.'
  }

  return 'Linha que compõe a lógica do arquivo; leia junto com as linhas vizinhas para entender o bloco completo.'
}

function explicarJsx(texto) {
  if (texto.startsWith('<main')) return 'Define a área principal da página renderizada pelo componente.'
  if (texto.startsWith('<section')) return 'Cria uma seção visual da página, normalmente agrupando um bloco de conteúdo.'
  if (texto.startsWith('<form')) return 'Cria um formulário para o usuário preencher e enviar dados.'
  if (texto.startsWith('<input')) return 'Cria um campo de entrada de dados.'
  if (texto.startsWith('<select')) return 'Cria uma lista de opções selecionáveis.'
  if (texto.startsWith('<option')) return 'Define uma opção dentro de um campo select.'
  if (texto.startsWith('<button')) return 'Cria um botão acionável pelo usuário.'
  if (texto.startsWith('<Link')) return 'Cria um link interno do React Router para navegar sem recarregar a página.'
  if (texto.startsWith('<h1')) return 'Mostra o título principal da página.'
  if (texto.startsWith('<h2')) return 'Mostra um título de seção.'
  if (texto.startsWith('<p')) return 'Mostra um parágrafo ou mensagem na tela.'
  if (texto.startsWith('<ul')) return 'Cria uma lista visual de itens.'
  if (texto.startsWith('<li')) return 'Cria um item dentro de uma lista.'
  if (texto.startsWith('</')) return 'Fecha uma tag JSX aberta anteriormente.'
  return 'Trecho JSX: estrutura visual que o React transforma em elementos da página.'
}

function explicarCss(texto) {
  if (texto.endsWith('{')) return 'Inicia um seletor CSS, definindo quais elementos receberão os estilos abaixo.'
  if (texto === '}') return 'Fecha o bloco de estilos do seletor CSS.'
  if (texto.startsWith('@media')) return 'Cria uma regra responsiva, aplicada apenas em determinados tamanhos de tela.'
  if (texto.includes(':root')) return 'Define variáveis globais de CSS para reutilizar cores, espaçamentos e outros valores.'
  if (texto.includes('display:')) return 'Controla como o elemento é exibido, como flex, grid ou block.'
  if (texto.includes('grid')) return 'Define comportamento de grade para organizar elementos em colunas/linhas.'
  if (texto.includes('flex')) return 'Define comportamento flexível para alinhar elementos em linha ou coluna.'
  if (texto.includes('color:')) return 'Define a cor do texto.'
  if (texto.includes('background')) return 'Define cor ou imagem de fundo.'
  if (texto.includes('padding')) return 'Define espaçamento interno do elemento.'
  if (texto.includes('margin')) return 'Define espaçamento externo do elemento.'
  if (texto.includes('border')) return 'Define borda do elemento.'
  if (texto.includes('font')) return 'Controla aparência da fonte, como tamanho, peso ou família.'
  if (texto.includes('width')) return 'Define largura do elemento.'
  if (texto.includes('height')) return 'Define altura do elemento.'
  return 'Regra CSS que ajusta aparência, espaçamento ou comportamento visual.'
}

function nomeDoc(arquivo) {
  const relativo = path.relative(raiz, arquivo)
  return relativo.replace(/[\\/]/g, '__').replace(/\./g, '_') + '.md'
}

fs.mkdirSync(destino, { recursive: true })

const links = []

for (const arquivo of arquivos) {
  const relativo = path.relative(raiz, arquivo)
  const linhas = fs.readFileSync(arquivo, 'utf8').split(/\r?\n/)
  const nome = nomeDoc(arquivo)
  const caminhoDoc = path.join(destino, nome)

  const conteudo = [
    `# ${relativo}`,
    '',
    'Este arquivo foi gerado para estudo. Ele mostra cada linha do código e uma explicação simples em português.',
    '',
    '| Linha | Código | Explicação |',
    '|---:|---|---|',
    ...linhas.map((linha, index) => {
      const codigo = linha ? `\`${escaparMarkdown(linha)}\`` : '` `'
      return `| ${index + 1} | ${codigo} | ${explicarLinha(linha, arquivo)} |`
    }),
    ''
  ].join('\n')

  fs.writeFileSync(caminhoDoc, conteudo, 'utf8')
  links.push(`- [${relativo}](./${nome})`)
}

fs.writeFileSync(
  path.join(destino, 'README.md'),
  [
    '# Código Comentado Linha Por Linha',
    '',
    'Esta pasta contém arquivos didáticos gerados para ajudar no estudo do projeto.',
    '',
    'A ideia é manter o código original limpo e funcional, enquanto a explicação detalhada fica em Markdown.',
    '',
    '## Arquivos',
    '',
    ...links.sort(),
    ''
  ].join('\n'),
  'utf8'
)

console.log(`Documentacao didatica gerada em: ${destino}`)

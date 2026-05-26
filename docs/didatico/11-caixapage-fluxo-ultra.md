# 11 - Fluxo CaixaPage completo (PT-BR)

## Objetivo da tela
Unificar operação diária de caixa:
- entrada via doação.
- saída via compra/gasto.
- lista, edição e exclusão.

## Regras de formulário
### Quando tipo = entrada
- mostra tipo de doação.
- dinheiro: exige valor.
- item: exige produto e quantidade; valor estimado opcional.

### Quando tipo = saída
- mostra descrição, categoria, valor, data/hora.

## Carregamento de dados
Tela carrega:
1. movimentações de caixa
2. produtos

## Persistência
- entrada -> endpoint de doações.
- saída -> endpoint de caixa.

## Pós-ação
- limpa formulário
- recarrega listas
- mostra erros quando necessário.

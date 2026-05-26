# 10 - Fluxo Doação -> Caixa/Estoque (PT-BR)

## Regra funcional
- Doação dinheiro -> entrada financeira no caixa.
- Doação de item -> entrada de estoque em produto.

## Etapas técnicas
1. Frontend envia `POST /api/doacoes`.
2. Controller valida tipo e campos obrigatórios.
3. Model inicia transação no banco.
4. Salva registro base em `doacoes`.
5. Se dinheiro:
   - lança `movimentacoes_caixa` entrada.
6. Se item:
   - valida produto.
   - lança `movimentacoes_estoque` entrada.
   - atualiza `produtos.estoque_atual`.
7. Commit da transação.
8. Retorno de sucesso para frontend.

## Vantagem da transação
Se qualquer etapa falhar, rollback evita inconsistência.

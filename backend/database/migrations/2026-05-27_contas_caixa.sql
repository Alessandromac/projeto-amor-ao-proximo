USE controle_caixa;

CREATE TABLE IF NOT EXISTS contas_caixa (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL UNIQUE,
  ativo TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO contas_caixa (nome, ativo)
SELECT 'Caixa Euzania', 1
WHERE NOT EXISTS (
  SELECT 1 FROM contas_caixa WHERE nome = 'Caixa Euzania'
);

INSERT INTO contas_caixa (nome, ativo)
SELECT 'Caixa Leila', 1
WHERE NOT EXISTS (
  SELECT 1 FROM contas_caixa WHERE nome = 'Caixa Leila'
);

SET @sql = IF(
  EXISTS (
    SELECT 1
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'movimentacoes_caixa'
      AND COLUMN_NAME = 'categoria'
  ),
  'SELECT 1',
  'ALTER TABLE movimentacoes_caixa ADD COLUMN categoria VARCHAR(100) NOT NULL DEFAULT ''outros'' AFTER descricao'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = IF(
  EXISTS (
    SELECT 1
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'movimentacoes_caixa'
      AND COLUMN_NAME = 'conta_caixa_id'
  ),
  'SELECT 1',
  'ALTER TABLE movimentacoes_caixa ADD COLUMN conta_caixa_id INT UNSIGNED NULL AFTER usuario_id'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = IF(
  EXISTS (
    SELECT 1
    FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
    WHERE CONSTRAINT_SCHEMA = DATABASE()
      AND TABLE_NAME = 'movimentacoes_caixa'
      AND CONSTRAINT_NAME = 'fk_caixa_conta'
  ),
  'SELECT 1',
  'ALTER TABLE movimentacoes_caixa ADD CONSTRAINT fk_caixa_conta FOREIGN KEY (conta_caixa_id) REFERENCES contas_caixa(id)'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

CREATE TABLE IF NOT EXISTS doacoes (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tipo_doacao ENUM('dinheiro', 'alimentos', 'vestuario', 'higiene') NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  valor DECIMAL(12,2) NULL,
  conta_caixa_id INT UNSIGNED NULL,
  produto_id INT UNSIGNED NULL,
  quantidade DECIMAL(12,3) NULL,
  data_doacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  usuario_id INT UNSIGNED NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_doacao_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  CONSTRAINT fk_doacao_conta
    FOREIGN KEY (conta_caixa_id) REFERENCES contas_caixa(id),
  CONSTRAINT fk_doacao_produto
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

SET @sql = IF(
  EXISTS (
    SELECT 1
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'doacoes'
      AND COLUMN_NAME = 'conta_caixa_id'
  ),
  'SELECT 1',
  'ALTER TABLE doacoes ADD COLUMN conta_caixa_id INT UNSIGNED NULL AFTER valor'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = IF(
  EXISTS (
    SELECT 1
    FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
    WHERE CONSTRAINT_SCHEMA = DATABASE()
      AND TABLE_NAME = 'doacoes'
      AND CONSTRAINT_NAME = 'fk_doacao_conta'
  ),
  'SELECT 1',
  'ALTER TABLE doacoes ADD CONSTRAINT fk_doacao_conta FOREIGN KEY (conta_caixa_id) REFERENCES contas_caixa(id)'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

UPDATE movimentacoes_caixa mc
SET mc.conta_caixa_id = (
  SELECT cc.id
  FROM contas_caixa cc
  WHERE cc.nome = 'Caixa Euzania'
  LIMIT 1
)
WHERE mc.conta_caixa_id IS NULL;


const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Inicializar banco de dados
const db = new sqlite3.Database('./oficina.db', (err) => {
  if (err) {
    console.error('❌ Erro ao conectar com o banco de dados:', err.message);
  } else {
    console.log('✅ Conectado ao banco de dados SQLite');
    initializeDatabase();
  }
});

// Criar tabelas se não existirem
function initializeDatabase() {
  const tables = [
    `CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      telefone TEXT NOT NULL,
      email TEXT NOT NULL,
      data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS veiculos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente_id INTEGER,
      marca TEXT NOT NULL,
      modelo TEXT NOT NULL,
      ano INTEGER NOT NULL,
      placa TEXT,
      data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (cliente_id) REFERENCES clientes (id)
    )`,
    
    `CREATE TABLE IF NOT EXISTS defeitos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL,
      data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    `CREATE TABLE IF NOT EXISTS servicos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente_id INTEGER,
      veiculo_id INTEGER,
      defeito_id INTEGER,
      servico_realizado TEXT NOT NULL,
      valor DECIMAL(10,2) NOT NULL,
      funcionario TEXT NOT NULL,
      data_servico DATE NOT NULL,
      observacoes TEXT,
      status TEXT DEFAULT 'Concluído',
      data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (cliente_id) REFERENCES clientes (id),
      FOREIGN KEY (veiculo_id) REFERENCES veiculos (id),
      FOREIGN KEY (defeito_id) REFERENCES defeitos (id)
    )`
  ];

  tables.forEach((sql, index) => {
    db.run(sql, (err) => {
      if (err) {
        console.error(`❌ Erro ao criar tabela ${index + 1}:`, err.message);
      } else {
        console.log(`✅ Tabela ${index + 1} criada/verificada com sucesso`);
      }
    });
  });
}

// Rotas da API

// Dashboard - estatísticas
app.get('/api/dashboard', (req, res) => {
  const stats = {};
  
  // Contar clientes
  db.get('SELECT COUNT(*) as total FROM clientes', (err, row) => {
    if (err) {
      console.error('Erro ao contar clientes:', err);
      res.status(500).json({ error: err.message });
      return;
    }
    stats.clientes = row.total;
    
    // Contar veículos
    db.get('SELECT COUNT(*) as total FROM veiculos', (err, row) => {
      if (err) {
        console.error('Erro ao contar veículos:', err);
        res.status(500).json({ error: err.message });
        return;
      }
      stats.veiculos = row.total;
      
      // Contar serviços do mês
      db.get(`SELECT COUNT(*) as total FROM servicos 
              WHERE strftime('%Y-%m', data_servico) = strftime('%Y-%m', 'now')`, (err, row) => {
        if (err) {
          console.error('Erro ao contar serviços:', err);
          res.status(500).json({ error: err.message });
          return;
        }
        stats.servicos_mes = row.total;
        
        // Faturamento do mês
        db.get(`SELECT SUM(valor) as total FROM servicos 
                WHERE strftime('%Y-%m', data_servico) = strftime('%Y-%m', 'now')`, (err, row) => {
          if (err) {
            console.error('Erro ao calcular faturamento:', err);
            res.status(500).json({ error: err.message });
            return;
          }
          stats.faturamento_mes = row.total || 0;
          res.json(stats);
        });
      });
    });
  });
});

// Clientes
app.get('/api/clientes', (req, res) => {
  db.all('SELECT * FROM clientes ORDER BY nome', (err, rows) => {
    if (err) {
      console.error('Erro ao buscar clientes:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.post('/api/clientes', (req, res) => {
  const { nome, telefone, email } = req.body;
  
  if (!nome || !telefone || !email) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }
  
  db.run('INSERT INTO clientes (nome, telefone, email) VALUES (?, ?, ?)', 
    [nome, telefone, email], function(err) {
    if (err) {
      console.error('Erro ao inserir cliente:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id: this.lastID, message: 'Cliente cadastrado com sucesso!' });
    }
  });
});

// Veículos
app.get('/api/veiculos', (req, res) => {
  const sql = `
    SELECT v.*, c.nome as cliente_nome 
    FROM veiculos v 
    LEFT JOIN clientes c ON v.cliente_id = c.id 
    ORDER BY v.marca, v.modelo
  `;
  db.all(sql, (err, rows) => {
    if (err) {
      console.error('Erro ao buscar veículos:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.post('/api/veiculos', (req, res) => {
  const { cliente_id, marca, modelo, ano, placa } = req.body;
  
  if (!cliente_id || !marca || !modelo || !ano) {
    return res.status(400).json({ error: 'Campos obrigatórios: cliente, marca, modelo e ano' });
  }
  
  db.run('INSERT INTO veiculos (cliente_id, marca, modelo, ano, placa) VALUES (?, ?, ?, ?, ?)', 
    [cliente_id, marca, modelo, ano, placa], function(err) {
    if (err) {
      console.error('Erro ao inserir veículo:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id: this.lastID, message: 'Veículo cadastrado com sucesso!' });
    }
  });
});

// Defeitos
app.get('/api/defeitos', (req, res) => {
  db.all('SELECT * FROM defeitos ORDER BY data_cadastro DESC', (err, rows) => {
    if (err) {
      console.error('Erro ao buscar defeitos:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.post('/api/defeitos', (req, res) => {
  const { descricao } = req.body;
  
  if (!descricao) {
    return res.status(400).json({ error: 'Descrição é obrigatória' });
  }
  
  db.run('INSERT INTO defeitos (descricao) VALUES (?)', [descricao], function(err) {
    if (err) {
      console.error('Erro ao inserir defeito:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id: this.lastID, message: 'Defeito cadastrado com sucesso!' });
    }
  });
});

// Serviços
app.get('/api/servicos', (req, res) => {
  const sql = `
    SELECT s.*, c.nome as cliente_nome, v.marca, v.modelo, v.placa, d.descricao as defeito_descricao
    FROM servicos s
    LEFT JOIN clientes c ON s.cliente_id = c.id
    LEFT JOIN veiculos v ON s.veiculo_id = v.id
    LEFT JOIN defeitos d ON s.defeito_id = d.id
    ORDER BY s.data_servico DESC
  `;
  db.all(sql, (err, rows) => {
    if (err) {
      console.error('Erro ao buscar serviços:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.post('/api/servicos', (req, res) => {
  const { cliente_id, veiculo_id, defeito_id, servico_realizado, valor, funcionario, data_servico, observacoes } = req.body;
  
  if (!cliente_id || !veiculo_id || !servico_realizado || !valor || !funcionario || !data_servico) {
    return res.status(400).json({ error: 'Campos obrigatórios: cliente, veículo, serviço, valor, funcionário e data' });
  }
  
  db.run(`INSERT INTO servicos (cliente_id, veiculo_id, defeito_id, servico_realizado, valor, funcionario, data_servico, observacoes) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
    [cliente_id, veiculo_id, defeito_id, servico_realizado, valor, funcionario, data_servico, observacoes], 
    function(err) {
      if (err) {
        console.error('Erro ao inserir serviço:', err);
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id: this.lastID, message: 'Serviço registrado com sucesso!' });
      }
    });
});

// Rota principal - servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Middleware para capturar rotas não encontradas
app.use((req, res) => {
  console.log(`❌ Rota não encontrada: ${req.method} ${req.url}`);
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error('❌ Erro no servidor:', err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor AutoPro rodando em http://localhost:${PORT}`);
  console.log('🔧 Sistema de Oficina Mecânica iniciado com sucesso!');
  console.log('📁 Servindo arquivos da pasta: public/');
});

// Fechar banco de dados ao encerrar aplicação
process.on('SIGINT', () => {
  console.log('\n🔄 Encerrando servidor...');
  db.close((err) => {
    if (err) {
      console.error('❌ Erro ao fechar banco:', err.message);
    } else {
      console.log('🔒 Banco de dados fechado com sucesso');
    }
    console.log('✅ Servidor encerrado');
    process.exit(0);
  });
});
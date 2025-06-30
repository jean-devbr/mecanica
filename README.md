# 🔧 Sistema Oficina AutoPro

Sistema completo de gestão para oficinas mecânicas, desenvolvido para uso interno com interface moderna e funcionalidades abrangentes.

## 📋 Funcionalidades

### 🏠 Dashboard
- Visão geral com estatísticas em tempo real
- Contadores de clientes, veículos e serviços
- Faturamento mensal
- Últimos serviços realizados
- Ações rápidas para cadastros

### 👥 Gestão de Clientes
- Cadastro completo de clientes
- Listagem com dados de contato
- Histórico de cadastros

### 🚗 Gestão de Veículos
- Cadastro de veículos vinculados aos clientes
- Informações de marca, modelo, ano e placa
- Relacionamento automático cliente-veículo

### ⚠️ Cadastro de Defeitos
- Registro de tipos de defeitos comuns
- Descrições detalhadas para reutilização
- Histórico de defeitos cadastrados

### 🔧 Serviços Realizados
- Registro completo de serviços
- Vinculação com cliente, veículo e defeito
- Controle de funcionário responsável
- Valores e datas de serviço
- Observações adicionais

### 📊 Relatórios
- Relatórios mensais com estatísticas
- Listagem completa de todos os serviços
- Análise de faturamento e produtividade
- Filtros por período

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **SQLite3** - Banco de dados local
- **Body-parser** - Middleware para parsing
- **CORS** - Controle de acesso

### Frontend
- **HTML5** - Estrutura das páginas
- **CSS3** - Estilização moderna e responsiva
- **JavaScript ES6+** - Interatividade e API calls
- **Font Awesome** - Ícones profissionais

### Banco de Dados
- **SQLite** - Banco local para máxima performance
- **Relacionamentos** - Estrutura normalizada
- **Integridade** - Chaves estrangeiras e validações

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js (versão 14 ou superior)
- NPM (gerenciador de pacotes)

### Passo a Passo

1. **Clone ou baixe o projeto**
   ```bash
   git clone [url-do-repositorio]
   cd oficina-autopro
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor**
   ```bash
   npm start
   ```
   
   Para desenvolvimento com auto-reload:
   ```bash
   npm run dev
   ```

4. **Acesse o sistema**
   - Abra o navegador em: `http://localhost:3000`
   - O banco de dados será criado automaticamente na primeira execução

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais

#### `clientes`
- `id` - Identificador único
- `nome` - Nome completo
- `telefone` - Telefone de contato
- `email` - E-mail
- `data_cadastro` - Data de criação

#### `veiculos`
- `id` - Identificador único
- `cliente_id` - Referência ao cliente
- `marca` - Marca do veículo
- `modelo` - Modelo do veículo
- `ano` - Ano de fabricação
- `placa` - Placa do veículo
- `data_cadastro` - Data de criação

#### `defeitos`
- `id` - Identificador único
- `descricao` - Descrição do defeito
- `data_cadastro` - Data de criação

#### `servicos`
- `id` - Identificador único
- `cliente_id` - Referência ao cliente
- `veiculo_id` - Referência ao veículo
- `defeito_id` - Referência ao defeito (opcional)
- `servico_realizado` - Descrição do serviço
- `valor` - Valor cobrado
- `funcionario` - Nome do funcionário responsável
- `data_servico` - Data de realização
- `observacoes` - Observações adicionais
- `status` - Status do serviço
- `data_cadastro` - Data de criação

## 🎨 Interface e Design

### Características
- **Design Moderno** - Interface limpa e profissional
- **Responsivo** - Funciona em desktop, tablet e mobile
- **Intuitivo** - Navegação simples e clara
- **Acessível** - Cores contrastantes e ícones descritivos

### Paleta de Cores
- **Primária**: Azul (#2563eb)
- **Secundária**: Cinza (#64748b)
- **Sucesso**: Verde (#10b981)
- **Alerta**: Amarelo (#f59e0b)
- **Erro**: Vermelho (#ef4444)

## 📱 Responsividade

O sistema é totalmente responsivo e se adapta a diferentes tamanhos de tela:

- **Desktop** (1024px+): Layout completo com sidebar fixa
- **Tablet** (768px-1023px): Sidebar reduzida
- **Mobile** (até 767px): Menu horizontal e layout otimizado

## 🔒 Segurança e Dados

### Características de Segurança
- Validação de dados no frontend e backend
- Sanitização de entradas
- Tratamento de erros robusto
- Backup automático do banco SQLite

### Backup dos Dados
O arquivo `oficina.db` contém todos os dados do sistema. Para backup:
1. Pare o servidor
2. Copie o arquivo `oficina.db`
3. Armazene em local seguro

## 🛠️ Manutenção

### Logs do Sistema
- Logs são exibidos no console durante execução
- Erros de banco de dados são registrados
- Status de conexões é monitorado

### Atualizações
Para atualizar o sistema:
1. Faça backup do banco de dados
2. Substitua os arquivos do sistema
3. Execute `npm install` se houver novas dependências
4. Reinicie o servidor

## 📞 Suporte

### Problemas Comuns

**Erro de porta em uso:**
```bash
# Altere a porta no arquivo server.js
const PORT = 3001; // ou outra porta disponível
```

**Banco de dados corrompido:**
1. Pare o servidor
2. Delete o arquivo `oficina.db`
3. Reinicie o servidor (criará novo banco)

**Problemas de permissão:**
```bash
# Linux/Mac - dar permissões de execução
chmod +x server.js
```

## 🚀 Melhorias Futuras

### Funcionalidades Planejadas
- [ ] Sistema de backup automático
- [ ] Exportação de relatórios em PDF
- [ ] Notificações de serviços pendentes
- [ ] Controle de estoque de peças
- [ ] Agendamento de serviços
- [ ] Sistema de orçamentos
- [ ] Integração com WhatsApp
- [ ] Controle de usuários e permissões

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Desenvolvimento

Desenvolvido especificamente para oficinas mecânicas que precisam de um sistema simples, eficiente e confiável para gestão interna.

### Estrutura do Projeto
```
oficina-autopro/
├── server.js              # Servidor principal
├── package.json           # Dependências e scripts
├── oficina.db            # Banco de dados (criado automaticamente)
├── public/               # Arquivos estáticos
│   ├── index.html        # Dashboard
│   ├── cadastro_cliente.html
│   ├── cadastro_veiculo.html
│   ├── cadastro_defeito.html
│   ├── servico_realizado.html
│   ├── relatorios.html
│   ├── style.css         # Estilos
│   └── script.js         # JavaScript frontend
└── README.md             # Este arquivo
```

---

**Oficina AutoPro** - Transformando a gestão da sua oficina! 🔧🚗
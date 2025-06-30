# 🔧 Sistema Oficina AutoPro

Sistema completo de gestão para oficinas mecânicas, desenvolvido com tecnologias modernas e interface profissional. Solução 100% web para controle total de clientes, veículos, defeitos, serviços e consultas avançadas.

![Oficina AutoPro](https://img.shields.io/badge/Oficina-AutoPro-orange?style=for-the-badge&logo=wrench)
![Status](https://img.shields.io/badge/Status-Ativo-brightgreen?style=for-the-badge)
![Versão](https://img.shields.io/badge/Versão-2.0-blue?style=for-the-badge)

## 🚀 Funcionalidades Principais

### 🏠 **Dashboard Inteligente**
- **📊 Estatísticas em Tempo Real**: Contadores dinâmicos de clientes, veículos e serviços
- **💰 Controle Financeiro**: Faturamento mensal automatizado
- **📈 Últimos Serviços**: Visualização dos serviços mais recentes
- **⚡ Ações Rápidas**: Acesso direto aos cadastros principais
- **📅 Data Atual**: Informações de data e hora atualizadas

### 👥 **Gestão Completa de Clientes**
- **📝 Cadastro Detalhado**: Nome, telefone, e-mail com validação
- **📋 Listagem Organizada**: Visualização em tabela com dados de contato
- **🔍 Busca Rápida**: Localização instantânea de clientes
- **📊 Histórico Completo**: Todos os serviços realizados por cliente
- **📱 Validação de Dados**: Campos obrigatórios e formatos corretos

### 🚗 **Controle de Veículos**
- **🔗 Vinculação Automática**: Relacionamento direto com clientes
- **📋 Informações Completas**: Marca, modelo, ano e placa
- **📊 Histórico de Serviços**: Todos os serviços por veículo
- **🔍 Busca Avançada**: Localização por qualquer campo
- **📱 Interface Responsiva**: Funciona em qualquer dispositivo

### ⚠️ **Sistema de Defeitos Inteligente**
- **🏷️ Categorização Avançada**: 9 categorias pré-definidas (Motor, Freios, Suspensão, etc.)
- **🚨 Níveis de Prioridade**: Baixa, Média, Alta e Urgente com cores distintivas
- **👤 Associação Opcional**: Vinculação com cliente e veículo específicos
- **📝 Descrições Detalhadas**: Campo para sintomas e observações técnicas
- **📊 Status de Acompanhamento**: Pendente, Em Andamento, Resolvido
- **🔄 Reutilização**: Defeitos gerais para casos comuns

### 🔧 **Serviços Realizados Profissional**
- **🏷️ Marcas de Serviço**: 8 tipos (Preventiva, Corretiva, Emergencial, etc.)
- **📊 Controle de Status**: Pendente, Em Andamento, Realizado, Cancelado
- **🔗 Vinculação Completa**: Cliente, veículo e defeito relacionado
- **💰 Controle Financeiro**: Valores com formatação monetária
- **👨‍🔧 Responsável**: Funcionário designado para cada serviço
- **📅 Prazos**: Data de serviço e prazo de entrega
- **📝 Observações**: Campo para notas técnicas e recomendações

### 📊 **Relatórios Avançados**
- **📈 Relatório Mensal**: Estatísticas completas por período
- **📋 Listagem Completa**: Todos os serviços com filtros
- **💰 Análise Financeira**: Faturamento e ticket médio
- **👥 Clientes Atendidos**: Quantidade de clientes únicos
- **📊 Métricas de Performance**: Indicadores de produtividade

### 🔍 **Sistema de Consultas Avançado** ⭐ **NOVO**
#### **4 Tipos de Pesquisa Inteligente:**

**1. 🔍 Pesquisa por Cliente**
- **Nome em Tempo Real**: Busca instantânea conforme digitação
- **Filtro por Status**: Pendente, Em Andamento, Realizado, Cancelado
- **Histórico Completo**: Todos os serviços do cliente

**2. 🔧 Pesquisa por Serviço**
- **Tipo de Serviço**: Filtro por categoria de manutenção
- **Busca por Descrição**: Palavras-chave no texto do serviço
- **Resultados Precisos**: Localização exata do que procura

**3. 🚗 Pesquisa por Veículo**
- **Marca e Modelo**: Busca por fabricante e modelo
- **Placa Específica**: Localização por placa do veículo
- **Filtro por Ano**: Busca por ano de fabricação

**4. 📅 Pesquisa por Período**
- **Data Inicial/Final**: Definição de intervalo personalizado
- **Análise Temporal**: Serviços realizados em período específico
- **Relatórios Customizados**: Dados do período selecionado

#### **🎯 Funcionalidades Avançadas:**
- **📊 Duas Visualizações**: Cards detalhados ou tabela compacta
- **⚡ Pesquisa em Tempo Real**: Resultados instantâneos
- **📈 Estatísticas Automáticas**: Clientes, serviços, valores e realizados
- **💾 Exportação de Dados**: Download dos resultados em JSON
- **🔄 Filtros Combinados**: Múltiplos critérios simultaneamente

## 🛠️ Tecnologias Utilizadas

### **Frontend Moderno**
- **HTML5** - Estrutura semântica e acessível
- **CSS3** - Design responsivo com Flexbox e Grid
- **JavaScript ES6+** - Interatividade e manipulação de dados
- **Font Awesome 6** - Ícones profissionais e modernos
- **LocalStorage API** - Persistência de dados no navegador

### **Arquitetura e Padrões**
- **SPA (Single Page Application)** - Navegação fluida
- **Responsive Design** - Adaptação a todos os dispositivos
- **Progressive Enhancement** - Funcionalidade em camadas
- **Clean Code** - Código organizado e documentado
- **Modular Architecture** - Componentes reutilizáveis

### **Recursos Avançados**
- **Debounce** - Otimização de pesquisas em tempo real
- **Local Database** - Sistema de dados robusto no navegador
- **Data Validation** - Validação completa de formulários
- **Error Handling** - Tratamento profissional de erros
- **Performance Optimization** - Carregamento otimizado

## 📦 Instalação e Configuração

### **🔧 Instalação Simples**

1. **Clone ou baixe o projeto**
   ```bash
   git clone https://github.com/seu-usuario/oficina-autopro.git
   cd oficina-autopro
   ```

2. **Hospedagem Local**
   ```bash
   # Usando Python (se disponível)
   python -m http.server 8000
   
   # Usando Node.js (se disponível)
   npx serve public
   
   # Ou simplesmente abra index.html no navegador
   ```

3. **Hospedagem Online**
   - **Vercel**: Faça upload da pasta `public`
   - **Netlify**: Arraste a pasta `public` para o site
   - **GitHub Pages**: Configure o repositório

### **🌐 Acesso ao Sistema**
- **Local**: `http://localhost:8000`
- **Online**: URL fornecida pela plataforma de hospedagem

## 🗄️ Estrutura de Dados

### **📊 Modelo de Dados Completo**

#### **👥 Clientes**
```javascript
{
  id: 1,
  nome: "João Silva",
  telefone: "(11) 99999-9999",
  email: "joao@email.com",
  data_cadastro: "2024-01-15T10:30:00.000Z"
}
```

#### **🚗 Veículos**
```javascript
{
  id: 1,
  cliente_id: 1,
  marca: "Ford",
  modelo: "Fiesta",
  ano: 2020,
  placa: "ABC-1234",
  data_cadastro: "2024-01-15T10:35:00.000Z"
}
```

#### **⚠️ Defeitos**
```javascript
{
  id: 1,
  cliente_id: 1, // Opcional
  veiculo_id: 1, // Opcional
  categoria: "Motor",
  prioridade: "Alta",
  descricao: "Motor fazendo ruído estranho",
  observacoes: "Verificar correia dentada",
  status: "Pendente",
  data_cadastro: "2024-01-15T10:40:00.000Z"
}
```

#### **🔧 Serviços**
```javascript
{
  id: 1,
  cliente_id: 1,
  veiculo_id: 1,
  defeito_id: 1, // Opcional
  marca_servico: "Preventiva",
  servico_realizado: "Troca de óleo e filtro",
  valor: 150.00,
  funcionario: "Carlos Mecânico",
  data_servico: "2024-01-15",
  prazo_entrega: "2024-01-17",
  observacoes: "Serviço realizado com sucesso",
  status: "Realizado",
  data_cadastro: "2024-01-15T11:00:00.000Z"
}
```

## 🎨 Interface e Design

### **🎯 Design System Profissional**
- **Paleta de Cores**: Laranja (#ff6b35) como primária, tons de cinza neutros
- **Tipografia**: Inter font para máxima legibilidade
- **Ícones**: Font Awesome 6 para consistência visual
- **Espaçamento**: Sistema de 8px para alinhamento perfeito
- **Sombras**: Múltiplos níveis para profundidade visual

### **📱 Responsividade Completa**
- **Desktop** (1024px+): Layout completo com sidebar fixa
- **Tablet** (768px-1023px): Sidebar adaptada e layout otimizado
- **Mobile** (até 767px): Menu horizontal e interface touch-friendly

### **✨ Animações e Micro-interações**
- **Hover Effects**: Feedback visual em todos os elementos interativos
- **Transitions**: Animações suaves de 300ms
- **Loading States**: Indicadores visuais durante processamento
- **Form Validation**: Feedback instantâneo de validação

## 🔒 Segurança e Dados

### **🛡️ Proteção de Dados**
- **Validação Client-side**: Verificação de dados antes do envio
- **Sanitização**: Limpeza de entradas para prevenir XSS
- **LocalStorage**: Dados armazenados localmente no navegador
- **Backup Automático**: Sistema de exportação de dados

### **💾 Backup e Recuperação**
```javascript
// Exportar todos os dados
function exportData() {
  // Gera arquivo JSON com todos os dados
  // Inclui timestamp para controle de versão
}

// Importar dados de backup
function importData(file) {
  // Restaura dados de arquivo JSON
  // Valida integridade antes da importação
}
```

## 📊 Funcionalidades Avançadas

### **🔍 Sistema de Busca Inteligente**
- **Busca em Tempo Real**: Resultados conforme digitação
- **Filtros Combinados**: Múltiplos critérios simultaneamente
- **Debounce Optimization**: Evita sobrecarga de processamento
- **Resultados Destacados**: Termos de busca em destaque

### **📈 Analytics e Métricas**
- **Dashboard Metrics**: KPIs principais em tempo real
- **Trend Analysis**: Análise de tendências mensais
- **Performance Tracking**: Acompanhamento de produtividade
- **Financial Reports**: Relatórios financeiros detalhados

### **🎯 UX/UI Avançado**
- **Progressive Disclosure**: Informações reveladas gradualmente
- **Contextual Actions**: Ações relevantes ao contexto
- **Smart Defaults**: Valores padrão inteligentes
- **Error Prevention**: Prevenção de erros do usuário

## 🚀 Casos de Uso Práticos

### **📞 Atendimento ao Cliente**
1. **Cliente Liga**: Pesquise pelo nome e veja histórico completo
2. **Agendamento**: Registre novo serviço com todos os dados
3. **Acompanhamento**: Verifique status dos serviços pendentes
4. **Orçamento**: Consulte valores de serviços similares

### **🔧 Operação da Oficina**
1. **Controle de Pendências**: Filtre serviços por status
2. **Planejamento**: Veja prazos de entrega próximos
3. **Produtividade**: Acompanhe serviços por funcionário
4. **Qualidade**: Registre observações técnicas detalhadas

### **📊 Gestão e Relatórios**
1. **Análise Mensal**: Relatórios de faturamento e produtividade
2. **Clientes Frequentes**: Identifique clientes mais ativos
3. **Serviços Populares**: Analise tipos de serviço mais comuns
4. **Planejamento**: Use dados para decisões estratégicas

## 🔧 Manutenção e Suporte

### **📋 Rotinas de Manutenção**
- **Backup Semanal**: Exporte dados regularmente
- **Limpeza de Cache**: Limpe cache do navegador mensalmente
- **Validação de Dados**: Verifique integridade dos dados
- **Performance Check**: Monitore velocidade de carregamento

### **🆘 Solução de Problemas**

#### **Problemas Comuns:**

**❌ Dados não aparecem:**
```javascript
// Verificar se há dados no localStorage
console.log(localStorage.getItem('oficina_clientes'));

// Recarregar dados de exemplo
db.seedData();
```

**❌ Pesquisa não funciona:**
```javascript
// Verificar se os eventos estão configurados
setupSearchEvents();

// Limpar cache de pesquisa
clearSearchResults();
```

**❌ Formulário não envia:**
```javascript
// Verificar validação de campos
form.checkValidity();

// Verificar eventos de submit
setupForms();
```

## 📈 Roadmap e Melhorias Futuras

### **🎯 Versão 3.0 (Planejada)**
- [ ] **Sistema de Usuários**: Login e permissões
- [ ] **Notificações Push**: Alertas de prazos e pendências
- [ ] **Integração WhatsApp**: Comunicação direta com clientes
- [ ] **Controle de Estoque**: Gestão de peças e materiais
- [ ] **Agenda Integrada**: Sistema de agendamento de serviços

### **🔧 Melhorias Técnicas**
- [ ] **PWA (Progressive Web App)**: Funcionamento offline
- [ ] **Service Workers**: Cache inteligente
- [ ] **IndexedDB**: Banco de dados mais robusto
- [ ] **Web Components**: Componentes reutilizáveis
- [ ] **TypeScript**: Tipagem estática para maior segurança

### **📊 Analytics Avançado**
- [ ] **Dashboard Executivo**: Métricas estratégicas
- [ ] **Previsão de Demanda**: IA para prever necessidades
- [ ] **Análise de Lucratividade**: ROI por tipo de serviço
- [ ] **Satisfação do Cliente**: Sistema de avaliações

## 📄 Licença e Contribuição

### **📜 Licença MIT**
Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

### **🤝 Como Contribuir**
1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

### **🐛 Reportar Bugs**
- Use as **Issues** do GitHub
- Descreva o **problema** detalhadamente
- Inclua **passos** para reproduzir
- Adicione **screenshots** se necessário

## 👨‍💻 Informações do Desenvolvedor

### **🎯 Sobre o Projeto**
Sistema desenvolvido especificamente para oficinas mecânicas que precisam de uma solução completa, moderna e eficiente para gestão interna. Foco em usabilidade, performance e funcionalidades práticas.

### **📞 Contato e Suporte**
- **GitHub**: [Repositório do Projeto](https://github.com/seu-usuario/oficina-autopro)
- **Issues**: Para bugs e sugestões
- **Discussions**: Para dúvidas e ideias

### **🏆 Características Técnicas**
- **100% Frontend**: Não requer servidor backend
- **Zero Dependencies**: Funciona sem bibliotecas externas
- **Cross-browser**: Compatível com todos os navegadores modernos
- **Mobile-first**: Desenvolvido pensando em dispositivos móveis
- **Performance**: Otimizado para carregamento rápido

---

## 📁 Estrutura do Projeto

```
oficina-autopro/
├── public/                    # Arquivos da aplicação
│   ├── index.html            # Dashboard principal
│   ├── cadastro_cliente.html # Cadastro de clientes
│   ├── cadastro_veiculo.html # Cadastro de veículos
│   ├── cadastro_defeito.html # Cadastro de defeitos
│   ├── servico_realizado.html # Registro de serviços
│   ├── relatorios.html       # Relatórios e estatísticas
│   ├── consultas.html        # Sistema de consultas ⭐ NOVO
│   ├── style.css             # Estilos CSS completos
│   └── script.js             # JavaScript principal
├── README.md                 # Este arquivo
├── LICENSE                   # Licença MIT
└── vercel.json              # Configuração para Vercel
```

---

**🔧 Oficina AutoPro - Transformando a gestão da sua oficina com tecnologia e eficiência! 🚗💨**

![Footer](https://img.shields.io/badge/Feito%20com-❤️%20e%20JavaScript-orange?style=for-the-badge)
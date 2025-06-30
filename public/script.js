// Sistema de Gestão Oficina AutoPro - Frontend Puro
// Compatível com Vercel e hospedagem estática

// Configuração do sistema de dados local
class OficinaDB {
  constructor() {
    this.initializeStorage();
  }

  initializeStorage() {
    // Inicializar estruturas de dados se não existirem
    if (!localStorage.getItem('oficina_clientes')) {
      localStorage.setItem('oficina_clientes', JSON.stringify([]));
    }
    if (!localStorage.getItem('oficina_veiculos')) {
      localStorage.setItem('oficina_veiculos', JSON.stringify([]));
    }
    if (!localStorage.getItem('oficina_defeitos')) {
      localStorage.setItem('oficina_defeitos', JSON.stringify([]));
    }
    if (!localStorage.getItem('oficina_servicos')) {
      localStorage.setItem('oficina_servicos', JSON.stringify([]));
    }
    
    // Dados de exemplo para demonstração
    this.seedData();
  }

  seedData() {
    const clientes = this.getClientes();
    if (clientes.length === 0) {
      // Adicionar alguns dados de exemplo
      const clientesExemplo = [
        {
          id: 1,
          nome: "João Silva",
          telefone: "(11) 99999-9999",
          email: "joao@email.com",
          data_cadastro: new Date().toISOString()
        },
        {
          id: 2,
          nome: "Maria Santos",
          telefone: "(11) 88888-8888",
          email: "maria@email.com",
          data_cadastro: new Date().toISOString()
        },
        {
          id: 3,
          nome: "Carlos Oliveira",
          telefone: "(11) 77777-7777",
          email: "carlos@email.com",
          data_cadastro: new Date().toISOString()
        },
        {
          id: 4,
          nome: "Ana Costa",
          telefone: "(11) 66666-6666",
          email: "ana@email.com",
          data_cadastro: new Date().toISOString()
        },
        {
          id: 5,
          nome: "Pedro Almeida",
          telefone: "(11) 55555-5555",
          email: "pedro@email.com",
          data_cadastro: new Date().toISOString()
        }
      ];
      localStorage.setItem('oficina_clientes', JSON.stringify(clientesExemplo));

      const veiculosExemplo = [
        {
          id: 1,
          cliente_id: 1,
          marca: "Ford",
          modelo: "Fiesta",
          ano: 2020,
          placa: "ABC-1234",
          data_cadastro: new Date().toISOString()
        },
        {
          id: 2,
          cliente_id: 2,
          marca: "Chevrolet",
          modelo: "Onix",
          ano: 2021,
          placa: "XYZ-5678",
          data_cadastro: new Date().toISOString()
        },
        {
          id: 3,
          cliente_id: 3,
          marca: "Volkswagen",
          modelo: "Gol",
          ano: 2019,
          placa: "DEF-9012",
          data_cadastro: new Date().toISOString()
        },
        {
          id: 4,
          cliente_id: 4,
          marca: "Toyota",
          modelo: "Corolla",
          ano: 2022,
          placa: "GHI-3456",
          data_cadastro: new Date().toISOString()
        },
        {
          id: 5,
          cliente_id: 5,
          marca: "Honda",
          modelo: "Civic",
          ano: 2021,
          placa: "JKL-7890",
          data_cadastro: new Date().toISOString()
        }
      ];
      localStorage.setItem('oficina_veiculos', JSON.stringify(veiculosExemplo));

      const defeitosExemplo = [
        {
          id: 1,
          cliente_id: 1,
          veiculo_id: 1,
          categoria: "Motor",
          prioridade: "Alta",
          descricao: "Motor fazendo ruído estranho ao acelerar, principalmente em subidas",
          observacoes: "Verificar correia dentada e tensor",
          status: "Pendente",
          data_cadastro: new Date().toISOString()
        },
        {
          id: 2,
          cliente_id: 2,
          veiculo_id: 2,
          categoria: "Freios",
          prioridade: "Urgente",
          descricao: "Freios fazendo barulho alto e pedal está mole",
          observacoes: "Possível troca de pastilhas e sangria do sistema",
          status: "Pendente",
          data_cadastro: new Date().toISOString()
        },
        {
          id: 3,
          cliente_id: null,
          veiculo_id: null,
          categoria: "Elétrica",
          prioridade: "Média",
          descricao: "Problema comum em sistemas de ignição - falha na partida",
          observacoes: "Defeito geral para referência",
          status: "Resolvido",
          data_cadastro: new Date().toISOString()
        }
      ];
      localStorage.setItem('oficina_defeitos', JSON.stringify(defeitosExemplo));

      const servicosExemplo = [
        {
          id: 1,
          cliente_id: 1,
          veiculo_id: 1,
          defeito_id: 1,
          marca_servico: "Preventiva",
          servico_realizado: "Troca de óleo e filtro + verificação do motor",
          valor: 150.00,
          funcionario: "Carlos Mecânico",
          data_servico: new Date().toISOString().split('T')[0],
          prazo_entrega: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          observacoes: "Serviço realizado com sucesso, motor normalizado",
          status: "Realizado",
          data_cadastro: new Date().toISOString()
        },
        {
          id: 2,
          cliente_id: 2,
          veiculo_id: 2,
          defeito_id: 2,
          marca_servico: "Corretiva",
          servico_realizado: "Troca de pastilhas de freio e sangria do sistema",
          valor: 280.00,
          funcionario: "Ana Mecânica",
          data_servico: new Date().toISOString().split('T')[0],
          prazo_entrega: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          observacoes: "Pastilhas muito desgastadas, recomendado verificar discos",
          status: "Em Andamento",
          data_cadastro: new Date().toISOString()
        },
        {
          id: 3,
          cliente_id: 3,
          veiculo_id: 3,
          defeito_id: null,
          marca_servico: "Revisão",
          servico_realizado: "Revisão completa dos 10.000 km",
          valor: 350.00,
          funcionario: "Roberto Técnico",
          data_servico: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          prazo_entrega: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          observacoes: "Revisão agendada conforme manual do fabricante",
          status: "Pendente",
          data_cadastro: new Date().toISOString()
        },
        {
          id: 4,
          cliente_id: 4,
          veiculo_id: 4,
          defeito_id: null,
          marca_servico: "Diagnóstico",
          servico_realizado: "Diagnóstico completo do sistema elétrico",
          valor: 120.00,
          funcionario: "João Eletricista",
          data_servico: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          prazo_entrega: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          observacoes: "Sistema elétrico funcionando perfeitamente",
          status: "Realizado",
          data_cadastro: new Date().toISOString()
        },
        {
          id: 5,
          cliente_id: 5,
          veiculo_id: 5,
          defeito_id: null,
          marca_servico: "Emergencial",
          servico_realizado: "Reparo emergencial na embreagem",
          valor: 450.00,
          funcionario: "Carlos Mecânico",
          data_servico: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          prazo_entrega: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          observacoes: "Embreagem substituída com urgência",
          status: "Realizado",
          data_cadastro: new Date().toISOString()
        }
      ];
      localStorage.setItem('oficina_servicos', JSON.stringify(servicosExemplo));
    }
  }

  // Métodos para Clientes
  getClientes() {
    return JSON.parse(localStorage.getItem('oficina_clientes') || '[]');
  }

  addCliente(cliente) {
    const clientes = this.getClientes();
    const novoId = Math.max(...clientes.map(c => c.id), 0) + 1;
    const novoCliente = {
      ...cliente,
      id: novoId,
      data_cadastro: new Date().toISOString()
    };
    clientes.push(novoCliente);
    localStorage.setItem('oficina_clientes', JSON.stringify(clientes));
    return novoCliente;
  }

  // Métodos para Veículos
  getVeiculos() {
    const veiculos = JSON.parse(localStorage.getItem('oficina_veiculos') || '[]');
    const clientes = this.getClientes();
    
    return veiculos.map(veiculo => {
      const cliente = clientes.find(c => c.id == veiculo.cliente_id);
      return {
        ...veiculo,
        cliente_nome: cliente ? cliente.nome : 'Cliente não encontrado'
      };
    });
  }

  addVeiculo(veiculo) {
    const veiculos = JSON.parse(localStorage.getItem('oficina_veiculos') || '[]');
    const novoId = Math.max(...veiculos.map(v => v.id), 0) + 1;
    const novoVeiculo = {
      ...veiculo,
      id: novoId,
      data_cadastro: new Date().toISOString()
    };
    veiculos.push(novoVeiculo);
    localStorage.setItem('oficina_veiculos', JSON.stringify(veiculos));
    return novoVeiculo;
  }

  // Métodos para Defeitos (ATUALIZADO)
  getDefeitos() {
    const defeitos = JSON.parse(localStorage.getItem('oficina_defeitos') || '[]');
    const clientes = this.getClientes();
    const veiculos = JSON.parse(localStorage.getItem('oficina_veiculos') || '[]');
    
    return defeitos.map(defeito => {
      const cliente = clientes.find(c => c.id == defeito.cliente_id);
      const veiculo = veiculos.find(v => v.id == defeito.veiculo_id);
      
      return {
        ...defeito,
        cliente_nome: cliente ? cliente.nome : 'Geral',
        veiculo_info: veiculo ? `${veiculo.marca} ${veiculo.modelo} (${veiculo.placa || 'S/P'})` : 'N/A'
      };
    });
  }

  addDefeito(defeito) {
    const defeitos = JSON.parse(localStorage.getItem('oficina_defeitos') || '[]');
    const novoId = Math.max(...defeitos.map(d => d.id), 0) + 1;
    const novoDefeito = {
      ...defeito,
      id: novoId,
      status: 'Pendente',
      data_cadastro: new Date().toISOString(),
      // Converter strings vazias para null
      cliente_id: defeito.cliente_id || null,
      veiculo_id: defeito.veiculo_id || null
    };
    defeitos.push(novoDefeito);
    localStorage.setItem('oficina_defeitos', JSON.stringify(defeitos));
    return novoDefeito;
  }

  // Métodos para Serviços (ATUALIZADO)
  getServicos() {
    const servicos = JSON.parse(localStorage.getItem('oficina_servicos') || '[]');
    const clientes = this.getClientes();
    const veiculos = JSON.parse(localStorage.getItem('oficina_veiculos') || '[]');
    const defeitos = this.getDefeitos();
    
    return servicos.map(servico => {
      const cliente = clientes.find(c => c.id == servico.cliente_id);
      const veiculo = veiculos.find(v => v.id == servico.veiculo_id);
      const defeito = defeitos.find(d => d.id == servico.defeito_id);
      
      return {
        ...servico,
        cliente_nome: cliente ? cliente.nome : 'N/A',
        marca: veiculo ? veiculo.marca : 'N/A',
        modelo: veiculo ? veiculo.modelo : 'N/A',
        placa: veiculo ? veiculo.placa : 'N/A',
        defeito_descricao: defeito ? defeito.descricao : 'N/A'
      };
    });
  }

  addServico(servico) {
    const servicos = JSON.parse(localStorage.getItem('oficina_servicos') || '[]');
    const novoId = Math.max(...servicos.map(s => s.id), 0) + 1;
    const novoServico = {
      ...servico,
      id: novoId,
      data_cadastro: new Date().toISOString(),
      // Converter strings vazias para null
      defeito_id: servico.defeito_id || null,
      prazo_entrega: servico.prazo_entrega || null
    };
    servicos.push(novoServico);
    localStorage.setItem('oficina_servicos', JSON.stringify(servicos));
    return novoServico;
  }

  // Estatísticas para Dashboard
  getDashboardStats() {
    const clientes = this.getClientes();
    const veiculos = this.getVeiculos();
    const servicos = this.getServicos();
    
    const currentMonth = new Date().toISOString().slice(0, 7);
    const servicosMes = servicos.filter(s => s.data_servico.startsWith(currentMonth));
    const faturamentoMes = servicosMes.reduce((total, s) => total + parseFloat(s.valor), 0);
    
    return {
      clientes: clientes.length,
      veiculos: veiculos.length,
      servicos_mes: servicosMes.length,
      faturamento_mes: faturamentoMes
    };
  }

  // Métodos de pesquisa para o sistema de consultas
  searchClientesByName(nome, status = '') {
    const servicos = this.getServicos();
    const clientes = this.getClientes();
    
    let results = servicos.filter(servico => {
      const matchNome = !nome || servico.cliente_nome.toLowerCase().includes(nome.toLowerCase());
      const matchStatus = !status || servico.status === status;
      return matchNome && matchStatus;
    });
    
    return results;
  }

  searchServicosByType(tipo, descricao = '') {
    const servicos = this.getServicos();
    
    return servicos.filter(servico => {
      const matchTipo = !tipo || servico.marca_servico === tipo;
      const matchDescricao = !descricao || servico.servico_realizado.toLowerCase().includes(descricao.toLowerCase());
      return matchTipo && matchDescricao;
    });
  }

  searchVeiculos(marca = '', modelo = '', placa = '', ano = '') {
    const servicos = this.getServicos();
    
    return servicos.filter(servico => {
      const matchMarca = !marca || servico.marca.toLowerCase().includes(marca.toLowerCase());
      const matchModelo = !modelo || servico.modelo.toLowerCase().includes(modelo.toLowerCase());
      const matchPlaca = !placa || (servico.placa && servico.placa.toLowerCase().includes(placa.toLowerCase()));
      const matchAno = !ano || (servico.ano && servico.ano.toString() === ano.toString());
      return matchMarca && matchModelo && matchPlaca && matchAno;
    });
  }

  searchByPeriod(dataInicio, dataFim) {
    const servicos = this.getServicos();
    
    return servicos.filter(servico => {
      const dataServico = new Date(servico.data_servico);
      const inicio = dataInicio ? new Date(dataInicio) : new Date('1900-01-01');
      const fim = dataFim ? new Date(dataFim) : new Date('2099-12-31');
      
      return dataServico >= inicio && dataServico <= fim;
    });
  }
}

// Instância global do banco de dados
const db = new OficinaDB();

// Utilitários
const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-BR');
};

const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString('pt-BR');
};

// Função para mostrar mensagens
function showMessage(message, type = 'success') {
  const alert = document.createElement('div');
  alert.className = `alert ${type === 'error' ? 'error' : ''}`;
  alert.innerHTML = `
    <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i>
    ${message}
  `;
  document.body.appendChild(alert);

  setTimeout(() => alert.classList.add('visible'), 10);
  setTimeout(() => {
    alert.classList.remove('visible');
    setTimeout(() => document.body.removeChild(alert), 300);
  }, 4000);
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  // Destacar link ativo no menu
  highlightActiveLink();
  
  // Configurar data atual
  setCurrentDate();
  
  // Inicializar página específica
  initializePage();
  
  // Configurar formulários
  setupForms();
});

function highlightActiveLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.sidebar nav a');
  
  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

function setCurrentDate() {
  const dateElement = document.getElementById('currentDate');
  if (dateElement) {
    const now = new Date();
    dateElement.textContent = now.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}

function initializePage() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  switch (currentPage) {
    case 'index.html':
    case '':
      loadDashboard();
      break;
    case 'cadastro_cliente.html':
      loadClients();
      break;
    case 'cadastro_veiculo.html':
      loadClientsForSelect();
      loadVehicles();
      break;
    case 'cadastro_defeito.html':
      loadClientsForSelect();
      loadDefects();
      setupDefectClientVehicleFilter();
      break;
    case 'servico_realizado.html':
      loadClientsForSelect();
      loadDefectsForSelect();
      loadServices();
      setupClientVehicleFilter();
      break;
    case 'relatorios.html':
      loadAllServices();
      setDefaultMonth();
      break;
    case 'consultas.html':
      initializeSearchPage();
      break;
  }
}

function setupForms() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    // Animação de entrada
    form.style.opacity = '0';
    form.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      form.style.transition = 'all 0.6s ease';
      form.style.opacity = '1';
      form.style.transform = 'translateY(0)';
    }, 100);

    // Configurar submit
    form.addEventListener('submit', handleFormSubmit);
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  
  // Adicionar classe de loading
  form.classList.add('loading');
  
  try {
    let result = null;
    let successMessage = '';
    
    switch (form.id) {
      case 'formCliente':
        result = db.addCliente(data);
        successMessage = 'Cliente cadastrado com sucesso!';
        break;
      case 'formVeiculo':
        result = db.addVeiculo(data);
        successMessage = 'Veículo cadastrado com sucesso!';
        break;
      case 'formDefeito':
        result = db.addDefeito(data);
        successMessage = 'Defeito cadastrado com sucesso!';
        break;
      case 'formServico':
        result = db.addServico(data);
        successMessage = 'Serviço registrado com sucesso!';
        break;
    }
    
    showMessage(successMessage);
    form.reset();
    
    // Recarregar dados
    setTimeout(() => {
      initializePage();
    }, 1000);
    
  } catch (error) {
    showMessage(`Erro: ${error.message}`, 'error');
  } finally {
    form.classList.remove('loading');
  }
}

// Funções específicas do Dashboard
function loadDashboard() {
  try {
    const stats = db.getDashboardStats();
    
    document.getElementById('totalClientes').textContent = stats.clientes || 0;
    document.getElementById('totalVeiculos').textContent = stats.veiculos || 0;
    document.getElementById('servicosMes').textContent = stats.servicos_mes || 0;
    document.getElementById('faturamentoMes').textContent = formatCurrency(stats.faturamento_mes || 0);
    
    // Carregar últimos serviços
    const services = db.getServicos();
    const recentServices = services.slice(0, 5);
    displayRecentServices(recentServices);
    
  } catch (error) {
    console.error('Erro ao carregar dashboard:', error);
    showMessage('Erro ao carregar dashboard', 'error');
  }
}

function displayRecentServices(services) {
  const tbody = document.querySelector('#recentServicesTable tbody');
  if (!tbody) return;
  
  tbody.innerHTML = services.map(service => `
    <tr>
      <td>${formatDate(service.data_servico)}</td>
      <td>${service.cliente_nome || 'N/A'}</td>
      <td>${service.marca} ${service.modelo} (${service.placa || 'S/P'})</td>
      <td>${service.servico_realizado}</td>
      <td>${formatCurrency(service.valor)}</td>
      <td>${service.funcionario}</td>
    </tr>
  `).join('');
}

// Funções para Clientes
function loadClients() {
  try {
    const clients = db.getClientes();
    displayClients(clients);
  } catch (error) {
    console.error('Erro ao carregar clientes:', error);
    showMessage('Erro ao carregar clientes', 'error');
  }
}

function displayClients(clients) {
  const tbody = document.querySelector('#clientesTable tbody');
  if (!tbody) return;
  
  tbody.innerHTML = clients.map(client => `
    <tr>
      <td>${client.nome}</td>
      <td>${client.telefone}</td>
      <td>${client.email}</td>
      <td>${formatDateTime(client.data_cadastro)}</td>
    </tr>
  `).join('');
}

function loadClientsForSelect() {
  try {
    const clients = db.getClientes();
    const selects = document.querySelectorAll('select[name="cliente_id"]');
    
    selects.forEach(select => {
      select.innerHTML = '<option value="">Selecione o cliente</option>' +
        clients.map(client => `<option value="${client.id}">${client.nome}</option>`).join('');
    });
  } catch (error) {
    console.error('Erro ao carregar clientes para select:', error);
  }
}

function toggleClientList() {
  const list = document.getElementById('clientList');
  if (list.style.display === 'none') {
    list.style.display = 'block';
    loadClients();
  } else {
    list.style.display = 'none';
  }
}

// Funções para Veículos
function loadVehicles() {
  try {
    const vehicles = db.getVeiculos();
    displayVehicles(vehicles);
  } catch (error) {
    console.error('Erro ao carregar veículos:', error);
    showMessage('Erro ao carregar veículos', 'error');
  }
}

function displayVehicles(vehicles) {
  const tbody = document.querySelector('#veiculosTable tbody');
  if (!tbody) return;
  
  tbody.innerHTML = vehicles.map(vehicle => `
    <tr>
      <td>${vehicle.cliente_nome || 'N/A'}</td>
      <td>${vehicle.marca}</td>
      <td>${vehicle.modelo}</td>
      <td>${vehicle.ano}</td>
      <td>${vehicle.placa || 'N/A'}</td>
      <td>${formatDateTime(vehicle.data_cadastro)}</td>
    </tr>
  `).join('');
}

function toggleVehicleList() {
  const list = document.getElementById('vehicleList');
  if (list.style.display === 'none') {
    list.style.display = 'block';
    loadVehicles();
  } else {
    list.style.display = 'none';
  }
}

// Funções para Defeitos (ATUALIZADAS)
function loadDefects() {
  try {
    const defects = db.getDefeitos();
    displayDefects(defects);
  } catch (error) {
    console.error('Erro ao carregar defeitos:', error);
    showMessage('Erro ao carregar defeitos', 'error');
  }
}

function displayDefects(defects) {
  const tbody = document.querySelector('#defeitosTable tbody');
  if (!tbody) return;
  
  tbody.innerHTML = defects.map(defect => {
    const prioridadeClass = {
      'Baixa': 'background: #27ae60; color: white;',
      'Média': 'background: #f39c12; color: white;',
      'Alta': 'background: #e67e22; color: white;',
      'Urgente': 'background: #e74c3c; color: white;'
    };
    
    const statusClass = {
      'Pendente': 'background: #f39c12; color: white;',
      'Em Andamento': 'background: #3498db; color: white;',
      'Resolvido': 'background: #27ae60; color: white;'
    };
    
    return `
      <tr>
        <td>${defect.cliente_nome || 'Geral'}</td>
        <td>${defect.veiculo_info || 'N/A'}</td>
        <td><span style="padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: bold;">${defect.categoria}</span></td>
        <td><span style="padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: bold; ${prioridadeClass[defect.prioridade] || ''}">${defect.prioridade}</span></td>
        <td style="max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${defect.descricao}">${defect.descricao}</td>
        <td>${formatDateTime(defect.data_cadastro)}</td>
        <td><span style="padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: bold; ${statusClass[defect.status] || ''}">${defect.status}</span></td>
      </tr>
    `;
  }).join('');
}

function loadDefectsForSelect() {
  try {
    const defects = db.getDefeitos();
    const select = document.querySelector('select[name="defeito_id"]');
    
    if (select) {
      select.innerHTML = '<option value="">Selecione o defeito (opcional)</option>' +
        defects.map(defect => `<option value="${defect.id}">${defect.categoria} - ${defect.descricao.substring(0, 50)}${defect.descricao.length > 50 ? '...' : ''}</option>`).join('');
    }
  } catch (error) {
    console.error('Erro ao carregar defeitos para select:', error);
  }
}

function setupDefectClientVehicleFilter() {
  const clientSelect = document.querySelector('select[name="cliente_id"]');
  const vehicleSelect = document.querySelector('select[name="veiculo_id"]');
  
  if (clientSelect && vehicleSelect) {
    clientSelect.addEventListener('change', (e) => {
      const clientId = e.target.value;
      
      if (clientId) {
        try {
          const vehicles = JSON.parse(localStorage.getItem('oficina_veiculos') || '[]');
          const clientVehicles = vehicles.filter(v => v.cliente_id == clientId);
          
          vehicleSelect.innerHTML = '<option value="">Selecione o veículo (opcional)</option>' +
            clientVehicles.map(vehicle => 
              `<option value="${vehicle.id}">${vehicle.marca} ${vehicle.modelo} (${vehicle.placa || 'S/P'})</option>`
            ).join('');
        } catch (error) {
          console.error('Erro ao carregar veículos do cliente:', error);
        }
      } else {
        vehicleSelect.innerHTML = '<option value="">Selecione o veículo (opcional)</option>';
      }
    });
  }
}

function toggleDefectList() {
  const list = document.getElementById('defectList');
  if (list.style.display === 'none') {
    list.style.display = 'block';
    loadDefects();
  } else {
    list.style.display = 'none';
  }
}

// Funções para Serviços (ATUALIZADAS)
function loadServices() {
  try {
    const services = db.getServicos();
    displayServices(services);
  } catch (error) {
    console.error('Erro ao carregar serviços:', error);
    showMessage('Erro ao carregar serviços', 'error');
  }
}

function displayServices(services) {
  const tbody = document.querySelector('#servicosTable tbody');
  if (!tbody) return;
  
  tbody.innerHTML = services.map(service => {
    const statusClass = {
      'Pendente': 'background: #f39c12; color: white;',
      'Em Andamento': 'background: #3498db; color: white;',
      'Realizado': 'background: #27ae60; color: white;',
      'Cancelado': 'background: #e74c3c; color: white;'
    };
    
    const prazoFormatado = service.prazo_entrega ? formatDate(service.prazo_entrega) : 'N/A';
    
    return `
      <tr>
        <td>${formatDate(service.data_servico)}</td>
        <td>${service.cliente_nome || 'N/A'}</td>
        <td>${service.marca} ${service.modelo} (${service.placa || 'S/P'})</td>
        <td><span style="padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: bold; background: #6c757d; color: white;">${service.marca_servico || 'N/A'}</span></td>
        <td style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${service.servico_realizado}">${service.servico_realizado}</td>
        <td>${formatCurrency(service.valor)}</td>
        <td>${service.funcionario}</td>
        <td><span style="padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: bold; ${statusClass[service.status] || ''}">${service.status}</span></td>
        <td>${prazoFormatado}</td>
      </tr>
    `;
  }).join('');
}

function setupClientVehicleFilter() {
  const clientSelect = document.querySelector('select[name="cliente_id"]');
  const vehicleSelect = document.querySelector('select[name="veiculo_id"]');
  
  if (clientSelect && vehicleSelect) {
    clientSelect.addEventListener('change', (e) => {
      const clientId = e.target.value;
      
      if (clientId) {
        try {
          const vehicles = JSON.parse(localStorage.getItem('oficina_veiculos') || '[]');
          const clientVehicles = vehicles.filter(v => v.cliente_id == clientId);
          
          vehicleSelect.innerHTML = '<option value="">Selecione o veículo</option>' +
            clientVehicles.map(vehicle => 
              `<option value="${vehicle.id}">${vehicle.marca} ${vehicle.modelo} (${vehicle.placa || 'S/P'})</option>`
            ).join('');
        } catch (error) {
          console.error('Erro ao carregar veículos do cliente:', error);
        }
      } else {
        vehicleSelect.innerHTML = '<option value="">Selecione o veículo</option>';
      }
    });
  }
}

function toggleServiceList() {
  const list = document.getElementById('serviceList');
  if (list.style.display === 'none') {
    list.style.display = 'block';
    loadServices();
  } else {
    list.style.display = 'none';
  }
}

// Funções para Relatórios
function loadAllServices() {
  try {
    const services = db.getServicos();
    displayAllServices(services);
  } catch (error) {
    console.error('Erro ao carregar todos os serviços:', error);
    showMessage('Erro ao carregar serviços', 'error');
  }
}

function displayAllServices(services) {
  const tbody = document.querySelector('#allServicesTable tbody');
  if (!tbody) return;
  
  tbody.innerHTML = services.map(service => {
    const statusClass = {
      'Pendente': 'background: #f39c12; color: white;',
      'Em Andamento': 'background: #3498db; color: white;',
      'Realizado': 'background: #27ae60; color: white;',
      'Cancelado': 'background: #e74c3c; color: white;'
    };
    
    return `
      <tr>
        <td>${formatDate(service.data_servico)}</td>
        <td>${service.cliente_nome || 'N/A'}</td>
        <td>${service.marca} ${service.modelo} (${service.placa || 'S/P'})</td>
        <td>${service.servico_realizado}</td>
        <td>${formatCurrency(service.valor)}</td>
        <td>${service.funcionario}</td>
        <td><span style="padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: bold; ${statusClass[service.status] || ''}">${service.status || 'Concluído'}</span></td>
      </tr>
    `;
  }).join('');
}

function setDefaultMonth() {
  const monthInput = document.getElementById('monthFilter');
  if (monthInput) {
    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7);
    monthInput.value = currentMonth;
  }
}

function generateMonthlyReport() {
  const monthInput = document.getElementById('monthFilter');
  const reportContent = document.getElementById('monthlyReport');
  
  if (!monthInput || !reportContent) return;
  
  const selectedMonth = monthInput.value;
  if (!selectedMonth) {
    showMessage('Selecione um mês para gerar o relatório', 'error');
    return;
  }
  
  try {
    const services = db.getServicos();
    const monthServices = services.filter(service => 
      service.data_servico.startsWith(selectedMonth)
    );
    
    const totalServices = monthServices.length;
    const totalRevenue = monthServices.reduce((sum, service) => sum + parseFloat(service.valor), 0);
    const uniqueClients = new Set(monthServices.map(s => s.cliente_id)).size;
    
    reportContent.innerHTML = `
      <div class="report-summary">
        <div class="summary-item">
          <h4>Total de Serviços</h4>
          <p>${totalServices}</p>
        </div>
        <div class="summary-item">
          <h4>Faturamento Total</h4>
          <p>${formatCurrency(totalRevenue)}</p>
        </div>
        <div class="summary-item">
          <h4>Clientes Atendidos</h4>
          <p>${uniqueClients}</p>
        </div>
        <div class="summary-item">
          <h4>Ticket Médio</h4>
          <p>${totalServices > 0 ? formatCurrency(totalRevenue / totalServices) : 'R$ 0,00'}</p>
        </div>
      </div>
    `;
    
  } catch (error) {
    console.error('Erro ao gerar relatório mensal:', error);
    showMessage('Erro ao gerar relatório', 'error');
  }
}

// FUNÇÕES DO SISTEMA DE CONSULTAS

// Variáveis globais para o sistema de consultas
let currentSearchResults = [];
let isTableView = false;

// Inicializar página de consultas
function initializeSearchPage() {
  // Configurar eventos de pesquisa em tempo real
  setupSearchEvents();
  
  // Mostrar mensagem inicial
  updateResultsCount(0);
}

function setupSearchEvents() {
  // Pesquisa por cliente em tempo real
  const clienteNome = document.getElementById('clienteNome');
  if (clienteNome) {
    clienteNome.addEventListener('input', debounce(searchClientes, 300));
  }
  
  // Pesquisa por serviço em tempo real
  const servicoDescricao = document.getElementById('servicoDescricao');
  if (servicoDescricao) {
    servicoDescricao.addEventListener('input', debounce(searchServicos, 300));
  }
  
  // Pesquisas por veículo em tempo real
  ['veiculoMarca', 'veiculoModelo', 'veiculoPlaca'].forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('input', debounce(searchVeiculos, 300));
    }
  });
}

// Função debounce para evitar muitas chamadas
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Alternar entre tipos de pesquisa
function toggleSearchOptions() {
  const searchType = document.getElementById('searchType').value;
  const options = document.querySelectorAll('.search-option');
  
  options.forEach(option => option.classList.remove('active'));
  document.getElementById(searchType + 'Search').classList.add('active');
  
  // Limpar resultados ao trocar tipo
  clearSearchResults();
}

// Pesquisar clientes
function searchClientes() {
  const nome = document.getElementById('clienteNome').value;
  const status = document.getElementById('clienteStatus').value;
  
  if (!nome && !status) {
    clearSearchResults();
    return;
  }
  
  try {
    const results = db.searchClientesByName(nome, status);
    currentSearchResults = results;
    displaySearchResults(results, 'cliente');
    updateResultsCount(results.length);
    updateSearchStats(results);
  } catch (error) {
    console.error('Erro na pesquisa de clientes:', error);
    showMessage('Erro ao pesquisar clientes', 'error');
  }
}

// Pesquisar serviços
function searchServicos() {
  const tipo = document.getElementById('servicoTipo').value;
  const descricao = document.getElementById('servicoDescricao').value;
  
  if (!tipo && !descricao) {
    clearSearchResults();
    return;
  }
  
  try {
    const results = db.searchServicosByType(tipo, descricao);
    currentSearchResults = results;
    displaySearchResults(results, 'servico');
    updateResultsCount(results.length);
    updateSearchStats(results);
  } catch (error) {
    console.error('Erro na pesquisa de serviços:', error);
    showMessage('Erro ao pesquisar serviços', 'error');
  }
}

// Pesquisar veículos
function searchVeiculos() {
  const marca = document.getElementById('veiculoMarca').value;
  const modelo = document.getElementById('veiculoModelo').value;
  const placa = document.getElementById('veiculoPlaca').value;
  const ano = document.getElementById('veiculoAno').value;
  
  if (!marca && !modelo && !placa && !ano) {
    clearSearchResults();
    return;
  }
  
  try {
    const results = db.searchVeiculos(marca, modelo, placa, ano);
    currentSearchResults = results;
    displaySearchResults(results, 'veiculo');
    updateResultsCount(results.length);
    updateSearchStats(results);
  } catch (error) {
    console.error('Erro na pesquisa de veículos:', error);
    showMessage('Erro ao pesquisar veículos', 'error');
  }
}

// Pesquisar por período
function searchPeriodo() {
  const dataInicio = document.getElementById('dataInicio').value;
  const dataFim = document.getElementById('dataFim').value;
  
  if (!dataInicio && !dataFim) {
    clearSearchResults();
    return;
  }
  
  try {
    const results = db.searchByPeriod(dataInicio, dataFim);
    currentSearchResults = results;
    displaySearchResults(results, 'periodo');
    updateResultsCount(results.length);
    updateSearchStats(results);
  } catch (error) {
    console.error('Erro na pesquisa por período:', error);
    showMessage('Erro ao pesquisar por período', 'error');
  }
}

// Executar pesquisa (botão pesquisar)
function executeSearch() {
  const searchType = document.getElementById('searchType').value;
  
  switch (searchType) {
    case 'cliente':
      searchClientes();
      break;
    case 'servico':
      searchServicos();
      break;
    case 'veiculo':
      searchVeiculos();
      break;
    case 'periodo':
      searchPeriodo();
      break;
  }
}

// Exibir resultados da pesquisa
function displaySearchResults(results, type) {
  const cardResults = document.getElementById('cardResults');
  const tableResults = document.getElementById('tableResults');
  
  if (results.length === 0) {
    cardResults.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <h3>Nenhum resultado encontrado</h3>
        <p>Tente ajustar os filtros de pesquisa</p>
      </div>
    `;
    tableResults.querySelector('tbody').innerHTML = '';
    return;
  }
  
  // Exibir em cards
  cardResults.innerHTML = results.map(result => createResultCard(result)).join('');
  
  // Exibir em tabela
  const tbody = tableResults.querySelector('tbody');
  tbody.innerHTML = results.map(result => createResultTableRow(result)).join('');
  
  // Mostrar seção de estatísticas
  document.getElementById('searchStats').style.display = 'block';
}

// Criar card de resultado
function createResultCard(result) {
  const statusClass = {
    'Pendente': 'status-pending',
    'Em Andamento': 'status-progress',
    'Realizado': 'status-completed',
    'Cancelado': 'status-cancelled'
  };
  
  return `
    <div class="result-card">
      <div class="result-header">
        <h3><i class="fas fa-user"></i> ${result.cliente_nome}</h3>
        <span class="result-status ${statusClass[result.status] || ''}">${result.status}</span>
      </div>
      <div class="result-body">
        <div class="result-info">
          <p><i class="fas fa-car"></i> <strong>Veículo:</strong> ${result.marca} ${result.modelo} (${result.placa || 'S/P'})</p>
          <p><i class="fas fa-tools"></i> <strong>Serviço:</strong> ${result.servico_realizado}</p>
          <p><i class="fas fa-tag"></i> <strong>Tipo:</strong> ${result.marca_servico}</p>
          <p><i class="fas fa-calendar"></i> <strong>Data:</strong> ${formatDate(result.data_servico)}</p>
          <p><i class="fas fa-dollar-sign"></i> <strong>Valor:</strong> ${formatCurrency(result.valor)}</p>
          <p><i class="fas fa-user-tie"></i> <strong>Funcionário:</strong> ${result.funcionario}</p>
        </div>
        ${result.observacoes ? `<div class="result-notes"><i class="fas fa-sticky-note"></i> ${result.observacoes}</div>` : ''}
      </div>
    </div>
  `;
}

// Criar linha da tabela de resultado
function createResultTableRow(result) {
  const statusClass = {
    'Pendente': 'background: #f39c12; color: white;',
    'Em Andamento': 'background: #3498db; color: white;',
    'Realizado': 'background: #27ae60; color: white;',
    'Cancelado': 'background: #e74c3c; color: white;'
  };
  
  return `
    <tr>
      <td>${result.cliente_nome}</td>
      <td>${result.marca} ${result.modelo} (${result.placa || 'S/P'})</td>
      <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${result.servico_realizado}">${result.servico_realizado}</td>
      <td><span style="padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: bold; background: #6c757d; color: white;">${result.marca_servico}</span></td>
      <td>${formatCurrency(result.valor)}</td>
      <td>${formatDate(result.data_servico)}</td>
      <td><span style="padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: bold; ${statusClass[result.status] || ''}">${result.status}</span></td>
      <td>${result.funcionario}</td>
    </tr>
  `;
}

// Alternar visualização (cards/tabela)
function toggleResultsView() {
  const cardResults = document.getElementById('cardResults');
  const tableResults = document.getElementById('tableResults');
  const toggleIcon = document.getElementById('viewToggleIcon');
  const toggleText = document.getElementById('viewToggleText');
  
  isTableView = !isTableView;
  
  if (isTableView) {
    cardResults.style.display = 'none';
    tableResults.style.display = 'block';
    toggleIcon.className = 'fas fa-th-large';
    toggleText.textContent = 'Visualização em Cards';
  } else {
    cardResults.style.display = 'block';
    tableResults.style.display = 'none';
    toggleIcon.className = 'fas fa-th-list';
    toggleText.textContent = 'Visualização Detalhada';
  }
}

// Atualizar contador de resultados
function updateResultsCount(count) {
  const totalResults = document.getElementById('totalResults');
  if (totalResults) {
    totalResults.textContent = `${count} resultado${count !== 1 ? 's' : ''} encontrado${count !== 1 ? 's' : ''}`;
  }
}

// Atualizar estatísticas da pesquisa
function updateSearchStats(results) {
  const uniqueClients = new Set(results.map(r => r.cliente_id)).size;
  const totalServices = results.length;
  const totalValue = results.reduce((sum, r) => sum + parseFloat(r.valor), 0);
  const completedServices = results.filter(r => r.status === 'Realizado').length;
  
  document.getElementById('statsClientes').textContent = uniqueClients;
  document.getElementById('statsServicos').textContent = totalServices;
  document.getElementById('statsValor').textContent = formatCurrency(totalValue);
  document.getElementById('statsRealizados').textContent = completedServices;
}

// Limpar pesquisa
function clearSearch() {
  // Limpar todos os campos de entrada
  document.querySelectorAll('.search-filters input, .search-filters select').forEach(input => {
    if (input.type === 'select-one') {
      input.selectedIndex = 0;
    } else {
      input.value = '';
    }
  });
  
  clearSearchResults();
}

// Limpar resultados
function clearSearchResults() {
  currentSearchResults = [];
  
  const cardResults = document.getElementById('cardResults');
  cardResults.innerHTML = `
    <div class="no-results">
      <i class="fas fa-search"></i>
      <h3>Nenhuma pesquisa realizada</h3>
      <p>Use os filtros acima para encontrar clientes, serviços ou veículos</p>
    </div>
  `;
  
  const tableResults = document.getElementById('tableResults');
  if (tableResults) {
    tableResults.querySelector('tbody').innerHTML = '';
  }
  
  document.getElementById('searchStats').style.display = 'none';
  updateResultsCount(0);
}

// Exportar resultados
function exportResults() {
  if (currentSearchResults.length === 0) {
    showMessage('Nenhum resultado para exportar', 'error');
    return;
  }
  
  try {
    const data = {
      timestamp: new Date().toISOString(),
      total_results: currentSearchResults.length,
      search_type: document.getElementById('searchType').value,
      results: currentSearchResults
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `consulta-oficina-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showMessage(`${currentSearchResults.length} resultados exportados com sucesso!`);
  } catch (error) {
    console.error('Erro ao exportar resultados:', error);
    showMessage('Erro ao exportar resultados', 'error');
  }
}

// Configurar data padrão para serviços
document.addEventListener('DOMContentLoaded', () => {
  const dataServico = document.getElementById('data_servico');
  if (dataServico) {
    const today = new Date().toISOString().split('T')[0];
    dataServico.value = today;
  }
});

// Função para exportar dados (backup)
function exportData() {
  const data = {
    clientes: db.getClientes(),
    veiculos: JSON.parse(localStorage.getItem('oficina_veiculos') || '[]'),
    defeitos: JSON.parse(localStorage.getItem('oficina_defeitos') || '[]'),
    servicos: JSON.parse(localStorage.getItem('oficina_servicos') || '[]'),
    exportDate: new Date().toISOString()
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `oficina-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showMessage('Backup dos dados exportado com sucesso!');
}

// Função para importar dados (restaurar backup)
function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      
      if (data.clientes) localStorage.setItem('oficina_clientes', JSON.stringify(data.clientes));
      if (data.veiculos) localStorage.setItem('oficina_veiculos', JSON.stringify(data.veiculos));
      if (data.defeitos) localStorage.setItem('oficina_defeitos', JSON.stringify(data.defeitos));
      if (data.servicos) localStorage.setItem('oficina_servicos', JSON.stringify(data.servicos));
      
      showMessage('Dados importados com sucesso! Recarregando página...');
      setTimeout(() => window.location.reload(), 2000);
      
    } catch (error) {
      showMessage('Erro ao importar dados. Verifique o arquivo.', 'error');
    }
  };
  reader.readAsText(file);
}

// Adicionar botões de backup no dashboard (se existir)
document.addEventListener('DOMContentLoaded', () => {
  const quickActions = document.querySelector('.actions-grid');
  if (quickActions && window.location.pathname.includes('index.html')) {
    const backupBtn = document.createElement('button');
    backupBtn.className = 'action-btn';
    backupBtn.onclick = exportData;
    backupBtn.innerHTML = `
      <i class="fas fa-download"></i>
      <span>Backup Dados</span>
    `;
    
    const importBtn = document.createElement('label');
    importBtn.className = 'action-btn';
    importBtn.style.cursor = 'pointer';
    importBtn.innerHTML = `
      <i class="fas fa-upload"></i>
      <span>Restaurar Backup</span>
      <input type="file" accept=".json" onchange="importData(event)" style="display: none;">
    `;
    
    quickActions.appendChild(backupBtn);
    quickActions.appendChild(importBtn);
  }
});
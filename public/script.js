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
        }
      ];
      localStorage.setItem('oficina_veiculos', JSON.stringify(veiculosExemplo));

      const defeitosExemplo = [
        {
          id: 1,
          descricao: "Problema no motor - ruído estranho",
          data_cadastro: new Date().toISOString()
        },
        {
          id: 2,
          descricao: "Freios fazendo barulho",
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
          servico_realizado: "Troca de óleo e filtro",
          valor: 150.00,
          funcionario: "Carlos Mecânico",
          data_servico: new Date().toISOString().split('T')[0],
          observacoes: "Serviço realizado com sucesso",
          status: "Concluído",
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

  // Métodos para Defeitos
  getDefeitos() {
    return JSON.parse(localStorage.getItem('oficina_defeitos') || '[]');
  }

  addDefeito(defeito) {
    const defeitos = this.getDefeitos();
    const novoId = Math.max(...defeitos.map(d => d.id), 0) + 1;
    const novoDefeito = {
      ...defeito,
      id: novoId,
      data_cadastro: new Date().toISOString()
    };
    defeitos.push(novoDefeito);
    localStorage.setItem('oficina_defeitos', JSON.stringify(defeitos));
    return novoDefeito;
  }

  // Métodos para Serviços
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
      status: 'Concluído',
      data_cadastro: new Date().toISOString()
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
      loadDefects();
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

// Funções para Defeitos
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
  
  tbody.innerHTML = defects.map(defect => `
    <tr>
      <td>${defect.descricao}</td>
      <td>${formatDateTime(defect.data_cadastro)}</td>
    </tr>
  `).join('');
}

function loadDefectsForSelect() {
  try {
    const defects = db.getDefeitos();
    const select = document.querySelector('select[name="defeito_id"]');
    
    if (select) {
      select.innerHTML = '<option value="">Selecione o defeito (opcional)</option>' +
        defects.map(defect => `<option value="${defect.id}">${defect.descricao}</option>`).join('');
    }
  } catch (error) {
    console.error('Erro ao carregar defeitos para select:', error);
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

// Funções para Serviços
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
  
  tbody.innerHTML = services.map(service => `
    <tr>
      <td>${formatDate(service.data_servico)}</td>
      <td>${service.cliente_nome || 'N/A'}</td>
      <td>${service.marca} ${service.modelo} (${service.placa || 'S/P'})</td>
      <td>${service.servico_realizado}</td>
      <td>${formatCurrency(service.valor)}</td>
      <td>${service.funcionario}</td>
      <td><span class="status-badge">${service.status || 'Concluído'}</span></td>
    </tr>
  `).join('');
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
    defeitos: db.getDefeitos(),
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
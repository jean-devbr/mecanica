// Configuração da API
const API_BASE = '/api';

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

// Função para fazer requisições à API
async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    showMessage(`Erro: ${error.message}`, 'error');
    throw error;
  }
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

async function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  
  // Adicionar classe de loading
  form.classList.add('loading');
  
  try {
    let endpoint = '';
    let successMessage = '';
    
    switch (form.id) {
      case 'formCliente':
        endpoint = '/clientes';
        successMessage = 'Cliente cadastrado com sucesso!';
        break;
      case 'formVeiculo':
        endpoint = '/veiculos';
        successMessage = 'Veículo cadastrado com sucesso!';
        break;
      case 'formDefeito':
        endpoint = '/defeitos';
        successMessage = 'Defeito cadastrado com sucesso!';
        break;
      case 'formServico':
        endpoint = '/servicos';
        successMessage = 'Serviço registrado com sucesso!';
        break;
    }
    
    await apiRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    
    showMessage(successMessage);
    form.reset();
    
    // Recarregar dados se necessário
    setTimeout(() => {
      initializePage();
    }, 1000);
    
  } catch (error) {
    // Erro já tratado na função apiRequest
  } finally {
    form.classList.remove('loading');
  }
}

// Funções específicas do Dashboard
async function loadDashboard() {
  try {
    const stats = await apiRequest('/dashboard');
    
    document.getElementById('totalClientes').textContent = stats.clientes || 0;
    document.getElementById('totalVeiculos').textContent = stats.veiculos || 0;
    document.getElementById('servicosMes').textContent = stats.servicos_mes || 0;
    document.getElementById('faturamentoMes').textContent = formatCurrency(stats.faturamento_mes || 0);
    
    // Carregar últimos serviços
    const services = await apiRequest('/servicos');
    const recentServices = services.slice(0, 5);
    displayRecentServices(recentServices);
    
  } catch (error) {
    console.error('Erro ao carregar dashboard:', error);
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
async function loadClients() {
  try {
    const clients = await apiRequest('/clientes');
    displayClients(clients);
  } catch (error) {
    console.error('Erro ao carregar clientes:', error);
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

async function loadClientsForSelect() {
  try {
    const clients = await apiRequest('/clientes');
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
async function loadVehicles() {
  try {
    const vehicles = await apiRequest('/veiculos');
    displayVehicles(vehicles);
  } catch (error) {
    console.error('Erro ao carregar veículos:', error);
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
async function loadDefects() {
  try {
    const defects = await apiRequest('/defeitos');
    displayDefects(defects);
  } catch (error) {
    console.error('Erro ao carregar defeitos:', error);
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

async function loadDefectsForSelect() {
  try {
    const defects = await apiRequest('/defeitos');
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
async function loadServices() {
  try {
    const services = await apiRequest('/servicos');
    displayServices(services);
  } catch (error) {
    console.error('Erro ao carregar serviços:', error);
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
    clientSelect.addEventListener('change', async (e) => {
      const clientId = e.target.value;
      
      if (clientId) {
        try {
          const vehicles = await apiRequest('/veiculos');
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
async function loadAllServices() {
  try {
    const services = await apiRequest('/servicos');
    displayAllServices(services);
  } catch (error) {
    console.error('Erro ao carregar todos os serviços:', error);
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

async function generateMonthlyReport() {
  const monthInput = document.getElementById('monthFilter');
  const reportContent = document.getElementById('monthlyReport');
  
  if (!monthInput || !reportContent) return;
  
  const selectedMonth = monthInput.value;
  if (!selectedMonth) {
    showMessage('Selecione um mês para gerar o relatório', 'error');
    return;
  }
  
  try {
    const services = await apiRequest('/servicos');
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
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Barra de navegação superior com design melhorada -->
    <nav class="bg-black shadow-lg text-white">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center space-x-2">
              
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 17H16M8 17C8 18.1046 7.10457 19 6 19C4.89543 19 4 18.1046 4 17M8 17C8 15.8954 7.10457 15 6 15C4.89543 15 4 15.8954 4 17M16 17C16 18.1046 16.8954 19 18 19C19.1046 19 20 18.1046 20 17M16 17C16 15.8954 16.8954 15 18 15C19.1046 15 20 15.8954 20 17M10 5V11M4 11L4.33152 9.01088C4.56901 7.58593 4.68776 6.87345 5.0433 6.3388C5.35671 5.8675 5.79705 5.49447 6.31346 5.26281C6.8993 5 7.6216 5 9.06621 5H12.4311C13.3703 5 13.8399 5 14.2662 5.12945C14.6436 5.24406 14.9946 5.43194 15.2993 5.68236C15.6435 5.96523 15.904 6.35597 16.425 7.13744L19 11M4 17H3.6C3.03995 17 2.75992 17 2.54601 16.891C2.35785 16.7951 2.20487 16.6422 2.10899 16.454C2 16.2401 2 15.9601 2 15.4V14.2C2 13.0799 2 12.5198 2.21799 12.092C2.40973 11.7157 2.71569 11.4097 3.09202 11.218C3.51984 11 4.0799 11 5.2 11H17.2C17.9432 11 18.3148 11 18.6257 11.0492C20.3373 11.3203 21.6797 12.6627 21.9508 14.3743C22 14.6852 22 15.0568 22 15.8C22 15.9858 22 16.0787 21.9877 16.1564C21.9199 16.5843 21.5843 16.9199 21.1564 16.9877C21.0787 17 20.9858 17 20.8 17H20" />
</svg>
              <h1 class="text-xl font-bold">D&J RADIADORES</h1>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Card principal com sombra e cantos arredondados -->
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
          <!-- Tabs de navegação com design melhorado -->
          <div class="flex border-b border-gray-200 bg-gray-50 flex-wrap">
            <button class="px-6 py-4 text-sm font-medium flex items-center space-x-2 focus:outline-none"
              :class="{ 'text-blue-600 border-b-2 border-blue-600': activeTab === 'dashboard', 'text-gray-500 hover:text-gray-700': activeTab !== 'dashboard' }"
              @click="mudarTab('dashboard')">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7m-7-7v14" />
              </svg>
              <span>Painel</span>
            </button>
            <button class="px-6 py-4 text-sm font-medium flex items-center space-x-2 focus:outline-none"
              :class="{ 'text-blue-600 border-b-2 border-blue-600': activeTab === 'clientes', 'text-gray-500 hover:text-gray-700': activeTab !== 'clientes' }"
              @click="mudarTab('clientes')">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Clientes</span>
            </button>
            <button class="px-6 py-4 text-sm font-medium flex items-center space-x-2 focus:outline-none"
              :class="{ 'text-blue-600 border-b-2 border-blue-600': activeTab === 'veiculos', 'text-gray-500 hover:text-gray-700': activeTab !== 'veiculos' }"
              @click="mudarTab('veiculos')">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span>Veículos</span>
            </button>
            <button class="px-6 py-4 text-sm font-medium flex items-center space-x-2 focus:outline-none"
              :class="{ 'text-blue-600 border-b-2 border-blue-600': activeTab === 'servicos', 'text-gray-500 hover:text-gray-700': activeTab !== 'servicos' }"
              @click="mudarTab('servicos')">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2m18-7a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Serviços</span>
            </button>
            <button class="px-6 py-4 text-sm font-medium flex items-center space-x-2 focus:outline-none"
              :class="{ 'text-blue-600 border-b-2 border-blue-600': activeTab === 'pecas', 'text-gray-500 hover:text-gray-700': activeTab !== 'pecas' }"
              @click="mudarTab('pecas')">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span>Peças</span>
            </button>
            <button class="px-6 py-4 text-sm font-medium flex items-center space-x-2 focus:outline-none"
              :class="{ 'text-blue-600 border-b-2 border-blue-600': activeTab === 'ordens', 'text-gray-500 hover:text-gray-700': activeTab !== 'ordens' }"
              @click="mudarTab('ordens')">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>Ordens de Serviço</span>
            </button>


          </div>

          <!-- Conteúdo principal -->
          <div class="p-6">
            <!-- Componentes com transição suave -->
            <transition name="fade" mode="out-in">
              <component :is="componenteAtivo" @selecionar-cliente="selecionarCliente"
                @selecionar-veiculo="selecionarVeiculo" @mudar-tab="mudarTab" />
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { db } from './services/db';
import type { Veiculo, Cliente } from './services/db';
import ClientesList from './components/ClientesList.vue';
import VeiculosList from './components/VeiculosList.vue';
import ServicosList from './components/ServicosList.vue';
import OrdemServicoList from './components/OrdemServicoList.vue';
import PecasList from './components/PecasList.vue';
import Dashboard from './components/Dashboard.vue';

type TabType = 'dashboard' | 'clientes' | 'veiculos' | 'servicos' | 'ordens' | 'pecas';

const activeTab = ref<TabType>('dashboard');
const clienteSelecionado = ref<Cliente | null>(null);
const veiculoSelecionado = ref<Veiculo | null>(null);

// Mapeamento de componentes
const componentesMap = {
  dashboard: Dashboard,
  clientes: ClientesList,
  veiculos: VeiculosList,
  servicos: ServicosList,
  ordens: OrdemServicoList,
  pecas: PecasList
};

// Componente ativo computado
const componenteAtivo = computed(() => {
  return componentesMap[activeTab.value] || Dashboard;
});

const mudarTab = (tab: TabType | string) => {
  console.log('Mudando para a tab:', tab);
  // Garantir que o tipo de tab seja válido antes de atribuir
  if (tab === 'dashboard' || tab === 'clientes' || tab === 'veiculos' ||
    tab === 'servicos' || tab === 'ordens' || tab === 'pecas') {
    activeTab.value = tab as TabType;
  } else {
    console.error('Tipo de tab inválido:', tab);
  }
};

const selecionarCliente = (cliente: Cliente) => {
  clienteSelecionado.value = cliente;
  activeTab.value = 'veiculos';
};

const selecionarVeiculo = (veiculo: Veiculo) => {
  veiculoSelecionado.value = veiculo;
  activeTab.value = 'ordens';
};

onMounted(async () => {
  try {
    // Apenas inicializa o banco de dados
    await db.init();
    console.log('Banco de dados inicializado com sucesso');
  } catch (error) {
    console.error('Erro ao inicializar banco de dados:', error);
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

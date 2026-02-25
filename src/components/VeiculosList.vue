<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold text-gray-800">Veículos</h2>
      <div class="flex gap-2">
        <button @click="mostrarFiltros = !mostrarFiltros"
          class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md shadow-sm flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span>{{ mostrarFiltros ? '' : '' }}</span>
        </button>
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm flex items-center space-x-2"
          @click="showModal = true">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Novo Veículo</span>
        </button>
      </div>
    </div>

    <!-- Filtros -->
    <div v-if="mostrarFiltros" class="mb-4 bg-white p-4 rounded-lg shadow-sm transition-all duration-300 ease-in-out">
      <div class="flex flex-wrap gap-4">
        <div class="flex-1 min-w-[200px]">
          <label class="block text-sm font-medium text-gray-700 mb-1">Placa</label>
          <input v-model="filtros.placa" type="text" placeholder="Filtrar por placa"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
        </div>
        <div class="flex-1 min-w-[200px]">
          <label class="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
          <input v-model="filtros.modelo" type="text" placeholder="Filtrar por modelo"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
        </div>
        <div class="flex-1 min-w-[200px]">
          <label class="block text-sm font-medium text-gray-700 mb-1">Ano</label>
          <input v-model="filtros.ano" type="number" placeholder="Filtrar por ano"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
        </div>
        <div class="flex-1 min-w-[200px]">
          <label class="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
          <select v-model="filtros.clienteId"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            <option value="">Todos os clientes</option>
            <option v-for="cliente in clientesOrdenados" :key="cliente.id" :value="cliente.id">
              {{ cliente.nome }}
            </option>
          </select>
        </div>
        <div class="flex items-end">
          <button @click="limparFiltros"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Limpar Filtros
          </button>
        </div>
      </div>
    </div>

    <!-- Lista de Veículos -->
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th @click="setSorting('placa')" :class="getSortClass('placa')"
                class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none">
                <div class="flex items-center space-x-1">
                  <span>Placa</span>
                  <span class="text-gray-400">{{ getSortIcon('placa') }}</span>
                </div>
              </th>
              <th @click="setSorting('modelo')" :class="getSortClass('modelo')"
                class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none">
                <div class="flex items-center space-x-1">
                  <span>Modelo</span>
                  <span class="text-gray-400">{{ getSortIcon('modelo') }}</span>
                </div>
              </th>
              <th @click="setSorting('ano')" :class="getSortClass('ano')"
                class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none">
                <div class="flex items-center space-x-1">
                  <span>Ano</span>
                  <span class="text-gray-400">{{ getSortIcon('ano') }}</span>
                </div>
              </th>
              <th @click="setSorting('clienteNome')" :class="getSortClass('clienteNome')"
                class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none">
                <div class="flex items-center space-x-1">
                  <span>Cliente</span>
                  <span class="text-gray-400">{{ getSortIcon('clienteNome') }}</span>
                </div>
              </th>
              <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="veiculo in veiculosFiltradosOrdenados" :key="veiculo.id" class="hover:bg-gray-50">
              <td class="py-4 px-6 whitespace-nowrap">{{ veiculo.placa }}</td>
              <td class="py-4 px-6 whitespace-nowrap">{{ veiculo.modelo }}</td>
              <td class="py-4 px-6 whitespace-nowrap">{{ veiculo.ano }}</td>
              <td class="py-4 px-6 whitespace-nowrap">{{ getClienteNome(veiculo.clienteId) }}</td>
              <td class="py-4 px-6 whitespace-nowrap space-x-2">
                <button
                  class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  @click="verServicos(veiculo)">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Ver Serviços
                </button>
                <button @click="editarVeiculo(veiculo)"
                  class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Editar
                </button>
                <button @click="excluirVeiculo(veiculo.id)"
                  class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Excluir
                </button>
              </td>
            </tr>
            <tr v-if="veiculosComClientes.length === 0">
              <td colspan="5" class="py-4 px-6 text-center text-gray-500">Nenhum veículo cadastrado</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Novo Veículo -->
    <div v-if="showModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-800">Novo Veículo</h3>
          <button @click="showModal = false" class="text-gray-400 hover:text-gray-500 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="salvarVeiculo" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
            <select v-model="novoVeiculo.clienteId"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              :class="{ 'border-red-300': !novoVeiculo.clienteId && tentouSalvar }">
              <option disabled value="">Selecione um cliente</option>
              <option v-for="cliente in clientesOrdenados" :key="cliente.id" :value="cliente.id">
                {{ cliente.nome }}
              </option>
            </select>
            <p v-if="!novoVeiculo.clienteId && tentouSalvar" class="mt-1 text-sm text-red-600">Selecione um cliente</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Placa</label>
            <input v-model="novoVeiculo.placa" type="text" placeholder="ABC-1234"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              :class="{ 'border-red-300': !novoVeiculo.placa && tentouSalvar }" />
            <p v-if="!novoVeiculo.placa && tentouSalvar" class="mt-1 text-sm text-red-600">Informe a placa do veículo
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
            <input v-model="novoVeiculo.modelo" type="text" placeholder="Modelo do veículo"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              :class="{ 'border-red-300': !novoVeiculo.modelo && tentouSalvar }" />
            <p v-if="!novoVeiculo.modelo && tentouSalvar" class="mt-1 text-sm text-red-600">Informe o modelo do veículo
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Ano</label>
            <input v-model="novoVeiculo.ano" type="number" placeholder="2023"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              :class="{ 'border-red-300': !novoVeiculo.ano && tentouSalvar }" />
            <p v-if="!novoVeiculo.ano && tentouSalvar" class="mt-1 text-sm text-red-600">Informe o ano do veículo</p>
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button type="button"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              @click="showModal = false">
              Cancelar
            </button>
            <button type="submit"
              class="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              :disabled="isLoading">
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              {{ isLoading ? 'Salvando...' : 'Salvar' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de Edição -->
    <div v-if="showEditModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-800">Editar Veículo</h3>
          <button @click="showEditModal = false" class="text-gray-400 hover:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form @submit.prevent="salvarEdicao" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
            <select v-model="veiculoEmEdicao.clienteId"
              class="block w-full rounded-md shadow-sm focus:ring-blue-500 sm:text-sm" :class="[
                veiculoEmEdicao.clienteId ? 'border-gray-300 focus:border-blue-500' : 'border-red-300 focus:border-red-500'
              ]" required>
              <option disabled value="0">Selecione um cliente</option>
              <option v-for="cliente in clientesOrdenados" :key="cliente.id" :value="cliente.id">
                {{ cliente.nome }}
              </option>
            </select>
            <p v-if="!veiculoEmEdicao.clienteId && tentouSalvar" class="mt-1 text-sm text-red-600">
              Selecione um cliente
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Placa</label>
            <input v-model="veiculoEmEdicao.placa" type="text"
              class="block w-full rounded-md shadow-sm focus:ring-blue-500 sm:text-sm" :class="[
                veiculoEmEdicao.placa ? 'border-gray-300 focus:border-blue-500' : 'border-red-300 focus:border-red-500'
              ]" placeholder="ABC-1234" required />
            <p v-if="!veiculoEmEdicao.placa && tentouSalvar" class="mt-1 text-sm text-red-600">
              Informe a placa do veículo
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
            <input v-model="veiculoEmEdicao.modelo" type="text"
              class="block w-full rounded-md shadow-sm focus:ring-blue-500 sm:text-sm" :class="[
                veiculoEmEdicao.modelo ? 'border-gray-300 focus:border-blue-500' : 'border-red-300 focus:border-red-500'
              ]" placeholder="Modelo do veículo" required />
            <p v-if="!veiculoEmEdicao.modelo && tentouSalvar" class="mt-1 text-sm text-red-600">
              Informe o modelo do veículo
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Ano</label>
            <input v-model="veiculoEmEdicao.ano" type="number"
              class="block w-full rounded-md shadow-sm focus:ring-blue-500 sm:text-sm" :class="[
                veiculoEmEdicao.ano ? 'border-gray-300 focus:border-blue-500' : 'border-red-300 focus:border-red-500'
              ]" :placeholder="new Date().getFullYear().toString()" required />
            <p v-if="!veiculoEmEdicao.ano && tentouSalvar" class="mt-1 text-sm text-red-600">
              Informe o ano do veículo
            </p>
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button type="button"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              @click="showEditModal = false">
              Cancelar
            </button>
            <button type="submit"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              :disabled="isLoading">
              {{ isLoading ? 'Salvando...' : 'Salvar' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Toast Mensagem -->
    <div v-if="mensagem" class="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg max-w-sm w-full z-50" :class="{
      'bg-red-100 text-red-700 border border-red-200': mensagem.tipo === 'erro',
      'bg-green-100 text-green-700 border border-green-200': mensagem.tipo === 'sucesso'
    }">
      <div class="flex items-center">
        <div v-if="mensagem.tipo === 'sucesso'" class="bg-green-100 text-green-800 rounded-full p-2 mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div v-if="mensagem.tipo === 'erro'" class="bg-red-100 text-red-800 rounded-full p-2 mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div class="flex-1">
          <p class="text-sm font-medium">{{ mensagem.texto }}</p>
        </div>
        <button @click="mensagem = null" class="text-gray-400 hover:text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue';
import { db, type Veiculo, type Cliente } from '../services/db';
import { useSorting } from '../composables/useSorting';

// Composable de ordenação
const { setSorting, sortedData, getSortClass, getSortIcon } = useSorting<any>('placa');

const veiculos = ref<Veiculo[]>([]);
const clientes = ref<Cliente[]>([]);
const showModal = ref(false);
const showEditModal = ref(false);
const isLoading = ref(false);
const mensagem = ref<{ tipo: 'sucesso' | 'erro', texto: string } | null>(null);
const tentouSalvar = ref(false);
const mostrarFiltros = ref(false);

// Filtros
const filtros = ref({
  placa: '',
  modelo: '',
  ano: '',
  clienteId: ''
});

// Veículo para o formulário
const novoVeiculo = ref<Veiculo>({
  clienteId: 0,
  placa: '',
  modelo: '',
  ano: new Date().getFullYear()
});

// Veículo em edição
const veiculoEmEdicao = ref<Veiculo>({
  id: undefined,
  clienteId: 0,
  modelo: '',
  placa: '',
  ano: new Date().getFullYear()
});

// Computar veículos com nomes de clientes
const veiculosComClientes = computed(() => {
  return veiculos.value.map(veiculo => {
    return {
      ...veiculo,
      clienteNome: getClienteNome(veiculo.clienteId)
    };
  });
});

// Clientes ordenados alfabeticamente
const clientesOrdenados = computed(() => {
  return [...clientes.value].sort((a, b) => a.nome.localeCompare(b.nome));
});

// Filtrar veículos
const veiculosFiltrados = computed(() => {
  return veiculosComClientes.value.filter(veiculo => {
    const placaMatch = veiculo.placa.toLowerCase().includes(filtros.value.placa.toLowerCase());
    const modeloMatch = veiculo.modelo.toLowerCase().includes(filtros.value.modelo.toLowerCase());
    const anoMatch = filtros.value.ano === '' || veiculo.ano.toString() === filtros.value.ano.toString();
    const clienteMatch = filtros.value.clienteId === '' || veiculo.clienteId.toString() === filtros.value.clienteId.toString();

    return placaMatch && modeloMatch && anoMatch && clienteMatch;
  });
});

// Veículos filtrados e ordenados
const veiculosFiltradosOrdenados = computed(() => {
  return sortedData.value(veiculosFiltrados.value);
});

// Limpar filtros
const limparFiltros = () => {
  filtros.value = {
    placa: '',
    modelo: '',
    ano: '',
    clienteId: ''
  };
};

// Carregar dados
const carregarDados = async () => {
  try {
    isLoading.value = true;

    // Buscar dados atualizados
    const veiculosData = await db.getVeiculos();
    const clientesData = await db.getClientes();

    // Garantir novas referências para forçar reatividade
    veiculos.value = [...veiculosData];
    clientes.value = [...clientesData];

    // Forçar atualização da UI
    await nextTick();

    console.log('Dados carregados com sucesso:', veiculos.value.length, 'veículos');
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    mensagem.value = {
      texto: 'Erro ao carregar dados',
      tipo: 'erro'
    };
  } finally {
    isLoading.value = false;
  }
};

const getClienteNome = (clienteId: number) => {
  const cliente = clientes.value.find(c => c.id === clienteId);
  return cliente ? cliente.nome : 'Cliente não encontrado';
};

const salvarVeiculo = async () => {
  tentouSalvar.value = true;

  if (!novoVeiculo.value.clienteId || !novoVeiculo.value.placa || !novoVeiculo.value.modelo || !novoVeiculo.value.ano) {
    mensagem.value = {
      texto: 'Por favor, preencha todos os campos obrigatórios',
      tipo: 'erro'
    };
    return;
  }

  try {
    isLoading.value = true;

    const veiculoParaSalvar = {
      clienteId: novoVeiculo.value.clienteId,
      placa: novoVeiculo.value.placa.trim().toUpperCase(),
      modelo: novoVeiculo.value.modelo.trim(),
      ano: novoVeiculo.value.ano
    };

    // Mostra os dados antes de salvar
    // console.log('======= DADOS DO VEÍCULO =======');
    // console.log('Antes de salvar:', veiculoParaSalvar);
    // console.log('Dados do veículo antes de salvar:', veiculoParaSalvar);    // Tenta salvar o veículo
    const veiculoSalvo = await db.addVeiculo(veiculoParaSalvar);

    if (!veiculoSalvo) {
      throw new Error('Erro ao salvar o veículo: Nenhum dado retornado');
    }

    // // Recarrega todos os veículos
    // const todosVeiculos = await db.getVeiculos();
    // veiculos.value = todosVeiculos;

    // // Log detalhado dos dados
    // console.log('=========== SALVAMENTO DE VEÍCULO ===========');
    // console.log('Veículo que foi salvo:', veiculoSalvo);
    // console.log('Lista atualizada de veículos:', todosVeiculos);
    // console.log('==========================================');
    // showModal.value = false;
    tentouSalvar.value = false;
    mensagem.value = {
      texto: 'Veículo cadastrado com sucesso!',
      tipo: 'sucesso'
    };

    // Resetando o formulário após salvar
    novoVeiculo.value = {
      clienteId: 0,
      placa: '',
      modelo: '',
      ano: new Date().getFullYear()
    };
    await carregarDados();
  } catch (error) {
    console.error('Erro ao salvar veículo:', error);
    mensagem.value = {
      texto: error instanceof Error ? error.message : 'Erro ao cadastrar o veículo',
      tipo: 'erro'
    };
  } finally {
    isLoading.value = false;
  }
};

const editarVeiculo = (veiculo: Veiculo) => {
  if (!veiculo || !veiculo.id) {
    mensagem.value = {
      texto: 'Erro: Veículo inválido para edição',
      tipo: 'erro'
    };
    return;
  }

  // Fazer uma cópia profunda do veículo para edição
  veiculoEmEdicao.value = {
    id: veiculo.id,
    clienteId: veiculo.clienteId || 0,
    modelo: veiculo.modelo || '',
    placa: veiculo.placa || '',
    ano: veiculo.ano || new Date().getFullYear()
  };
  showEditModal.value = true;
  tentouSalvar.value = false;
};

const salvarEdicao = async () => {
  if (!veiculoEmEdicao.value || !veiculoEmEdicao.value.id) {
    mensagem.value = {
      texto: 'Erro: Veículo inválido para edição',
      tipo: 'erro'
    };
    return;
  }

  // Validar campos obrigatórios
  if (!veiculoEmEdicao.value.clienteId ||
    !veiculoEmEdicao.value.placa ||
    !veiculoEmEdicao.value.modelo ||
    !veiculoEmEdicao.value.ano) {
    tentouSalvar.value = true;
    mensagem.value = {
      texto: 'Por favor, preencha todos os campos obrigatórios',
      tipo: 'erro'
    };
    return;
  }

  try {
    isLoading.value = true;
    console.log('Atualizando veículo:', veiculoEmEdicao.value);
    await db.updateVeiculo({
      id: veiculoEmEdicao.value.id,
      clienteId: veiculoEmEdicao.value.clienteId,
      placa: veiculoEmEdicao.value.placa.trim().toUpperCase(),
      modelo: veiculoEmEdicao.value.modelo.trim(),
      ano: veiculoEmEdicao.value.ano
    });

    // Atualiza localmente o veículo na lista
    const index = veiculos.value.findIndex(v => v.id === veiculoEmEdicao.value.id);
    if (index !== -1) {
      veiculos.value[index] = { ...veiculoEmEdicao.value };
      // Forçar reatividade criando uma nova referência para o array
      veiculos.value = [...veiculos.value];
    }

    showEditModal.value = false;
    tentouSalvar.value = false;
    mensagem.value = {
      texto: 'Veículo atualizado com sucesso!',
      tipo: 'sucesso'
    };
  } catch (error) {
    console.error('Erro ao atualizar veículo:', error);
    mensagem.value = {
      texto: error instanceof Error ? error.message : 'Erro ao atualizar o veículo',
      tipo: 'erro'
    };
  } finally {
    isLoading.value = false;
  }
};

const excluirVeiculo = async (id?: number) => {
  if (!id) return;

  if (!confirm('Tem certeza que deseja excluir este veículo?')) return;

  try {
    await db.deleteVeiculo(id);
    mensagem.value = {
      texto: 'Veículo excluído com sucesso!',
      tipo: 'sucesso'
    };
    await carregarDados();
  } catch (error) {
    mensagem.value = {
      texto: 'Erro ao excluir o veículo',
      tipo: 'erro'
    };
  }
};

const verServicos = (veiculo: Veiculo) => {
  if (veiculo.id) {
    // Emitir evento para o componente pai
    emit('selecionar-veiculo', veiculo);
  }
};

// Definindo os eventos emitidos
const emit = defineEmits<{
  (e: 'selecionar-veiculo', veiculo: Veiculo): void
}>();

onMounted(carregarDados);
</script>

<style scoped>
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>

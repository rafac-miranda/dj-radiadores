<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold text-gray-800">Clientes</h2>
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
          <span>Novo Cliente</span>
        </button>
      </div>
    </div>
    <!-- Modal Novo Cliente -->
    <div v-if="showModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-800">Novo Cliente</h3>
          <button @click="showModal = false" class="text-gray-400 hover:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="salvarCliente" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input v-model="novoCliente.nome" type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Nome do cliente" required />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <input v-model="novoCliente.telefone" type="tel"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="(00) 00000-0000" required />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input v-model="novoCliente.email" type="email"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="email@exemplo.com" />
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button type="button"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              @click="showModal = false">
              Cancelar
            </button>
            <button type="submit"
              class="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
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
    </div><!-- Mensagem de Feedback -->
    <div v-if="mensagem" class="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg max-w-sm w-full z-50" :class="[
      mensagem.tipo === 'erro' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-green-100 text-green-700 border border-green-200'
    ]">
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

    <!-- Filtros -->
    <div v-if="mostrarFiltros" class="mb-4 bg-white p-4 rounded-lg shadow-sm transition-all duration-300 ease-in-out">
      <div class="flex flex-wrap gap-4">
        <div class="flex-1 min-w-[200px]">
          <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
          <input v-model="filtros.nome" type="text" placeholder="Filtrar por nome"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
        </div>
        <div class="flex-1 min-w-[200px]">
          <label class="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
          <input v-model="filtros.telefone" type="text" placeholder="Filtrar por telefone"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
        </div>
        <div class="flex-1 min-w-[200px]">
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="filtros.email" type="text" placeholder="Filtrar por email"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
        </div>
        <div class="flex items-end">
          <button @click="limparFiltros"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Limpar Filtros
          </button>
        </div>
      </div>
    </div>

    <!-- Lista de Clientes -->
    <div v-if="isLoadingLista" class="text-center py-4">
      Carregando clientes...
    </div>

    <div v-else class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th @click="setSorting('nome')" :class="getSortClass('nome')"
                class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider select-none">
                <div class="flex items-center space-x-1">
                  <span>Nome</span>
                  <span class="text-gray-400">{{ getSortIcon('nome') }}</span>
                </div>
              </th>
              <th @click="setSorting('telefone')" :class="getSortClass('telefone')"
                class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider select-none">
                <div class="flex items-center space-x-1">
                  <span>Telefone</span>
                  <span class="text-gray-400">{{ getSortIcon('telefone') }}</span>
                </div>
              </th>
              <th @click="setSorting('email')" :class="getSortClass('email')"
                class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider select-none">
                <div class="flex items-center space-x-1">
                  <span>Email</span>
                  <span class="text-gray-400">{{ getSortIcon('email') }}</span>
                </div>
              </th>
              <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="cliente in clientesFiltradosOrdenados" :key="cliente.id" class="hover:bg-gray-50">
              <td class="py-4 px-6 whitespace-nowrap">{{ cliente.nome }}</td>
              <td class="py-4 px-6 whitespace-nowrap">{{ cliente.telefone }}</td>
              <td class="py-4 px-6 whitespace-nowrap">{{ cliente.email }}</td>
              <td class="py-4 px-6 whitespace-nowrap space-x-2">
                <button @click="editarCliente(cliente)"
                  class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Editar
                </button>
                <button @click="excluirCliente(cliente.id)"
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
            <tr v-if="clientes.length === 0">
              <td colspan="4" class="py-4 px-6 text-center text-gray-500">Nenhum cliente cadastrado</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal de Edição -->
    <div v-if="showEditModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-800">Editar Cliente</h3>
          <button @click="showEditModal = false" class="text-gray-400 hover:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="salvarEdicao" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label> <input
              v-model="clienteEmEdicao.nome" type="text"
              class="block w-full rounded-md shadow-sm focus:ring-blue-500 sm:text-sm" :class="[
                clienteEmEdicao.nome ? 'border-gray-300 focus:border-blue-500' : 'border-red-300 focus:border-red-500'
              ]" required />
            <p v-if="!clienteEmEdicao.nome" class="mt-1 text-sm text-red-600">
              Nome é obrigatório
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Telefone</label> <input
              v-model="clienteEmEdicao.telefone" type="tel"
              class="block w-full rounded-md shadow-sm focus:ring-blue-500 sm:text-sm" :class="[
                clienteEmEdicao.telefone ? 'border-gray-300 focus:border-blue-500' : 'border-red-300 focus:border-red-500'
              ]" required />
            <p v-if="!clienteEmEdicao.telefone" class="mt-1 text-sm text-red-600">
              Telefone é obrigatório
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input v-model="clienteEmEdicao.email" type="email"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { db } from '../services/db';
import type { Cliente } from '../services/db';
import { useSorting } from '../composables/useSorting';

// Composable de ordenação
const { setSorting, sortedData, getSortClass, getSortIcon } = useSorting<Cliente>('nome');

// Estado do componente
const showModal = ref(false);
const showEditModal = ref(false);
const isLoading = ref(false);
const isLoadingLista = ref(false);
const clientes = ref<Cliente[]>([]);
const mensagem = ref<{ tipo: 'sucesso' | 'erro', texto: string } | null>(null);
const mostrarFiltros = ref(false);

// Filtros
const filtros = ref({
  nome: '',
  telefone: '',
  email: ''
});

// Cliente para o formulário
const novoCliente = ref<Cliente>({
  nome: '',
  telefone: '',
  email: ''
});

// Cliente em edição
const clienteEmEdicao = ref<Cliente>({
  nome: '',
  telefone: '',
  email: ''
});

// Carregar dados
const carregarClientes = async () => {
  try {
    isLoadingLista.value = true;
    clientes.value = await db.getClientes();
  } catch (error) {
    console.error('Erro ao carregar clientes:', error);
    mostrarMensagem('Erro ao carregar clientes', 'erro');
  } finally {
    isLoadingLista.value = false;
  }
};

// Salvar novo cliente
const salvarCliente = async () => {
  try {
    console.log('Tentando salvar cliente:', novoCliente.value);
    isLoading.value = true;

    // Salva o cliente e obtém o ID retornado
    const clienteId = await db.addCliente(novoCliente.value);

    // Cria um objeto cliente completo com o ID retornado
    const clienteSalvo: Cliente = {
      ...novoCliente.value,
      id: clienteId as unknown as number
    };

    // Adiciona o cliente à lista local
    clientes.value = [...clientes.value, clienteSalvo];

    showModal.value = false;
    novoCliente.value = { nome: '', telefone: '', email: '' }; // Limpa o formulário
    mostrarMensagem('Cliente salvo com sucesso!', 'sucesso');

    // Recarrega os dados para garantir sincronização total
    await carregarClientes();
  } catch (error) {
    console.error('Erro ao salvar cliente:', error);
    mostrarMensagem('Erro ao salvar cliente: ' + (error instanceof Error ? error.message : error), 'erro');
  } finally {
    isLoading.value = false;
  }
};

const excluirCliente = async (id?: number) => {
  if (!id) return;

  if (!confirm('Tem certeza que deseja excluir este cliente?')) return;
  try {
    await db.deleteCliente(id);
    mensagem.value = {
      texto: 'Cliente excluído com sucesso!',
      tipo: 'sucesso'
    };
    // Recarrega os dados após a mensagem
    await carregarClientes();
  } catch (error) {
    mensagem.value = {
      texto: 'Erro ao excluir o cliente',
      tipo: 'erro'
    };
  }
};

const editarCliente = (cliente: Cliente) => {
  clienteEmEdicao.value = { ...cliente };
  showEditModal.value = true;
};

const salvarEdicao = async () => {
  try {
    isLoading.value = true;
    console.log('Atualizando cliente:', clienteEmEdicao.value);
    await db.updateCliente(clienteEmEdicao.value);

    // Atualiza localmente o cliente na lista
    const index = clientes.value.findIndex(c => c.id === clienteEmEdicao.value.id);
    if (index !== -1) {
      clientes.value[index] = { ...clienteEmEdicao.value };
      // Forçar reatividade criando uma nova referência para o array
      clientes.value = [...clientes.value];
    }

    // Opcional: carregar todos de novo
    // await carregarClientes();

    showEditModal.value = false;
    mostrarMensagem('Cliente atualizado com sucesso!', 'sucesso');
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    mostrarMensagem('Erro ao atualizar cliente', 'erro');
  } finally {
    isLoading.value = false;
  }
};

// Utilitário para mostrar mensagens
const mostrarMensagem = (texto: string, tipo: 'sucesso' | 'erro') => {
  mensagem.value = { texto, tipo };
  setTimeout(() => {
    mensagem.value = null;
  }, 3000);
};

// Filtrar clientes
const clientesFiltrados = computed(() => {
  return clientes.value.filter(cliente => {
    const nomeMatch = cliente.nome.toLowerCase().includes(filtros.value.nome.toLowerCase());
    const telefoneMatch = cliente.telefone.includes(filtros.value.telefone);
    const emailMatch = cliente.email.toLowerCase().includes(filtros.value.email.toLowerCase());

    return nomeMatch && telefoneMatch && emailMatch;
  });
});

// Clientes filtrados e ordenados
const clientesFiltradosOrdenados = computed(() => {
  return sortedData.value(clientesFiltrados.value);
});

// Limpar filtros
const limparFiltros = () => {
  filtros.value = {
    nome: '',
    telefone: '',
    email: ''
  };
};

// Carregar dados ao montar o componente
onMounted(carregarClientes);
</script>

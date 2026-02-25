<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold text-gray-800">Ordens de Serviço</h2>
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
          <span>Nova O.S.</span>
        </button>
      </div>
    </div>

    <!-- Filtros -->
    <div v-if="mostrarFiltros" class="bg-white p-4 rounded-lg shadow-md mb-6 transition-all duration-300 ease-in-out">
      <div class="flex flex-col md:flex-row gap-4 mb-4">
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
          <select v-model="filtros.clienteId"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            <option value="">Todos os clientes</option>
            <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">{{ cliente.nome }}</option>
          </select>
        </div>
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Veículo</label>
          <select v-model="filtros.veiculoId"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            <option value="">Todos os veículos</option>
            <option v-for="veiculo in veiculosFiltrados" :key="veiculo.id" :value="veiculo.id">
              {{ veiculo.modelo }} ({{ veiculo.placa }})
            </option>
          </select>
        </div>
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select v-model="filtros.status"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            <option value="">Todos os status</option>
            <option value="aberta">Aberta</option>
            <option value="em_andamento">Em andamento</option>
            <option value="concluida">Concluída</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>
      </div>
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Data inicial</label>
          <input type="date" v-model="filtros.dataInicial"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
        </div>
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Data final</label>
          <input type="date" v-model="filtros.dataFinal"
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

    <!-- Lista de Ordens de Serviço -->
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th @click="setSorting('numero')" :class="getSortClass('numero')"
                class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider select-none cursor-pointer">
                <div class="flex items-center space-x-1">
                  <span>Número</span>
                  <span class="text-gray-400">{{ getSortIcon('numero') }}</span>
                </div>
              </th>
              <th @click="setSorting('veiculoId')" :class="getSortClass('veiculoId')"
                class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider select-none cursor-pointer">
                <div class="flex items-center space-x-1">
                  <span>Veículo</span>
                  <span class="text-gray-400">{{ getSortIcon('veiculoId') }}</span>
                </div>
              </th>
              <th @click="setSorting('dataAbertura')" :class="getSortClass('dataAbertura')"
                class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider select-none cursor-pointer">
                <div class="flex items-center space-x-1">
                  <span>Data Abertura</span>
                  <span class="text-gray-400">{{ getSortIcon('dataAbertura') }}</span>
                </div>
              </th>
              <th @click="setSorting('status')" :class="getSortClass('status')"
                class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider select-none cursor-pointer">
                <div class="flex items-center space-x-1">
                  <span>Status</span>
                  <span class="text-gray-400">{{ getSortIcon('status') }}</span>
                </div>
              </th>
              <th @click="setSorting('valorTotal')" :class="getSortClass('valorTotal')"
                class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider select-none cursor-pointer">
                <div class="flex items-center space-x-1">
                  <span>Valor Total</span>
                  <span class="text-gray-400">{{ getSortIcon('valorTotal') }}</span>
                </div>
              </th>
              <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="os in ordensComDetalhesOrdenadas" :key="os.id" class="hover:bg-gray-50">
              <td class="py-4 px-6 whitespace-nowrap">{{ os.numero }}</td>
              <td class="py-4 px-6 whitespace-nowrap">{{ getVeiculoInfo(os.veiculoId) }}</td>
              <td class="py-4 px-6 whitespace-nowrap">{{ formatarData(os.dataAbertura) }}</td>
              <td class="py-4 px-6 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="{
                  'bg-yellow-100 text-yellow-800': os.status === 'aberta',
                  'bg-blue-100 text-blue-800': os.status === 'em_andamento',
                  'bg-green-100 text-green-800': os.status === 'concluida',
                  'bg-red-100 text-red-800': os.status === 'cancelada'
                }">
                  {{ formatarStatus(os.status) }}
                </span>
              </td>
              <td class="py-4 px-6 whitespace-nowrap">{{ formatarMoeda(os.valorTotal) }}</td>
              <td class="py-4 px-6 whitespace-nowrap space-x-2">
                <button @click="editarOS(os)"
                  class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Editar
                </button>
                <button v-if="os.status !== 'cancelada'" @click="atualizarStatus(os)"
                  class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Atualizar Status
                </button>
                <button v-if="os.status === 'aberta'" @click="excluirOS(os.id)"
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
            <tr v-if="ordensComDetalhes.length === 0">
              <td colspan="6" class="py-4 px-6 text-center text-gray-500">Nenhuma ordem de serviço cadastrada</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Nova/Editar OS -->
    <div v-if="showModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div class="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-auto p-6" id="os-modal-content">
        <div class="flex justify-between items-center mb-4 no-print">
          <h3 class="text-lg font-medium text-gray-800">
            {{ osEmEdicao.id ? 'Editar' : 'Nova' }} Ordem de Serviço
          </h3>
          <div class="flex gap-2">
            <button v-if="osEmEdicao.id" @click="imprimirOS" type="button"
              class="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Imprimir
            </button>
            <button v-if="osEmEdicao.id" @click="compartilharOS" type="button"
              class="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Compartilhar
            </button>
            <button @click="fecharModal" class="text-gray-400 hover:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Cabeçalho para impressão -->
        <div class="print-only mb-6">
          <div class="text-center border-b-2 border-gray-300 pb-4 mb-4">
            <h1 class="text-2xl font-bold text-gray-800">D&J RADIADORES</h1>
            <h2 class="font-bold">ORDEM DE SERVIÇO</h2>
            <p class="text-lg font-semibold text-gray-600">{{ osEmEdicao.numero || 'Nova OS' }}</p>
          </div>
          
          <div class="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 class="font-semibold text-gray-800 mb-2">Dados do Veículo:</h3>
              <p><strong>Veículo:</strong> {{ getVeiculoInfo(osEmEdicao.veiculoId) }}</p>
              <p><strong>Cliente:</strong> {{ getClienteDoVeiculo(osEmEdicao.veiculoId) }}</p>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800 mb-2">Dados da OS:</h3>
              <p><strong>Data de Abertura:</strong> {{ formatarData(osEmEdicao.dataAbertura) }}</p>
              <p><strong>Status:</strong> {{ formatarStatus(osEmEdicao.status) }}</p>
            </div>
          </div>
        </div>

        <form @submit.prevent="salvarOS" class="space-y-4">
          <!-- Dados básicos -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Veículo</label>
              <select v-model="osEmEdicao.veiculoId"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                :class="{ 'border-red-300': !osEmEdicao.veiculoId && tentouSalvar }" required>
                <option disabled value="">Selecione um veículo</option>
                <option v-for="veiculo in veiculos" :key="veiculo.id" :value="veiculo.id">
                  {{ getVeiculoInfo(veiculo.id!) }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Data de Abertura</label>
              <input v-model="osEmEdicao.dataAbertura" type="date"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                :class="{ 'border-red-300': !osEmEdicao.dataAbertura && tentouSalvar }" required />
            </div>
          </div>

          <!-- Itens -->
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <!--<h4 class="text-md font-medium text-gray-700">Itens da O.S.</h4>-->
              <div class="space-x-2 no-print">
                <button type="button" @click="showModalServico = true"
                  class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                  Adicionar Serviço
                </button>
                <button type="button" @click="showModalPeca = true"
                  class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                  Adicionar Peça
                </button>
              </div>
            </div>

            <div class="overflow-x-auto overflow-y-auto" style="max-height: 300px;">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qtd</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor
                      Unit.</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(item, index) in osEmEdicao.itens" :key="index">
                    <td class="px-6 py-4 whitespace-nowrap">{{ item.tipo === 'servico' ? 'Serviço' : 'Peça' }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{{ getDescricaoItem(item) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{{ item.quantidade }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{{ formatarMoeda(item.valorUnitario) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{{ formatarMoeda(item.subtotal) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <button type="button" @click="removerItem(index)" class="text-red-600 hover:text-red-900">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                  <tr v-if="osEmEdicao.itens.length === 0">
                    <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                      Nenhum item adicionado
                    </td>
                  </tr>
                </tbody>
                <tfoot class="bg-gray-50">
                  <tr>
                    <td colspan="4" class="px-6 py-3 text-right font-medium">Total:</td>
                    <td class="px-6 py-3 font-medium text-lg">{{ formatarMoeda(calcularTotal()) }}</td>
                    <td class="no-print"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Observações</label>
            <textarea v-model="osEmEdicao.observacoes"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              rows="3"></textarea>
          </div>

          <!-- Rodapé para impressão -->
          <div class="print-only mt-8 pt-6 border-t-2 border-gray-300">
            <div class="grid grid-cols-2 gap-8">
              <div class="text-center">
                <div class="border-t border-gray-400 pt-2 mt-16">
                  <p class="text-sm font-medium">Assinatura do Cliente</p>
                </div>
              </div>
              <div class="text-center">
                <div class="border-t border-gray-400 pt-2 mt-16">
                  <p class="text-sm font-medium">Assinatura do Responsável</p>
                </div>
              </div>
            </div>
            <div class="text-center mt-6 text-xs text-gray-500">
              <p>Documento gerado em {{ new Date().toLocaleDateString('pt-BR') }} às {{ new Date().toLocaleTimeString('pt-BR') }}</p>
            </div>
          </div>

          <div class="flex justify-end space-x-3 mt-6 no-print">
            <button type="button"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              @click="fecharModal">
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

    <!-- Modal Adicionar Serviço -->
    <div v-if="showModalServico"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-800">Adicionar Serviço</h3>
          <button @click="showModalServico = false" class="text-gray-400 hover:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="adicionarServico" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Serviço</label>
            <select v-model="servicoSelecionado"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required>
              <option value="">Selecione um serviço</option>
              <option v-for="servico in servicosOrdenados" :key="servico.id" :value="servico">
                {{ servico.descricao }} - {{ formatarMoeda(servico.valor) }}
              </option>
            </select>
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button type="button"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              @click="showModalServico = false">
              Cancelar
            </button>
            <button type="submit"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              :disabled="!servicoSelecionado">
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Adicionar Peça -->
    <div v-if="showModalPeca"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-800">Adicionar Peça</h3>
          <button @click="showModalPeca = false" class="text-gray-400 hover:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="adicionarPeca" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Peça</label>
            <select v-model="pecaSelecionada"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required>
              <option value="">Selecione uma peça</option>
              <option v-for="peca in pecasDisponiveisOrdenadas" :key="peca.id" :value="peca">
                {{ peca.nome }} - {{ formatarMoeda(peca.precoUnitario) }} ({{ peca.quantidadeEstoque }} em estoque)
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
            <input v-model="quantidadePeca" type="number" min="1" :max="pecaSelecionada?.quantidadeEstoque || 1"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required />
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button type="button"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              @click="showModalPeca = false">
              Cancelar
            </button>
            <button type="submit"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              :disabled="!pecaSelecionada || !quantidadePeca || quantidadePeca <= 0 || quantidadePeca > (pecaSelecionada?.quantidadeEstoque || 0)">
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import { db, type OrdemServico, type Veiculo, type Cliente, type Servico, type Peca, type ItemOrdemServico, type StatusPeca } from '../services/db';
import { useSorting } from '../composables/useSorting';

const { setSorting, sortedData, getSortClass, getSortIcon } = useSorting<OrdemServico>('numero');

const ordens = ref<OrdemServico[]>([]);
const veiculos = ref<Veiculo[]>([]);
const clientes = ref<Cliente[]>([]);
const servicos = ref<Servico[]>([]);
const pecas = ref<Peca[]>([]);
const showModal = ref(false);
const showModalServico = ref(false);
const showModalPeca = ref(false);
const isLoading = ref(false);
const tentouSalvar = ref(false);
const mensagem = ref<{ texto: string; tipo: 'sucesso' | 'erro' } | null>(null);
const mostrarFiltros = ref(false);

const osEmEdicao = ref<OrdemServico>({
  veiculoId: 0,
  numero: '',
  dataAbertura: new Date().toISOString().split('T')[0],
  status: 'aberta',
  valorTotal: 0,
  itens: []
});

const servicoSelecionado = ref<Servico | null>(null);
const pecaSelecionada = ref<Peca | null>(null);
const quantidadePeca = ref<number>(1);

// Objeto para armazenar os filtros
const filtros = ref({
  clienteId: '',
  veiculoId: '',
  status: '',
  dataInicial: '',
  dataFinal: ''
});

// Função para limpar os filtros
const limparFiltros = () => {
  filtros.value = {
    clienteId: '',
    veiculoId: '',
    status: '',
    dataInicial: '',
    dataFinal: ''
  };
};

// Computed property para filtrar veículos de acordo com o cliente selecionado
const veiculosFiltrados = computed(() => {
  if (!filtros.value.clienteId) {
    return veiculos.value;
  }

  return veiculos.value.filter(veiculo => {
    return veiculo.clienteId === Number(filtros.value.clienteId);
  });
});

// Computed property para filtrar as ordens de serviço de acordo com os filtros aplicados
const ordensComDetalhes = computed(() => {
  return ordens.value
    .filter(os => {
      // Filtro por cliente
      if (filtros.value.clienteId) {
        const veiculo = veiculos.value.find(v => v.id === os.veiculoId);
        if (!veiculo || veiculo.clienteId !== Number(filtros.value.clienteId)) {
          return false;
        }
      }

      // Filtro por veículo
      if (filtros.value.veiculoId && os.veiculoId !== Number(filtros.value.veiculoId)) {
        return false;
      }

      // Filtro por status
      if (filtros.value.status && os.status !== filtros.value.status) {
        return false;
      }

      // Filtro por data inicial
      if (filtros.value.dataInicial) {
        const dataOS = new Date(os.dataAbertura);
        const dataInicial = new Date(filtros.value.dataInicial);
        dataInicial.setHours(0, 0, 0, 0);
        if (dataOS < dataInicial) {
          return false;
        }
      }

      // Filtro por data final
      if (filtros.value.dataFinal) {
        const dataOS = new Date(os.dataAbertura);
        const dataFinal = new Date(filtros.value.dataFinal);
        dataFinal.setHours(23, 59, 59, 999);
        if (dataOS > dataFinal) {
          return false;
        }
      }

      return true;
    })
    .map(os => ({
      ...os,
      veiculoInfo: getVeiculoInfo(os.veiculoId)
    }));
});

// Computed property para ordenar as ordens de serviço
const ordensComDetalhesOrdenadas = computed(() => {
  return sortedData.value(ordensComDetalhes.value);
});

const pecasDisponiveis = computed(() => {
  return pecas.value.filter(peca => peca.status === 'disponivel');
});

// Serviços ordenados alfabeticamente
const servicosOrdenados = computed(() => {
  return [...servicos.value].sort((a, b) => a.descricao.localeCompare(b.descricao));
});

// Peças disponíveis ordenadas alfabeticamente
const pecasDisponiveisOrdenadas = computed(() => {
  return pecasDisponiveis.value.sort((a, b) => a.nome.localeCompare(b.nome));
});

const getVeiculoInfo = (veiculoId: number) => {
  const veiculo = veiculos.value.find(v => v.id === veiculoId);
  return veiculo ? `${veiculo.modelo} - ${veiculo.placa}` : 'Veículo não encontrado';
};

const formatarData = (data: Date | string) => {
  if (!data) return '';

  try {
    // Ajusta para o fuso horário local
    let dataObj: Date;

    if (typeof data === 'string') {
      // Se for uma data no formato YYYY-MM-DD, adiciona o horário para evitar problemas de fuso horário
      if (/^\d{4}-\d{2}-\d{2}$/.test(data)) {
        // Adiciona T12:00:00 para garantir que a data não mude com o fuso horário
        dataObj = new Date(`${data}T12:00:00`);
      } else {
        dataObj = new Date(data);
      }
    } else {
      dataObj = data;
    }

    if (isNaN(dataObj.getTime())) return '';

    // Formata a data no padrão brasileiro (dia/mês/ano)
    return dataObj.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Erro ao formatar data:', error, data);
    return '';
  }
};

const formatarMoeda = (valor: number) => {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

const formatarStatus = (status: string) => {
  const statusMap: Record<string, string> = {
    aberta: 'Aberta',
    em_andamento: 'Em Andamento',
    concluida: 'Concluída',
    cancelada: 'Cancelada'
  };
  return statusMap[status] || status;
};

const getDescricaoItem = (item: ItemOrdemServico) => {
  if (item.tipo === 'servico') {
    const servico = servicos.value.find(s => s.id === item.itemId);
    return servico ? servico.descricao : 'Serviço não encontrado';
  } else {
    const peca = pecas.value.find(p => p.id === item.itemId);
    return peca ? peca.nome : 'Peça não encontrada';
  }
};

const calcularTotal = () => {
  return osEmEdicao.value.itens.reduce((total, item) => total + item.subtotal, 0);
};

const carregarDados = async () => {
  try {
    console.log('Carregando dados das ordens de serviço...');
    const [ordensData, veiculosData, servicosData, pecasData, clientesData] = await Promise.all([
      db.getOrdensServico(),
      db.getVeiculos(),
      db.getServicos(),
      db.getPecas(),
      db.getClientes()
    ]);

    // Atualiza os dados com novas referências para garantir reatividade
    ordens.value = [...ordensData];
    veiculos.value = [...veiculosData];
    servicos.value = [...servicosData];
    pecas.value = [...pecasData];
    clientes.value = [...clientesData];

    // Forçar atualização da interface após as mudanças de dados
    await nextTick();

    console.log('Dados carregados com sucesso:', ordens.value.length, 'ordens de serviço');
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    mensagem.value = {
      texto: 'Erro ao carregar dados',
      tipo: 'erro'
    };
  }
};

const limparFormulario = () => {
  osEmEdicao.value = {
    veiculoId: 0,
    numero: '',
    dataAbertura: new Date().toISOString().split('T')[0],
    status: 'aberta',
    valorTotal: 0,
    itens: []
  };
  tentouSalvar.value = false;
};

const fecharModal = () => {
  showModal.value = false;
  limparFormulario();
};

const editarOS = (os: OrdemServico) => {
  if (!os || !os.id) {
    mensagem.value = {
      texto: 'Erro: OS inválida para edição',
      tipo: 'erro'
    };
    return;
  }

  try {
    console.log('Editando OS com data de abertura original:', os.dataAbertura);

    // Tratamento da data de abertura
    let dataAberturaFormatada: string;

    if (typeof os.dataAbertura === 'string') {
      // Se já for uma string, verifica se está no formato YYYY-MM-DD
      if (/^\d{4}-\d{2}-\d{2}$/.test(os.dataAbertura)) {
        // Se estiver no formato correto, mantém como está
        dataAberturaFormatada = os.dataAbertura;
      } else {
        // Se não estiver no formato esperado, tenta converter
        const dataObj = new Date(os.dataAbertura);
        if (!isNaN(dataObj.getTime())) {
          // Usa o método para ajustar o fuso horário
          dataAberturaFormatada = ajustarDataParaLocal(dataObj);
        } else {
          // Se não conseguir converter, usa a string original
          dataAberturaFormatada = os.dataAbertura;
        }
      }
    } else if (os.dataAbertura instanceof Date) {
      // Se for um objeto Date, converte para string no formato YYYY-MM-DD ajustando o fuso horário
      dataAberturaFormatada = ajustarDataParaLocal(os.dataAbertura);
    } else {
      // Caso não tenha data válida, usa a data atual
      dataAberturaFormatada = ajustarDataParaLocal(new Date());
    }

    console.log('Data de abertura formatada para edição:', dataAberturaFormatada);

    // Cria uma cópia da OS para edição
    osEmEdicao.value = {
      ...os,
      dataAbertura: dataAberturaFormatada
    };

    showModal.value = true;
    tentouSalvar.value = false;
  } catch (error) {
    console.error('Erro ao preparar OS para edição:', error);
    mensagem.value = {
      texto: 'Erro ao preparar OS para edição',
      tipo: 'erro'
    };
  }
};

const atualizarStatus = async (os: OrdemServico) => {
  if (!os.id) {
    mensagem.value = {
      texto: 'Erro: OS inválida para atualização de status',
      tipo: 'erro'
    };
    return;
  }

  const statusMap = {
    'aberta': 'em_andamento',
    'em_andamento': 'concluida',
    'concluida': 'aberta'
  } as const;

  try {
    isLoading.value = true;
    console.log('Atualizando status da OS:', os.id, 'de', os.status, 'para', statusMap[os.status as keyof typeof statusMap]);

    const novoStatus = statusMap[os.status as keyof typeof statusMap];
    if (!novoStatus) {
      mensagem.value = {
        texto: 'Status inválido para atualização',
        tipo: 'erro'
      };
      return;
    }

    // Garantir que a data de abertura está no formato correto
    let dataAbertura = os.dataAbertura;
    if (typeof dataAbertura === 'string') {
      // Verifica se está no formato YYYY-MM-DD
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dataAbertura)) {
        // Se não estiver no formato esperado, tenta converter
        const data = new Date(dataAbertura);
        if (!isNaN(data.getTime())) {
          dataAbertura = ajustarDataParaLocal(data);
        }
      }
      // Se já estiver no formato correto, mantém como está
    } else if (dataAbertura instanceof Date) {
      dataAbertura = ajustarDataParaLocal(dataAbertura);
    } else {
      // Se não tiver data válida, usa a data atual
      dataAbertura = ajustarDataParaLocal(new Date());
    }

    // Criar uma cópia da OS com o novo status
    const osAtualizada = {
      ...os,
      dataAbertura: dataAbertura,
      status: novoStatus,
      dataFechamento: novoStatus === 'concluida' ? new Date().toISOString() : undefined
    };

    console.log('OS atualizada para salvar:', osAtualizada);
    await db.updateOrdemServico(osAtualizada);

    // Atualizar a lista de ordens localmente
    const index = ordens.value.findIndex(o => o.id === os.id);
    if (index !== -1) {
      ordens.value[index] = { ...osAtualizada };
      // Forçar reatividade criando uma nova referência para o array
      ordens.value = [...ordens.value];
    }

    mensagem.value = {
      texto: 'Status atualizado com sucesso!',
      tipo: 'sucesso'
    };
  } catch (error) {
    console.error('Erro ao atualizar status da OS:', error);
    mensagem.value = {
      texto: error instanceof Error ? error.message : 'Erro ao atualizar status',
      tipo: 'erro'
    };
  } finally {
    isLoading.value = false;
  }
};

const excluirOS = async (id?: number) => {
  if (!id) return;

  if (!confirm('Tem certeza que deseja excluir esta ordem de serviço?')) return;
  try {
    await db.deleteOrdemServico(id);
    mensagem.value = {
      texto: 'Ordem de serviço excluída com sucesso!',
      tipo: 'sucesso'
    };
    // Recarrega os dados após a mensagem
    await carregarDados();
  } catch (error) {
    mensagem.value = {
      texto: error instanceof Error ? error.message : 'Erro ao excluir a ordem de serviço',
      tipo: 'erro'
    };
  }
};

const salvarOS = async () => {
  tentouSalvar.value = true;

  if (!osEmEdicao.value.veiculoId || !osEmEdicao.value.dataAbertura) {
    mensagem.value = {
      texto: 'Por favor, preencha todos os campos obrigatórios',
      tipo: 'erro'
    };
    return;
  }

  if (osEmEdicao.value.itens.length === 0) {
    mensagem.value = {
      texto: 'Adicione pelo menos um item à ordem de serviço',
      tipo: 'erro'
    };
    return;
  }

  try {
    isLoading.value = true;
    console.log('Salvando OS com data de abertura:', osEmEdicao.value.dataAbertura);

    // Garantir que a data está no formato correto
    if (typeof osEmEdicao.value.dataAbertura === 'string') {
      // Se for uma string no formato YYYY-MM-DD, mantém assim
      if (!/^\d{4}-\d{2}-\d{2}$/.test(osEmEdicao.value.dataAbertura)) {
        // Se não estiver no formato esperado, converte
        const data = new Date(osEmEdicao.value.dataAbertura);
        if (!isNaN(data.getTime())) {
          osEmEdicao.value.dataAbertura = ajustarDataParaLocal(data);
        }
      }
    } else if (osEmEdicao.value.dataAbertura instanceof Date) {
      // Se for um objeto Date, converte para string no formato YYYY-MM-DD
      osEmEdicao.value.dataAbertura = ajustarDataParaLocal(osEmEdicao.value.dataAbertura);
    }

    // Calcular valor total
    osEmEdicao.value.valorTotal = calcularTotal();

    // Criar uma cópia da OS para salvar
    const osSalvar = {
      ...osEmEdicao.value,
      dataAbertura: osEmEdicao.value.dataAbertura
    };

    console.log('OS preparada para salvar:', osSalvar);

    // Obter a OS original se for uma atualização
    let osOriginal: OrdemServico | null = null;
    if (osEmEdicao.value.id) {
      osOriginal = ordens.value.find(o => o.id === osEmEdicao.value.id) || null;
    }

    // Atualizar o estoque de peças
    const atualizacoesEstoque: Promise<any>[] = [];

    // Para cada peça na OS
    for (const item of osEmEdicao.value.itens) {
      if (item.tipo === 'peca' && item.itemId) {
        const peca = pecas.value.find(p => p.id === item.itemId);
        if (peca) {
          let quantidadeAjuste = item.quantidade;

          // Se for uma atualização, calcular a diferença de quantidade
          if (osOriginal) {
            const itemOriginal = osOriginal.itens.find(
              i => i.tipo === 'peca' && i.itemId === item.itemId
            );
            if (itemOriginal) {
              quantidadeAjuste = item.quantidade - itemOriginal.quantidade;
            }
          }

          console.log(`Peça ${peca.nome} (ID: ${peca.id}): Estoque atual=${peca.quantidadeEstoque}, Ajuste=${quantidadeAjuste}`);

          // Só atualiza o estoque se houver mudança na quantidade
          if (quantidadeAjuste !== 0) {
            // Verificar se há estoque suficiente quando estamos AUMENTANDO a quantidade (ajuste positivo)
            if (quantidadeAjuste > 0 && peca.quantidadeEstoque < quantidadeAjuste) {
              throw new Error(`Estoque insuficiente para a peça ${peca.nome}. Disponível: ${peca.quantidadeEstoque}, Necessário: ${quantidadeAjuste}`);
            }

            // Criar uma cópia da peça com o estoque atualizado
            const novoEstoque = peca.quantidadeEstoque - quantidadeAjuste;
            console.log(`Atualizando estoque da peça ${peca.nome}: ${peca.quantidadeEstoque} -> ${novoEstoque} (ajuste: ${quantidadeAjuste})`);

            const pecaAtualizada = {
              ...peca,
              quantidadeEstoque: novoEstoque
            };

            // Atualizar o status da peça com base no novo estoque
            pecaAtualizada.status = atualizarStatusPeca(pecaAtualizada);

            // Adicionar à lista de atualizações
            const promiseUpdate = db.updatePeca(pecaAtualizada).then(() => {
              console.log(`Peça ${pecaAtualizada.nome} atualizada com sucesso. Novo estoque: ${pecaAtualizada.quantidadeEstoque}`);
              
              // Atualizar a peça na lista local
              const index = pecas.value.findIndex(p => p.id === peca.id);
              if (index !== -1) {
                pecas.value[index] = { ...pecaAtualizada };
              }
            }).catch(error => {
              console.error(`Erro ao atualizar peça ${pecaAtualizada.nome}:`, error);
              throw error;
            });

            atualizacoesEstoque.push(promiseUpdate);
          }
        }
      }
    }

    // Salvar a OS e atualizar o estoque das peças
    try {
      console.log(`Iniciando atualização de ${atualizacoesEstoque.length} peças no estoque`);

      if (osEmEdicao.value.id) {
        // Primeiro atualiza o estoque das peças
        if (atualizacoesEstoque.length > 0) {
          console.log('Atualizando estoque das peças...');
          await Promise.all(atualizacoesEstoque);
          console.log('Estoque atualizado com sucesso!');
          // Forçar reatividade das peças
          pecas.value = [...pecas.value];
        }

        // Depois atualiza a ordem de serviço
        console.log('Atualizando ordem de serviço...');
        await db.updateOrdemServico(osSalvar);

        // Atualizar a lista de ordens localmente
        const index = ordens.value.findIndex(o => o.id === osEmEdicao.value.id);
        if (index !== -1) {
          ordens.value[index] = { ...osSalvar };
          // Forçar reatividade criando uma nova referência para o array
          ordens.value = [...ordens.value];
        }

        console.log('Ordem de serviço atualizada com sucesso!');
        fecharModal();
        mensagem.value = {
          texto: 'Ordem de serviço atualizada com sucesso!',
          tipo: 'sucesso'
        };
      } else {
        // Primeiro cria a ordem de serviço
        console.log('Criando nova ordem de serviço...');
        const novaOSId = await db.addOrdemServico(osSalvar);

        // Adicionar a nova OS à lista local
        const novaOS = {
          ...osSalvar,
          id: novaOSId
        };
        ordens.value.push(novaOS);
        
        // Depois atualiza o estoque das peças
        if (atualizacoesEstoque.length > 0) {
          console.log('Atualizando estoque das peças...');
          await Promise.all(atualizacoesEstoque);
          console.log('Estoque atualizado com sucesso!');
          // Forçar reatividade das peças
          pecas.value = [...pecas.value];
        }

        // Forçar reatividade criando uma nova referência para o array de ordens
        ordens.value = [...ordens.value];

        console.log('Ordem de serviço criada com sucesso!');
        fecharModal();
        mensagem.value = {
          texto: 'Ordem de serviço criada com sucesso!',
          tipo: 'sucesso'
        };
      }
    } catch (error) {
      console.error('Erro ao salvar OS ou atualizar estoque:', error);
      throw error;
    }
  } catch (error) {
    console.error('Erro ao salvar OS:', error);
    mensagem.value = {
      texto: error instanceof Error ? error.message : 'Erro ao salvar a ordem de serviço',
      tipo: 'erro'
    };
  } finally {
    isLoading.value = false;
  }
};

const removerItem = (index: number) => {
  osEmEdicao.value.itens.splice(index, 1);
};

const adicionarServico = () => {
  if (!servicoSelecionado.value) return;

  osEmEdicao.value.itens.push({
    tipo: 'servico',
    itemId: servicoSelecionado.value.id!,
    quantidade: 1,
    valorUnitario: servicoSelecionado.value.valor,
    subtotal: servicoSelecionado.value.valor,
    ordemServicoId: osEmEdicao.value.id || 0
  });

  showModalServico.value = false;
  servicoSelecionado.value = null;
};

const adicionarPeca = () => {
  if (!pecaSelecionada.value || !quantidadePeca.value) return;

  if (quantidadePeca.value > pecaSelecionada.value.quantidadeEstoque) {
    mensagem.value = {
      texto: 'Quantidade solicitada maior que o estoque disponível',
      tipo: 'erro'
    };
    return;
  }

  // Verificar se a peça já existe na OS
  const pecaExistente = osEmEdicao.value.itens.findIndex(item =>
    item.tipo === 'peca' && pecaSelecionada.value && item.itemId === pecaSelecionada.value.id
  );

  if (pecaExistente !== -1) {
    // Se a peça já existe, atualiza a quantidade e o subtotal
    const item = osEmEdicao.value.itens[pecaExistente];
    const novaQuantidade = item.quantidade + quantidadePeca.value;

    // Verificar se a nova quantidade total excede o estoque
    if (novaQuantidade > pecaSelecionada.value.quantidadeEstoque) {
      mensagem.value = {
        texto: `Quantidade total (${novaQuantidade}) excede o estoque disponível (${pecaSelecionada.value.quantidadeEstoque})`,
        tipo: 'erro'
      };
      return;
    }

    // Atualizar o item existente
    osEmEdicao.value.itens[pecaExistente] = {
      ...item,
      quantidade: novaQuantidade,
      subtotal: pecaSelecionada.value.precoUnitario * novaQuantidade
    };

    console.log(`Peça existente atualizada: ID ${pecaSelecionada.value.id}, Nova quantidade: ${novaQuantidade}`);
  } else {
    // Se a peça não existe, adiciona como novo item
    osEmEdicao.value.itens.push({
      tipo: 'peca',
      itemId: pecaSelecionada.value.id!,
      quantidade: quantidadePeca.value,
      valorUnitario: pecaSelecionada.value.precoUnitario,
      subtotal: pecaSelecionada.value.precoUnitario * quantidadePeca.value,
      ordemServicoId: osEmEdicao.value.id || 0
    });

    console.log(`Nova peça adicionada: ID ${pecaSelecionada.value.id}, Quantidade: ${quantidadePeca.value}`);
  }

  showModalPeca.value = false;
  pecaSelecionada.value = null;
  quantidadePeca.value = 1;
};

// Função auxiliar para ajustar datas considerando o fuso horário
const ajustarDataParaLocal = (data: Date): string => {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
};

// Função para atualizar o status da peça com base no estoque
const atualizarStatusPeca = (peca: Peca): StatusPeca => {
  // Verifica se a quantidade em estoque é válida
  const quantidadeEstoque = Number(peca.quantidadeEstoque);
  const estoqueMinimo = Number(peca.estoqueMinimo);

  // Se não houver estoque ou for inválido, marca como indisponível
  if (!quantidadeEstoque || quantidadeEstoque <= 0 || isNaN(quantidadeEstoque)) {
    return 'indisponivel';
  }

  // Se o estoque estiver abaixo ou igual ao mínimo, marca como baixo estoque
  if (estoqueMinimo >= 0 && quantidadeEstoque <= estoqueMinimo) {
    return 'baixo_estoque';
  }

  // Se passar por todas as validações, marca como disponível
  return 'disponivel';
};

const getClienteDoVeiculo = (veiculoId: number) => {
  const veiculo = veiculos.value.find(v => v.id === veiculoId);
  if (!veiculo) return 'Cliente não encontrado';
  
  const cliente = clientes.value.find(c => c.id === veiculo.clienteId);
  return cliente ? cliente.nome : 'Cliente não encontrado';
};

const imprimirOS = () => {
  if (!osEmEdicao.value.id) {
    mensagem.value = {
      texto: 'Salve a OS antes de imprimir',
      tipo: 'erro'
    };
    return;
  }

  // Adiciona a classe de impressão ao body
  document.body.classList.add('printing');
  
  // Pequeno delay para garantir que os estilos sejam aplicados
  setTimeout(() => {
    window.print();
    
    // Remove a classe após a impressão
    setTimeout(() => {
      document.body.classList.remove('printing');
    }, 100);
  }, 100);
};

const compartilharOS = async () => {
  if (!osEmEdicao.value.id) {
    mensagem.value = {
      texto: 'Salve a OS antes de compartilhar',
      tipo: 'erro'
    };
    return;
  }

  const textoCompartilhamento = `
🔧 ORDEM DE SERVIÇO #${osEmEdicao.value.numero}

📅 Data: ${formatarData(osEmEdicao.value.dataAbertura)}
🚗 Veículo: ${getVeiculoInfo(osEmEdicao.value.veiculoId)}
👤 Cliente: ${getClienteDoVeiculo(osEmEdicao.value.veiculoId)}
📊 Status: ${formatarStatus(osEmEdicao.value.status)}

💰 Valor Total: ${formatarMoeda(calcularTotal())}

📝 Itens:
${osEmEdicao.value.itens.map((item, index) => 
  `${index + 1}. ${getDescricaoItem(item)} - Qtd: ${item.quantidade} - ${formatarMoeda(item.subtotal)}`
).join('\n')}

${osEmEdicao.value.observacoes ? `\n📋 Observações: ${osEmEdicao.value.observacoes}` : ''}
  `.trim();

  try {
    if (navigator.share) {
      // Usar Web Share API se disponível (principalmente mobile)
      await navigator.share({
        title: `Ordem de Serviço #${osEmEdicao.value.numero}`,
        text: textoCompartilhamento
      });
    } else {
      // Fallback: copiar para clipboard
      await navigator.clipboard.writeText(textoCompartilhamento);
      mensagem.value = {
        texto: 'Dados da OS copiados para a área de transferência!',
        tipo: 'sucesso'
      };
    }
  } catch (error) {
    console.error('Erro ao compartilhar:', error);
    
    // Fallback final: criar elemento temporário para copiar
    try {
      const textArea = document.createElement('textarea');
      textArea.value = textoCompartilhamento;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      mensagem.value = {
        texto: 'Dados da OS copiados para a área de transferência!',
        tipo: 'sucesso'
      };
    } catch (fallbackError) {
      mensagem.value = {
        texto: 'Erro ao compartilhar os dados da OS',
        tipo: 'erro'
      };
    }
  }
};

onMounted(() => {
  carregarDados();
});
</script>

<style scoped>
/* Estilos específicos para impressão */
@media print {
  /* Ocultar elementos que não devem aparecer na impressão */
  .no-print {
    display: none !important;
  }
  
  /* Mostrar apenas elementos de impressão */
  .print-only {
    display: block !important;
  }
  
  /* Configurações gerais de impressão */
  /* * {
    -webkit-print-color-adjust: exact !important;
    color-adjust: exact !important;
  } */
  
  /* Ocultar tudo exceto o conteúdo da modal quando em modo de impressão */
  body.printing * {
    visibility: hidden;
  }
  
  body.printing #os-modal-content,
  body.printing #os-modal-content * {
    visibility: visible;
  }
  
  body.printing #os-modal-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: auto;
    background: white;
    box-shadow: none;
    border-radius: 0;
    margin: 0;
    padding: 20px;
  }
  
  /* Configurações de página */
  @page {
    margin: 15mm;
    size: A4;
  }
  
  /* Garantir quebras de página adequadas */
  .page-break {
    page-break-before: always;
  }
  
  /* Estilos para tabelas em impressão */
  table {
    border-collapse: collapse;
    width: 100%;
  }
  
  table, th, td {
    border: 1px solid #000;
  }
  
  th, td {
    padding: 8px;
    text-align: left;
  }
  
  /* Estilos para cabeçalhos */
  h1, h2, h3 {
    color: #000;
  }
  
  /* Garantir que o conteúdo não seja cortado */
  .overflow-x-auto,
  .overflow-y-auto {
    overflow: visible !important;
    max-height: none !important;
  }
}

/* Ocultar elementos de impressão por padrão */
.print-only {
  display: none;
}
</style>

<template>
  <div class="space-y-8">
    <!-- ========== SEÇÃO PRIVACIDADE ========== -->
    <!--<section class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-1">
      <div class="bg-white rounded-lg p-4">
        <button 
          @click="mostrarPrivacidade = !mostrarPrivacidade" 
          class="w-full flex items-center justify-between text-sm text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-4 py-3 rounded-lg transition-all duration-200 hover:shadow-sm"
        >
          <div class="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span class="font-medium">{{ mostrarPrivacidade ? 'Ocultar' : 'Ver' }} informações de privacidade</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-200" :class="{ 'rotate-180': mostrarPrivacidade }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

         Painel de Privacidade Expansível 
        <div v-show="mostrarPrivacidade" class="mt-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 transition-all duration-300">
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0 p-2 bg-blue-600 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-blue-900 mb-3">Privacidade e Segurança dos Dados</h3>
              <div class="text-blue-800">
                <p class="mb-4 text-base">
                  <strong class="text-blue-900">🔒 Todos os seus dados ficam no seu computador!</strong> Este sistema funciona 100% offline:
                </p>
                <div class="grid md:grid-cols-2 gap-3">
                  <ul class="space-y-2">
                    <li class="flex items-center space-x-2">
                      <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>Nenhuma informação é enviada para a internet</span>
                    </li>
                    <li class="flex items-center space-x-2">
                      <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>Dados armazenados localmente no navegador (IndexedDB)</span>
                    </li>
                  </ul>
                  <ul class="space-y-2">
                    <li class="flex items-center space-x-2">
                      <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>Você tem controle total sobre backup e restauração</span>
                    </li>
                    <li class="flex items-center space-x-2">
                      <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>Funciona sem conexão com a internet</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> 
    -->

    <!-- ========== SEÇÃO GERENCIAMENTO DE DADOS ========== -->
    <section class="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-1">
      <div class="bg-white rounded-lg p-4">
        <button 
          @click="mostrarGerenciamentoDados = !mostrarGerenciamentoDados" 
          class="w-full flex items-center justify-between text-sm text-gray-600 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 px-4 py-3 rounded-lg transition-all duration-200 hover:shadow-sm"
        >
          <div class="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
            </svg>
            <span class="font-medium">{{ mostrarGerenciamentoDados ? 'Ocultar' : 'Ver' }} gerenciamento de dados</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-200" :class="{ 'rotate-180': mostrarGerenciamentoDados }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Painel de Gerenciamento Expansível -->
        <div v-show="mostrarGerenciamentoDados" class="mt-4 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6 transition-all duration-300">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-900 flex items-center">
              <div class="p-2 bg-gray-100 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              Gerenciamento de Dados
            </h2>
          </div>
          
          <div class="flex flex-wrap gap-3">
            <!--<a 
              href="https://fvandrad.github.io/oficina-mecanica-azul-www/backup-oficina-demo.json" 
              download
              class="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-3 px-5 rounded-lg shadow-sm flex items-center space-x-2 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span>Exemplo DB</span>
            </a> -->
            
            <button 
              @click="exportarDB"
              class="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium py-3 px-5 rounded-lg shadow-sm flex items-center space-x-2 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span>Exportar</span>
            </button>
            
            <button 
              @click="importarDBClick"
              class="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-5 rounded-lg shadow-sm flex items-center space-x-2 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Importar</span>
            </button>
            
            <input type="file" ref="fileInput" accept=".json" class="hidden" @change="importarDB" />
            
            <button 
              @click="resetDB"
              class="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-3 px-5 rounded-lg shadow-sm flex items-center space-x-2 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Resetar</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== MENSAGENS DE NOTIFICAÇÃO ========== -->
    <div v-if="mensagem" class="animate-in slide-in-from-top-2 duration-300">
      <div 
        :class="`p-4 rounded-lg shadow-sm border flex items-center space-x-3 ${mensagem.tipo === 'sucesso' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'}`"
      >
        <div class="flex-shrink-0">
          <svg v-if="mensagem.tipo === 'sucesso'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span class="font-medium">{{ mensagem.texto }}</span>
      </div>
    </div>

    <!-- ========== CARDS DE ESTATÍSTICAS ========== -->
    <section>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-900">📊 Visão Geral</h2>
        <div class="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
          Atualizado em tempo real
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Card Total de Ordens -->
        <div class="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div class="flex items-center justify-between mb-4">
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Total de OS</p>
              <p class="text-3xl font-bold text-gray-900">{{ totalOrdens }}</p>
            </div>
            <div class="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div>
            <p class="text-sm text-gray-600 mb-2">{{ ordensAbertas }} ordens abertas</p>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500" :style="{ width: `${totalOrdens > 0 ? (ordensAbertas / totalOrdens) * 100 : 0}%` }"></div>
            </div>
          </div>
        </div>

        <!-- Card Total de Clientes -->
        <div class="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div class="flex items-center justify-between mb-4">
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Clientes</p>
              <p class="text-3xl font-bold text-gray-900">{{ totalClientes }}</p>
            </div>
            <div class="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div>
            <p class="text-sm text-gray-600 mb-2">{{ clientesComVeiculos }} com veículos</p>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500" :style="{ width: `${totalClientes > 0 ? (clientesComVeiculos / totalClientes) * 100 : 0}%` }"></div>
            </div>
          </div>
        </div>

        <!-- Card Total de Serviços -->
        <div class="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div class="flex items-center justify-between mb-4">
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Serviços</p>
              <p class="text-3xl font-bold text-gray-900">{{ totalServicos }}</p>
            </div>
            <div class="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          <div>
            <p class="text-sm text-gray-600 mb-2">{{ servicosConcluidos }} concluídos</p>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500" :style="{ width: `${totalServicos > 0 ? (servicosConcluidos / totalServicos) * 100 : 0}%` }"></div>
            </div>
          </div>
        </div>

        <!-- Card Peças -->
        <div class="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div class="flex items-center justify-between mb-4">
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Peças</p>
              <p class="text-3xl font-bold text-gray-900">{{ totalPecas }}</p>
            </div>
            <div class="p-3 bg-red-100 rounded-xl group-hover:bg-red-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              </div>
          </div>
          <div>
            <p class="text-sm text-gray-600 mb-2">{{ pecasBaixoEstoque }} com estoque baixo</p>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-500" :style="{ width: `${totalPecas > 0 ? (pecasBaixoEstoque / totalPecas) * 100 : 0}%` }"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== DADOS DETALHADOS ========== -->
    <section>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">📈 Dados Detalhados</h2>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Ordens Recentes -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center">
              <div class="p-1 bg-blue-100 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              Ordens de Serviço Recentes
            </h3>
          </div>
          
          <div class="p-6">
            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead>
                  <tr class="bg-gray-50 border-b border-gray-200">
                    <th class="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nº</th>
                    <th class="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Veículo</th>
                    <th class="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Data</th>
                    <th class="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-100">
                  <tr v-for="ordem in ordensRecentes" :key="ordem.id" class="hover:bg-gray-50 transition-colors duration-150">
                    <td class="py-3 px-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ ordem.numero }}</td>
                    <td class="py-3 px-4 whitespace-nowrap text-sm text-gray-700">{{ getVeiculoInfo(ordem.veiculoId) }}</td>
                    <td class="py-3 px-4 whitespace-nowrap text-sm text-gray-700">{{ formatarData(ordem.dataAbertura) }}</td>
                    <td class="py-3 px-4 whitespace-nowrap">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border" :class="{
                        'bg-yellow-50 text-yellow-800 border-yellow-200': ordem.status === 'aberta',
                        'bg-blue-50 text-blue-800 border-blue-200': ordem.status === 'em_andamento',
                        'bg-green-50 text-green-800 border-green-200': ordem.status === 'concluida',
                        'bg-red-50 text-red-800 border-red-200': ordem.status === 'cancelada'
                      }">
                        {{ formatarStatus(ordem.status) }}
                      </span>
                    </td>
                  </tr>
                  <tr v-if="ordensRecentes.length === 0">
                    <td colspan="4" class="py-12 text-center">
                      <div class="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <p class="text-sm text-gray-500 font-medium">Nenhuma ordem recente</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div class="mt-6 pt-4 border-t border-gray-100">
              <button @click="navegarParaOrdensServico" class="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors group">
                Ver todas as ordens 
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Faturamento Total -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center">
              <div class="p-1 bg-green-100 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              Faturamento Total
            </h3>
          </div>
          
          <div class="p-6">
            <div class="h-64 flex flex-col items-center justify-center">
              <div v-if="!dadosCarregados" class="text-center">
                <svg class="animate-spin h-10 w-10 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p class="text-sm text-gray-600 font-medium">Carregando dados...</p>
              </div>
              
              <div v-else-if="ordensServico.length === 0" class="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-gray-500 font-medium">Sem dados de faturamento disponíveis</p>
              </div>
              
              <div v-else class="text-center">
                <div class="p-4 bg-green-100 rounded-full mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-green-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="text-4xl font-bold text-gray-900 mb-3">{{ formatarMoeda(totalFaturamento) }}</div>
                <p class="text-sm text-gray-600 font-medium mb-1">Valor total de ordens concluídas</p>
                <p class="text-xs text-gray-500">Total de {{ ordensConcluidas.length }} ordens finalizadas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== GESTÃO E ALERTAS ========== -->
    <section>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">⚠️ Gestão e Alertas</h2>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Peças com Estoque Baixo -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="px-6 py-4 bg-gradient-to-r from-red-50 to-orange-50 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center">
              <div class="p-1 bg-red-100 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" />
                </svg>
              </div>
              Peças com Estoque Baixo
            </h3>
          </div>
          
          <div class="p-6">
            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead>
                  <tr class="bg-gray-50 border-b border-gray-200">
                    <th class="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Código</th>
                    <th class="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nome</th>
                    <th class="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estoque</th>
                    <th class="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Mínimo</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-100">
                  <tr v-for="peca in pecasComEstoqueBaixo" :key="peca.id" class="hover:bg-gray-50 transition-colors duration-150">
                    <td class="py-3 px-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ peca.codigo }}</td>
                    <td class="py-3 px-4 whitespace-nowrap text-sm text-gray-700">{{ peca.nome }}</td>
                    <td class="py-3 px-4 whitespace-nowrap text-sm font-medium" :class="{ 'text-red-600': peca.quantidadeEstoque === 0, 'text-gray-900': peca.quantidadeEstoque > 0 }">
                      {{ peca.quantidadeEstoque }}
                    </td>
                    <td class="py-3 px-4 whitespace-nowrap text-sm text-gray-700">{{ peca.estoqueMinimo }}</td>
                  </tr>
                  <tr v-if="pecasComEstoqueBaixo.length === 0">
                    <td colspan="4" class="py-12 text-center">
                      <div class="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p class="text-sm text-gray-500 font-medium">Nenhuma peça com estoque baixo</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div class="mt-6 pt-4 border-t border-gray-100">
              <button @click="navegarParaPecas" class="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors group">
                Gerenciar estoque 
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Tarefas e Alertas -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="px-6 py-4 bg-gradient-to-r from-yellow-50 to-amber-50 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center">
              <div class="p-1 bg-yellow-100 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              Tarefas e Alertas
            </h3>
          </div>
          
          <div class="p-6">
            <div class="space-y-4 max-h-80 overflow-y-auto">
              <div v-if="alertas.length === 0" class="text-center py-12">
                <div class="p-4 bg-green-100 rounded-full w-fit mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p class="text-gray-700 font-medium mb-1">Nenhum alerta no momento</p>
                <p class="text-sm text-gray-500">Tudo funcionando perfeitamente! ✨</p>
              </div>

              <div v-for="(alerta, index) in alertas" :key="index" class="flex items-start p-4 rounded-xl border transition-all hover:shadow-sm" :class="getTipoAlertaClass(alerta.tipo)">
                <div class="flex-shrink-0 p-2 rounded-lg mr-4" :class="{
                  'bg-blue-100': alerta.tipo === 'info',
                  'bg-yellow-100': alerta.tipo === 'aviso',
                  'bg-red-100': alerta.tipo === 'urgente'
                }">
                  <svg v-if="alerta.tipo === 'info'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg v-else-if="alerta.tipo === 'aviso'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <svg v-else-if="alerta.tipo === 'urgente'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h4 class="text-sm font-semibold" :class="getTextColorClass(alerta.tipo)">{{ alerta.titulo }}</h4>
                  <p class="mt-1 text-sm" :class="getTextColorClass(alerta.tipo)">{{ alerta.mensagem }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineEmits, nextTick } from 'vue';
import { db, type OrdemServico, type Cliente, type Veiculo, type Servico, type Peca } from '../services/db';

const emit = defineEmits(['mudar-tab']);

// Estados
const ordensServico = ref<OrdemServico[]>([]);
const clientes = ref<Cliente[]>([]);
const veiculos = ref<Veiculo[]>([]);
const servicos = ref<Servico[]>([]);
const pecas = ref<Peca[]>([]);
const dadosCarregados = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const mostrarPrivacidade = ref(false);
const mostrarGerenciamentoDados = ref(false);

// Navegação
const navegarParaOrdensServico = () => {
  emit('mudar-tab', 'ordens');
};

const navegarParaPecas = () => {
  emit('mudar-tab', 'pecas');
};

// Totais
const totalOrdens = computed(() => ordensServico.value.length);
const totalClientes = computed(() => clientes.value.length);
const totalServicos = computed(() => servicos.value.length);
const totalPecas = computed(() => pecas.value.length);

// Cálculos
const ordensAbertas = computed(() =>
  ordensServico.value.filter(os => os.status === 'aberta' || os.status === 'em_andamento').length
);

const clientesComVeiculos = computed(() => {
  const clientesIds = new Set(veiculos.value.map(v => v.clienteId));
  return clientesIds.size;
});

const servicosConcluidos = computed(() =>
  servicos.value.filter(s => s.status === 'concluido').length
);

const pecasBaixoEstoque = computed(() =>
  pecas.value.filter(p => p.status === 'baixo_estoque' || p.status === 'indisponivel').length
);

// Ordens recentes - últimas 5
const ordensRecentes = computed(() => {
  return [...ordensServico.value]
    .sort((a, b) => {
      const dataA = new Date(a.dataAbertura).getTime();
      const dataB = new Date(b.dataAbertura).getTime();
      return dataB - dataA; // Ordem decrescente por data
    })
    .slice(0, 5);
});

// Peças com estoque baixo
const pecasComEstoqueBaixo = computed(() => {
  return pecas.value
    .filter(p => p.quantidadeEstoque <= p.estoqueMinimo)
    .sort((a, b) => a.quantidadeEstoque - b.quantidadeEstoque) // Ordem crescente por quantidade
    .slice(0, 5);
});

// Dados para o gráfico de faturamento (baseado em ordens concluídas)
const ordensConcluidas = computed(() =>
  ordensServico.value.filter(os => os.status === 'concluida')
);

// Simplificando o cálculo de faturamento total
const totalFaturamento = computed(() => {
  return ordensConcluidas.value
    .reduce((total, ordem) => total + (ordem.valorTotal || 0), 0);
});

// Alertas do sistema (dados reais)
const alertas = computed(() => {
  const listaAlertas = [];

  // Alerta de peças com estoque baixo
  if (pecasBaixoEstoque.value > 0) {
    listaAlertas.push({
      tipo: pecasBaixoEstoque.value > 5 ? 'urgente' : 'aviso',
      titulo: 'Estoque baixo',
      mensagem: `${pecasBaixoEstoque.value} peças com estoque abaixo do mínimo`
    });
  }

  // Alerta de ordens em atraso (dados reais)
  const hoje = new Date();
  // Definir o que é uma ordem em atraso: 
  // - Em aberto ou em andamento
  // - Aberta há mais de 7 dias
  const DIAS_LIMITE = 7; // Considera em atraso se aberta há mais de 7 dias
  const ordensEmAtraso = ordensServico.value.filter(os => {
    // Verificar apenas ordens abertas ou em andamento
    if (os.status !== 'aberta' && os.status !== 'em_andamento') return false;

    // Verificar se passou do prazo considerado (7 dias desde a abertura)
    const dataAbertura = new Date(os.dataAbertura);
    const diasEmAberto = Math.floor((hoje.getTime() - dataAbertura.getTime()) / (1000 * 60 * 60 * 24));

    return diasEmAberto > DIAS_LIMITE;
  });

  if (ordensEmAtraso.length > 0) {
    listaAlertas.push({
      tipo: 'urgente',
      titulo: 'Ordens em atraso',
      mensagem: `${ordensEmAtraso.length} ${ordensEmAtraso.length === 1 ? 'ordem' : 'ordens'} de serviço em atraso`
    });
  }

  // Outros alertas informativos
  if (ordensAbertas.value > 0) {
    listaAlertas.push({
      tipo: 'info',
      titulo: 'Ordens pendentes',
      mensagem: `${ordensAbertas.value} ordens aguardando processamento`
    });
  }

  return listaAlertas;
});

// Formatar
const formatarData = (data: string | Date) => {
  if (!data) return '';
  const dataObj = new Date(data);
  return dataObj.toLocaleDateString('pt-BR');
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

// Obter informações do veículo
const getVeiculoInfo = (veiculoId: number) => {
  const veiculo = veiculos.value.find(v => v.id === veiculoId);
  if (!veiculo) return 'Veículo não encontrado';
  return `${veiculo.modelo} (${veiculo.placa})`;
};

// Classes para os alertas
const getTipoAlertaClass = (tipo: string) => {
  switch (tipo) {
    case 'info': return 'bg-blue-50';
    case 'aviso': return 'bg-yellow-50';
    case 'urgente': return 'bg-red-50';
    default: return 'bg-gray-50';
  }
};

const getTextColorClass = (tipo: string) => {
  switch (tipo) {
    case 'info': return 'text-blue-800';
    case 'aviso': return 'text-yellow-800';
    case 'urgente': return 'text-red-800';
    default: return 'text-gray-800';
  }
};

// Carregamento dos dados
const carregarDados = async () => {
  try {
    const [ordensData, clientesData, veiculosData, servicosData, pecasData] = await Promise.all([
      db.getOrdensServico(),
      db.getClientes(),
      db.getVeiculos(),
      db.getServicos(),
      db.getPecas()
    ]);

    ordensServico.value = ordensData;
    clientes.value = clientesData;
    veiculos.value = veiculosData;
    servicos.value = servicosData;
    pecas.value = pecasData;

    dadosCarregados.value = true;
  } catch (error) {
    console.error('Erro ao carregar dados do dashboard:', error);
  }
};

onMounted(() => {
  carregarDados();
});

// Estado para mensagens
const mensagem = ref<{ texto: string; tipo: 'sucesso' | 'erro' } | null>(null);

// Função para resetar o banco de dados
const resetDB = async () => {
  if (!confirm('Tem certeza que deseja resetar o banco de dados?\nTodos os dados serão perdidos.')) return;
  try {
    await db.reset();
    mostrarMensagem('Banco de dados resetado com sucesso!', 'sucesso');
    await carregarDados();
    await nextTick(); // Aguardar a atualização do DOM após recarregar os dados
  } catch (error) {
    console.error('Erro ao resetar banco de dados:', error);
    mostrarMensagem('Erro ao resetar banco de dados', 'erro');
  }
};

// Função para exportar o banco de dados
const exportarDB = async () => {
  try {
    // Obter todos os dados
    const dados = {
      clientes: await db.getClientes(),
      veiculos: await db.getVeiculos(),
      servicos: await db.getServicos(),
      pecas: await db.getPecas(),
      ordensServico: await db.getOrdensServico(),
    };

    // Converter para JSON
    const jsonString = JSON.stringify(dados, null, 2);

    // Criar um objeto Blob com o JSON
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Criar URL para o objeto Blob
    const url = URL.createObjectURL(blob);

    // Criar um link para download e simular o clique
    const a = document.createElement('a');
    const dataHora = new Date().toISOString().replace(/[:.]/g, '-');
    a.href = url;
    a.download = `backup-oficina-${dataHora}.json`;
    document.body.appendChild(a);
    a.click();

    // Limpar
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    mostrarMensagem('Backup exportado com sucesso!', 'sucesso');
  } catch (error) {
    console.error('Erro ao exportar banco de dados:', error);
    mostrarMensagem('Erro ao exportar banco de dados', 'erro');
  }
};

// Trigger para o input de arquivo
const importarDBClick = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

// Função para importar o banco de dados
const importarDB = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;

  const file = input.files[0];
  if (!confirm(`Tem certeza que deseja importar o banco de dados do arquivo "${file.name}"? \nTodos os dados atuais serão substituídos.\nAguarde até o fim da importação.`)) {
    input.value = ''; // Limpar o input
    return;
  }

  try {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const conteudo = e.target?.result as string;
        const dados = JSON.parse(conteudo);

        // Validar a estrutura do arquivo
        if (!dados.clientes || !dados.veiculos || !dados.servicos || !dados.pecas || !dados.ordensServico) {
          throw new Error('Formato de arquivo inválido. O arquivo não contém todos os dados necessários.');
        }

        // Resetar o banco atual
        await db.reset();

        // Importar clientes
        for (const cliente of dados.clientes) {
          await db.addCliente(cliente);
        }

        // Importar veículos
        for (const veiculo of dados.veiculos) {
          await db.addVeiculo(veiculo);
        }

        // Importar serviços
        for (const servico of dados.servicos) {
          await db.addServico(servico);
        }

        // Importar peças
        for (const peca of dados.pecas) {
          await db.addPeca(peca);
        }

        // Importar ordens de serviço
        for (const ordem of dados.ordensServico) {
          await db.addOrdemServico(ordem);
        }

        // Recarregar dados
        await carregarDados();
        await nextTick(); // Aguardar a atualização do DOM após recarregar os dados

        mostrarMensagem('Banco de dados importado com sucesso!', 'sucesso');
      } catch (error) {
        console.error('Erro ao processar arquivo de backup:', error);
        mostrarMensagem(`Erro ao importar: ${error instanceof Error ? error.message : 'Arquivo inválido'}`, 'erro');
      }
    };

    reader.onerror = () => {
      mostrarMensagem('Erro ao ler o arquivo', 'erro');
    };

    reader.readAsText(file);
  } catch (error) {
    console.error('Erro ao importar banco de dados:', error);
    mostrarMensagem('Erro ao importar banco de dados', 'erro');
  } finally {
    input.value = ''; // Limpar o input
  }
};

// Função para exibir mensagens
const mostrarMensagem = (texto: string, tipo: 'sucesso' | 'erro') => {
  mensagem.value = { texto, tipo };
  setTimeout(() => {
    mensagem.value = null;
  }, 5000);
};
</script>

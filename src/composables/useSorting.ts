import { ref, computed } from 'vue';

export type SortOrder = 'asc' | 'desc' | null;

export interface SortConfig {
  field: string;
  order: SortOrder;
}

export function useSorting<T extends Record<string, any>>(defaultSortField?: string) {
  const sortConfig = ref<SortConfig>({
    field: defaultSortField || '',
    order: null
  });

  const setSorting = (field: string) => {
    if (sortConfig.value.field === field) {
      // Se clicar na mesma coluna, alterna a ordem
      if (sortConfig.value.order === 'asc') {
        sortConfig.value.order = 'desc';
      } else if (sortConfig.value.order === 'desc') {
        sortConfig.value.order = null;
        sortConfig.value.field = '';
      } else {
        sortConfig.value.order = 'asc';
      }
    } else {
      // Se clicar em uma nova coluna, inicia com ordem crescente
      sortConfig.value.field = field;
      sortConfig.value.order = 'asc';
    }
  };

  const sortedData = computed(() => {
    return (data: T[]) => {
      if (!sortConfig.value.field || !sortConfig.value.order) {
        return data;
      }

      return [...data].sort((a, b) => {
        const aValue = getNestedValue(a, sortConfig.value.field);
        const bValue = getNestedValue(b, sortConfig.value.field);

        let comparison = 0;

        // Tratamento para diferentes tipos de dados
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          comparison = aValue.toLowerCase().localeCompare(bValue.toLowerCase());
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          comparison = aValue - bValue;
        } else if (aValue instanceof Date && bValue instanceof Date) {
          comparison = aValue.getTime() - bValue.getTime();
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
          // Tentativa de comparar datas em string
          const dateA = new Date(aValue);
          const dateB = new Date(bValue);
          if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
            comparison = dateA.getTime() - dateB.getTime();
          } else {
            comparison = aValue.localeCompare(bValue);
          }
        } else {
          // Fallback para string
          comparison = String(aValue).localeCompare(String(bValue));
        }

        return sortConfig.value.order === 'desc' ? -comparison : comparison;
      });
    };
  });

  const getSortClass = (field: string) => {
    if (sortConfig.value.field !== field) {
      return 'cursor-pointer hover:bg-gray-100';
    }

    const baseClass = 'cursor-pointer hover:bg-gray-100';
    const activeClass = sortConfig.value.order === 'asc' ? 'bg-blue-50' : 'bg-blue-50';
    return `${baseClass} ${activeClass}`;
  };

  const getSortIcon = (field: string) => {
    if (sortConfig.value.field !== field || !sortConfig.value.order) {
      return '↕️';
    }
    return sortConfig.value.order === 'asc' ? '↑' : '↓';
  };

  // Função auxiliar para acessar propriedades aninhadas
  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  return {
    sortConfig,
    setSorting,
    sortedData,
    getSortClass,
    getSortIcon
  };
}

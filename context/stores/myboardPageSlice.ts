import { StateCreator } from 'zustand';
import { myboardPageState } from '@/lib/types/zustand';

export const createMyboardPageSlice: StateCreator<myboardPageState> = (set) => ({
  dashboardSearch: '',
  myboardTotalPage: 0,
  myboardPageNumber: 1,
  calcTotalPage: (totalDataNum) => set((state) => ({ ...state, myboardTotalPage: totalDataNum })),
  increasePage: (prev) => set((state) => ({ ...state, myboardPageNumber: ++prev })),
  decreasePage: (prev) => set((state) => ({ ...state, myboardPageNumber: --prev })),
  setDashboardSearch: (word) => set((state) => ({ ...state, dashboardSearch: word })),
});
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TixState {
  transportFilter: 'ALL' | 'BUS' | 'TRAIN' | 'PLANE';
  selectedOrigin: string | null;
  selectedDestination: string | null;
  travelDate: string | null;
  passengers: number;
  setTransportFilter: (filter: 'ALL' | 'BUS' | 'TRAIN' | 'PLANE') => void;
  setSearchParams: (
    origin: string,
    dest: string,
    date: string,
    passengers: number,
  ) => void;
  resetSearch: () => void;
}

export const useTixStore = create<TixState>()(
  persist(
    (set) => ({
      transportFilter: 'ALL',
      selectedOrigin: null,
      selectedDestination: null,
      travelDate: null,
      passengers: 1,
      setTransportFilter: (filter) => set({ transportFilter: filter }),
      setSearchParams: (origin, dest, date, passengers) =>
        set({
          selectedOrigin: origin,
          selectedDestination: dest,
          travelDate: date,
          passengers,
        }),
      resetSearch: () =>
        set({
          selectedOrigin: null,
          selectedDestination: null,
          travelDate: null,
          passengers: 1,
        }),
    }),
    { name: 'tix-search-storage' },
  ),
);

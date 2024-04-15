import { create } from "zustand";

interface useDeleteStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useDeleteModal = create<useDeleteStore>((set) => ({
  isOpen: false,
  onOpen: () => set((state) => ({ isOpen: true })),
  onClose: () => set({ isOpen: false }),
}));

export default useDeleteModal;

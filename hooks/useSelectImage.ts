import { create } from "zustand";

interface selectImageStore{
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void
}
 
const useSelectImageModal = create<selectImageStore>((set) => ({
  isOpen: false,
  onOpen: () => set((state) => ({ isOpen: true })),
  onClose: () => set({ isOpen: false }),
}));

export default useSelectImageModal;
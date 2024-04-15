import { create } from "zustand";

interface uploadImageStore{
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void
}
 
const useUploadImageModal = create<uploadImageStore>((set) => ({
  isOpen: false,
  onOpen: () => set((state) => ({ isOpen: true })),
  onClose: () => set({ isOpen: false }),
}));

export default useUploadImageModal;
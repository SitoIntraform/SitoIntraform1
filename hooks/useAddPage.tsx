import { create } from "zustand";

interface addPageModalStore {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
}

const useAddPageModal = create<addPageModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set((state) => ({ isOpen: true })),
    onClose: () => set({ isOpen: false }),
}));

export default useAddPageModal;
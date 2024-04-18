import { create } from "zustand";

interface useDeleteStore {
    onChangeValue: boolean;
    onSet: () => void;
    onReset: () => void;
}

const useScrollBar = create<useDeleteStore>((set) => ({
    onChangeValue: false,
    onSet: () => set((state) => ({ onChangeValue: true })),
    onReset: () => set({ onChangeValue: false }),
}));

export default useScrollBar;

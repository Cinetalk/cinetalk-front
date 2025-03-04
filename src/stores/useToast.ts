import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ToastStore {
  toast: Array<{ id: string; message: string }>;
  actions: {
    add: (message: string) => void;
    remove: (id: string) => void;
  };
}
const delay = 3000;
const useToastStore = create<ToastStore>()(
  devtools((set) => ({
    toast: [],
    actions: {
      add: (message: string) => {
        const id = Math.random().toString(32).slice(2, 9);
        set((state) => {
          setTimeout(() => {
            set((state) => ({
              toast: state.toast.filter((item) => item.id !== id),
            }));
          }, delay);
          return { toast: [...state.toast, { id, message }] };
        });
      },
      remove: (id: string) => {
        set((state) => ({
          toast: state.toast.filter((item) => item.id !== id),
        }));
      },
    },
  })),
);

export const useToast = () => useToastStore((state) => state.toast);
export const useToastActions = () => useToastStore((state) => state.actions);

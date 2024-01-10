import { create } from 'zustand';

interface EventModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEventModal = create<EventModalStore>((set) => ({
  isOpen: false,
  onOpen: () => {
    console.log("Opening modal");
    set({ isOpen: true });
  },
  onClose: () => {
    console.log("Closing modal");
    set({ isOpen: false });
  },
}));


export default useEventModal;

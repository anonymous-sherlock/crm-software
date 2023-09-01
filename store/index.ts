import { create } from "zustand";

// navbar state
type NavbarState = {
  isTabletMid: Boolean;
  open: Boolean;
  setOpen: (value: boolean) => void;
  setIsTabletMid: (value: boolean) => void;
};
const useNavbarStore = create<NavbarState>((set) => ({
  isTabletMid: false,
  open: true,
  setOpen: (value) => set({ open: value }),
  setIsTabletMid: (value) => set({ isTabletMid: value }),
}));

export default useNavbarStore;


// submenu state

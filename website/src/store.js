import { create } from "zustand";
import {getLoggedInUser} from "@/lib/firebaseFunctions.js";

// selectedProfile is done to prevent duplicate firestore calls as we cannot pass variables
// to different routes (at least not efficiently)
const useGlobalStore = create((set) => ({
    user: getLoggedInUser() ?? undefined,
    selectedProfile: undefined,

    setUser: (newUser) => set((state) => ({ user: newUser })),
    setSelectedProfile: (newSelectedProfile) => set((state) => ({ selectedProfile: newSelectedProfile })),
}));

export default useGlobalStore;
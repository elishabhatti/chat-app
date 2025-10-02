import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigninUp: false,
  isLogginIng: false,
  isCheckingAuth: true,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
      console.error(error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigninUp: true });
    try {
      await axiosInstance.post("/auth/signup", data);
      toast.success("Account Created Successfully!");
      set({ authUser: res.data });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isSigninUp: false });
    }
  },

  login: async (data) => {
    set({ isLogginIng: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged In Successfully!");
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLogginIng: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out Successfully!");
    } catch (error) {
      console.error(error);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile Updated Successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));

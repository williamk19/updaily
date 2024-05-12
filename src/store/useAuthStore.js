import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';

const useAuthPageStore = (set) => ({
  authTabIndex: 0,
  showPassword: false,
  pageTitle: "Sign In",
  pageSubtitle: "Sign in using your registered email and password",
  error: null,
  setAuthTabIndex: (value) => set(() => ({
    authTabIndex: value,
    pageTitle: value === 0 ? "Sign In" : "Register",
    pageSubtitle: value === 0
      ? "Sign in using your registered email and password"
      : "Register new account in Updaily using your email",
    showPassword: false,
  })),
  toggleShowPassword: () => set((state) => ({ showPassword: !state.showPassword }))
});

const useAuthCredentialStore = (set) => ({
  token: null,
  user: null,
  signInUser: (token, user) => set(() => ({
    token,
    user,
  })),
  signOutUser: () => set(() => ({
    token: null,
    user: null,
  })),
});

const useAuthStore = create(devtools(persist(set => ({
  ...useAuthPageStore(set),
  ...useAuthCredentialStore(set)
}),
  {
    name: 'auth',
    storage: createJSONStorage(() => localStorage)
  })));

window.store = useAuthStore;
export default useAuthStore;
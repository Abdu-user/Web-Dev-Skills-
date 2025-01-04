import { defineStore } from "pinia";

type ThemeType = "dark" | "light";
interface GlobalStateType {
  theme: ThemeType;
  isMobile: boolean;
  useGradient: boolean;
}
const saveState = () => {
  localStorage.setItem("state", JSON.stringify(useGlobalStore().$state));
};

export const useGlobalStore = defineStore("globalStore", {
  state(): GlobalStateType {
    return {
      theme: "dark",
      isMobile: false,
      useGradient: false,
    };
  },
  actions: {
    toggleTheme() {
      this.theme = this.theme === "dark" ? "light" : "dark";
      saveState();
    },
    getState() {
      const savedState = localStorage.getItem("state");
      if (savedState) {
        const parsedState: GlobalStateType = JSON.parse(savedState);
        this.theme = parsedState.theme;
        this.useGradient = parsedState.useGradient;
      }
    },
    updateIsMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
    toggleUseGradient() {
      this.useGradient = !this.useGradient;
      saveState();
    },
  },
  getters: {
    bgThemeClass(): string {
      // Todo: implement settings pinia Store
      if (this.useGradient) {
        const isDarkTheme = this.theme === "dark";

        // Define slightly darker gradient for dark theme
        const gradientBg = isDarkTheme
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-800"
          : "bg-gradient-to-r from-white via-gray-100 to-green-100";

        return gradientBg;
      } else {
        return "bg-" + this.theme;
      }
    },
    shadowThemeClass(): string {
      return "";
    },
  },
});

export { ThemeType, GlobalStateType };

import { defineStore } from "pinia";

type ThemeType = "dark" | "light";
interface GlobalStateType {
  theme: ThemeType;
  isMobile: boolean;
  useGradient: boolean;
}
const saveState = (state: GlobalStateType) => {
  localStorage.setItem("state", JSON.stringify(state));
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
      saveState({ theme: this.theme, isMobile: this.isMobile, useGradient: this.useGradient });
    },
    getState() {
      const savedState = localStorage.getItem("state");
      if (savedState) {
        const parsedState: GlobalStateType = JSON.parse(savedState);
        this.theme = parsedState.theme;
      }
    },
    updateIsMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
    toggleUseGradient() {
      this.useGradient = !this.useGradient;
    },
  },
  getters: {
    bgThemeClass(): string {
      // const settings = {
      //   useGradient: true,
      // };
      // Todo: implement settings pinia Store
      if (this.useGradient) {
        const isDarkTheme = this.theme === "dark";

        // Define slightly darker gradient for dark theme
        const gradientBg = isDarkTheme
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700" // Darker dark theme gradient
          : "bg-gradient-to-r from-yellow-100 via-pink-100 to-red-100"; // Lighter light theme gradient

        // Return combined class with conditional gradient and text color
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

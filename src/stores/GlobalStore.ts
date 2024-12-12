import { defineStore } from "pinia";

type ThemeType = "dark" | "light";
interface GlobalStateType {
  theme: ThemeType;
  isMobile: boolean;
}
const saveState = (state: GlobalStateType) => {
  localStorage.setItem("state", JSON.stringify(state));
};

export const useGlobalStore = defineStore("globalStore", {
  state(): GlobalStateType {
    return {
      theme: "dark",
      isMobile: false,
    };
  },
  actions: {
    toggleTheme() {
      this.theme = this.theme === "dark" ? "light" : "dark";
      saveState({ theme: this.theme, isMobile: this.isMobile });
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
  },
});

export { ThemeType, GlobalStateType };

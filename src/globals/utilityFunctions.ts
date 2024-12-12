import { useGlobalStore } from "@/stores/GlobalStore";

// import globalState from "./state";
const globalStore = useGlobalStore();
const updateIsMobile = () => {
  globalStore.isMobile = window.innerWidth <= 768;
};

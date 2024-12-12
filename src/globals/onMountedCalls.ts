// import globalState, { GlobalStateType } from "./state";
import { GlobalStateType, useGlobalStore } from "@/stores/GlobalStore";
// import { updateIsMobile } from  "./utilityFunctions";

const globalStore = useGlobalStore();
const getState = () => {
  const savedState = localStorage.getItem("state");
  if (savedState) {
    const parsedState: GlobalStateType = JSON.parse(savedState);
    globalStore.theme = parsedState.theme;
  }
};
// export default function onMountedCalls() {
//   getState();
//   updateIsMobile();
//   window.addEventListener("resize", updateIsMobile);
// }

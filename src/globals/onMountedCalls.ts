import globalState, { GlobalStateType } from "./state";
import { updateIsMobile } from "./utilityFunctions";

const getState = () => {
  const savedState = localStorage.getItem("state");
  if (savedState) {
    const parsedState: GlobalStateType = JSON.parse(savedState);
    globalState.theme = parsedState.theme;
  }
};
export default function onMountedCalls() {
  getState();
  window.addEventListener("resize", updateIsMobile);
}

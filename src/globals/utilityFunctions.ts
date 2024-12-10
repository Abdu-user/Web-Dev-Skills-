import globalState from "./state";

export const updateIsMobile = () => {
  globalState.isMobile = window.innerWidth <= 768;
};

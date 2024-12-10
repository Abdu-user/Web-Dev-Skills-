import { reactive } from "vue";

type ThemeType = "dark" | "light";
interface GlobalStateType {
  theme: ThemeType;
  isMobile: boolean;
}

const globalState = reactive<GlobalStateType>({
  theme: "dark",
  isMobile: false,
});

const setGlobalStateProperty = <K extends keyof GlobalStateType>(key: K, value: GlobalStateType[K]) => {
  globalState[key] = value;
};
const getGlobalState = () => {
  return globalState;
};

export default globalState;
export { setGlobalStateProperty, getGlobalState };
export { ThemeType, GlobalStateType };

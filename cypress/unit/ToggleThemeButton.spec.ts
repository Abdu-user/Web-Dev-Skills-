import { render, screen } from "@testing-library/vue";
import "@testing-library/jest-dom";
import ToggleThemeButton from "../../src/components/ToggleThemeButton.vue";
import { createPinia, defineStore, setActivePinia } from "pinia";
import userEvent from "@testing-library/user-event";

describe("ToggleThemeButton.vue", () => {
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
  });
  it("renders the dark theme button when the theme is dark", async () => {
    const { container } = render(ToggleThemeButton, {
      props: { theme: "dark" },
    });

    const darkButton = screen.getByRole("button", { name: /Toggle to Light\/Dark Theme/i });
    expect(darkButton).toBeInTheDocument();

    const icon = container.querySelector(".bi-moon");
    expect(icon).toBeInTheDocument();
  });

  it("renders the light theme button when the theme is light", async () => {
    const { container } = render(ToggleThemeButton, {
      props: { theme: "light" },
    });

    const lightButton = screen.getByRole("button", { name: /Toggle to Light\/Dark Theme/i });
    expect(lightButton).toBeInTheDocument();

    const icon = container.querySelector(".bi-sun");
    expect(icon).toBeInTheDocument();
  });
  it("check if classname is passed", async () => {
    const newClassName = "newClassName";
    render(ToggleThemeButton, { props: { theme: "dark", className: newClassName } });

    const toggleTheme = screen.getByRole("button", { name: /Toggle to Light\/Dark Theme/i });
    expect(toggleTheme).toBeInTheDocument();

    expect(toggleTheme).toHaveClass(newClassName);
  });
});

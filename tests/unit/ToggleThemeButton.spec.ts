import { render, screen } from "@testing-library/vue";
import ThemeToggler from "@/components/ToggleThemeButton.vue";
import "@testing-library/jest-dom";

describe("ThemeToggler.vue", () => {
  it("renders the dark theme button when the theme is dark", async () => {
    const { container } = render(ThemeToggler, {
      props: { theme: "dark" },
    });

    const darkButton = screen.getByRole("button", { name: /Toggle to Light\/Dark Theme/i });
    expect(darkButton).toBeInTheDocument();

    const icon = container.querySelector(".bi-moon");
    expect(icon).toBeInTheDocument();
  });

  it("renders the light theme button when the theme is light", async () => {
    const { container } = render(ThemeToggler, {
      props: { theme: "light" },
    });

    const lightButton = screen.getByRole("button", { name: /Toggle to Light\/Dark Theme/i });
    expect(lightButton).toBeInTheDocument();

    const icon = container.querySelector(".bi-sun");
    expect(icon).toBeInTheDocument();
  });
});

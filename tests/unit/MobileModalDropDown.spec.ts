import { render, screen, fireEvent } from "@testing-library/vue";
import MobileModalDropDown from "@/components/MobileModalDropDown.vue";
import "@testing-library/jest-dom";

describe("MobileModalDropDown.vue", () => {
  it("renders the toggle button to open the navbar", async () => {
    render(MobileModalDropDown);

    // Check if the button with the correct aria-label is in the document
    const toggleButton = screen.getByRole("button", {
      name: /Toggle navigation/i,
    });
    expect(toggleButton).toBeInTheDocument();

    // Check if the navbar content is initially hidden
    const navbarContent = screen.queryByRole("region", { hidden: true });
    expect(navbarContent).not.toBeInTheDocument();
  });

  it("toggles the navbar visibility when button is clicked", async () => {
    render(MobileModalDropDown);

    const toggleButton = screen.getByRole("button", {
      name: /Toggle navigation/i,
    });

    // Initially, the navbar content should not be visible
    let navbarContent = screen.queryByRole("region", { hidden: true });
    expect(navbarContent).not.toBeInTheDocument();

    // Simulate a click to open the navbar
    await fireEvent.click(toggleButton);

    // After click, the navbar content should be visible
    navbarContent = screen.getByRole("region", { hidden: false });
    expect(navbarContent).toBeInTheDocument();

    // Simulate another click to close the navbar
    await fireEvent.click(toggleButton);

    // After second click, the navbar content should be hidden again
    navbarContent = screen.queryByRole("region", { hidden: true });
    expect(navbarContent).not.toBeInTheDocument();
  });

  it("applies the correct class to the navbar content", async () => {
    render(MobileModalDropDown, {
      props: { childClass: "custom-class" },
    });

    // Simulate a click to open the navbar
    const toggleButton = screen.getByRole("button", {
      name: /Toggle navigation/i,
    });
    await fireEvent.click(toggleButton);

    // Check if the custom class is applied to the navbar content
    const navbarContent = screen.getByRole("region");
    expect(navbarContent).toHaveClass("custom-class");
  });
});

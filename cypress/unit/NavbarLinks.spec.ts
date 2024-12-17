import { render, screen } from "@testing-library/vue";
import NavbarLinks from "../../src//components/navbar/NavbarLinks.vue";
import { createRouter, createWebHistory, RouteRecordRaw, RouterLink } from "vue-router";
import "@testing-library/jest-dom";
// import { fireEvent } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

jest.mock("vue-router", () => {
  return {
    ...jest.requireActual("vue-router"),
    useRouter: () => {
      return {
        push: jest.fn(),
      };
    },
  };
});
describe("NavbarLinks.vue", () => {
  it("renders the navigation links", async () => {
    render(NavbarLinks);

    screen.debug();
    // Check if the "Home" link is present
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();

    // Check if the "About" link is present
    const aboutLink = screen.getByRole("link", { name: /about/i });
    expect(aboutLink).toBeInTheDocument();

    // Check if the "Contact" link is present
    const contactLink = screen.getByRole("link", { name: /contact/i });
    expect(contactLink).toBeInTheDocument();
  });

  it("applies the correct class to the <ul> element", async () => {
    render(NavbarLinks, {
      props: { className: "custom-class" },
    });

    // Check if the <ul> element has the custom class
    const navbar = screen.getByRole("list");
    expect(navbar).toHaveClass("custom-class");
  });

  it("checks if links are rendered correctly", async () => {
    render(NavbarLinks);

    // Check if the "Home" link is in the document
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();

    // Check if the "About" link is in the document
    const aboutLink = screen.getByRole("link", { name: /about/i });
    expect(aboutLink).toBeInTheDocument();

    // Check if the "Contact" link is in the document
    const contactLink = screen.getByRole("link", { name: /contact/i });
    expect(contactLink).toBeInTheDocument();
  });
  it("checks if links navigate correctly", async () => {
    // Create a mock router instance
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: "/", name: "home" },
        { path: "/about", name: "about" },
        { path: "/contact", name: "contact" },
      ] as RouteRecordRaw[],
    });

    render(NavbarLinks, {
      global: {
        plugins: [router], // Provide the mock router to the component
      },
    });
    // Initially, check that the URL is correct (home page)
    expect(window.location.pathname).toBe("/");
    const user = userEvent.setup();

    // Get the "Home" link and click on it
    const homeLink = screen.getByRole("link", { name: /home/i });
    await user.click(homeLink);

    // After clicking, check if the URL has changed to "/home"
    expect(window.location.pathname).toBe("/");

    // Get the "About" link and click on it
    const aboutLink = screen.getByRole("link", { name: /about/i });
    await user.click(aboutLink);

    // After clicking, check if the URL has changed to "/about"
    expect(window.location.pathname).toBe("/about");

    // Get the "Contact" link and click on it
    const contactLink = screen.getByRole("link", { name: /contact/i });
    await user.click(contactLink);

    // After clicking, check if the URL has changed to "/contact"
    expect(window.location.pathname).toBe("/contact");
  });
});

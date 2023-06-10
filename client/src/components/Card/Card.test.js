import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Card from "./Card";

describe("Card Component", () => {
  const mockProps = {
    id: 1,
    name: "Pikachu",
    image: "pikachu.png",
    types: ["electric"],
  };

  test("renders card with correct data", () => {
    render(
      <BrowserRouter>
        <Card {...mockProps} />
      </BrowserRouter>
    );

    // Assertions
    expect(screen.getByText("PIKACHU")).toBeInTheDocument();
    expect(screen.getByAltText("Pikachu")).toBeInTheDocument();
    expect(screen.getByText("ELECTRIC")).toBeInTheDocument();
  });

  test("renders link with correct path", () => {
    render(
      <BrowserRouter>
        <Card {...mockProps} />
      </BrowserRouter>
    );

    // Assertion
    expect(screen.getByRole("link")).toHaveAttribute("href", "/details/1");
  });
});
1
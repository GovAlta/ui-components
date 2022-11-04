import React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import GoACard from "./card";

describe.skip("GoA Card", () => {
  const title = "My Card title";
  const description =
    "My card text desciption available here, this field can be empty";
  const cardImageUrl = "working-in-cold-hero-3_rdax_75.jpg";
  const titleUrl = "http://www.google.ca/";

  it("should render title and description", () => {
    const { baseElement } = render(
      <GoACard title={title} description={description} />
    );

    expect(baseElement).toBeTruthy();
  });

  it("title has href, should render title and href", async () => {
    render(
      <GoACard title={title} titleUrl={titleUrl} description={description} />
    );
    const titleEl = await screen.findByTestId("card-title");
    expect(titleEl.textContent).toBe(title);
    const titleLinkEl = await screen.findByTestId("card-title-link");
    expect(titleLinkEl.href).toBe(titleUrl);
  });

  it("if cardImageUrl exist, should render cardImage", async () => {
    render(<GoACard title={title} cardImageUrl={cardImageUrl} />);
    const cardImageImg = await screen.findByTestId("card-img");
    expect(cardImageImg).not.toBeNull();
  });

  it("if use customer input layout, should render as fixed width", async () => {
    render(
      <GoACard title={title} cardImageUrl={cardImageUrl} maxWidth={200} />
    );
    const contentEl = await screen.findByTestId("card-container");
    expect(contentEl.style["max-width"]).toBe("200px");
  });
});

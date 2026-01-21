import {
  GoabContainer,
  GoabText,
  GoabBlock,
  GoabButton,
  GoabTable,
} from "@abgov/react-components";
import { useEffect } from "react";

export function Bug3281Route() {
  useEffect(() => {
    console.log("Bug 3281 Component Loaded");
  }, []);

  return (
    <main>
      <h1>React Version</h1>
      <GoabBlock gap="l" direction="column">
        <GoabBlock gap="l">
          <GoabContainer maxWidth="400px">
            <p>Basic p simple text to extend to 400px width</p>
          </GoabContainer>
          <GoabContainer maxWidth="400px">
            <GoabText tag="p">GoabText text to extend to 400px width</GoabText>
          </GoabContainer>
        </GoabBlock>
      </GoabBlock>
      <hr />
      <GoabContainer testId="pContainer">
        <p>A p inside of a Container</p>
      </GoabContainer>
      <hr />
      <GoabContainer testId="nopContainer">No tag inside of a Container</GoabContainer>
      <hr />
      <GoabContainer testId="textContainer">
        <GoabText tag="p">goab-text inside of a Container </GoabText>
      </GoabContainer>
      <p>
        The Actions block could interfere with the
        <code>.content :global(::slotted(*:last-child))</code> selector
      </p>
      <GoabContainer
        testId="pactionsContainer"
        accent="thick"
        actions={<p>p in Actions</p>}
      >
        <p>A p inside of a Container with Actions</p>
      </GoabContainer>
      <hr />
      <GoabContainer
        testId="pactionsContainer2"
        accent="thick"
        actions={<p>p in Actions</p>}
      >
        <h1>This is an h1</h1>
        <p>A p inside of a Container with Actions</p>
      </GoabContainer>
      <hr />
      <GoabContainer testId="ptableContainer">
        <p>This is a paragraph.</p>
        <GoabTable>
          <thead>
            <tr>
              <th>Header 1</th>
              <th>Header 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Data 1</td>
              <td>Data 2</td>
            </tr>
            <tr>
              <td>Data 3</td>
              <td>Data 4</td>
            </tr>
          </tbody>
        </GoabTable>
      </GoabContainer>
    </main>
  );
}

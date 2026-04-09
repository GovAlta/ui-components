import { useState } from "react";
import {
  GoabBlock,
  GoabDetails,
  GoabDivider,
  GoabLink,
  GoabPagination,
  GoabText,
} from "@abgov/react-components";

export function Bug3663Route() {
  const [pageSmall, setPageSmall] = useState(1);
  const [pageMedium, setPageMedium] = useState(1);
  const [pageLarge, setPageLarge] = useState(1);

  return (
    <div>
      <GoabText tag="h1" mt="m">
        Bug #3663: Pagination page dropdown placeholder is truncated
      </GoabText>

      <GoabBlock>
        <GoabLink trailingIcon="open">
          <a
            href="https://github.com/GovAlta/ui-components/issues/3663"
            target="_blank"
            rel="noopener"
          >
            View on GitHub
          </a>
        </GoabLink>

        <GoabDetails heading="Issue Description">
          <GoabText tag="p">
            The page selector dropdown inside the Pagination component is too
            narrow to render its placeholder text in full. During the initial
            render, before the dropdown items have mounted, the V2 default
            placeholder ("—Select—") is visible but truncated because the
            dropdown auto-sizes to the (very short) numeric option labels.
          </GoabText>
        </GoabDetails>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test Cases</GoabText>

      <GoabText tag="h3" mt="l">
        Test 1: Single page (no records)
      </GoabText>
      <GoabText tag="p">
        Forces the "0 of 0" empty state. Verify the dropdown is wide enough to
        show "—Select—" without truncation while it briefly renders.
      </GoabText>
      <GoabPagination
        itemCount={0}
        perPageCount={10}
        pageNumber={1}
        onChange={() => { /* no-op */ }}
      />

      <GoabText tag="h3" mt="l">
        Test 2: Small page count
      </GoabText>
      <GoabText tag="p">
        10 items, 10 per page = 1 page. Verify the dropdown shows "1" centered
        with no truncation of the placeholder during initial paint.
      </GoabText>
      <GoabPagination
        itemCount={10}
        perPageCount={10}
        pageNumber={pageSmall}
        onChange={(e) => setPageSmall(e.page)}
      />

      <GoabText tag="h3" mt="l">
        Test 3: Medium page count
      </GoabText>
      <GoabText tag="p">
        100 items, 10 per page = 10 pages. Verify the dropdown comfortably fits
        the page numbers and the placeholder.
      </GoabText>
      <GoabPagination
        itemCount={100}
        perPageCount={10}
        pageNumber={pageMedium}
        onChange={(e) => setPageMedium(e.page)}
      />

      <GoabText tag="h3" mt="l">
        Test 4: Large page count
      </GoabText>
      <GoabText tag="p">
        9999 items, 10 per page = 1000 pages. Verify the dropdown still fits
        4-digit page numbers within the fixed width.
      </GoabText>
      <GoabPagination
        itemCount={9999}
        perPageCount={10}
        pageNumber={pageLarge}
        onChange={(e) => setPageLarge(e.page)}
      />
    </div>
  );
}

export default Bug3663Route;

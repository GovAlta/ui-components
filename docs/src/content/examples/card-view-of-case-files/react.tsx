import {
  GoabBadge,
  GoabBlock,
  GoabButton,
  GoabContainer,
  GoabText,
} from "@abgov/react-components";

export function CardViewOfCaseFiles() {
  return (
    <>
      <style>{`
        .case-file-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: var(--goa-space-m);
        }
      `}</style>

      <GoabContainer mt="l">
        <div className="case-file-row">
          <GoabBlock direction="column" gap="2xs">
            <GoabText size="heading-xs" mt="none" mb="2xs">Fiscal year: 2021/2022</GoabText>
            <GoabText size="body-s" mt="none" mb="none">Submitted: April 23, 2023</GoabText>
          </GoabBlock>
          <GoabBlock direction="row" gap="l" alignment="center">
            <GoabBadge type="default" content="Not started" />
            <GoabButton type="tertiary" size="compact">Start</GoabButton>
          </GoabBlock>
        </div>
      </GoabContainer>

      <GoabContainer>
        <div className="case-file-row">
          <GoabBlock direction="column" gap="2xs">
            <GoabText size="heading-xs" mt="none" mb="2xs">Fiscal year: 2020/2021</GoabText>
            <GoabText size="body-s" mt="none" mb="none">Submitted: April 9, 2022</GoabText>
          </GoabBlock>
          <GoabBlock direction="row" gap="l" alignment="center">
            <GoabBadge type="important" content="Information needed" />
            <GoabButton type="tertiary" size="compact">Edit</GoabButton>
          </GoabBlock>
        </div>
      </GoabContainer>

      <GoabContainer>
        <div className="case-file-row">
          <GoabBlock direction="column" gap="2xs">
            <GoabText size="heading-xs" mt="none" mb="2xs">Fiscal year: 2019/2020</GoabText>
            <GoabText size="body-s" mt="none" mb="none">Submitted: April 14, 2021</GoabText>
          </GoabBlock>
          <GoabBlock direction="row" gap="l" alignment="center">
            <GoabBadge type="success" content="Approved" />
            <GoabButton type="tertiary" size="compact">View</GoabButton>
          </GoabBlock>
        </div>
      </GoabContainer>
    </>
  );
}

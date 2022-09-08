import { GoAChip } from '@abgov/react-components';
import * as React from 'react';
import { useState } from 'react';

export default function Chip() {

  const [chips, setChips] = useState([
    "Doritos",
    "Fritos",
    "Lays",
  ]);

  const deleteChip = (chip: string) => {
    setChips((chips) => chips.filter(c => c !== chip));
  };

  function ChipsToDeleteExample(chips: string[], deleteChipHandler: any) {
    return <>
      {
        chips.map((chip) => {
          return <GoAChip key={chip} deletable={true} content={chip} onClick={() => deleteChipHandler(chip)} />
        })
      }
    </>;
  }

  return (
    <>
      <h1>Chip</h1>
      <h2>Basic</h2>
      <GoAChip content="Chip Text"></GoAChip>

      <br />
      <h2>Leading icon</h2>
      <GoAChip content="Chip Text" leadingIcon="close-circle"></GoAChip>

      <br />
      <h2>Delete event</h2>
      {ChipsToDeleteExample(chips, deleteChip)}

      <br />
      <h2>Error state</h2>
      <GoAChip content="Chip Text" deletable={true}></GoAChip>
      <GoAChip
        content="Chip Text"
        error={true} deletable={true} onClick={() => { console.log("deleting") }}
      ></GoAChip >
    </>
  );
}

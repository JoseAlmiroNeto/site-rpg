import React from "react";

export const RollAtributy = ({ value }) => {
  const roll20 = Math.floor(Math.random() * 20 + 1);

  if (value === "1") {
    if (roll20 === 20) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Normal</div>
        </>
      );
    }
    if (roll20 < 20) {
      return (
        <>
          <div>{roll20}</div>
          <div>Falhou</div>
        </>
      );
    }
  }
  if (value === "2") {
    if (roll20 === 19) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Normal</div>
        </>
      );
    }
    if (roll20 === 20) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Bom</div>
        </>
      );
    }
    if (roll20 < 19) {
      return (
        <>
          <div>{roll20}</div>
          <div>Falhou</div>
        </>
      );
    }
  }
  if (value === "3") {
    if (roll20 >= 18 && roll20 <= 19) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Normal</div>
        </>
      );
    }
    if (roll20 === 20) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Bom</div>
        </>
      );
    }
    if (roll20 < 18) {
      return (
        <>
          <div>{roll20}</div>
          <div>Falhou</div>
        </>
      );
    }
  }
  if (value === "4") {
    if (roll20 >= 17 && roll20 <= 18) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Normal</div>
        </>
      );
    }
    if (roll20 >= 19) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Bom</div>
        </>
      );
    }
    if (roll20 < 17) {
      return (
        <>
          <div>{roll20}</div>
          <div>Falhou</div>
        </>
      );
    }
  }
  if (value === "5") {
    if (roll20 >= 16 && roll20 <= 18) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Normal</div>
        </>
      );
    }
    if (roll20 === 19) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Bom</div>
        </>
      );
    }
    if (roll20 === 20) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Extremo</div>
        </>
      );
    }
    if (roll20 < 16) {
      return (
        <>
          <div>{roll20}</div>
          <div>Falhou</div>
        </>
      );
    }
  }
  if (value === "6") {
    if (roll20 >= 15 && roll20 <= 18) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Normal</div>
        </>
      );
    }
    if (roll20 === 19) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Bom</div>
        </>
      );
    }
    if (roll20 === 20) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Extremo</div>
        </>
      );
    }
    if (roll20 < 15) {
      return (
        <>
          <div>{roll20}</div>
          <div>Falhou</div>
        </>
      );
    }
  }
  if (value === "7") {
    if (roll20 >= 14 && roll20 <= 17) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Normal</div>
        </>
      );
    }
    if (roll20 >= 18 && roll20 <= 19) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Bom</div>
        </>
      );
    }
    if (roll20 === 20) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Extremo</div>
        </>
      );
    }
    if (roll20 < 14) {
      return (
        <>
          <div>{roll20}</div>
          <div>Falhou</div>
        </>
      );
    }
  }
  if (value === "8") {
    if (roll20 >= 13 && roll20 <= 16) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Normal</div>
        </>
      );
    }
    if (roll20 >= 17 && roll20 <= 19) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Bom</div>
        </>
      );
    }
    if (roll20 === 20) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Extremo</div>
        </>
      );
    }
    if (roll20 < 13) {
      return (
        <>
          <div>{roll20}</div>
          <div>Falhou</div>
        </>
      );
    }
  }
  if (value === "9") {
    if (roll20 >= 12 && roll20 <= 16) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Normal</div>
        </>
      );
    }
    if (roll20 >= 17 && roll20 <= 19) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Bom</div>
        </>
      );
    }
    if (roll20 === 20) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Extremo</div>
        </>
      );
    }
    if (roll20 < 12) {
      return (
        <>
          <div>{roll20}</div>
          <div>Falhou</div>
        </>
      );
    }
  }
  if (value === "10") {
    if (roll20 >= 11 && roll20 <= 15) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Normal</div>
        </>
      );
    }
    if (roll20 >= 16 && roll20 <= 18) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Bom</div>
        </>
      );
    }
    if (roll20 >= 19) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Extremo</div>
        </>
      );
    }
    if (roll20 < 11) {
      return (
        <>
          <div>{roll20}</div>
          <div>Falhou</div>
        </>
      );
    }
  }
  if (value === "11") {
    if (roll20 >= 10 && roll20 <= 15) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Normal</div>
        </>
      );
    }
    if (roll20 >= 16 && roll20 <= 18) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Bom</div>
        </>
      );
    }
    if (roll20 >= 19) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Extremo</div>
        </>
      );
    }
    if (roll20 < 10) {
      return (
        <>
          <div>{roll20}</div>
          <div>Falhou</div>
        </>
      );
    }
  }
  if (value === "12") {
    if (roll20 >= 9 && roll20 <= 15) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Normal</div>
        </>
      );
    }
    if (roll20 >= 16 && roll20 <= 18) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Bom</div>
        </>
      );
    }
    if (roll20 >= 19) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Extremo</div>
        </>
      );
    }
    if (roll20 < 9) {
      return (
        <>
          <div>{roll20}</div>
          <div>Falhou</div>
        </>
      );
    }
  }
  if (value === "13") {
    if (roll20 >= 8 && roll20 <= 14) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Normal</div>
        </>
      );
    }
    if (roll20 >= 15 && roll20 <= 18) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Bom</div>
        </>
      );
    }
    if (roll20 >= 19) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Extremo</div>
        </>
      );
    }
    if (roll20 < 8) {
      return (
        <>
          <div>{roll20}</div>
          <div>Falhou</div>
        </>
      );
    }
  }
  if (value === "14") {
    if (roll20 >= 7 && roll20 <= 13) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Normal</div>
        </>
      );
    }
    if (roll20 >= 14 && roll20 <= 18) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Bom</div>
        </>
      );
    }
    if (roll20 >= 19) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Extremo</div>
        </>
      );
    }
    if (roll20 < 7) {
      return (
        <>
          <div>{roll20}</div>
          <div>Falhou</div>
        </>
      );
    }
  }
  if (value === "15") {
    if (roll20 >= 6 && roll20 <= 13) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Normal</div>
        </>
      );
    }
    if (roll20 >= 14 && roll20 <= 17) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Bom</div>
        </>
      );
    }
    if (roll20 >= 18) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Extremo</div>
        </>
      );
    }
    if (roll20 < 6) {
      return (
        <>
          <div>{roll20}</div>
          <div>Falhou</div>
        </>
      );
    }
  }
  if (value === "16") {
    if (roll20 >= 5 && roll20 <= 12) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Normal</div>
        </>
      );
    }
    if (roll20 >= 13 && roll20 <= 17) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Bom</div>
        </>
      );
    }
    if (roll20 >= 18) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Extremo</div>
        </>
      );
    }
    if (roll20 < 5) {
      return (
        <>
          <div>{roll20}</div>
          <div>Falhou</div>
        </>
      );
    }
  }
  if (value === "17") {
    if (roll20 >= 4 && roll20 <= 12) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Normal</div>
        </>
      );
    }
    if (roll20 >= 13 && roll20 <= 17) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Bom</div>
        </>
      );
    }
    if (roll20 >= 18) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Extremo</div>
        </>
      );
    }
    if (roll20 < 4) {
      return (
        <>
          <div>{roll20}</div>
          <div>Falhou</div>
        </>
      );
    }
  }
  if (value === "18") {
    if (roll20 >= 3 && roll20 <= 11) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Normal</div>
        </>
      );
    }
    if (roll20 >= 12 && roll20 <= 17) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Bom</div>
        </>
      );
    }
    if (roll20 >= 18) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Extremo</div>
        </>
      );
    }
    if (roll20 < 3) {
      return (
        <>
          <div>{roll20}</div>
          <div>Falhou</div>
        </>
      );
    }
  }
  if (value === "19") {
    if (roll20 >= 2 && roll20 <= 11) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Normal</div>
        </>
      );
    }
    if (roll20 >= 12 && roll20 <= 17) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Bom</div>
        </>
      );
    }
    if (roll20 >= 18) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Extremo</div>
        </>
      );
    }
    if (roll20 < 2) {
      return (
        <>
          <div>{roll20}</div>
          <div>Falhou</div>
        </>
      );
    }
  }
  if (value === "20") {
    if (roll20 >= 1 && roll20 <= 10) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Normal</div>
        </>
      );
    }
    if (roll20 >= 11 && roll20 <= 16) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Bom</div>
        </>
      );
    }
    if (roll20 >= 17) {
      return (
        <>
          <div>{roll20}</div>
          <div>Sucesso Extremo</div>
        </>
      );
    }
  }
}; 

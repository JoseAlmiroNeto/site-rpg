import React from "react";

// FOR(3)d20 = {5,11 e 12} => 12 + bonus + Treino + outros = 12

const RollPeri = (Props) => {
  let skillKey = Props.value.keyAttribute;
  let keyAttribute = Props.record.value.Attributes[skillKey];

  const valueD20 = [];

  for (let i = 0; i < keyAttribute; i++) {
    valueD20.push(Math.floor(Math.random() * 20 + 1));
  }
  const maxValue = Math.max(...valueD20);
  const result =
    maxValue +
    parseInt(Props.value.trainedValue) +
    parseInt(Props.value.other) +
    parseInt(Props.value.bonus);
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <p className="text-xl font-bold">{Props.value.skillName}</p>
      <div>
        {keyAttribute}d20({maxValue}) + {Props.value.trained}(
        {Props.value.trainedValue}) + Outro(
        {parseInt(Props.value.other)}) + Bônus(
        {parseInt(Props.value.bonus)})
      </div>
      <div className="text-3xl font-bold">{result}</div>
    </div>
  );
};

export default RollPeri;

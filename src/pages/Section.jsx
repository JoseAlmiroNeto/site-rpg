import React, { useEffect, useState } from "react";
import { GiReturnArrow } from "react-icons/gi";
import { db } from "../auth/Config";
import { ModalAverage, ModalLarge, ModalSmall } from "./../components/Modal";
import { RiAddFill } from "react-icons/ri";
import { RxDoubleArrowDown, RxDoubleArrowUp } from "react-icons/rx";
import { BsFillTrashFill } from "react-icons/bs";

const Section = () => {
  let uid = window.location.href.split("/")[4];

  const [show, setShow] = useState(false);
  const [isModalRegister, setIsModalRegister] = useState(false);
  const [isModalCreateSkills, setIsModalCreateSkills] = useState(false);
  const [isModalRollSkills, setIsModalRollSkills] = useState(false);
  const [isModalCreateCreature, setIsModalCreateCreature] = useState(false);
  const [isModalCreateAttack, setIsModalCreateAttack] = useState(false);
  const [isModalCreateAbility, setIsModalCreateAbility] = useState(false);
  const [isModalRollAtributes, setIsModalRollAtributes] = useState(false);
  const [isModalTest, setIsModalTest] = useState(false);
  const [isModalRollAttack, setIsModalRollAttack] = useState(false);
  const [displayNPC, setDisplayNPC] = useState({});
  const [resultAttack, setResultAttack] = useState({});
  const [resultTest, setResultTest] = useState({
    newValue: "",
    array: "",
    calc: "",
  });
  const [records, setRecords] = useState([]);
  const [damages, setDamages] = useState([]);
  const [test, setTest] = useState([]);
  const [isCreature, setIsCreature] = useState();
  const [players, setPlayers] = useState();
  const [isInfo, setIsInfo] = useState(true);
  const [isDados, setIsDados] = useState(false);
  const [isSkills, setIsSkills] = useState(false);
  const [isAttack, setIsAttack] = useState(false);
  const [registerPlayer, setRegisterPlayer] = useState();
  const [resultRollAttr, setResultRollAttr] = useState();
  const [displayCreature, setDisplayCreature] = useState({});
  const [isInfoCreature, setIsInfoCreature] = useState(true);
  const [isOtherCreature, setIsOtherCreature] = useState(false);
  const [isDefeatCreature, setIsDefeatCreature] = useState(false);
  const [isSkillsCreature, setIsSkillsCreature] = useState(false);
  const [isIndex, setIsIndex] = useState();
  const [newInitiative, setNewInitiative] = useState();
  const [rollAtriResult, setRollAtriResult] = useState({});
  const [rollAtriArrayValue, setRollAtriArrayValue] = useState();
  const [resistance, setResistance] = useState([
    { name: "Energia", value: "" },
    { name: "Morte", value: "" },
    { name: "Sangue", value: "" },
    { name: "Física", value: "" },
    { name: "Balística", value: "" },
    { name: "Mental", value: "" },
  ]);
  const [skills, setSkills] = useState({
    skillName: "",
    keyAttribute: "",
    other: 0,
  });
  const [creatureAdd, setCreatureAdd] = useState({
    name: "",
    defeat: "",
    description: "",
    attributes: {
      agility: "",
      energy: "",
      force: "",
      intelligence: "",
      presence: "",
    },
    status: {
      currentEffort: 0,
      currentLife: 0,
      currentSanity: 0,
      maximumEffort: 0,
      maximumLife: 0,
      maximumSanity: 0,
    },
    skills: [],
    damage: [],
    ability: [],
  });
  const [attack, setAttack] = useState({
    name: "",
    reach: "",
    type: "",
  });
  const [abilitys, setAbilitys] = useState({
    name: "",
    action: "",
    description: "",
  });

  useEffect(() => {
    getPlayerData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getPlayerData();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (players) {
      searchPlayerData();
    }
  }, [players]);

  const skillArray = [
    { value: "", label: "", extra1: "" },
    { value: "agility", label: "Acrobacia(AGI)", extra1: "Acrobacia" },
    {
      value: "presence",
      label: "Adestramento(PRE)-Treinada",
      extra1: "Adestramento",
    },
    { value: "presence", label: "Artes(PRE)-Treinada", extra1: "Artes" },
    { value: "force", label: "Atletismo(FOR)", extra1: "Atletismo" },
    {
      value: "intelligence",
      label: "Atualidades(INT)",
      extra1: "Atualidades",
    },
    {
      value: "intelligence",
      label: "Ciências(INT)-Treinada",
      extra1: "Ciências",
    },
    { value: "agility", label: "Crime(AGI)-Treinada", extra1: "Crime" },
    { value: "presence", label: "Diplomacia(PRE)", extra1: "Diplomacia" },
    { value: "presence", label: "Enganação(PRE)", extra1: "Enganação" },
    { value: "energy", label: "Fortitude(VIG)", extra1: "Fortitude" },
    { value: "agility", label: "Furtividade(AGI)", extra1: "Furtividade" },
    { value: "agility", label: "Iniciativa(AGI)", extra1: "Iniciativa" },
    {
      value: "presence",
      label: "Intimidação(PRE)",
      extra1: "Intimidação",
    },
    { value: "intelligence", label: "Intuição(INT)", extra1: "Intuição" },
    {
      value: "intelligence",
      label: "Investigação(INT)",
      extra1: "Investigação",
    },
    { value: "force", label: "Luta(FOR)", extra1: "Luta" },
    { value: "intelligence", label: "Medicina(INT)", extra1: "Medicina" },
    {
      value: "intelligence",
      label: "Ocultismo(INT)-Treinada",
      extra1: "Ocultismo",
    },
    { value: "presence", label: "Percepção(PRE)", extra1: "Percepção" },
    {
      value: "agility",
      label: "Pilotagem(AGI)-Treinada",
      extra1: "Pilotagem",
    },
    { value: "agility", label: "Pontaria(AGI)", extra1: "Pontaria" },
    {
      value: "intelligence",
      label: "Profissão(INT)-Treinada",
      extra1: "Profissão(INT)",
    },
    { value: "agility", label: "Reflexos(AGI)", extra1: "Reflexos" },
    {
      value: "presence",
      label: "Religião(PRE)-Treinada",
      extra1: "Religião",
    },
    {
      value: "intelligence",
      label: "Sobrevivência(INT)",
      extra1: "Sobrevivência",
    },
    {
      value: "intelligence",
      label: "Tática(INT)-Treinada",
      extra1: "Tática",
    },
    {
      value: "intelligence",
      label: "Tecnologia(INT)-Treinada",
      extra1: "Tecnologia",
    },
    { value: "presence", label: "Vontade(PRE)", extra1: "Vontade" },
  ];

  const actionTypes = [
    { value: "", label: "" },
    { value: "PADRÃO", label: "PADRÃO" },
    { value: "REAÇÃO", label: "REAÇÃO" },
    { value: "MOVIMENTO", label: "MOVIMENTO" },
    { value: "LIVRE", label: "LIVRE" },
  ];

  const handleClick = () => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 2000);
  };

  const getPlayerData = async () => {
    const { docs } = await db
      .collection("sections")
      .where("uid", "==", uid)
      .get();
    setPlayers(docs[0].data());
  };

  const searchPlayerData = async () => {
    const recordsData = [];
    const skillsData = [];

    for (const player of players.players) {
      const { docs } = await db
        .collection("record")
        .where("uid", "==", player)
        .get();
      recordsData.push(docs[0].data());
    }

    for (const player of players.players) {
      const { docs } = await db
        .collection("skills")
        .where("uid", "==", player)
        .get();
      skillsData.push(docs[0].data());
    }

    const combinedArray = recordsData.reduce((acc, curr) => {
      const matchingObj = skillsData.find((obj) => obj.uid === curr.uid);
      return [...acc, { ...curr, ...matchingObj }];
    }, []);

    setRecords(combinedArray);
  };

  async function moveUp(index) {
    // const newObjects = [...players.initiative];
    // const temp = newObjects[index];
    // newObjects[index] = newObjects[index - 1];
    // newObjects[index - 1] = temp;
    // await db.collection("sections").doc(uid).set(
    //   {
    //     initiative: newObjects,
    //   },
    //   { merge: true }
    // );
    // getPlayerData();
  }

  async function moveDown(index) {
    // const newObjects = [...players.initiative];
    // const temp = newObjects[index];
    // newObjects[index] = newObjects[index + 1];
    // newObjects[index + 1] = temp;
    // await db.collection("sections").doc(uid).set(
    //   {
    //     initiative: newObjects,
    //   },
    //   { merge: true }
    // );
    // getPlayerData();
  }

  async function addPlayer() {
    const newArray = [...players.players, registerPlayer];
    await db.collection("sections").doc(uid).set(
      {
        players: newArray,
      },
      { merge: true }
    );
    setIsModalRegister(false);
    getPlayerData();
  }

  const handleInputChange = (i, e) => {
    const newItems = [...resistance];
    newItems[i].value = e.target.value;
    setResistance(newItems);
  };

  async function addCreature() {
    if (isCreature === "monster") {
      const resistances = [...resistance];
      const newCreature = { ...creatureAdd, resistances };
      setCreatureAdd(newCreature);
      const newArray = [...players.creatures, newCreature];

      await db.collection("sections").doc(uid).set(
        {
          creatures: newArray,
        },
        { merge: true }
      );
    } else {
      const resistances = [...resistance];
      const newCreature = { ...creatureAdd, resistances };
      setCreatureAdd(newCreature);
      const newArray = [...players.npc, newCreature];

      await db.collection("sections").doc(uid).set(
        {
          npc: newArray,
        },
        { merge: true }
      );
    }
    setIsModalCreateCreature(false);
    getPlayerData();
  }

  async function createSkills(i) {
    if (isCreature === "monster") {
      const newArray = [...players.creatures[i].skills, skills];
      await db
        .collection("sections")
        .doc(uid)
        .set(
          {
            creatures: [
              ...players.creatures.slice(0, i),
              {
                ...players.creatures[i],
                skills: newArray,
              },
              ...players.creatures.slice(i + 1),
            ],
          },
          { merge: true }
        );
    } else {
      const newArray = [...players.npc[i].skills, skills];
      await db
        .collection("sections")
        .doc(uid)
        .set(
          {
            npc: [
              ...players.npc.slice(0, i),
              {
                ...players.npc[i],
                skills: newArray,
              },
              ...players.npc.slice(i + 1),
            ],
          },
          { merge: true }
        );
    }
    getPlayerData();
    setIsModalCreateSkills(false);
    setSkills({});
  }

  async function createAttack(i) {
    const damage = [...damages];
    const valueTest = [...test];
    const newGuns = { ...attack, damage };
    const newAttack = { ...newGuns, valueTest };
    if (isCreature === "monster") {
      const newArray = [...players.creatures[i].damage, newAttack];
      await db
        .collection("sections")
        .doc(uid)
        .set(
          {
            creatures: [
              ...players.creatures.slice(0, i),
              {
                ...players.creatures[i],
                damage: newArray,
              },
              ...players.creatures.slice(i + 1),
            ],
          },
          { merge: true }
        );
    } else {
      const newArray = [...players.npc[i].damage, newAttack];
      await db
        .collection("sections")
        .doc(uid)
        .set(
          {
            npc: [
              ...players.npc.slice(0, i),
              {
                ...players.npc[i],
                damage: newArray,
              },
              ...players.npc.slice(i + 1),
            ],
          },
          { merge: true }
        );
    }
    getPlayerData();
    setIsModalCreateAttack(false);
    setDamages([]);
    setTest([]);
  }

  async function createAbility(i) {
    if (isCreature === "monster") {
      const newArray = [...players.creatures[i].ability, abilitys];
      await db
        .collection("sections")
        .doc(uid)
        .set(
          {
            creatures: [
              ...players.creatures.slice(0, i),
              {
                ...players.creatures[i],
                ability: newArray,
              },
              ...players.creatures.slice(i + 1),
            ],
          },
          { merge: true }
        );
    } else {
      const newArray = [...players.npc[i].ability, abilitys];
      await db
        .collection("sections")
        .doc(uid)
        .set(
          {
            npc: [
              ...players.npc.slice(0, i),
              {
                ...players.npc[i],
                ability: newArray,
              },
              ...players.npc.slice(i + 1),
            ],
          },
          { merge: true }
        );
    }
    getPlayerData();
    setIsModalCreateAbility(false);
  }

  async function createInitiative() {
    const initiativeObj = {
      name: "Jogador",
      initiative: 0,
    };
    const newArray = [...players.initiative, initiativeObj];

    await db.collection("sections").doc(uid).set(
      {
        initiative: newArray,
      },
      { merge: true }
    );
    getPlayerData();
  }

  const toggleDisplayNPC = (index) => {
    setDisplayNPC({
      ...displayNPC,
      [index]: !displayNPC[index],
    });
  };

  const toggleDisplayCreature = (index) => {
    setDisplayCreature({
      ...displayCreature,
      [index]: !displayCreature[index],
    });
  };

  const handleChange = (e) => {
    const selectedOption = e.target.selectedOptions[0];
    setSkills({
      ...skills,
      keyAttribute: selectedOption.value,
      skillName: selectedOption.getAttribute("data-extra1"),
    });
  };

  function addDamageInput() {
    setDamages([...damages, ""]);
  }

  const handleChangedDamage = (e, index) => {
    setDamages(
      damages.map((damage, i) => {
        return i === index ? e.target.value : damage;
      })
    );
  };

  function addTestInput() {
    setTest([...test, ""]);
  }

  const handleChangedTest = (e, index) => {
    setTest(
      test.map((test, i) => {
        return i === index ? e.target.value : test;
      })
    );
  };

  const RollTest = (value) => {
    let sum = [];
    value.forEach((e) => {
      if (e.includes("d")) {
        const dado = parseInt(e.split("d")[1]);
        const roll = parseInt(e.split("d")[0]);
        sum.push(
          ...Array(roll)
            .fill(0)
            .map(() => Math.floor(Math.random() * dado + 1))
        );
      } else {
        const Int = parseInt(e);
        sum.push(Int);
      }
    });
    setResultTest({
      ...resultTest,
      newValue: sum.reduce(
        (acctualValue, currentValue) => acctualValue + currentValue,
        0
      ),
      calc: value,
      array: sum,
    });
  };

  const RollDamage = (value) => {
    let sum = [];
    value.forEach((e) => {
      if (e.includes("d")) {
        const dado = parseInt(e.split("d")[1]);
        const roll = parseInt(e.split("d")[0]);
        sum.push(
          ...Array(roll)
            .fill(0)
            .map(() => Math.floor(Math.random() * dado + 1))
        );
      } else {
        const Int = parseInt(e);
        sum.push(Int);
      }
    });
    setResultAttack({
      ...resultAttack,
      newValue: sum.reduce(
        (acctualValue, currentValue) => acctualValue + currentValue,
        0
      ),
      calc: value,
    });
  };

  const RollAtri = (value) => {
    let arrayNumbers = [];
    for (let i = 0; i < value; i++) {
      arrayNumbers.push(Math.floor(Math.random() * 20 + 1));
    }
    let maxNumber = Math.max(...arrayNumbers);
    setRollAtriResult({ ...rollAtriResult, maxValue: maxNumber, atri: value });
    setRollAtriArrayValue(arrayNumbers);
  };

  const RollSkill = (skill, creature) => {
    let skillKey = skill.keyAttribute;
    let keyAttribute = parseInt(creature.attributes[skillKey]);

    const valueD20 = [];

    for (let i = 0; i < keyAttribute; i++) {
      valueD20.push(Math.floor(Math.random() * 20 + 1));
    }
    const maxValue = Math.max(...valueD20);
    setRollAtriResult({
      ...rollAtriResult,
      maxValue: maxValue + parseInt(skill.other),
      atri: skill.other,
      roll: keyAttribute,
    });
    setRollAtriArrayValue(valueD20);
  };

  async function deletedInitiative(index) {
    const newArray = [...players.initiative];
    newArray.splice(index, 1);
    await db.collection("sections").doc(uid).set(
      {
        initiative: newArray,
      },
      { merge: true }
    );
    getPlayerData();
  }

  async function handleInputInitiativeName(e, i) {
    const newIniti = [...players.initiative];
    newIniti[i].name = e.target.value;
    setNewInitiative(newIniti);
  }

  async function handleInputInitiativeValue(e, i) {
    const newIniti = [...players.initiative];
    newIniti[i].initiative = e.target.value;
    setNewInitiative(newIniti);
  }

  async function saveToFirebase() {
    await db.collection("sections").doc(uid).set(
      {
        initiative: newInitiative,
      },
      { merge: true }
    );
  }

  return (
    <>
      {isModalRegister ? (
        <ModalSmall onClose={(e) => setIsModalRegister(false)}>
          <div className="w-full h-full flex flex-col items-center">
            <div className="w-full border-b-[1px] border-white p-2 flex items-center justify-center text-xl font-bold">
              ADICIONAR PLAYER
            </div>
            <div className="w-[70%] h-full flex flex-col justify-center">
              <p className="text-[0.8vw]">UID do Player:</p>
              <input
                className="bg-transparent w-full border-b-[2px] border-gray-900 focus:outline-none"
                placeholder="Ex: -NWUnsi39_suUWC397W"
                onChange={(e) => setRegisterPlayer(e.target.value)}
              />
            </div>
            <button
              className="bg-red-1000 w-28 rounded-md mb-4"
              onClick={() => {
                addPlayer();
              }}
            >
              Adicionar
            </button>
          </div>
        </ModalSmall>
      ) : null}
      {isModalRollSkills ? (
        <ModalSmall onClose={(e) => setIsModalRollSkills(false)}>
          <div className="w-full h-full flex flex-col items-center justify-between">
            <div className="h-[20%] w-full flex items-center justify-center font-bold text-2xl border-b-[1px] border-white">
              Rolagem de Perícia
            </div>
            {!show && (
              <div className="h-[80%] flex items-center">
                <div className="w-5 h-5 rounded-full bg-white animate-ping" />
              </div>
            )}
            {show && (
              <div className="h-[80%] flex flex-col gap-2 justify-center items-center">
                <p className="flex">
                  {rollAtriResult.roll}d20(
                  {rollAtriArrayValue.map((value, index) => {
                    return (
                      <p className="text-base">
                        {value}
                        {index !== rollAtriArrayValue.length - 1 && ","}
                      </p>
                    );
                  })}
                  )+{rollAtriResult.atri}
                </p>
                <p className=" text-3xl">{rollAtriResult.maxValue}</p>
              </div>
            )}
          </div>
        </ModalSmall>
      ) : null}
      {isModalCreateCreature ? (
        <ModalLarge onClose={(e) => setIsModalCreateCreature(false)}>
          <div className="w-full h-full flex flex-col items-center justify-between">
            <div className="h-[6%] w-full flex items-center justify-center font-bold text-2xl border-b-[1px] border-white">
              CRIAR CRIATURA
            </div>
            <div className="h-[94%] w-full flex flex-col items-center justify-evenly">
              <div className="w-[80%]">
                <p className="font-bold">Nome:</p>
                <input
                  className="w-full bg-transparent border-b-[1px]"
                  onChange={(e) =>
                    setCreatureAdd({ ...creatureAdd, name: e.target.value })
                  }
                />
              </div>
              <div className="w-[80%]">
                <p className="font-bold">Atributos:</p>
                <div className="flex justify-between">
                  <div className="flex">
                    <p>AGI:</p>
                    <input
                      className="w-[40px] bg-transparent border-b-[1px] text-center"
                      onChange={(e) =>
                        setCreatureAdd({
                          ...creatureAdd,
                          attributes: {
                            ...creatureAdd.attributes,
                            agility: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex">
                    <p>FOR:</p>
                    <input
                      className="w-[40px] bg-transparent border-b-[1px] text-center"
                      onChange={(e) =>
                        setCreatureAdd({
                          ...creatureAdd,
                          attributes: {
                            ...creatureAdd.attributes,
                            force: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex">
                    <p>INT:</p>
                    <input
                      className="w-[40px] bg-transparent border-b-[1px] text-center"
                      onChange={(e) =>
                        setCreatureAdd({
                          ...creatureAdd,
                          attributes: {
                            ...creatureAdd.attributes,
                            intelligence: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex">
                    <p>PRE:</p>
                    <input
                      className="w-[40px] bg-transparent border-b-[1px] text-center"
                      onChange={(e) =>
                        setCreatureAdd({
                          ...creatureAdd,
                          attributes: {
                            ...creatureAdd.attributes,
                            presence: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex">
                    <p>VIG:</p>
                    <input
                      className="w-[40px] bg-transparent border-b-[1px] text-center"
                      onChange={(e) =>
                        setCreatureAdd({
                          ...creatureAdd,
                          attributes: {
                            ...creatureAdd.attributes,
                            energy: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="w-[80%]">
                <p className="font-bold">Status:</p>
                <div className="flex justify-between">
                  <div className="flex">
                    <p>Vida:</p>
                    <input
                      className="w-[70px] bg-transparent border-b-[1px] text-center"
                      onChange={(e) => {
                        setCreatureAdd({
                          ...creatureAdd,
                          status: {
                            ...creatureAdd.status,
                            currentLife: e.target.value,
                            maximumLife: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <div className="flex">
                    <p>Sanidade:</p>
                    <input
                      className="w-[70px] bg-transparent border-b-[1px] text-center"
                      onChange={(e) => {
                        setCreatureAdd({
                          ...creatureAdd,
                          status: {
                            ...creatureAdd.status,
                            currentSanity: e.target.value,
                            maximumSanity: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <div className="flex">
                    <p>Esforço:</p>
                    <input
                      className="w-[70px] bg-transparent border-b-[1px] text-center"
                      onChange={(e) => {
                        setCreatureAdd({
                          ...creatureAdd,
                          status: {
                            ...creatureAdd.status,
                            currentEffort: e.target.value,
                            maximumEffort: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="w-[80%]">
                <p>Defesa:</p>
                <input
                  className="bg-transparent border-b-[1px]"
                  onChange={(e) =>
                    setCreatureAdd({ ...creatureAdd, defeat: e.target.value })
                  }
                />
              </div>
              <div className="w-[80%]">
                <p className="font-bold">Resistências:</p>
                <div className="flex flex-wrap gap-3">
                  {resistance.map((item, index) => (
                    <div className="flex" key={index}>
                      <p>{item.name}:</p>
                      <input
                        className="w-[40px] bg-transparent border-b-[1px] text-center"
                        onChange={(event) => handleInputChange(index, event)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-[80%]">
                <p>Detalhes:</p>
                <textarea
                  rows="4"
                  className="bg-transparent w-full border-b-[1px]"
                  onChange={(e) =>
                    setCreatureAdd({
                      ...creatureAdd,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <button
                className="bg-red-1000 w-28 rounded-md mb-4"
                onClick={(e) => addCreature()}
              >
                Criar
              </button>
            </div>
          </div>
        </ModalLarge>
      ) : null}
      {isModalCreateSkills ? (
        <ModalAverage onClose={(e) => setIsModalCreateSkills(false)}>
          <div className="w-full h-full flex flex-col items-center justify-between">
            <div className="w-full border-b-[1px] border-white p-2 flex items-center justify-center text-xl font-bold">
              CRIAR PERÍCIA
            </div>
            <div className="w-[80%] flex flex-col">
              <p>Perícia</p>
              <select
                onChange={handleChange}
                className="bg-transparent w-full border-b-[2px] border-gray-700 focus:outline-none"
              >
                {skillArray.map((option) => (
                  <option
                    className="bg-black-100 text-white"
                    key={option.label}
                    value={option.value}
                    data-extra1={option.extra1}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[80%] flex flex-col">
              <p>Bônus</p>
              <input
                className="bg-transparent w-full border-b-[2px] border-gray-700 focus:outline-none"
                placeholder="Ex: 5"
                type="number"
                onChange={(e) =>
                  setSkills({ ...skills, other: e.target.value })
                }
              />
            </div>
            <button
              className="bg-red-1000 w-28 rounded-md mb-4"
              onClick={() => createSkills(isIndex)}
            >
              Criar
            </button>
          </div>
        </ModalAverage>
      ) : null}
      {isModalCreateAbility ? (
        <ModalAverage onClose={(e) => setIsModalCreateAbility(false)}>
          <div className="w-full h-full flex flex-col items-center justify-between">
            <div className="w-full border-b-[1px] border-white p-2 flex items-center justify-center text-xl font-bold">
              CRIAR HABILIDADE
            </div>
            <div className="w-[80%] flex flex-col">
              <p>Tipo de ação:</p>
              <select
                className="bg-transparent w-full border-b-[2px] border-gray-700 focus:outline-none"
                onChange={(e) =>
                  setAbilitys({ ...abilitys, action: e.target.value })
                }
              >
                {actionTypes.map((option) => (
                  <option
                    className="bg-black-100 text-white"
                    key={option.label}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[80%] flex flex-col">
              <p>Nome da habilidade:</p>
              <input
                className="bg-transparent w-full border-b-[2px] border-gray-700 focus:outline-none"
                onChange={(e) =>
                  setAbilitys({ ...abilitys, name: e.target.value })
                }
              />
            </div>
            <div className="w-[80%] flex flex-col">
              <p>Descrição:</p>
              <textarea
                rows="5"
                className="bg-transparent w-full border-b-[2px] border-gray-700 focus:outline-none"
                onChange={(e) =>
                  setAbilitys({ ...abilitys, description: e.target.value })
                }
              />
            </div>
            <button
              className="bg-red-1000 w-28 rounded-md mb-4"
              onClick={() => createAbility(isIndex)}
            >
              Criar
            </button>
          </div>
        </ModalAverage>
      ) : null}
      {isModalCreateAttack ? (
        <ModalAverage
          onClose={(e) => {
            setIsModalCreateAttack(false);
            setDamages([]);
            setTest([]);
          }}
        >
          <div className="w-full h-full flex flex-col items-center justify-between">
            <div className="w-full border-b-[1px] border-white p-2 flex items-center justify-center text-xl font-bold">
              CRIAR ATAQUE
            </div>
            <div className="w-[80%] flex flex-col">
              <p>Nome do ataque:</p>
              <input
                className="bg-transparent w-full border-b-[2px] border-gray-700 focus:outline-none"
                onChange={(e) => setAttack({ ...attack, name: e.target.value })}
              />
            </div>
            <div className="w-[80%] flex flex-col">
              <p>Distancia:</p>
              <input
                className="bg-transparent w-full border-b-[2px] border-gray-700 focus:outline-none"
                onChange={(e) =>
                  setAttack({ ...attack, reach: e.target.value })
                }
              />
            </div>
            <div className="w-[80%] flex flex-col">
              <p className="text-[0.8vw]">Teste</p>
              <div className="flex gap-[0.5vw]">
                {test.map((damage, index) => {
                  return (
                    <div>
                      <input
                        key={index}
                        className="bg-transparent border-[2px] border-gray-900 w-[2.5vw] text-center text-[0.8vw]"
                        onChange={(e) => handleChangedTest(e, index)}
                      />
                    </div>
                  );
                })}
                <button
                  className="bg-red-800 p-[0.1vw]"
                  onClick={(e) => addTestInput()}
                >
                  <RiAddFill />
                </button>
              </div>
            </div>
            <div className="w-[80%] flex flex-col">
              <p className="text-[0.8vw]">Dano</p>
              <div className="flex gap-[0.5vw]">
                {damages.map((damage, index) => {
                  return (
                    <div>
                      <input
                        key={index}
                        className="bg-transparent border-[2px] border-gray-900 w-[2.5vw] text-center text-[0.8vw]"
                        onChange={(e) => handleChangedDamage(e, index)}
                      />
                    </div>
                  );
                })}
                <button
                  className="bg-red-800 p-[0.1vw]"
                  onClick={(e) => addDamageInput()}
                >
                  <RiAddFill />
                </button>
              </div>
            </div>
            <button
              className="bg-red-1000 w-28 rounded-md mb-4"
              onClick={() => createAttack(isIndex)}
            >
              Criar
            </button>
          </div>
        </ModalAverage>
      ) : null}
      {isModalRollAttack ? (
        <ModalSmall
          onClose={(e) => {
            setIsModalRollAttack(false);
          }}
        >
          <div className="flex flex-col items-center justify-between w-full h-full">
            <div className="w-full border-b-[1px] border-white p-2 flex items-center justify-center text-xl font-bold">
              ROLAGEM DE DANO
            </div>
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
              {!show && (
                <div className="h-[80%] flex items-center">
                  <div className="w-5 h-5 rounded-full bg-white animate-ping" />
                </div>
              )}
              {show && (
                <>
                  <div className="flex">
                    {resultAttack.calc.map((el, index) => {
                      return (
                        <p className="text-xl">
                          {el}
                          {index !== resultAttack.calc.length - 1 && "+"}
                        </p>
                      );
                    })}
                  </div>
                  <div className="text-4xl font-bold">
                    {resultAttack.newValue}
                  </div>
                </>
              )}
            </div>
          </div>
        </ModalSmall>
      ) : null}
      {isModalTest ? (
        <ModalSmall
          onClose={(e) => {
            setIsModalTest(false);
          }}
        >
          <div className="flex flex-col items-center justify-between w-full h-full">
            <div className="w-full border-b-[1px] border-white p-2 flex items-center justify-center text-xl font-bold">
              ROLAGEM DE DANO
            </div>
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
              {!show && (
                <div className="h-[80%] flex items-center">
                  <div className="w-5 h-5 rounded-full bg-white animate-ping" />
                </div>
              )}
              {show && (
                <>
                  <div className="flex">
                    {resultTest.calc.map((el, index) => {
                      return (
                        <p className="text-xl">
                          {el}
                          {index !== resultTest.calc.length - 1 && "+"}
                        </p>
                      );
                    })}
                  </div>
                  <div className="text-4xl font-bold">
                    {resultTest.newValue}
                  </div>
                </>
              )}
            </div>
          </div>
        </ModalSmall>
      ) : null}
      {isModalRollAtributes ? (
        <ModalSmall
          onClose={(e) => {
            setIsModalRollAtributes(false);
          }}
        >
          <div className="flex flex-col items-center justify-between w-full h-full">
            <div className="w-full border-b-[1px] border-white p-2 flex items-center justify-center text-xl font-bold">
              ROLAGEM DE ATRIBUTO
            </div>
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
              {!show && (
                <div className="h-[80%] flex items-center">
                  <div className="w-5 h-5 rounded-full bg-white animate-ping" />
                </div>
              )}
              {show && (
                <>
                  <p className="flex items-center justify-center text-base">
                    {rollAtriResult.atri}d20(
                    {rollAtriArrayValue.map((value, index) => {
                      return (
                        <p className="text-base">
                          {value}
                          {index !== rollAtriArrayValue.length - 1 && ","}
                        </p>
                      );
                    })}
                    )
                  </p>
                  <p className="text-3xl font-bold">
                    {rollAtriResult.maxValue}
                  </p>
                </>
              )}
            </div>
          </div>
        </ModalSmall>
      ) : null}
      <div className="bg-black-100 w-full relative flex flex-col font-Messiri items-center justify-center text-white">
        <a
          className="absolute top-0 left-0 p-1"
          href="https://ficharpg-9a0d5.web.app/"
        >
          <GiReturnArrow size="30px" />
        </a>
        <div className="w-[98%] flex flex-wrap item justify-center gap-4 mt-10">
          <div className="border-[1px] border-gray-800 rounded-md w-[49%] h-[620px] flex flex-col gap-2 items-center">
            <div className="w-[98%] h-[7%] flex items-center justify-between border-b-[3px] border-gray-800">
              <div className="w-[28px] h-[28px]" />
              <div className="h-full flex items-center">Fichas</div>
              <div
                className="border-[2px] border-gray-400 p-1 cursor-pointer"
                onClick={(e) => {
                  setIsModalRegister(true);
                }}
              >
                <RiAddFill />
              </div>
            </div>
            <div className="w-full h-[93%] flex flex-wrap gap-2 overflow-y-scroll scrollbar px-2">
              {records !== undefined &&
                records.map((player, index) => {
                  return (
                    <div
                      className="border-[1px] border-gray-800 w-[32%] h-[390px] rounded-md"
                      key={index}
                    >
                      <div className="flex justify-center w-full border-b-[1px] border-gray-700 gap-1">
                        <button
                          className={
                            isInfo
                              ? "bg-gray-700 w-[24%] rounded-t-lg flex items-center justify-center text-[0.8vw]"
                              : "bg-gray-800 w-[24%] rounded-t-lg flex items-center justify-center text-[0.8vw]"
                          }
                          onClick={() => {
                            setIsInfo(true);
                            setIsDados(false);
                            setIsSkills(false);
                          }}
                        >
                          Info
                        </button>
                        <button
                          className={
                            isDados
                              ? "bg-gray-700 w-[24%] rounded-t-lg flex items-center justify-center text-[0.8vw]"
                              : "bg-gray-800 w-[24%] rounded-t-lg flex items-center justify-center text-[0.8vw]"
                          }
                          onClick={() => {
                            setIsInfo(false);
                            setIsDados(true);
                            setIsSkills(false);
                          }}
                        >
                          Dados
                        </button>
                        <button
                          className={
                            isSkills
                              ? "bg-gray-700 w-[24%] rounded-t-lg flex items-center justify-center text-[0.8vw]"
                              : "bg-gray-800 w-[24%] rounded-t-lg flex items-center justify-center text-[0.8vw]"
                          }
                          onClick={() => {
                            setIsInfo(false);
                            setIsDados(false);
                            setIsSkills(true);
                          }}
                        >
                          Perícias
                        </button>
                      </div>
                      {isInfo && (
                        <div className="h-[365px] w-full flex flex-col items-center justify-evenly">
                          <img
                            className="w-[50px] h-[50px] rounded-full"
                            src={player.imgUrl ? player.imgUrl : "/user.png"}
                            alt=""
                          />
                          <p>{player.PersonalDetails.name}</p>
                          <div className="flex flex-col items-center">
                            <p className="text-red-400 text-xl">
                              {player.Status.currentLife}/
                              {player.Status.maximumLife}
                            </p>
                            <p>Vida</p>
                          </div>
                          <div className="flex flex-col items-center">
                            <p className="text-blue-400 text-xl">
                              {player.Status.currentSanity}/
                              {player.Status.maximumSanity}
                            </p>
                            <p>Sanidade</p>
                          </div>
                          <div className="flex flex-col items-center">
                            <p className="text-purple-400 text-xl">
                              {player.Status.currentEffort}/
                              {player.Status.maximumEffort}
                            </p>
                            <p>Pontos de Esforço</p>
                          </div>
                          <div className="flex flex-col items-center">
                            <p className="text-green-400 text-xl">
                              {player.Status.nex}
                            </p>
                            <p>Nex</p>
                          </div>
                        </div>
                      )}
                      {isDados && (
                        <div className="w-full h-[365px] flex flex-col items-center justify-center">
                          <div className="relative w-full h-full flex flex-col gap-3 items-center justify-center">
                            <div className="flex gap-1">
                              <p>Força:</p>
                              <p>{player.Attributes.force}</p>
                            </div>
                            <div className="flex gap-1">
                              <p>Agilidade:</p>
                              <p>{player.Attributes.agility}</p>
                            </div>
                            <div className="flex gap-1">
                              <p>Vigor:</p>
                              <p>{player.Attributes.energy}</p>
                            </div>
                            <div className="flex gap-1">
                              <p>Inteligência:</p>
                              <p>{player.Attributes.intelligence}</p>
                            </div>
                            <div className="flex gap-1">
                              <p>Presença:</p>
                              <p>{player.Attributes.presence}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {isSkills && (
                        <div className="w-full h-[348px] flex flex-col items-center mt-4 gap-4 overflow-y-scroll scrollbar">
                          {player.arraySkills.map((skill) => {
                            return <div>{skill.skillName}</div>;
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="border-[1px] border-gray-800 rounded-md w-[49%] h-[620px] flex flex-col items-center">
            <div className="w-[98%] h-[7%] flex items-center justify-between border-b-[3px] border-gray-800">
              <div className="w-[28px] h-[28px]" />
              <div className="h-full flex items-center">Iniciativa</div>
              <div
                className="border-[2px] border-gray-400 p-1 cursor-pointer"
                onClick={() => createInitiative()}
              >
                <RiAddFill />
              </div>
            </div>
            <div className="w-[95%] h-[568px] overflow-y-scroll scrollbar">
              {players !== undefined &&
                players.initiative.map((creature, index) => {
                  return (
                    <div className="flex justify-between border-[2px] border-gray-900 rounded-md py-1 px-3">
                      <button onClick={() => moveUp(index)}>
                        <RxDoubleArrowUp />
                      </button>
                      <p>{index + 1}</p>
                      <input
                        className="bg-transparent w-[250px]"
                        defaultValue={creature.name}
                        onChange={(e) => handleInputInitiativeName(e, index)}
                        onBlur={() => saveToFirebase()}
                      />
                      <input
                        className="bg-transparent w-[50px]"
                        defaultValue={creature.initiative}
                        onChange={(e) => handleInputInitiativeValue(e, index)}
                        onBlur={() => saveToFirebase()}
                      />
                      <button onClick={() => moveDown(index)}>
                        <RxDoubleArrowDown />
                      </button>
                      <div
                        className="border-[1px] w-[30px] border-gray-600 flex items-center justify-center p-1 cursor-pointer"
                        onClick={() => {
                          deletedInitiative(index);
                        }}
                      >
                        <BsFillTrashFill />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="border-[1px] border-gray-800 rounded-md w-[49%] h-[620px] flex flex-col items-center">
            <div className="w-[98%] h-[7%] flex items-center justify-between border-b-[3px] border-gray-800">
              <div className="w-[28px] h-[28px]" />
              <div className="h-full flex items-center">NPC</div>
              <div
                className="border-[2px] border-gray-400 p-1 cursor-pointer"
                onClick={(e) => {
                  setIsCreature("");
                  setIsModalCreateCreature(true);
                }}
              >
                <RiAddFill />
              </div>
            </div>
            <div className="w-[95%] h-[568px] overflow-y-scroll scrollbar">
              {players !== undefined &&
                players.npc.map((creature, index) => {
                  return (
                    <div
                      className="border-[2px] border-gray-800 rounded-md w-full flex flex-col items-center mt-4"
                      key={index}
                    >
                      <p
                        className="font-bold text-xl mt-1 cursor-pointer"
                        onClick={() => toggleDisplayNPC(index)}
                      >
                        {creature.name}
                      </p>
                      {displayNPC[index] && (
                        <div className="w-full h-full">
                          <div className="w-full flex flex-col items-center justify-center h-[80px]">
                            <div className="flex flex-wrap gap-2 w-full justify-center">
                              <button
                                className={
                                  isInfoCreature
                                    ? "bg-gray-700 p-1 rounded-lg w-[80px] text-sm"
                                    : "bg-gray-1000 p-1 rounded-lg w-[80px] text-sm"
                                }
                                onClick={() => {
                                  setIsInfoCreature(true);
                                  setIsDefeatCreature(false);
                                  setIsSkillsCreature(false);
                                  setIsOtherCreature(false);
                                  setIsAttack(false);
                                }}
                              >
                                Status
                              </button>
                              <button
                                className={
                                  isDefeatCreature
                                    ? "bg-gray-700 p-1 rounded-lg w-[80px] text-sm"
                                    : "bg-gray-1000 p-1 rounded-lg w-[80px] text-sm"
                                }
                                onClick={() => {
                                  setIsInfoCreature(false);
                                  setIsDefeatCreature(true);
                                  setIsSkillsCreature(false);
                                  setIsOtherCreature(false);
                                  setIsAttack(false);
                                }}
                              >
                                Defesas
                              </button>
                              <button
                                className={
                                  isSkillsCreature
                                    ? "bg-gray-700 p-1 rounded-lg w-[80px] text-sm"
                                    : "bg-gray-1000 p-1 rounded-lg w-[80px] text-sm"
                                }
                                onClick={() => {
                                  setIsInfoCreature(false);
                                  setIsDefeatCreature(false);
                                  setIsSkillsCreature(true);
                                  setIsOtherCreature(false);
                                  setIsAttack(false);
                                }}
                              >
                                Perícias
                              </button>
                              <button
                                className={
                                  isAttack
                                    ? "bg-gray-700 p-1 rounded-lg w-[80px] text-sm"
                                    : "bg-gray-1000 p-1 rounded-lg w-[80px] text-sm"
                                }
                                onClick={() => {
                                  setIsInfoCreature(false);
                                  setIsDefeatCreature(false);
                                  setIsSkillsCreature(false);
                                  setIsOtherCreature(false);
                                  setIsAttack(true);
                                }}
                              >
                                Ataque
                              </button>
                              <button
                                className={
                                  isOtherCreature
                                    ? "bg-gray-700 p-1 rounded-lg w-[80px] text-sm"
                                    : "bg-gray-1000 p-1 rounded-lg w-[80px] text-sm"
                                }
                                onClick={() => {
                                  setIsInfoCreature(false);
                                  setIsDefeatCreature(false);
                                  setIsSkillsCreature(false);
                                  setIsOtherCreature(true);
                                  setIsAttack(false);
                                }}
                              >
                                Outros
                              </button>
                            </div>
                          </div>
                          {isInfoCreature && (
                            <div className="flex flex-col items-center justify-center w-full gap-3 h-[267px]">
                              <div className="flex flex-col items-center">
                                <p>Atributos</p>
                                <div className="flex gap-1">
                                  <button
                                    className="bg-gray-800 p-1 rounded-lg w-[60px]"
                                    onClick={() => {
                                      RollAtri(
                                        parseInt(creature.attributes.force)
                                      );
                                      setIsModalRollAtributes(true);
                                      handleClick();
                                    }}
                                  >
                                    FOR:{creature.attributes.force}
                                  </button>
                                  <button
                                    className="bg-gray-800 p-1 rounded-lg w-[60px]"
                                    onClick={() => {
                                      RollAtri(
                                        parseInt(creature.attributes.agility)
                                      );
                                      setIsModalRollAtributes(true);
                                      handleClick();
                                    }}
                                  >
                                    AGI:{creature.attributes.agility}
                                  </button>
                                  <button
                                    className="bg-gray-800 p-1 rounded-lg w-[60px]"
                                    onClick={() => {
                                      RollAtri(
                                        parseInt(
                                          creature.attributes.intelligence
                                        )
                                      );
                                      setIsModalRollAtributes(true);
                                      handleClick();
                                    }}
                                  >
                                    INT:{creature.attributes.intelligence}
                                  </button>
                                  <button
                                    className="bg-gray-800 p-1 rounded-lg w-[60px]"
                                    onClick={() => {
                                      RollAtri(
                                        parseInt(creature.attributes.presence)
                                      );
                                      setIsModalRollAtributes(true);
                                      handleClick();
                                    }}
                                  >
                                    PRE:{creature.attributes.presence}
                                  </button>
                                  <button
                                    className="bg-gray-800 p-1 rounded-lg w-[60px]"
                                    onClick={() => {
                                      RollAtri(
                                        parseInt(creature.attributes.energy)
                                      );
                                      setIsModalRollAtributes(true);
                                      handleClick();
                                    }}
                                  >
                                    VIG:{creature.attributes.energy}
                                  </button>
                                </div>
                              </div>
                              <div className="w-[80%] flex flex-col items-center">
                                <p>Vida</p>
                                <div className="text-xl flex items-center justify-center w-full h-[25px] rounded-[3px] border-none bg-red-500">
                                  <input
                                    className="appearance-none text-xl w-[50px] h-[25px] bg-transparent border-none text-right text-white focus:outline-none"
                                    defaultValue={creature.status.currentLife}
                                  />
                                  /
                                  <input
                                    className="text-xl w-[50px] h-[25px] bg-transparent border-none text-white focus:outline-none"
                                    defaultValue={creature.status.maximumLife}
                                  />
                                </div>
                              </div>
                              <div className="w-[80%] flex flex-col items-center">
                                <p>Sanidade</p>
                                <div className="text-xl flex items-center justify-center w-full h-[25px] rounded-[3px] border-none bg-blue-1000">
                                  <input
                                    className="appearance-none text-xl w-[50px] h-[25px] bg-transparent border-none text-right text-white focus:outline-none"
                                    defaultValue={creature.status.currentSanity}
                                  />
                                  /
                                  <input
                                    className="text-xl w-[50px] h-[25px] bg-transparent border-none text-white focus:outline-none"
                                    defaultValue={creature.status.maximumSanity}
                                  />
                                </div>
                              </div>
                              <div className="w-[80%] flex flex-col items-center">
                                <p>Esforço</p>
                                <div className="text-xl flex items-center justify-center w-full h-[25px] rounded-[3px] border-none bg-yellow-600">
                                  <input
                                    className="appearance-none text-xl w-[50px] h-[25px] bg-transparent border-none text-right text-white focus:outline-none"
                                    defaultValue={creature.status.currentEffort}
                                  />
                                  /
                                  <input
                                    className="text-xl w-[50px] h-[25px] bg-transparent border-none text-white focus:outline-none"
                                    defaultValue={creature.status.maximumEffort}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                          {isDefeatCreature && (
                            <div className="flex flex-col items-center justify-evenly w-full h-[267px]">
                              <div className="flex flex-col items-center">
                                <p className="font-bold text-lg">Defesa</p>
                                <div className="w-[80px] h-[80px] relative flex items-center justify-center">
                                  <img
                                    className="w-[60px] absolute"
                                    src="/shield.png"
                                    alt=""
                                  />
                                  <p>{creature.defeat}</p>
                                </div>
                              </div>
                              <div className="flex flex-col items-center w-full">
                                <p className="font-bold text-lg">
                                  Resistências
                                </p>
                                <div className="w-full flex flex-wrap gap-3 items-center justify-center">
                                  {creature.resistances.map((res) => {
                                    let background = "";
                                    if (res.name === "Balística") {
                                      background = "#c29a65";
                                    } else if (res.name === "Energia") {
                                      background =
                                        "radial-gradient(circle, rgba(46,0,97,1) 0%, rgba(72,11,139,1) 33%, rgba(146,116,180,1) 59%, rgba(97,33,168,1) 100%)";
                                    } else if (res.name === "Morte") {
                                      background = "#302a2b";
                                    } else if (res.name === "Sangue") {
                                      background =
                                        "radial-gradient(circle, rgba(102,6,6,1) 0%, rgba(218,0,0,1) 50%, rgba(68,3,3,1) 100%)";
                                    } else if (res.name === "Física") {
                                      background =
                                        "linear-gradient(90deg, rgba(125,134,191,1) 0%, rgba(37,42,73,1) 52%, rgba(125,134,191,1) 100%)";
                                    } else if (res.name === "Mental") {
                                      background = "#0d145c";
                                    }
                                    if (res.value !== "") {
                                      return (
                                        <div
                                          className="border-[1px] border-white p-1 rounded-md"
                                          style={{ background }}
                                        >
                                          {res.name}: {res.value}
                                        </div>
                                      );
                                    }
                                  })}
                                </div>
                              </div>
                            </div>
                          )}
                          {isSkillsCreature && (
                            <div className="relative flex flex-col items-center justify-center w-full gap-3 h-[267px]">
                              <button
                                className="border-[2px] border-gray-400 p-1 cursor-pointer absolute top-0 right-0 mr-3"
                                onClick={(e) => {
                                  setIsCreature("");
                                  setIsModalCreateSkills(true);
                                  setIsIndex(index);
                                }}
                              >
                                <RiAddFill size="12px" />
                              </button>
                              <div className="w-full h-full flex flex-wrap gap-3 items-center justify-center">
                                {creature.skills.map((skill) => {
                                  return (
                                    <button
                                      className="flex p-1 border-[1px] gap-1 border-white rounded-md"
                                      onClick={() => {
                                        RollSkill(skill, creature);
                                        setIsModalRollSkills(true);
                                        handleClick();
                                      }}
                                    >
                                      <p>{skill.skillName}:</p>
                                      <p>+{skill.other}</p>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                          {isOtherCreature && (
                            <div className="flex flex-col items-center justify-center w-full gap-2 h-[267px]">
                              <p className="font-bold text-xl">Descrição</p>
                              <div className="w-[70%] h-[220px] mb-3 overflow-y-scroll scrollbar border-[1px] border-gray-700 rounded-md p-1">
                                {creature.description}
                              </div>
                            </div>
                          )}
                          {isAttack && (
                            <div className="flex items-center justify-center w-full gap-2 h-[267px]">
                              <div className="relative border-[1px] border-gray-800 rounded-md w-[48%] h-[97%]">
                                <button
                                  className="border-[2px] border-gray-400 p-1 cursor-pointer absolute top-0 right-0 mt-1 mr-2"
                                  onClick={(e) => {
                                    setIsCreature("");
                                    setIsModalCreateAttack(true);
                                    setIsIndex(index);
                                  }}
                                >
                                  <RiAddFill size="12px" />
                                </button>
                                <div className="w-full flex items-center justify-center h-[30px] text-xl">
                                  Ataques
                                </div>
                                <div className="h-[89%] w-full overflow-y-scroll scrollbar">
                                  {creature.damage.map((attack) => {
                                    return (
                                      <div className="w-[99%] ml-1 mt-2 pl-3 border-[1px] border-gray-700 rounded-md">
                                        <div className="flex gap-1 items-center">
                                          <div className="font-bold text-lg">
                                            {attack.name}
                                          </div>
                                          <p>{attack.reach}</p>
                                        </div>
                                        <div
                                          className="flex flex-wrap
                                        lg:gap-2
                                        xl:gap-2
                                        2xl:gap-2
                                        "
                                        >
                                          <div className="flex gap-1 items-center">
                                            <p
                                              className="font-bold text-lg cursor-pointer hover:text-red-300"
                                              onClick={() => {
                                                RollTest(attack.valueTest);
                                                setIsModalTest(true);
                                                handleClick();
                                              }}
                                            >
                                              Teste
                                            </p>
                                            {attack.valueTest.map(
                                              (el, index) => {
                                                return (
                                                  <p>
                                                    {el}
                                                    {index !==
                                                      attack.valueTest.length -
                                                        1 && "+"}
                                                  </p>
                                                );
                                              }
                                            )}
                                          </div>
                                          |
                                          <div className="flex gap-1 items-center">
                                            <p
                                              className="font-bold text-lg cursor-pointer hover:text-red-300"
                                              onClick={() => {
                                                RollDamage(attack.damage);
                                                setIsModalRollAttack(true);
                                                handleClick();
                                              }}
                                            >
                                              Dano
                                            </p>
                                            {attack.damage.map((el, index) => {
                                              return (
                                                <p>
                                                  {el}
                                                  {index !==
                                                    attack.damage.length - 1 &&
                                                    "+"}
                                                </p>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                              <div className="relative border-[1px] border-gray-800 rounded-md w-[48%] h-[97%]">
                                <button
                                  className="border-[2px] border-gray-400 p-1 cursor-pointer absolute top-0 right-0 mt-1 mr-2"
                                  onClick={(e) => {
                                    setIsCreature("");
                                    setIsModalCreateAbility(true);
                                    setIsIndex(index);
                                  }}
                                >
                                  <RiAddFill size="12px" />
                                </button>
                                <div className="w-full flex items-center justify-center h-[30px] text-xl">
                                  Habilidades
                                </div>
                                <div className="h-[89%] w-full overflow-y-scroll scrollbar">
                                  {creature.ability.map((abi) => {
                                    return (
                                      <div className="w-[99%] ml-1 mt-2 pl-3 border-[1px] border-gray-700 rounded-md p-1">
                                        <p>
                                          {abi.action} |{" "}
                                          <span className="font-bold">
                                            {abi.name}
                                          </span>
                                        </p>
                                        <p className="pl-5 text-base">
                                          {abi.description}
                                        </p>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="border-[1px] border-gray-800 rounded-md w-[49%] h-[620px] flex flex-col items-center">
            <div className="w-[98%] h-[7%] flex items-center justify-between border-b-[3px] border-gray-800">
              <div className="w-[28px] h-[28px]" />
              <div className="h-full flex items-center">Criaturas</div>
              <div
                className="border-[2px] border-gray-400 p-1 cursor-pointer"
                onClick={(e) => {
                  setIsCreature("monster");
                  setIsModalCreateCreature(true);
                }}
              >
                <RiAddFill />
              </div>
            </div>
            <div className="h-[568px] w-[95%] overflow-y-scroll scrollbar">
              {players !== undefined &&
                players.creatures.map((creature, index) => {
                  return (
                    <div
                      className="border-[2px] border-gray-800 rounded-md w-full flex flex-col items-center mt-4"
                      key={index}
                    >
                      <p
                        className="font-bold text-xl mt-1 text-red-700 cursor-pointer"
                        onClick={() => toggleDisplayCreature(index)}
                      >
                        {creature.name}
                      </p>
                      {displayCreature[index] && (
                        <div className="w-full h-full">
                          <div className="w-full flex flex-col items-center justify-center h-[80px]">
                            <div className="flex flex-wrap gap-2 w-full justify-center">
                              <button
                                className={
                                  isInfoCreature
                                    ? "bg-gray-700 p-1 rounded-lg w-[80px]"
                                    : "bg-gray-1000 p-1 rounded-lg w-[80px]"
                                }
                                onClick={() => {
                                  setIsInfoCreature(true);
                                  setIsDefeatCreature(false);
                                  setIsSkillsCreature(false);
                                  setIsOtherCreature(false);
                                  setIsAttack(false);
                                }}
                              >
                                Status
                              </button>
                              <button
                                className={
                                  isDefeatCreature
                                    ? "bg-gray-700 p-1 rounded-lg w-[80px]"
                                    : "bg-gray-1000 p-1 rounded-lg w-[80px]"
                                }
                                onClick={() => {
                                  setIsInfoCreature(false);
                                  setIsDefeatCreature(true);
                                  setIsSkillsCreature(false);
                                  setIsOtherCreature(false);
                                  setIsAttack(false);
                                }}
                              >
                                Defesas
                              </button>
                              <button
                                className={
                                  isSkillsCreature
                                    ? "bg-gray-700 p-1 rounded-lg w-[80px]"
                                    : "bg-gray-1000 p-1 rounded-lg w-[80px]"
                                }
                                onClick={() => {
                                  setIsInfoCreature(false);
                                  setIsDefeatCreature(false);
                                  setIsSkillsCreature(true);
                                  setIsOtherCreature(false);
                                  setIsAttack(false);
                                }}
                              >
                                Perícias
                              </button>
                              <button
                                className={
                                  isAttack
                                    ? "bg-gray-700 p-1 rounded-lg w-[80px]"
                                    : "bg-gray-1000 p-1 rounded-lg w-[80px]"
                                }
                                onClick={() => {
                                  setIsInfoCreature(false);
                                  setIsDefeatCreature(false);
                                  setIsSkillsCreature(false);
                                  setIsOtherCreature(false);
                                  setIsAttack(true);
                                }}
                              >
                                Ataque
                              </button>
                              <button
                                className={
                                  isOtherCreature
                                    ? "bg-gray-700 p-1 rounded-lg w-[80px]"
                                    : "bg-gray-1000 p-1 rounded-lg w-[80px]"
                                }
                                onClick={() => {
                                  setIsInfoCreature(false);
                                  setIsDefeatCreature(false);
                                  setIsSkillsCreature(false);
                                  setIsOtherCreature(true);
                                  setIsAttack(false);
                                }}
                              >
                                Outros
                              </button>
                            </div>
                          </div>
                          {isInfoCreature && (
                            <div className="flex flex-col items-center justify-center w-full gap-3 h-[267px]">
                              <div className="flex flex-col items-center">
                                <p>Atributos</p>
                                <div className="flex gap-1">
                                  <button
                                    className="bg-gray-800 p-1 rounded-lg w-[60px]"
                                    onClick={() => {
                                      RollAtri(
                                        parseInt(creature.attributes.force)
                                      );
                                      setIsModalRollAtributes(true);
                                      handleClick();
                                    }}
                                  >
                                    FOR:{creature.attributes.force}
                                  </button>
                                  <button
                                    className="bg-gray-800 p-1 rounded-lg w-[60px]"
                                    onClick={() => {
                                      RollAtri(
                                        parseInt(creature.attributes.agility)
                                      );
                                      setIsModalRollAtributes(true);
                                      handleClick();
                                    }}
                                  >
                                    AGI:{creature.attributes.agility}
                                  </button>
                                  <button
                                    className="bg-gray-800 p-1 rounded-lg w-[60px]"
                                    onClick={() => {
                                      RollAtri(
                                        parseInt(
                                          creature.attributes.intelligence
                                        )
                                      );
                                      setIsModalRollAtributes(true);
                                      handleClick();
                                    }}
                                  >
                                    INT:{creature.attributes.intelligence}
                                  </button>
                                  <button
                                    className="bg-gray-800 p-1 rounded-lg w-[60px]"
                                    onClick={() => {
                                      RollAtri(
                                        parseInt(creature.attributes.presence)
                                      );
                                      setIsModalRollAtributes(true);
                                      handleClick();
                                    }}
                                  >
                                    PRE:{creature.attributes.presence}
                                  </button>
                                  <button
                                    className="bg-gray-800 p-1 rounded-lg w-[60px]"
                                    onClick={() => {
                                      RollAtri(
                                        parseInt(creature.attributes.energy)
                                      );
                                      setIsModalRollAtributes(true);
                                      handleClick();
                                    }}
                                  >
                                    VIG:{creature.attributes.energy}
                                  </button>
                                </div>
                              </div>
                              <div className="w-[80%] flex flex-col items-center">
                                <p>Vida</p>
                                <div className="text-xl flex items-center justify-center w-full h-[25px] rounded-[3px] border-none bg-red-500">
                                  <input
                                    className="appearance-none text-xl w-[50px] h-[25px] bg-transparent border-none text-right text-white focus:outline-none"
                                    defaultValue={creature.status.currentLife}
                                  />
                                  /
                                  <input
                                    className="text-xl w-[50px] h-[25px] bg-transparent border-none text-white focus:outline-none"
                                    defaultValue={creature.status.maximumLife}
                                  />
                                </div>
                              </div>
                              <div className="w-[80%] flex flex-col items-center">
                                <p>Sanidade</p>
                                <div className="text-xl flex items-center justify-center w-full h-[25px] rounded-[3px] border-none bg-blue-1000">
                                  <input
                                    className="appearance-none text-xl w-[50px] h-[25px] bg-transparent border-none text-right text-white focus:outline-none"
                                    defaultValue={creature.status.currentSanity}
                                  />
                                  /
                                  <input
                                    className="text-xl w-[50px] h-[25px] bg-transparent border-none text-white focus:outline-none"
                                    defaultValue={creature.status.maximumSanity}
                                  />
                                </div>
                              </div>
                              <div className="w-[80%] flex flex-col items-center">
                                <p>Esforço</p>
                                <div className="text-xl flex items-center justify-center w-full h-[25px] rounded-[3px] border-none bg-yellow-600">
                                  <input
                                    className="appearance-none text-xl w-[50px] h-[25px] bg-transparent border-none text-right text-white focus:outline-none"
                                    defaultValue={creature.status.currentEffort}
                                  />
                                  /
                                  <input
                                    className="text-xl w-[50px] h-[25px] bg-transparent border-none text-white focus:outline-none"
                                    defaultValue={creature.status.maximumEffort}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                          {isDefeatCreature && (
                            <div className="flex flex-col items-center justify-evenly w-full h-[267px]">
                              <div className="flex flex-col items-center">
                                <p className="font-bold text-lg">Defesa</p>
                                <div className="w-[80px] h-[80px] relative flex items-center justify-center">
                                  <img
                                    className="w-[60px] absolute"
                                    src="/shield.png"
                                    alt=""
                                  />
                                  <p>{creature.defeat}</p>
                                </div>
                              </div>
                              <div className="flex flex-col items-center w-full">
                                <p className="font-bold text-lg">
                                  Resistências
                                </p>
                                <div className="w-full flex flex-wrap gap-3 items-center justify-center">
                                  {creature.resistances.map((res) => {
                                    let background = "";
                                    if (res.name === "Conhecimento") {
                                      background = "#c29a65";
                                    } else if (res.name === "Energia") {
                                      background =
                                        "radial-gradient(circle, rgba(46,0,97,1) 0%, rgba(72,11,139,1) 33%, rgba(146,116,180,1) 59%, rgba(97,33,168,1) 100%)";
                                    } else if (res.name === "Morte") {
                                      background = "#302a2b";
                                    } else if (res.name === "Sangue") {
                                      background =
                                        "radial-gradient(circle, rgba(102,6,6,1) 0%, rgba(218,0,0,1) 50%, rgba(68,3,3,1) 100%)";
                                    } else if (res.name === "Fisica") {
                                      background =
                                        "linear-gradient(90deg, rgba(125,134,191,1) 0%, rgba(37,42,73,1) 52%, rgba(125,134,191,1) 100%)";
                                    } else if (res.name === "Balistica") {
                                      background =
                                        "linear-gradient(90deg, rgba(166,166,166,1) 0%, rgba(17,17,17,1) 52%, rgba(145,145,145,1) 100%)";
                                    } else if (res.name === "Mental") {
                                      background = "#0d145c";
                                    }
                                    if (res.value !== "") {
                                      return (
                                        <div
                                          className="border-[1px] border-white p-1 rounded-md"
                                          style={{ background }}
                                        >
                                          {res.name}: {res.value}
                                        </div>
                                      );
                                    }
                                  })}
                                </div>
                              </div>
                            </div>
                          )}
                          {isSkillsCreature && (
                            <div className="relative flex flex-col items-center justify-center w-full gap-3 h-[267px]">
                              <button
                                className="border-[2px] border-gray-400 p-1 cursor-pointer absolute top-0 right-0 mr-3"
                                onClick={(e) => {
                                  setIsCreature("monster");
                                  setIsModalCreateSkills(true);
                                  setIsIndex(index);
                                }}
                              >
                                <RiAddFill size="12px" />
                              </button>
                              <div className="w-full h-full flex flex-wrap gap-3 items-center justify-center">
                                {creature.skills.map((skill) => {
                                  return (
                                    <button
                                      className="flex p-1 border-[1px] gap-1 border-white rounded-md"
                                      onClick={() => {
                                        RollSkill(skill, creature);
                                        setIsModalRollSkills(true);
                                        handleClick();
                                      }}
                                    >
                                      <p>{skill.skillName}:</p>
                                      <p>+{skill.other}</p>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                          {isAttack && (
                            <div className="flex items-center justify-center w-full gap-2 h-[267px]">
                              <div className="relative border-[1px] border-gray-800 rounded-md w-[48%] h-[97%]">
                                <button
                                  className="border-[2px] border-gray-400 p-1 cursor-pointer absolute top-0 right-0 mt-1 mr-2"
                                  onClick={(e) => {
                                    setIsCreature("monster");
                                    setIsModalCreateAttack(true);
                                    setIsIndex(index);
                                  }}
                                >
                                  <RiAddFill size="12px" />
                                </button>
                                <div className="w-full flex items-center justify-center h-[30px] text-xl">
                                  Ataques
                                </div>
                                <div className="h-[89%] w-full overflow-y-scroll scrollbar">
                                  {creature.damage.map((attack) => {
                                    return (
                                      <div className="w-[99%] ml-1 mt-2 pl-3 border-[1px] border-gray-700 rounded-md">
                                        <div className="flex gap-1 items-center">
                                          <div className="font-bold text-lg">
                                            {attack.name}
                                          </div>
                                          <p>{attack.reach}</p>
                                        </div>
                                        <div
                                          className="flex flex-wrap
                                        lg:gap-2
                                        xl:gap-2
                                        2xl:gap-2
                                        "
                                        >
                                          <div className="flex gap-1 items-center">
                                            <p
                                              className="font-bold text-lg cursor-pointer hover:text-red-300"
                                              onClick={() => {
                                                RollTest(attack.valueTest);
                                                setIsModalTest(true);
                                                handleClick();
                                              }}
                                            >
                                              Teste
                                            </p>
                                            {attack.valueTest.map(
                                              (el, index) => {
                                                return (
                                                  <p>
                                                    {el}
                                                    {index !==
                                                      attack.valueTest.length -
                                                        1 && "+"}
                                                  </p>
                                                );
                                              }
                                            )}
                                          </div>
                                          |
                                          <div className="flex gap-1 items-center">
                                            <p
                                              className="font-bold text-lg cursor-pointer hover:text-red-300"
                                              onClick={() => {
                                                RollDamage(attack.damage);
                                                setIsModalRollAttack(true);
                                                handleClick();
                                              }}
                                            >
                                              Dano
                                            </p>
                                            {attack.damage.map((el, index) => {
                                              return (
                                                <p>
                                                  {el}
                                                  {index !==
                                                    attack.damage.length - 1 &&
                                                    "+"}
                                                </p>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                              <div className="relative border-[1px] border-gray-800 rounded-md w-[48%] h-[97%]">
                                <button
                                  className="border-[2px] border-gray-400 p-1 cursor-pointer absolute top-0 right-0 mt-1 mr-2"
                                  onClick={(e) => {
                                    setIsCreature("monster");
                                    setIsModalCreateAbility(true);
                                    setIsIndex(index);
                                  }}
                                >
                                  <RiAddFill size="12px" />
                                </button>
                                <div className="w-full flex items-center justify-center h-[30px] text-xl">
                                  Habilidades
                                </div>
                                <div className="h-[89%] w-full overflow-y-scroll scrollbar">
                                  {creature.ability.map((abi) => {
                                    return (
                                      <div className="w-[99%] ml-1 mt-2 pl-3 border-[1px] border-gray-700 rounded-md p-1">
                                        <p>
                                          {abi.action} |{" "}
                                          <span className="font-bold">
                                            {abi.name}
                                          </span>
                                        </p>
                                        <p className="pl-5 text-base">
                                          {abi.description}
                                        </p>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          )}
                          {isOtherCreature && (
                            <div className="flex flex-col items-center justify-center w-full gap-2 h-[267px]">
                              <p className="font-bold text-xl">Descrição</p>
                              <div className="w-[70%] h-[220px] mb-3 overflow-y-scroll scrollbar border-[1px] border-gray-700 rounded-md p-1">
                                {creature.description}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section;

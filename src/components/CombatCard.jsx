import { useState, useEffect } from "react";
import { ModalLarge, ModalSmall } from "./Modal";
import { db } from "../auth/Config";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
import { RiAddFill } from "react-icons/ri";

const CombatCard = (record) => {
  const [isModalCreateArms, setIsModalCreateArms] = useState(false);
  const [isModalVisibleDamage, setIsModalVisibleDamage] = useState(false);
  const [isModalRollAttack, setIsModalRollAttack] = useState(false);
  const [rollTestAttack, setRollTestAttack] = useState();
  const [rollResultAttack, setRollResultAttack] = useState();
  const [show, setShow] = useState(false);
  const [result, setResult] = useState({});
  const [getGuns, setGetGuns] = useState([]);
  const [damages, setDamages] = useState([]);
  const [guns, setGuns] = useState({
    name: "",
    type: "",
    ammunition: "",
    reach: "",
    critical: "",
    category: "",
    proficiency: "",
  });

  useEffect(() => {
    getDocAllGuns();
  }, []);

  const typesDamage = [
    { value: "", label: "Escolha o Tipo de dano" },
    { value: "Corte(C)", label: "Corte(C)" },
    { value: "Impacto(I)", label: "Impacto(I)" },
    { value: "Perfuração(P)", label: "Perfuração(P)" },
    { value: "Balístico(B)", label: "Balístico(B)" },
  ];

  const categories = [
    { value: "", label: "Selecione uma categoria" },
    { value: "0", label: "0" },
    { value: "I", label: "I" },
    { value: "II", label: "II" },
    { value: "III", label: "III" },
    { value: "IV", label: "IV" },
  ];

  const proficiencies = [
    { value: "", label: "Tem Proficiência?" },
    { value: "No", label: "Não -2d20" },
    { value: "Yes", label: "Sim" },
  ];

  const ammunition = [
    { value: "", label: "Escolha o Tipo de Munição" },
    { value: "", label: "Não utiliza balas" },
    {
      value: "Balas Curtas",
      label: "Balas Curtas - Um pacote dura duas cenas",
    },
    { value: "Balas Longas", label: "Balas Longas - Um pacote dura uma cena" },
    { value: "Cartuchos", label: "Cartuchos - Um pacote dura uma cena" },
    { value: "Combustível", label: "Combustível - Um pacote dura uma cena" },
    { value: "Flechas", label: "Flechas - Um pacote dura uma missão inteira" },
    { value: "Foguete", label: "Foguete - precisará carregar vários foguetes" },
  ];

  const reach = [
    { value: "", label: "Escolha o alcance" },
    { value: "9m/6Q", label: "Curto(9m, ou 6 quadrados)" },
    { value: "18m/12Q", label: "Médio(18m ou 12quadrados)" },
    { value: "36m/24Q", label: "Longo(36m ou 24 quadrados)" },
    { value: "90m/60Q", label: "Extremo(90m ou 60 quadrados)" },
  ];

  async function getDocAllGuns() {
    const { docs } = await db
      .collection("guns")
      .where("uid", "==", record.value.uid)
      .get();
    setGetGuns(docs[0].data());
  }

  const handleClick = () => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 2000);
  };

  async function createGuns() {
    const damage = [...damages];
    const newGuns = { ...guns, damage };
    setGuns(newGuns);
    const newArray = [...getGuns.arrayGuns, newGuns];
    await db.collection("guns").doc(record.value.uid).set(
      {
        arrayGuns: newArray,
      },
      { merge: true }
    );
    getDocAllGuns();
  }

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
    setResult({
      ...result,
      newValue: sum.reduce(
        (acctualValue, currentValue) => acctualValue + currentValue,
        0
      ),
      calc: value,
    });
  };

  async function deletedGun(index) {
    const newArray = [...getGuns.arrayGuns];
    newArray.splice(index, 1);
    await db.collection("guns").doc(record.value.uid).set(
      {
        arrayGuns: newArray,
      },
      { merge: true }
    );
    getDocAllGuns();
  }

  // function RollTest(el) {
  //   const diceRoll =
  //     el === "No"
  //       ? Math.floor(Math.random() * 20 + 1) -
  //         Math.floor(Math.random() * 20 + 1) -
  //         Math.floor(Math.random() * 20 + 1)
  //       : Math.floor(Math.random() * 20 + 1);

  //   setRollResultAttack(diceRoll);
  // }

  return (
    <>
      {isModalCreateArms ? (
        <ModalLarge
          onClose={(e) => {
            setIsModalCreateArms(false);
            setDamages([]);
          }}
        >
          <div className="flex flex-col items-center justify-between w-full h-full">
            <div className="w-full border-b-[1px] border-white p-2 flex items-center justify-center text-xl font-bold">
              CRIAR ARMA
            </div>
            <div className="w-[70%]">
              <p className="text-[0.8vw]">Nome:</p>
              <input
                className="bg-transparent w-full border-b-[2px] border-gray-900 focus:outline-none"
                placeholder="Ex: Revolver"
                onChange={(e) => setGuns({ ...guns, name: e.target.value })}
              />
            </div>
            <div className="w-[70%]">
              <p className="text-[0.8vw]">Tipo:</p>
              <select
                className="bg-transparent w-full border-b-[2px] border-gray-900 focus:outline-none"
                onChange={(e) => setGuns({ ...guns, type: e.target.value })}
              >
                {typesDamage.map((option) => (
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
            <div className="w-[70%]">
              <p className="text-[0.8vw]">Proficiência:</p>
              <select
                className="bg-transparent w-full border-b-[2px] border-gray-900 focus:outline-none"
                onChange={(e) =>
                  setGuns({ ...guns, proficiency: e.target.value })
                }
              >
                {proficiencies.map((option) => (
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
            <div className="w-[70%]">
              <p className="text-[0.8vw]">Dano</p>
              <div className="flex gap-[0.5vw]">
                {damages.map((damage, index) => {
                  return (
                    <div>
                      <input
                        placeholder="ex:2d8"
                        key={index}
                        className="bg-transparent border-[2px] border-gray-900 w-[2.5vw] text-center text-[0.8vw]"
                        onChange={(e) => handleChangedDamage(e, index)}
                      />
                    </div>
                  );
                })}
                <button
                  title="Adicionar dano"
                  className="bg-red-800 p-[0.1vw]"
                  onClick={(e) => addDamageInput()}
                >
                  <RiAddFill />
                </button>
              </div>
            </div>
            <div className="w-[70%]">
              <p className="text-[0.8vw]">Munição:</p>
              <select
                className="bg-transparent w-full border-b-[2px] border-gray-900 focus:outline-none"
                onChange={(e) =>
                  setGuns({ ...guns, ammunition: e.target.value })
                }
              >
                {ammunition.map((option) => (
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
            <div className="w-[70%]">
              <p className="text-[0.8vw]">Alcance</p>
              <select
                className="bg-transparent w-full border-b-[2px] border-gray-900 focus:outline-none"
                onChange={(e) => setGuns({ ...guns, reach: e.target.value })}
              >
                {reach.map((option) => (
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
            <div className="w-[70%]">
              <p className="text-[0.8vw]">Crítico</p>
              <div className="flex gap-[0.3vw]">
                <input
                  className="bg-transparent w-full border-b-[2px] border-gray-900 focus:outline-none"
                  placeholder="Ex: 2X"
                  onChange={(e) =>
                    setGuns({ ...guns, critical: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="w-[70%]">
              <p>Categoria:</p>
              <select
                className="bg-transparent w-full border-b-[2px] border-gray-900 focus:outline-none"
                onChange={(e) => setGuns({ ...guns, category: e.target.value })}
              >
                {categories.map((option) => (
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
            <button
              className="bg-red-1000 w-28 rounded-md mb-4"
              onClick={() => {
                createGuns();
                setIsModalCreateArms(false);
              }}
            >
              Criar
            </button>
          </div>
        </ModalLarge>
      ) : null}
      {isModalVisibleDamage ? (
        <ModalSmall
          onClose={(e) => {
            setIsModalVisibleDamage(false);
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
                    {result.calc.map((el, index) => {
                      return (
                        <p className="text-xl">
                          {el}
                          {index !== result.calc.length - 1 && "+"}
                        </p>
                      );
                    })}
                  </div>
                  <div className="text-4xl font-bold">{result.newValue}</div>
                </>
              )}
            </div>
          </div>
        </ModalSmall>
      ) : null}
      {isModalRollAttack ? (
        <ModalSmall
          onClose={(e) => {
            setIsModalRollAttack(false);
          }}
        >
          <div className="w-full h-full">
            <div className="w-full border-b-[1px] border-white p-2 flex items-center justify-center text-xl font-bold">
              ROLAGEM DE ATAQUE
            </div>
            <div className="h-[80%] flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                {!show && (
                  <div className="h-[80%] flex items-center">
                    <div className="w-5 h-5 rounded-full bg-white animate-ping" />
                  </div>
                )}
                {show && (
                  <>
                    <p className="text-xl">
                      1d20{rollTestAttack === "No" ? "-2d20" : null}
                    </p>
                    <div
                      className={
                        rollResultAttack === 20
                          ? "text-5xl font-bold text-green-500 animate-pulse"
                          : "text-5xl font-bold"
                      }
                    >
                      {rollResultAttack < 1 ? 1 : rollResultAttack}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </ModalSmall>
      ) : null}
      <div
        className="bg-black-opacity w-[99%] h-[638px] rounded-md flex flex-col items-center border-[1px] border-gray-800
        2xl:w-[79%] 2xl:h-[720px]
        "
      >
        <div className="w-[96%] flex items-center justify-between border-b-[1px] border-gray-800 pt-[15px] pb-[15px]">
          <div className="w-[67.52px]" />
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-2xl">COMBATE</p>
          </div>
          <div className="flex items-center gap-[0.6vw]">
            <div
              title="Criar armas"
              className="border-[2px] border-gray-400 p-1 cursor-pointer"
              onClick={() => {
                setIsModalCreateArms(true);
              }}
            >
              <RiAddFill />
            </div>
            <div
              title="Editar armas (Em Desenvolvimento)"
              className="border-[2px] border-gray-400 p-1 cursor-pointer"
            >
              <AiFillEye />
            </div>
          </div>
        </div>
        <div className="w-[96%] h-12 flex border-b-[3px] border-gray-800 items-end pb-[4px]">
          <div className="flex w-[60%] justify-around">
            <p className="w-[35%] text-base">Arma</p>
            <p className="w-[25%] text-base">Tipo</p>
            <p className="w-[25%] text-base">Dano</p>
          </div>
          <div className="flex w-[40%] justify-between">
            <p className="w-[17%] text-center text-base">Munição</p>
            <p className="w-[17%] text-center text-base">Alcance</p>
            <p className="w-[17%] text-center text-base">Crítico</p>
            <p className="w-[17%] text-center text-base">Categoria</p>
          </div>
        </div>
        {/* mapGuns */}
        <div className="w-full h-[520px] overflow-y-auto scrollbar flex justify-center ml-[4%]">
          <div className="w-full">
            {getGuns.length !== 0 &&
              getGuns.arrayGuns.map((gun, index) => {
                return (
                  <div className="w-[96%] h-12 flex border-b-[1px] border-gray-800 items-end pb-[4px]">
                    <div className="flex w-[60%] justify-around items-center">
                      <div className="w-[35%] flex items-center gap-2 truncate">
                        <div
                          className="border-[1px] w-[10%] border-gray-600 flex items-center justify-center p-1 cursor-pointer"
                          onClick={() => {
                            deletedGun(index);
                          }}
                        >
                          <BsFillTrashFill />
                        </div>
                        <p className="text-base">{gun.name}</p>
                      </div>
                      <p className="w-[25%] text-base">{gun.type}</p>
                      <div className="w-[25%] truncate">
                        <div className="flex w-[170px] gap-1 items-center">
                          <img
                            className="w-7 cursor-pointer hover:animate-spin rounded-full"
                            src="/d20.svg"
                            alt="dado"
                            onClick={() => {
                              RollDamage(gun.damage);
                              setIsModalVisibleDamage(true);
                              handleClick();
                            }}
                          />
                          <p className="w-[25%] text-base flex">
                            {gun.damage.map((el, index) => {
                              return (
                                <p>
                                  {el}
                                  {index !== gun.damage.length - 1 && "+"}
                                </p>
                              );
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-[40%] h-[66%] justify-between items-center">
                      <p className="w-[17%] text-center text-base">
                        {gun.ammunition}
                      </p>
                      <p className="w-[17%] text-center text-base">
                        {gun.reach}
                      </p>
                      <p className="w-[17%] text-center text-base">
                        {gun.critical}
                      </p>
                      <p className="w-[17%] text-center text-base">
                        {gun.category}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CombatCard;

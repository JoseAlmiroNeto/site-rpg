import { useState, useEffect } from "react";
import { db } from "../auth/Config";
import {
  AiFillEye,
  AiOutlineAim,
  AiOutlineTeam,
  AiFillMedicineBox,
} from "react-icons/ai";
import { RiAddFill, RiSpyFill, RiSuitcaseFill } from "react-icons/ri";
import { BiRun } from "react-icons/bi";
import {
  GiSittingDog,
  GiForest,
  GiLightningTear,
  GiMountainClimbing,
  GiHandcuffed,
  GiDrippingKnife,
  GiStrong,
  GiBoltEye,
  GiSpy,
  GiStarSattelites,
  GiEyeball,
  GiSteeringWheel,
} from "react-icons/gi";
import { MdFilterFrames, MdScience } from "react-icons/md";
import { BsFillCpuFill, BsFillPencilFill } from "react-icons/bs";
import { HiOutlinePresentationChartLine } from "react-icons/hi";
import {
  FaGlobe,
  FaHandSparkles,
  FaPrayingHands,
  FaBookReader,
  FaHeartBroken,
  FaHandRock,
} from "react-icons/fa";
import { ModalSmall, ModalAverage } from "./Modal";
import RollPeri from "../functions/RollPeri";

const SkillsCard = (record) => {
  const [isModalCreateSkills, setIsModalCreateSkills] = useState(false);
  const [isModalRollSkills, setIsModalRollSkills] = useState(false);
  const [isEditSkills, setIsEditSkills] = useState(false);
  const [isModalEditSkill, setIsModalEditSkill] = useState(false);
  const [getSkills, setGetSkills] = useState([]);
  const [skillRoll, setSkillRoll] = useState();
  const [show, setShow] = useState(false);
  const [skills, setSkills] = useState({
    skillName: "",
    keyAttribute: "",
    bonus: 0,
    other: 0,
    trained: "",
    trainedValue: "",
  });
  const [editSkills, setEditSkills] = useState({});
  const [newInfoSkill, setNewInfoSkill] = useState({
    bonus: 0,
    other: 0,
    trained: "",
    trainedValue: "",
    keyAttribute: "",
    skillName: "",
  });

  useEffect(() => {
    getAllSkills();
  }, []);

  const handleClick = () => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 2000);
  };

  async function getAllSkills() {
    const { docs } = await db
      .collection("skills")
      .where("uid", "==", record.value.uid)
      .get();
    setGetSkills(docs[0].data());
  }

  const iconMap = {
    "Acrobacia(AGI)": <BiRun size="34px" />,
    "Adestramento(PRE)": <GiSittingDog size="34px" />,
    "Artes(PRE)": <MdFilterFrames size="34px" />,
    "Atletismo(FOR)": <GiMountainClimbing size="34px" />,
    "Atualidades(INT)": <FaGlobe size="34px" />,
    "Ciências(INT)": <MdScience size="34px" />,
    "Crime(AGI)": <GiHandcuffed size="34px" />,
    "Diplomacia(PRE)": <FaBookReader size="34px" />,
    "Enganação(PRE)": <GiDrippingKnife size="34px" />,
    "Fortitude(VIG)": <FaHeartBroken size="34px" />,
    "Furtividade(AGI)": <RiSpyFill size="34px" />,
    "Iniciativa(AGI)": <AiOutlineTeam size="34px" />,
    "Intimidação(PRE)": <GiStrong size="34px" />,
    "Intuição(INT)": <GiBoltEye size="34px" />,
    "Investigação(INT)": <GiSpy size="34px" />,
    "Luta(FOR)": <FaHandRock size="34px" />,
    "Medicina(INT)": <AiFillMedicineBox size="34px" />,
    "Ocultismo(INT)": <GiStarSattelites size="34px" />,
    "Percepção(PRE)": <GiEyeball size="34px" />,
    "Pilotagem(AGI)": <GiSteeringWheel size="34px" />,
    "Pontaria(AGI)": <AiOutlineAim size="34px" />,
    "Profissão(INT)": <RiSuitcaseFill size="34px" />,
    "Reflexos(AGI)": <GiLightningTear size="34px" />,
    "Religião(PRE)": <FaPrayingHands size="34px" />,
    "Sobrevivência(INT)": <GiForest size="34px" />,
    "Tática(INT)": <HiOutlinePresentationChartLine size="34px" />,
    "Tecnologia(INT)": <BsFillCpuFill size="34px" />,
    "Vontade(PRE)": <FaHandSparkles size="34px" />,
  };

  const allowedNames = [
    "Adestramento(PRE)",
    "Artes(PRE)",
    "Ciências(INT)",
    "Crime(AGI)",
    "Ocultismo(INT)",
    "Pilotagem(AGI)",
    "Profissão(INT)",
    "Religião(PRE)",
    "Tática(INT)",
    "Tecnologia(INT)",
  ];

  const allowedValues = [
    "Destreinado",
    "Destreinado",
    "Destreinado",
    "Destreinado",
    "Destreinado",
    "Destreinado",
    "Destreinado",
    "Destreinado",
    "Destreinado",
    "Destreinado",
  ];

  const options = [
    { value: "", label: "", extra1: "" },
    { value: "agility", label: "Acrobacia(AGI)", extra1: "Acrobacia(AGI)" },
    {
      value: "presence",
      label: "Adestramento(PRE)-Treinada",
      extra1: "Adestramento(PRE)",
    },
    { value: "presence", label: "Artes(PRE)-Treinada", extra1: "Artes(PRE)" },
    { value: "force", label: "Atletismo(FOR)", extra1: "Atletismo(FOR)" },
    {
      value: "intelligence",
      label: "Atualidades(INT)",
      extra1: "Atualidades(INT)",
    },
    {
      value: "intelligence",
      label: "Ciências(INT)-Treinada",
      extra1: "Ciências(INT)",
    },
    { value: "agility", label: "Crime(AGI)-Treinada", extra1: "Crime(AGI)" },
    { value: "presence", label: "Diplomacia(PRE)", extra1: "Diplomacia(PRE)" },
    { value: "presence", label: "Enganação(PRE)", extra1: "Enganação(PRE)" },
    { value: "energy", label: "Fortitude(VIG)", extra1: "Fortitude(VIG)" },
    { value: "agility", label: "Furtividade(AGI)", extra1: "Furtividade(AGI)" },
    { value: "agility", label: "Iniciativa(AGI)", extra1: "Iniciativa(AGI)" },
    {
      value: "presence",
      label: "Intimidação(PRE)",
      extra1: "Intimidação(PRE)",
    },
    { value: "intelligence", label: "Intuição(INT)", extra1: "Intuição(INT)" },
    {
      value: "intelligence",
      label: "Investigação(INT)",
      extra1: "Investigação(INT)",
    },
    { value: "force", label: "Luta(FOR)", extra1: "Luta(FOR)" },
    { value: "intelligence", label: "Medicina(INT)", extra1: "Medicina(INT)" },
    {
      value: "intelligence",
      label: "Ocultismo(INT)-Treinada",
      extra1: "Ocultismo(INT)",
    },
    { value: "presence", label: "Percepção(PRE)", extra1: "Percepção(PRE)" },
    {
      value: "agility",
      label: "Pilotagem(AGI)-Treinada",
      extra1: "Pilotagem(AGI)",
    },
    { value: "agility", label: "Pontaria(AGI)", extra1: "Pontaria(AGI)" },
    {
      value: "intelligence",
      label: "Profissão(INT)-Treinada",
      extra1: "Profissão(INT)",
    },
    { value: "agility", label: "Reflexos(AGI)", extra1: "Reflexos(AGI)" },
    {
      value: "presence",
      label: "Religião(PRE)-Treinada",
      extra1: "Religião(PRE)",
    },
    {
      value: "intelligence",
      label: "Sobrevivência(INT)",
      extra1: "Sobrevivência(INT)",
    },
    {
      value: "intelligence",
      label: "Tática(INT)-Treinada",
      extra1: "Tática(INT)",
    },
    {
      value: "intelligence",
      label: "Tecnologia(INT)-Treinada",
      extra1: "Tecnologia(INT)",
    },
    { value: "presence", label: "Vontade(PRE)", extra1: "Vontade(PRE)" },
  ];

  const options1 = [
    { label: "Escolha Um tipo de Treinamento" },
    { value: "0", label: "Destreinado(+0)", extra: "Destreinado" },
    { value: "5", label: "Treinado(+5)", extra: "Treinado" },
    { value: "10", label: "Veterano(+10)", extra: "Veterano" },
    { value: "15", label: "Expert(+15)", extra: "Expert" },
  ];

  const handleChange = (e) => {
    const selectedOption = e.target.selectedOptions[0];
    setSkills({
      ...skills,
      keyAttribute: selectedOption.value,
      skillName: selectedOption.getAttribute("data-extra1"),
    });
  };

  const handleTrained = (e) => {
    const selectedOption = e.target.selectedOptions[0];
    setSkills({
      ...skills,
      trainedValue: selectedOption.value,
      trained: selectedOption.getAttribute("data-extra"),
    });
  };

  const handleEditTrained = (e) => {
    const selectedOption = e.target.selectedOptions[0];
    setNewInfoSkill({
      ...newInfoSkill,
      trainedValue: selectedOption.value,
      trained: selectedOption.getAttribute("data-extra"),
    });
  };

  async function createSkills() {
    const newArray = [...getSkills.arraySkills, skills];
    await db.collection("skills").doc(record.value.uid).set(
      {
        arraySkills: newArray,
      },
      { merge: true }
    );
    getAllSkills();
    setIsModalCreateSkills(false);
    setSkills({});
  }

  async function saveEditSkill(index) {
    const newArray = [...getSkills.arraySkills];
    newArray[index] = newInfoSkill;

    await db.collection("skills").doc(record.value.uid).set(
      {
        arraySkills: newArray,
      },
      { merge: true }
    );
    getAllSkills();
    setIsModalEditSkill(false);
    setNewInfoSkill({});
    setEditSkills({});
  }

  async function deletedSkill(index) {
    const newArray = [...getSkills.arraySkills];
    newArray.splice(index, 1);
    await db.collection("skills").doc(record.value.uid).set(
      {
        arraySkills: newArray,
      },
      { merge: true }
    );
    getAllSkills();
    setIsModalEditSkill(false);
  }

  return (
    <>
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
                {options.map((option) => (
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
              <p>Treinado?</p>
              <select
                onChange={(e) => handleTrained(e)}
                className="bg-transparent w-full border-b-[2px] border-gray-700 focus:outline-none"
              >
                {options1.map((option) => (
                  <option
                    className="bg-black-100 text-white"
                    key={option.label}
                    value={option.value}
                    data-extra={option.extra}
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
                  setSkills({ ...skills, bonus: e.target.value })
                }
              />
            </div>
            <div className="w-[80%] flex flex-col">
              <p>Outro</p>
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
              onClick={(e) => createSkills()}
            >
              Criar
            </button>
          </div>
        </ModalAverage>
      ) : null}
      {isModalEditSkill ? (
        <ModalAverage onClose={(e) => setIsModalEditSkill(false)}>
          <div className="w-full h-full flex flex-col items-center justify-between">
            <div className="w-full border-b-[1px] border-white p-2 flex items-center justify-center text-xl font-bold">
              EDITAR PERÍCIA-{editSkills.info.skillName}
            </div>
            <div className="w-[80%] flex flex-col">
              <p>Treinado?</p>
              <select
                onChange={(e) => handleEditTrained(e)}
                className="bg-transparent w-full border-b-[2px] border-gray-700 focus:outline-none"
              >
                {options1.map((option) => (
                  <option
                    className="bg-black-100 text-white"
                    key={option.label}
                    value={option.value}
                    data-extra={option.extra}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[80%] flex flex-col">
              <p>Bônus</p>
              <input
                defaultValue={editSkills.info.bonus}
                className="bg-transparent w-full border-b-[2px] border-gray-700 focus:outline-none"
                placeholder="Ex: 5"
                type="number"
                onChange={(e) =>
                  setNewInfoSkill({ ...newInfoSkill, bonus: e.target.value })
                }
              />
            </div>
            <div className="w-[80%] flex flex-col">
              <p>Outro</p>
              <input
                defaultValue={editSkills.info.other}
                className="bg-transparent w-full border-b-[2px] border-gray-700 focus:outline-none"
                placeholder="Ex: 5"
                type="number"
                onChange={(e) =>
                  setNewInfoSkill({ ...newInfoSkill, other: e.target.value })
                }
              />
            </div>
            <div className="w-[80%] flex items-center justify-center gap-5">
              <button
                className="bg-red-1000 w-28 rounded-md mb-4"
                onClick={(e) => {
                  saveEditSkill(editSkills.i);
                }}
              >
                Salvar
              </button>
              <button
                className="bg-[#E6E600] w-28 rounded-md mb-4 text-black-100 font-bold"
                onClick={() => deletedSkill(editSkills.i)}
              >
                Excluir
              </button>
            </div>
          </div>
        </ModalAverage>
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
              <div className="h-[80%] flex items-center">
                <RollPeri value={skillRoll} record={record} />
              </div>
            )}
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
            <p className="text-2xl">PERÍCIAS</p>
          </div>
          <div className="flex items-center gap-[0.6vw]">
            <div
              title="Criar Perícias"
              className="border-[2px] border-gray-400 p-1 cursor-pointer"
              onClick={(e) => {
                setIsModalCreateSkills(true);
              }}
            >
              <RiAddFill />
            </div>
            <div
              title="Editar Perícias"
              className={
                isEditSkills
                  ? "border-[2px] border-gray-400 p-1 cursor-pointer animate-pulse"
                  : "border-[2px] border-gray-400 p-1 cursor-pointer"
              }
              onClick={() => {
                setIsEditSkills(!isEditSkills);
              }}
            >
              {isEditSkills ? <BsFillPencilFill /> : <AiFillEye />}
            </div>
          </div>
        </div>
        <div className="overflow-y-auto scrollbar w-full grid grid-cols-4 px-5 pt-2 gap-4">
          {getSkills.length !== 0 &&
            getSkills.arraySkills.map((el, index) => {
              return (
                <div className="h-28" key={index}>
                  <button
                    className={
                      isEditSkills
                        ? "h-28 w-full flex flex-col items-center justify-center gap-2 rounded-md bg-black-200 animate-pulse"
                        : "h-28 w-full flex flex-col items-center justify-center gap-2 rounded-md hover:bg-black-200"
                    }
                    onClick={() => {
                      if (isEditSkills === true) {
                        setIsModalEditSkill(true);
                        setNewInfoSkill({
                          ...newInfoSkill,
                          keyAttribute: el.keyAttribute,
                          skillName: el.skillName,
                        });
                        setEditSkills({ ...editSkills, info: el, i: index });
                      } else {
                        setIsModalRollSkills(true);
                        setSkillRoll(el);
                        handleClick();
                      }
                    }}
                  >
                    {iconMap[el.skillName]}
                    <div className="border-t-[2px] border-gray-800 w-[145px]">
                      <div
                        className={
                          allowedNames.includes(el.skillName) &&
                          allowedValues.includes(el.trained)
                            ? "text-red-300"
                            : ""
                        }
                      >
                        {el.skillName}
                      </div>
                      <div
                        className={
                          allowedNames.includes(el.skillName) &&
                          allowedValues.includes(el.trained)
                            ? "text-red-300"
                            : ""
                        }
                      >
                        {el.trained}
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default SkillsCard;

import React, { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { RiAddFill } from "react-icons/ri";
import { ModalAverage } from "./Modal";
import { db } from "./../auth/Config";
import { BsFillPencilFill } from "react-icons/bs";

const AbilityCard = (record) => {
  const [display, setDisplay] = useState({});
  const [getAbiliitys, setGetAbiliity] = useState([]);
  const [isModalCreateAbiliity, setIsModalCreateAbiliity] = useState(false);
  const [isModalEditAbiliity, setIsModalEditAbiliity] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [newInfoAbiliity, setNewInfoAbiliity] = useState({
    name: "",
    description: "",
  });
  const [newAbiliity, setNewAbiliity] = useState({
    name: "",
    description: "",
  });
  const [editIndex, setEditIndex] = useState();

  useEffect(() => {
    getDocsAbiliity();
  }, []);

  async function getDocsAbiliity() {
    const { docs } = await db
      .collection("abiliity")
      .where("uid", "==", record.value.uid)
      .get();
    setGetAbiliity(docs[0].data());
  }

  const toggleDisplay = (index) => {
    setDisplay({
      ...display,
      [index]: !display[index],
    });
  };

  async function CreateItems() {
    const newArray = [...getAbiliitys.arrayAbiliity, newAbiliity];
    await db.collection("abiliity").doc(record.value.uid).set(
      {
        arrayAbiliity: newArray,
      },
      { merge: true }
    );
    getDocsAbiliity();
    setIsModalCreateAbiliity(false);
    setNewAbiliity({});
  }

  async function EditItems(index) {
    const newArray = [...getAbiliitys.arrayAbiliity];
    newArray[index] = newInfoAbiliity;

    await db.collection("abiliity").doc(record.value.uid).set(
      {
        arrayAbiliity: newArray,
      },
      { merge: true }
    );
    getDocsAbiliity();
    setIsModalEditAbiliity(false);
    setNewAbiliity({});
  }

  return (
    <>
      {isModalCreateAbiliity ? (
        <ModalAverage onClose={(e) => setIsModalCreateAbiliity(false)}>
          <div className="w-full h-full flex flex-col items-center justify-between">
            <div className="w-full border-b-[1px] border-white p-2 flex items-center justify-center text-xl font-bold">
              CRIAR HABILIDADE
            </div>
            <div className="w-[80%] flex flex-col">
              <p>Nome</p>
              <input
                className="bg-transparent w-full border-b-[2px] border-gray-700 focus:outline-none"
                placeholder="Ex: Ataque Especial"
                onChange={(e) =>
                  setNewAbiliity({ ...newAbiliity, name: e.target.value })
                }
              />
            </div>
            <div className="w-[80%] flex flex-col">
              <p>Descrição</p>
              <textarea
                className="bg-transparent w-full border-b-[2px] border-gray-700 focus:outline-none"
                rows="4"
                placeholder="Ex: Quando faz um ataque, você pode..."
                onChange={(e) =>
                  setNewAbiliity({
                    ...newAbiliity,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <button
              className="bg-red-1000 w-28 rounded-md mb-4"
              onClick={(e) => CreateItems()}
            >
              Criar
            </button>
          </div>
        </ModalAverage>
      ) : null}
      {isModalEditAbiliity ? (
        <ModalAverage onClose={(e) => setIsModalEditAbiliity(false)}>
          <div className="w-full h-full flex flex-col items-center justify-between">
            <div className="w-full border-b-[1px] border-white p-2 flex items-center justify-center text-xl font-bold">
              EDITAR HABILIDADE
            </div>
            <div className="w-[80%] flex flex-col">
              <p>Nome</p>
              <input
                defaultValue={newInfoAbiliity.name}
                className="bg-transparent w-full border-b-[2px] border-gray-700 focus:outline-none"
                placeholder="Ex: Ataque Especial"
                onChange={(e) =>
                  setNewInfoAbiliity({
                    ...newInfoAbiliity,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div className="w-[80%] flex flex-col">
              <p>Descrição</p>
              <textarea
                defaultValue={newInfoAbiliity.description}
                className="bg-transparent w-full border-b-[2px] border-gray-700 focus:outline-none"
                rows="4"
                placeholder="Ex: Quando faz um ataque, você pode..."
                onChange={(e) =>
                  setNewInfoAbiliity({
                    ...newInfoAbiliity,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <button
              className="bg-red-1000 w-28 rounded-md mb-4"
              onClick={(e) => EditItems(editIndex)}
            >
              Salvar
            </button>
          </div>
        </ModalAverage>
      ) : null}
      <div
        className="bg-black-opacity rounded-md flex w-[99%] h-[720px] border-[1px] border-gray-800
        md:w-[49%] md:h-[720px]
        lg:w-[49%] lg:h-[720px]
        xl:w-[49%] xl:h-[720px]
        2xl:w-[39%] 2xl:h-[720px]
        "
      >
        <div className="w-full h-full flex flex-col items-center">
          <div className="w-[96%] flex items-center justify-between border-b-[1px] border-gray-800 pt-[15px] pb-[15px]">
            <div className="w-[67.52px]" />
            <div className="flex flex-col items-center justify-center gap-3">
              <p className="text-2xl">HABILIDADES</p>
            </div>
            <div className="flex items-center gap-[0.6vw]">
              <div
                title="Criar habilidades"
                className="border-[2px] border-gray-400 p-1 cursor-pointer"
                onClick={() => {
                  setIsModalCreateAbiliity(true);
                }}
              >
                <RiAddFill />
              </div>
              <div
                title="Editar habilidades"
                className={
                  isEdit
                    ? "border-[2px] border-gray-400 p-1 cursor-pointer animate-pulse"
                    : "border-[2px] border-gray-400 p-1 cursor-pointer"
                }
                onClick={() => setIsEdit(!isEdit)}
              >
                {isEdit ? <BsFillPencilFill /> : <AiFillEye />}
              </div>
            </div>
          </div>
          <div className="w-[95%] h-[561px] flex justify-center mt-3 overflow-y-scroll scrollbar">
            <div className="w-[95%] h-[561px] flex flex-col gap-5">
              {getAbiliitys.length !== 0 &&
                getAbiliitys.arrayAbiliity.map((abiliity, index) => {
                  return (
                    <>
                      <div key={index}>
                        <p
                          className={
                            isEdit
                              ? "cursor-pointer text-xl border-b-[1px] border-gray-800 text-white hover:text-red-800 animate-pulse"
                              : "cursor-pointer text-xl border-b-[1px] border-gray-800 text-white hover:text-red-800"
                          }
                          onClick={() => {
                            if (isEdit) {
                              setIsModalEditAbiliity(true);
                              setNewInfoAbiliity({
                                ...newInfoAbiliity,
                                name: abiliity.name,
                                description: abiliity.description,
                              });
                              setEditIndex(index);
                            } else {
                              toggleDisplay(index);
                            }
                          }}
                        >
                          {abiliity.name}
                        </p>
                        {display[index] && (
                          <p className="text-sm">{abiliity.description}</p>
                        )}
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AbilityCard;

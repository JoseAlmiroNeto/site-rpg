import { useEffect, useState } from "react";
import { db } from "../auth/Config";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
import { RiAddFill } from "react-icons/ri";
import { ModalAverage } from "./Modal";

const Inventory = (record) => {
  const [isModalCreateItems, setIsModalCreateItems] = useState(false);
  const [recordUid, setRecordUid] = useState();
  const [getItems, setGetItems] = useState([]);
  const [usedSpaces, setUsedSpaces] = useState();
  const [items, setItems] = useState({
    name: "",
    description: "",
    spaces: "",
    category: "",
  });

  const categories = [
    { value: "", label: "Selecione uma categoria" },
    { value: "0", label: "0" },
    { value: "I", label: "I" },
    { value: "II", label: "II" },
    { value: "III", label: "III" },
    { value: "IV", label: "IV" },
  ];

  useEffect(() => {
    getItemsInventory();
  }, []);

  useEffect(() => {
    if (getItems.length !== 0) {
      usedSpace();
    }
  }, [getItemsInventory]);

  async function getItemsInventory() {
    const { docs } = await db
      .collection("inventory")
      .where("uid", "==", record.value.uid)
      .get();
    setGetItems(docs[0].data());
  }

  function usedSpace() {
    let arr = [];
    for (let item of getItems.arrayItem) {
      arr.push(parseInt(item.spaces));
    }
    setUsedSpaces(
      arr.reduce((acctualValue, currentValue) => acctualValue + currentValue, 0)
    );
  }

  async function CreateItems(uid) {
    const newArray = [...getItems.arrayItem, items];
    getItemsInventory();
    await db.collection("inventory").doc(uid).set(
      {
        arrayItem: newArray,
      },
      { merge: true }
    );
    getItemsInventory();
    setItems({});
    getItemsInventory();
  }

  async function deletedItem(index) {
    const newArray = [...getItems.arrayItem];
    newArray.splice(index, 1);
    await db.collection("inventory").doc(record.value.uid).set(
      {
        arrayItem: newArray,
      },
      { merge: true }
    );
    getItemsInventory();
  }

  return (
    <>
      {isModalCreateItems ? (
        <ModalAverage onClose={(e) => setIsModalCreateItems(false)}>
          <div className="flex flex-col gap-[15px] items-center justify-between w-full h-full">
            <div className="w-full border-b-[1px] border-white p-2 flex items-center justify-center text-xl font-bold">
              CRIAR ITEM
            </div>
            <div className="w-[60%]">
              <p>Nome:</p>
              <input
                className="bg-transparent border-b-[1px] border-gray-900 h-8 w-full"
                placeholder="Ex: Faca de Ocultista"
                onChange={(e) =>
                  setItems({
                    ...items,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div className="w-[60%]">
              <p>Detalhes:</p>
              <input
                className="bg-transparent border-b-[1px] border-gray-900 h-8 w-full"
                placeholder="Ex: Pista sobre o assassinato!"
                onChange={(e) =>
                  setItems({
                    ...items,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="w-[60%]">
              <p>Espaços:</p>
              <input
                type="number"
                className="bg-transparent border-b-[1px] border-gray-900 h-8 w-full"
                placeholder="Ex: 2"
                onChange={(e) =>
                  setItems({
                    ...items,
                    spaces: e.target.value,
                  })
                }
              />
            </div>
            <div className="w-[60%]">
              <p>Categoria:</p>
              <select
                className="bg-transparent w-full border-b-[2px] border-gray-900 focus:outline-none"
                onChange={(e) =>
                  setItems({ ...items, category: e.target.value })
                }
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
              onClick={(e) => {
                if (items.name === "" || items.category === "") {
                  alert("algum ritual deu errada verifique os sinais");
                } else {
                  CreateItems(recordUid);
                  setIsModalCreateItems(false);
                  getItemsInventory();
                }
              }}
            >
              Criar
            </button>
          </div>
        </ModalAverage>
      ) : null}
      <div
        className="bg-black-opacity w-[99%] h-[638px] rounded-md flex flex-col items-center border-[1px] border-gray-800
      2xl:w-[79%] 2xl:h-[720px]
      "
      >
        <div className="w-[96%] flex items-center justify-between border-b-[1px] border-gray-800 pt-[15px] pb-[15px]">
          <div className="w-[67.52px]" />
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-2xl">INVENTÁRIO</p>
            <p className="text-sm flex gap-1">
              Peso Total:{" "}
              <div
                className={
                  record.value.Attributes.force === 0
                    ? usedSpaces > 4
                      ? "text-red-300"
                      : ""
                    : usedSpaces > record.value.Attributes.force * 5 * 2
                    ? "text-red-300"
                    : ""
                }
              >
                {usedSpaces}
              </div>{" "}
              /{" "}
              {record.value.Attributes.force === 0
                ? 2
                : record.value.Attributes.force * 5}
              <input className="focus:outline-none bg-transparent w-[1.5vw]" />
            </p>
          </div>
          <div className="flex items-center gap-[0.6vw]">
            <div
              title="Criar Item"
              className="border-[2px] border-gray-400 p-1 cursor-pointer"
              onClick={(e) => {
                setIsModalCreateItems(true);
                setRecordUid(record.value.uid);
              }}
            >
              <RiAddFill />
            </div>
            <div
              title="Editar Item (Em Desenvolvimento)"
              className="border-[2px] border-gray-400 p-1 cursor-pointer"
            >
              <AiFillEye />
            </div>
          </div>
        </div>
        <div className="w-[96%] h-full mt-1">
          <div className="flex flex-col gap-4">
            <div className="h-12 w-full flex border-b-[3px] text-base border-gray-800 items-end pb-[4px]">
              <div className="flex w-[75%]">
                <p className="w-[45%] font-bold pl-10">Nome</p>
                <p className="font-bold">Descrição</p>
              </div>
              <div className="flex w-[25%] justify-evenly">
                <p className="font-bold">Espaços</p>
                <p className="font-bold">Categoria</p>
              </div>
            </div>
          </div>
          <div className="w-[100%] h-[490px] overflow-y-auto scrollbar flex justify-center">
            <div className="w-full">
              {getItems.length !== 0 &&
                getItems.arrayItem.map((item, index) => {
                  return (
                    <div
                      className="w-full h-12 flex items-end gap-4 text-base"
                      key={index}
                    >
                      <div className="flex w-[75%] items-end justify-between gap-4">
                        <div className="flex w-[45%] gap-3">
                          <div
                            className="border-[1px] h-[20%] border-gray-600 flex items-center p-1 cursor-pointer"
                            onClick={() => {
                              deletedItem(index);
                              getItemsInventory();
                            }}
                          >
                            <BsFillTrashFill />
                          </div>
                          <p className="bg-transparent flex items-end border-b-[1px] w-full border-gray-800 focus:outline-none truncate">
                            {item.name}
                          </p>
                        </div>
                        <p className="bg-transparent border-b-[1px] w-[55%] border-gray-800 truncate">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex w-[25%] justify-evenly">
                        <p className="bg-transparent border-b-[1px] border-gray-800 w-[30%] text-center">
                          {item.spaces}
                        </p>
                        <p className="bg-transparent border-b-[1px] border-gray-800 w-[30%] text-center">
                          {item.category}
                        </p>
                      </div>
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

export default Inventory;

import { useContext, useEffect, useState } from "react";
import { db, storage } from "../auth/config";
import { Modal, ModalAttack, ModalCreateItems } from "../components/modal";
import firebase from "firebase/app";
import { RollAtributy } from "../components/rollAtributy";
import { GiReturnArrow } from "react-icons/gi";
import { IconContext } from "react-icons";
import { IoMdSettings } from "react-icons/io";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
import { RiAddFill } from "react-icons/ri";

export default function Record() {
  let uid = window.location.href.split("/")[4];

  const [records, setRecords] = useState([]);
  const [isModald100, setIsModald100] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleDamage, setIsModalVisibleDamage] = useState(false);
  const [isModalCreateArms, setIsModalCreateArms] = useState(false);
  const [isModalSanity, setIsModalSanity] = useState(false);
  const [isModalCreateItens, setIsModalCreateItens] = useState(false);
  const [editArms, setEditArms] = useState(false);
  const [dinner, setDinner] = useState();
  const [value, setValue] = useState();
  const [settingsAttri, setSettingsAttri] = useState(false);
  const [recordUid, setRecordUid] = useState("");
  const [weightInvent, setWeigthInvent] = useState([]);
  const [getItems, setGetItems] = useState([]);
  const [sum, setSum] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState();
  const [sani, setSani] = useState([]);
  const [getGuns, setGetGuns] = useState([]);
  const [items, setItems] = useState({
    name: "",
    weight: "",
  });
  const [personal, setPersonal] = useState(false);
  const [damages, setDamages] = useState([]);
  const [result, setResult] = useState();
  const [resultWeigth, setResultWeigth] = useState();
  const [dates, setDates] = useState({
    name: "",
    player: "",
    occupation: "",
    age: "",
    genre: "",
    birthplace: "",
    placeResidence: "",
  });
  const [attributes, setAttributes] = useState({
    appearance: 0,
    constitution: 0,
    dexterity: 0,
    education: 0,
    force: 0,
    intelligence: 0,
    luck: 0,
    movement: 0,
    power: 0,
    size: 0,
  });
  const [status, setStatus] = useState({
    body: 0,
    currentLife: 0,
    currentOccultism: 0,
    currentSanity: 0,
    extraDamage: 0,
    maximumLife: 0,
    maximumOccultism: 0,
    maximumSanity: 0,
    paranormalExposure: 0,
    weight: 0,
  });
  const [guns, setGuns] = useState({
    name: "",
    type: "",
    currentAmmo: "",
    maximumAmmo: "",
    attack: "",
    reach: "",
    defect: "",
    area: "",
  });

  useEffect(() => {
    getRecord();
    getAllGuns();
    getItemsInventory();
  }, []);

  async function getRecord() {
    const { docs } = await db
      .collection("record")
      .where("uid", "==", uid)
      .get();
    setRecords(docs.map((doc) => doc.data()));
  }

  async function getAllGuns() {
    const { docs } = await db
      .collection("guns")
      .where("record", "==", uid)
      .get();
    setGetGuns(docs.map((doc) => doc.data()));
  }

  async function getItemsInventory() {
    setWeigthInvent([]);
    const { docs } = await db
      .collection("inventory")
      .where("record", "==", uid)
      .get();
    const items = docs.map((doc) => doc.data());
    setGetItems(items);

    for (let item of items) {
      let Int = parseFloat(item.weight);
      weightInvent.push(Int);
    }

    setResultWeigth(
      weightInvent.reduce(
        (acctualValue, currentValue) => acctualValue + currentValue,
        0
      )
    );
  }

  async function createGuns(uid) {
    let id = firebase.database().ref().child("guns").push().key;
    await db.collection("guns").doc(id).set({
      info: guns,
      damage: damages,
      uid: id,
      record: uid,
    });
  }

  async function deletedGun(uid) {
    await db.collection("guns").doc(uid).delete();
    getAllGuns();
  }

  function addDamageInput() {
    setDamages([...damages, ""]);
  }

  const handleChangedDamage = (e, index) => {
    damages[index] = e.target.value;
    setDamages([...damages]);
  };

  const RollDamage = (value) => {
    const FilterD = value.filter((v) => {
      return v.includes("d");
    });
    FilterD.forEach((e) => {
      const dado = parseInt(e.split("d")[1]);
      const roll = parseInt(e.split("d")[0]);
      for (let i = 0; i < roll; i++) {
        let roll20 = Math.floor(Math.random() * dado + 1);
        sum.push(roll20);
      }
    });

    const FilterNotD = value.filter((v) => {
      return !v.includes("d");
    });
    FilterNotD.forEach((e) => {
      const Int = parseInt(e);
      sum.push(Int);
    });

    setResult(
      sum.reduce((acctualValue, currentValue) => acctualValue + currentValue)
    );
  };

  const Sanity = (value) => {
    let sanityValue = parseInt(value);
    let roll100 = Math.floor(Math.random() * 100);
    sani.push(roll100);
    if (roll100 <= sanityValue) {
      sani.push("Sucesso");
    } else {
      sani.push("Fracasso");
    }
  };

  async function CreateItems(uid) {
    let id = firebase.database().ref().child("inventory").push().key;
    await db.collection("inventory").doc(id).set({
      name: items.name,
      weight: items.weight,
      uid: id,
      record: uid,
    });
  }

  async function deletedItem(uid) {
    await db.collection("inventory").doc(uid).delete();
    setWeigthInvent([]);
    getItemsInventory();
  }

  function UploadImage(e) {
    const file = e.target.files[0];

    if (!file) return;

    const storageRef = firebase.storage().ref();

    let uploadTask = storageRef.child(`images/${file.name}`).put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let progress = parseInt(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
        if (progress !== 100) {
          setLoading(true);
        } else if (progress === 100) {
          getRecord();
          setLoading(false);
        }
      },
      (error) => {
        alert("algum ritual deu errada verifique os sinais");
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          db.collection("record").doc(uid).set(
            {
              imgUrl: downloadURL,
            },
            { merge: true }
          );
        });
        getRecord();
      }
    );
  }

  return (
    <>
      {isModald100 ? (
        <Modal onClose={(e) => setIsModald100(false)}>
          <div className="text-[2vw]">
            {Math.floor(Math.random() * 100 + 1)}
          </div>
        </Modal>
      ) : null}
      {isModalSanity ? (
        <Modal
          onClose={(e) => {
            setIsModalSanity(false);
            setSani([]);
          }}
        >
          {sani.map((resul, index) => {
            return <div key={index}>{resul}</div>;
          })}
        </Modal>
      ) : null}
      {isModalVisible ? (
        <Modal onClose={(e) => setIsModalVisible(false)}>
          <RollAtributy value={value} />
        </Modal>
      ) : null}
      {isModalCreateArms ? (
        <ModalAttack
          onClose={(e) => {
            setIsModalCreateArms(false);
            setDamages([]);
          }}
        >
          <div className="flex flex-col gap-[0.5vw] items-center">
            <div>
              <p className="text-[0.8vw]">Nome:</p>
              <input
                className="bg-transparent w-[15vw] border-b-[2px] border-gray-700 focus:outline-none"
                onChange={(e) => setGuns({ ...guns, name: e.target.value })}
              />
            </div>
            <div>
              <p className="text-[0.8vw]">Tipo:</p>
              <select
                className="bg-transparent w-[15vw] border-b-[2px] border-gray-700 focus:outline-none"
                onChange={(e) => setGuns({ ...guns, type: e.target.value })}
              >
                <option className="bg-black-100"></option>
                <option value="" className="bg-black-100 text-white"></option>
                <option value="Espadas" className="bg-black-100 text-white">
                  Espadas
                </option>
                <option value="Briga" className="bg-black-100 text-white">
                  Briga
                </option>
                <option value="Arcos" className="bg-black-100 text-white">
                  Arcos
                </option>
                <option value="Armas" className="bg-black-100 text-white">
                  Armas
                </option>
              </select>
            </div>
            <div className="w-[15vw]">
              <p className="text-[0.8vw]">Dano</p>
              <div className="flex gap-[0.5vw]">
                {damages.map((damage, index) => {
                  return (
                    <div>
                      <input
                        key={index}
                        className="bg-transparent border-[2px] border-gray-700 w-[2.5vw] text-center text-[0.8vw]"
                        onChange={(e) => handleChangedDamage(e, index)}
                      />
                    </div>
                  );
                })}
                <button
                  className="bg-red-blood-800 p-[0.1vw]"
                  onClick={(e) => addDamageInput()}
                >
                  <RiAddFill />
                </button>
              </div>
            </div>
            <div>
              <p className="text-[0.8vw]">Munição Atual</p>
              <div className="flex gap-[0.3vw]">
                <input
                  className="bg-transparent w-[15vw] border-b-[2px] border-gray-700 focus:outline-none"
                  type="number"
                  onChange={(e) =>
                    setGuns({ ...guns, currentAmmo: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <p className="text-[0.8vw]">Munição Máxima</p>
              <div className="flex gap-[0.3vw]">
                <input
                  className="bg-transparent w-[15vw] border-b-[2px] border-gray-700 focus:outline-none"
                  type="number"
                  onChange={(e) =>
                    setGuns({ ...guns, maximumAmmo: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <p className="text-[0.8vw]">Ataque</p>
              <div className="flex gap-[0.3vw]">
                <input
                  className="bg-transparent w-[15vw] border-b-[2px] border-gray-700 focus:outline-none"
                  onChange={(e) => setGuns({ ...guns, attack: e.target.value })}
                  placeholder="ex: 1/2"
                />
              </div>
            </div>
            <div>
              <p className="text-[0.8vw]">Alcance</p>
              <div className="flex gap-[0.3vw]">
                <input
                  className="bg-transparent w-[15vw] border-b-[2px] border-gray-700 focus:outline-none"
                  onChange={(e) => setGuns({ ...guns, reach: e.target.value })}
                  placeholder="ex: 15m"
                />
              </div>
            </div>
            <div>
              <p className="text-[0.8vw]">Defeito</p>
              <div className="flex gap-[0.3vw]">
                <input
                  className="bg-transparent w-[15vw] border-b-[2px] border-gray-700 focus:outline-none"
                  onChange={(e) => setGuns({ ...guns, defect: e.target.value })}
                />
              </div>
            </div>
            <div>
              <p className="text-[0.8vw]">Área</p>
              <div className="flex gap-[0.3vw]">
                <input
                  className="bg-transparent w-[15vw] border-b-[2px] border-gray-700 focus:outline-none"
                  onChange={(e) => setGuns({ ...guns, area: e.target.value })}
                />
              </div>
            </div>
            <button
              className="bg-red-blood-1000 w-[15vw]"
              onClick={() => {
                createGuns(recordUid);
                setIsModalCreateArms(false);
                getAllGuns();
              }}
            >
              Criar
            </button>
          </div>
        </ModalAttack>
      ) : null}
      {isModalVisibleDamage ? (
        <Modal
          onClose={(e) => {
            setIsModalVisibleDamage(false);
            setSum([]);
          }}
        >
          <div className="flex flex-col items-center justify-center">
            <p className="text-[1.3vw] gap-[1vw]">Dano</p>
            <div className="flex">
              {sum.map((resul, index) => {
                return (
                  <div key={index}>
                    {resul}
                    {index !== sum.length - 1 && "+"}
                  </div>
                );
              })}
            </div>
            <div className="text-[1.5vw]">{result}</div>
          </div>
        </Modal>
      ) : null}
      {isModalCreateItens ? (
        <ModalCreateItems onClose={(e) => setIsModalCreateItens(false)}>
          <div className="flex flex-col gap-[1.5vw] items-center justify-center">
            <div>
              <p>Nome:</p>
              <input
                className="bg-transparent border-b-[1px] border-gray-900 h-[2vw]"
                placeholder="Ex: Faca de Ocultista"
                onChange={(e) =>
                  setItems({
                    ...items,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <p>Peso:</p>
              <input
                className="bg-transparent border-b-[1px] border-gray-900 h-[2vw]"
                type="number"
                placeholder="Ex: 1.3"
                onChange={(e) =>
                  setItems({
                    ...items,
                    weight: e.target.value,
                  })
                }
              />
            </div>
            <button
              className="bg-red-blood-1000 w-[17vw]"
              onClick={(e) => {
                setWeigthInvent([]);
                CreateItems(recordUid);
                setIsModalCreateItens(false);
                getItemsInventory();
              }}
            >
              Criar
            </button>
          </div>
        </ModalCreateItems>
      ) : null}
      {loading ? (
        <div className="w-[100vw] h-[100vh] bg-backgroundLoading bg-cover bg-fixed m-0 flex flex-col items-center justify-center text-white font-medieval">
          <div className="text-[3vw]">{progress}%</div>
          <progress value={progress} max="100" className="w-[20vw]" />
        </div>
      ) : (
        <div className="text-white font-medieval">
          <button className="absolute top-0 left-0 m-8">
            <IconContext.Provider value={{ color: "red", size: "2em" }}>
              <a href="http://localhost:3000/">
                <GiReturnArrow />
              </a>
            </IconContext.Provider>
          </button>
          <div className="flex flex-col justify-center items-center">
            <img
              className="h-[150px]"
              src="/logo.svg"
              alt="Logo Ordo Realitas"
            />
            <p className="mt-[1px] mb-5 text-3xl">Perfil de Envestigador</p>
          </div>
          {records.map((record) => {
            return (
              <div key={record}>
                <div className="flex flex-row justify-center gap-10 pb-[30px]">
                  {/* detalhes pessoais */}
                  <div className="flex flex-col items-center rounded-[5px] w-[28.8%] h-[630px] bg-gray-opacity">
                    <div className="flex justify w-[100%] justify-around">
                      <div className="w-[1vw]" />
                      <p className="mt-[15px] mb-[5px] text-[25px]">
                        DETALHES PESSOAIS
                      </p>
                      <button onClick={() => setPersonal(!personal)}>
                        <IoMdSettings />
                      </button>
                    </div>
                    <div className="h-full w-full ml-8 flex flex-col gap-2">
                      <p className="text-lg mb-[10px]">Nome</p>
                      <input
                        disabled={!personal}
                        className="bg-transparent h-5 w-[90%] text-lg border-b-[3px] border-gray-900 text-white"
                        defaultValue={record.PersonalDetails.name}
                        onChange={(e) =>
                          setDates({ ...dates, name: e.target.value })
                        }
                      ></input>
                      <p className="text-lg mb-[10px]">Jogador</p>
                      <input
                        disabled={!personal}
                        className="bg-transparent h-5 w-[90%] text-lg border-b-[3px] border-gray-900 text-white"
                        defaultValue={record.PersonalDetails.player}
                        onChange={(e) =>
                          setDates({ ...dates, player: e.target.value })
                        }
                      ></input>
                      <p className="text-lg mb-[10px]">Ocupação</p>
                      <input
                        disabled={!personal}
                        className="bg-transparent h-5 w-[90%] text-lg border-b-[3px] border-gray-900 text-white"
                        defaultValue={record.PersonalDetails.occupation}
                        onChange={(e) =>
                          setDates({ ...dates, occupation: e.target.value })
                        }
                      ></input>
                      <p className="text-lg mb-[10px]">Idade</p>
                      <input
                        disabled={!personal}
                        className="bg-transparent h-5 w-[90%] text-lg border-b-[3px] border-gray-900 text-white"
                        defaultValue={record.PersonalDetails.age}
                        onChange={(e) =>
                          setDates({ ...dates, age: e.target.value })
                        }
                      ></input>
                      <p className="text-lg mb-[10px]">Gênero</p>
                      <input
                        disabled={!personal}
                        className="bg-transparent h-5 w-[90%] text-lg border-b-[3px] border-gray-900 text-white"
                        defaultValue={record.PersonalDetails.genre}
                        onChange={(e) =>
                          setDates({ ...dates, genre: e.target.value })
                        }
                      ></input>
                      <p className="text-lg mb-[10px]">Local de nascimento</p>
                      <input
                        disabled={!personal}
                        className="bg-transparent h-5 w-[90%] text-lg border-b-[3px] border-gray-900 text-white"
                        defaultValue={record.PersonalDetails.birthplace}
                        onChange={(e) =>
                          setDates({ ...dates, birthplace: e.target.value })
                        }
                      ></input>
                      <p className="text-lg mb-[10px]">Local de residência</p>
                      <input
                        disabled={!personal}
                        className="bg-transparent h-5 w-[90%] text-lg border-b-[3px] border-gray-900 text-white"
                        defaultValue={record.PersonalDetails.placeResidence}
                        onChange={(e) =>
                          setDates({ ...dates, placeResidence: e.target.value })
                        }
                      ></input>
                      {personal && (
                        <div className="flex justify-center">
                          <button
                            className="bg-red-blood-800 w-[4.2vw] p-1 rounded-md"
                            onClick={async (e) => {
                              await db
                                .collection("record")
                                .doc(record.uid)
                                .update({
                                  PersonalDetails: {
                                    name: dates.name
                                      ? dates.name
                                      : record.PersonalDetails.name,
                                    player: dates.player
                                      ? dates.player
                                      : record.PersonalDetails.player,
                                    occupation: dates.occupation
                                      ? dates.occupation
                                      : record.PersonalDetails.occupation,
                                    age: dates.age
                                      ? dates.age
                                      : record.PersonalDetails.age,
                                    genre: dates.genre
                                      ? dates.genre
                                      : record.PersonalDetails.genre,
                                    birthplace: dates.birthplace
                                      ? dates.birthplace
                                      : record.PersonalDetails.birthplace,
                                    placeResidence: dates.placeResidence
                                      ? dates.placeResidence
                                      : record.PersonalDetails.placeResidence,
                                  },
                                });
                              setPersonal(!personal);
                            }}
                          >
                            <p className="text-[0.8vw]">Atualizar</p>
                          </button>
                        </div>
                      )}
                    </div>
                    <button onClick={(e) => {}}></button>
                  </div>
                  {/* status pessoais */}
                  <div className="flex flex-col items-center w-[29.1%] h-[630px] bg-gray-opacity">
                    <div className="h-[100%] w-[100%] flex justify-around items-center mt-[0.6vw]">
                      <label
                        for="img"
                        className="h-[8vw] w-[8vw] rounded-full border-[1px] border-gray-900 cursor-pointer"
                      >
                        <img
                          src={record.imgUrl ? record.imgUrl : "/user.png"}
                          alt=""
                          className="h-[8vw] w-[8vw] rounded-full object-cover"
                        />
                        <input
                          id="img"
                          type="file"
                          className="hidden"
                          accept=".jpg, .jpeg, .png, .jfif"
                          onChange={UploadImage}
                        />
                      </label>
                      <img
                        className="h-[90px] w-[90px] cursor-pointer transition-all duration-[4000ms] hover:-rotate-720"
                        alt="D100"
                        src="/d20.svg"
                        onClick={(e) => setIsModald100(true)}
                      />
                    </div>
                    {/* status-life */}
                    <div className="h-full w-full flex flex-col justify-center">
                      <p className="text-[22px] m-[1px] ml-7">Vida</p>
                      <div className="w-full flex items-center justify-center">
                        <div className="text-xl flex items-center justify-center w-[90%] h-[35px] rounded-[5px] border-none bg-red-300">
                          <input
                            className="appearance-none text-xl w-[50px] h-[25px] bg-transparent border-none text-right text-white focus:outline-none"
                            defaultValue={record.Status.currentLife}
                            onChange={(e) => {
                              setStatus({
                                ...status,
                                currentLife: e.target.value,
                              });
                            }}
                            onBlur={async () => {
                              await db
                                .collection("record")
                                .doc(record.uid)
                                .set(
                                  {
                                    Status: {
                                      currentLife: status.currentLife
                                        ? status.currentLife
                                        : record.Status.currentLife,
                                    },
                                  },
                                  { merge: true }
                                );
                            }}
                          />
                          /
                          <input
                            className="text-xl w-[50px] h-[25px] bg-transparent border-none text-white focus:outline-none"
                            defaultValue={record.Status.maximumLife}
                            onChange={(e) =>
                              setStatus({
                                ...status,
                                maximumLife: e.target.value,
                              })
                            }
                            onBlur={async () => {
                              await db
                                .collection("record")
                                .doc(record.uid)
                                .set(
                                  {
                                    Status: {
                                      maximumLife: status.maximumLife
                                        ? status.maximumLife
                                        : record.Status.maximumLife,
                                    },
                                  },
                                  { merge: true }
                                );
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-around">
                        <div className="flex gap-[5px]">
                          <input
                            type="checkbox"
                            id="ok"
                            defaultChecked={record.Status.seriousInjury}
                            onClick={async (e) => {
                              await db
                                .collection("record")
                                .doc(record.uid)
                                .set(
                                  {
                                    Status: {
                                      seriousInjury:
                                        !record.Status.seriousInjury,
                                    },
                                  },
                                  { merge: true }
                                );
                              getRecord();
                            }}
                          />
                          <p className="">Lesão Grave</p>
                        </div>
                        <div className="flex gap-[5px]">
                          <input
                            type="checkbox"
                            id="ok"
                            defaultChecked={record.Status.unconscious}
                            onClick={async (e) => {
                              await db
                                .collection("record")
                                .doc(record.uid)
                                .set(
                                  {
                                    Status: {
                                      unconscious: !record.Status.unconscious,
                                    },
                                  },
                                  { merge: true }
                                );
                              getRecord();
                            }}
                          />
                          <p className="">Inconsciente</p>
                        </div>
                        <div className="flex gap-[5px]">
                          <input
                            type="checkbox"
                            id="ok"
                            defaultChecked={record.Status.dying}
                            onClick={async (e) => {
                              await db
                                .collection("record")
                                .doc(record.uid)
                                .set(
                                  {
                                    Status: {
                                      dying: !record.Status.dying,
                                    },
                                  },
                                  { merge: true }
                                );
                              getRecord();
                            }}
                          />
                          <p className="">Morrendo</p>
                        </div>
                      </div>
                    </div>
                    {/* status-sanity */}
                    <div className="h-full w-full flex flex-col justify-center">
                      <p className="text-[22px] m-[1px] ml-7">Sanidade</p>
                      <div className="w-full flex items-center justify-evenly">
                        <div className="text-xl flex items-center justify-center w-[75%] h-[35px] rounded-[5px] border-none bg-blue-1000">
                          <input
                            className="text-xl w-[50px] h-[25px] bg-transparent border-none text-right text-white focus:outline-none"
                            defaultValue={record.Status.currentSanity}
                            onChange={(e) =>
                              setStatus({
                                ...status,
                                currentSanity: e.target.value,
                              })
                            }
                            onBlur={async () => {
                              await db
                                .collection("record")
                                .doc(record.uid)
                                .set(
                                  {
                                    Status: {
                                      currentSanity: status.currentSanity
                                        ? status.currentSanity
                                        : record.Status.currentSanity,
                                    },
                                  },
                                  { merge: true }
                                );
                            }}
                          />
                          /
                          <input
                            className="text-xl w-[50px] h-[25px] bg-transparent border-none text-white focus:outline-none"
                            defaultValue={record.Status.maximumSanity}
                            onChange={(e) =>
                              setStatus({
                                ...status,
                                maximumSanity: e.target.value,
                              })
                            }
                            onBlur={async () => {
                              await db
                                .collection("record")
                                .doc(record.uid)
                                .set(
                                  {
                                    Status: {
                                      maximumSanity: status.maximumSanity
                                        ? status.maximumSanity
                                        : record.Status.maximumSanity,
                                    },
                                  },
                                  { merge: true }
                                );
                            }}
                          />
                        </div>
                        <img
                          className="cursor-pointer w-[3vw] cursor-pointer transition-all duration-[4000ms] hover:-rotate-720"
                          src="/d20.svg"
                          alt=""
                          onClick={(e) => {
                            Sanity(record.Status.paranormalExposure);
                            setIsModalSanity(true);
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-center gap-[90px]">
                        <div className="flex gap-[5px]">
                          <input
                            className=""
                            type="checkbox"
                            defaultChecked={record.Status.traumatized}
                            onClick={async (e) => {
                              await db
                                .collection("record")
                                .doc(record.uid)
                                .set(
                                  {
                                    Status: {
                                      traumatized: !record.Status.traumatized,
                                    },
                                  },
                                  { merge: true }
                                );
                              getRecord();
                            }}
                          />
                          <p className="">Traumatizado</p>
                        </div>
                        <div className="flex gap-[5px]">
                          <input
                            className=""
                            type="checkbox"
                            defaultChecked={record.Status.maddened}
                            onClick={async (e) => {
                              await db
                                .collection("record")
                                .doc(record.uid)
                                .set(
                                  {
                                    Status: {
                                      maddened: !record.Status.maddened,
                                    },
                                  },
                                  { merge: true }
                                );
                              getRecord();
                            }}
                          />
                          <p className="">Enlouquecido</p>
                        </div>
                      </div>
                    </div>
                    {/* status-occultism */}
                    <div className="h-full w-full flex flex-col justify-center">
                      <p className="text-[22px] m-[1px] ml-7">Ocultismo</p>
                      <div className="w-full flex items-center justify-center">
                        <div className="text-xl flex items-center justify-center w-[90%] h-[35px] rounded-[5px] border-none bg-purple-900">
                          <input
                            className="text-xl w-[50px] h-[25px] bg-transparent border-none text-right text-white focus:outline-none"
                            defaultValue={record.Status.currentOccultism}
                            onChange={(e) =>
                              setStatus({
                                ...status,
                                currentOccultism: e.target.value,
                              })
                            }
                            onBlur={async () => {
                              await db
                                .collection("record")
                                .doc(record.uid)
                                .set(
                                  {
                                    Status: {
                                      currentOccultism: status.currentOccultism
                                        ? status.currentOccultism
                                        : record.Status.currentOccultism,
                                    },
                                  },
                                  { merge: true }
                                );
                            }}
                          />
                          /
                          <input
                            className="text-xl w-[50px] h-[25px] bg-transparent border-nonetext-white focus:outline-none"
                            defaultValue={record.Status.maximumOccultism}
                            onChange={(e) =>
                              setStatus({
                                ...status,
                                maximumOccultism: e.target.value,
                              })
                            }
                            onBlur={async () => {
                              await db
                                .collection("record")
                                .doc(record.uid)
                                .set(
                                  {
                                    Status: {
                                      maximumOccultism: status.maximumOccultism
                                        ? status.maximumOccultism
                                        : record.Status.maximumOccultism,
                                    },
                                  },
                                  { merge: true }
                                );
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-around">
                        <div className=" flex flex-col items-center justify-center">
                          <p className="">Dano Extra</p>
                          <input
                            className="text-xl text-center w-[60px] bg-transparent text-white border-b-[3px] border-gray-900 focus:outline-none"
                            type="number"
                            defaultValue={record.Status.extraDamage}
                            onChange={(e) =>
                              setStatus({
                                ...status,
                                extraDamage: e.target.value,
                              })
                            }
                            onBlur={async () => {
                              await db
                                .collection("record")
                                .doc(record.uid)
                                .set(
                                  {
                                    Status: {
                                      extraDamage: status.extraDamage
                                        ? status.extraDamage
                                        : record.Status.extraDamage,
                                    },
                                  },
                                  { merge: true }
                                );
                            }}
                          />
                        </div>
                        <div className=" flex flex-col items-center justify-center">
                          <p className="">Corpo</p>
                          <input
                            className="text-xl text-center w-[60px] bg-transparent text-white border-b-[3px] border-gray-900 focus:outline-none"
                            type="number"
                            defaultValue={record.Status.body}
                            onChange={(e) =>
                              setStatus({
                                ...status,
                                body: e.target.value,
                              })
                            }
                            onBlur={async () => {
                              await db
                                .collection("record")
                                .doc(record.uid)
                                .set(
                                  {
                                    Status: {
                                      body: status.body
                                        ? status.body
                                        : record.Status.body,
                                    },
                                  },
                                  { merge: true }
                                );
                            }}
                          />
                        </div>
                        <div className=" flex flex-col items-center justify-center">
                          <p className="text-[11px]">Exposição Paranormal</p>
                          <input
                            className="text-[1.3vw] text-center w-[60px] bg-transparent text-white border-b-[3px] border-gray-900 focus:outline-none"
                            type="number"
                            defaultValue={record.Status.paranormalExposure}
                            onBlur={async () => {
                              await db
                                .collection("record")
                                .doc(record.uid)
                                .set(
                                  {
                                    Status: {
                                      paranormalExposure:
                                        status.paranormalExposure
                                          ? status.paranormalExposure
                                          : record.Status.paranormalExposure,
                                    },
                                  },
                                  { merge: true }
                                );
                            }}
                            onChange={(e) =>
                              setStatus({
                                ...status,
                                paranormalExposure: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row justify-center gap-10 pb-[30px]">
                  {/* Atributos */}
                  <div className="flex flex-col items-center rounded-[5px] w-[28.8%] h-[630px] bg-gray-opacity">
                    <div className="flex justify w-[100%] justify-around">
                      <div className="w-[1vw]" />
                      <p className="mt-[15px] mb-[5px] text-[25px]">
                        ATRIBUTOS
                      </p>
                      <button onClick={() => setSettingsAttri(!settingsAttri)}>
                        <IoMdSettings />
                      </button>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex gap-[35px] mt-[30px]">
                        <div className="flex justify-center items-center flex-col gap-[10px]">
                          <img
                            className="cursor-pointer w-[3vw] rounded-[50px] transition-all duration-[4000ms] hover:-rotate-720"
                            src="/d20.svg"
                            alt=""
                            onClick={(e) => {
                              setValue(record.Attributes.force);
                              setIsModalVisible(true);
                            }}
                          />
                          <p className="text-[1vw]">Força</p>
                          <input
                            disabled={!settingsAttri}
                            min="0"
                            max="20"
                            className="text-white w-[4.5vw] text-[1.5vw] text-[1.5vw] bg-transparent border-b-[3px] border-gray-900 text-center"
                            type="number"
                            defaultValue={record.Attributes.force}
                            onChange={(e) =>
                              setAttributes({
                                ...attributes,
                                force: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-center items-center flex-col gap-[10px]">
                          <img
                            alt=""
                            className="cursor-pointer w-[3vw] rounded-[50px] transition-all duration-[4000ms] hover:-rotate-720"
                            src="/d20.svg"
                            onClick={(e) => {
                              setValue(record.Attributes.dexterity);
                              setIsModalVisible(true);
                            }}
                          />
                          <p className="text-[1vw]">Destreza</p>
                          <input
                            disabled={!settingsAttri}
                            min="0"
                            max="20"
                            className=" text-white w-[4.5vw] text-[1.5vw] bg-transparent border-b-[3px] border-gray-900 text-center"
                            type="number"
                            defaultValue={record.Attributes.dexterity}
                            onChange={(e) =>
                              setAttributes({
                                ...attributes,
                                dexterity: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-center items-center flex-col gap-[10px]">
                          <img
                            alt=""
                            className="cursor-pointer w-[3vw] rounded-[50px] transition-all duration-[4000ms] hover:-rotate-720"
                            src="/d20.svg"
                            onClick={(e) => {
                              setValue(record.Attributes.constitution);
                              setIsModalVisible(true);
                            }}
                          />
                          <p className="text-[1vw]">Constituição</p>
                          <input
                            disabled={!settingsAttri}
                            min="0"
                            max="20"
                            className="text-white w-[4.5vw] text-[1.5vw] bg-transparent border-b-[3px] border-gray-900 text-center"
                            type="number"
                            defaultValue={record.Attributes.constitution}
                            onChange={(e) =>
                              setAttributes({
                                ...attributes,
                                constitution: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-center items-center flex-col gap-[10px]">
                          <img
                            alt=""
                            className="cursor-pointer w-[3vw] rounded-[50px] transition-all duration-[4000ms] hover:-rotate-720"
                            src="/d20.svg"
                            onClick={(e) => {
                              setValue(record.Attributes.appearance);
                              setIsModalVisible(true);
                            }}
                          />
                          <p className="text-[1vw]">Aparência</p>
                          <input
                            disabled={!settingsAttri}
                            min="0"
                            max="20"
                            className="text-white w-[4.5vw] text-[1.5vw] bg-transparent border-b-[3px] border-gray-900 text-center"
                            type="number"
                            defaultValue={record.Attributes.appearance}
                            onChange={(e) =>
                              setAttributes({
                                ...attributes,
                                appearance: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="flex gap-[35px] mt-[30px]">
                        <div className="flex justify-center items-center flex-col gap-[10px]">
                          <img
                            alt=""
                            className="cursor-pointer w-[3vw] rounded-[50px] transition-all duration-[4000ms] hover:-rotate-720"
                            src="/d20.svg"
                            onClick={(e) => {
                              setValue(record.Attributes.education);
                              setIsModalVisible(true);
                            }}
                          />
                          <p className="text-[1vw]">Educação</p>
                          <input
                            disabled={!settingsAttri}
                            min="0"
                            max="20"
                            className="text-white w-[4.5vw] text-[1.5vw] bg-transparent border-b-[3px] border-gray-900 text-center"
                            type="number"
                            defaultValue={record.Attributes.education}
                            onChange={(e) =>
                              setAttributes({
                                ...attributes,
                                education: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-center items-center flex-col gap-[10px]">
                          <img
                            alt=""
                            className="cursor-pointer w-[3vw] rounded-[50px] transition-all duration-[4000ms] hover:-rotate-720"
                            src="/d20.svg"
                            onClick={(e) => {
                              setValue(record.Attributes.intelligence);
                              setIsModalVisible(true);
                            }}
                          />
                          <p className="text-[1vw]">Inteligência</p>
                          <input
                            disabled={!settingsAttri}
                            min="0"
                            max="20"
                            className="text-white w-[4.5vw] text-[1.5vw] bg-transparent border-b-[3px] border-gray-900 text-center"
                            type="number"
                            defaultValue={record.Attributes.intelligence}
                            onChange={(e) =>
                              setAttributes({
                                ...attributes,
                                intelligence: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-center items-center flex-col gap-[10px]">
                          <img
                            alt=""
                            className="cursor-pointer w-[3vw] rounded-[50px] transition-all duration-[4000ms] hover:-rotate-720"
                            src="/d20.svg"
                            onClick={(e) => {
                              setValue(record.Attributes.power);
                              setIsModalVisible(true);
                            }}
                          />
                          <p className="text-[1vw]">Poder</p>
                          <input
                            disabled={!settingsAttri}
                            min="0"
                            max="20"
                            className="text-white w-[4.5vw] text-[1.5vw] bg-transparent border-b-[3px] border-gray-900 text-center"
                            type="number"
                            defaultValue={record.Attributes.power}
                            onChange={(e) =>
                              setAttributes({
                                ...attributes,
                                power: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-center items-center flex-col gap-[10px]">
                          <img
                            alt=""
                            className="cursor-pointer w-[3vw] rounded-[50px] transition-all duration-[4000ms] hover:-rotate-720"
                            src="/d20.svg"
                            onClick={(e) => {
                              setValue(record.Attributes.luck);
                              setIsModalVisible(true);
                            }}
                          />
                          <p className="text-[1vw]">Sorte</p>
                          <input
                            disabled={!settingsAttri}
                            min="0"
                            max="20"
                            className="text-white w-[4.5vw] text-[1.5vw] bg-transparent border-b-[3px] border-gray-900 text-center"
                            type="number"
                            defaultValue={record.Attributes.luck}
                            onChange={(e) =>
                              setAttributes({
                                ...attributes,
                                luck: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="flex gap-[35px] mt-[30px]">
                        <div className="flex justify-center items-center flex-col gap-[10px]">
                          <p className="text-[1vw]">Movimento</p>
                          <input
                            disabled={!settingsAttri}
                            min="0"
                            max="20"
                            className="text-white w-[4.5vw] text-[1.5vw] bg-transparent border-b-[3px] border-gray-900 text-center"
                            type="number"
                            defaultValue={record.Attributes.movement}
                            onChange={(e) =>
                              setAttributes({
                                ...attributes,
                                movement: e.target.value,
                              })
                            }
                          ></input>
                        </div>
                        <div className="flex justify-center items-center flex-col gap-[10px]">
                          <p className="text-[1vw]">Tamanho</p>
                          <input
                            disabled={!settingsAttri}
                            min="0"
                            max="20"
                            className="text-white w-[4.5vw] text-[1.5vw] bg-transparent border-b-[3px] border-gray-900 text-center"
                            type="number"
                            defaultValue={record.Attributes.size}
                            onChange={(e) =>
                              setAttributes({
                                ...attributes,
                                size: e.target.value,
                              })
                            }
                          ></input>
                        </div>
                      </div>
                      {settingsAttri && (
                        <div className="flex justify-center mt-[1.5vw]">
                          <button
                            className="bg-red-blood-800 w-[4.2vw] p-1 rounded-md"
                            onClick={async (e) => {
                              await db
                                .collection("record")
                                .doc(record.uid)
                                .update({
                                  Attributes: {
                                    appearance: attributes.appearance
                                      ? attributes.appearance
                                      : record.Attributes.appearance,
                                    constitution: attributes.constitution
                                      ? attributes.constitution
                                      : record.Attributes.constitution,
                                    dexterity: attributes.dexterity
                                      ? attributes.dexterity
                                      : record.Attributes.dexterity,
                                    education: attributes.education
                                      ? attributes.education
                                      : record.Attributes.education,
                                    force: attributes.force
                                      ? attributes.force
                                      : record.Attributes.force,
                                    intelligence: attributes.intelligence
                                      ? attributes.intelligence
                                      : record.Attributes.intelligence,
                                    luck: attributes.luck
                                      ? attributes.luck
                                      : record.Attributes.luck,
                                    movement: attributes.movement
                                      ? attributes.movement
                                      : record.Attributes.movement,
                                    power: attributes.power
                                      ? attributes.power
                                      : record.Attributes.power,
                                    size: attributes.size
                                      ? attributes.size
                                      : record.Attributes.size,
                                  },
                                });
                              setSettingsAttri(!settingsAttri);
                              getRecord();
                            }}
                          >
                            <p className="text-[0.8vw]">Atualizar</p>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Perícias */}
                  <div className="flex flex-col items-center rounded-[5px] w-[28.8%] h-[630px] bg-gray-opacity">
                    <div className="border-b-2 border-gray-900 w-[90%] flex justify-center items-center">
                      <p className="mt-[15px] mb-[5px] text-[25px]">PERÍCIAS</p>
                    </div>
                  </div>
                </div>

                {/* Combate */}
                <div className="flex justify-center items-center pb-[30px]">
                  <div className="flex flex-col items-center rounded-[5px] w-[59vw] h-[630px] bg-gray-opacity">
                    <div className="border-b-[1px] border-gray-900 w-[57vw] flex justify-between items-center">
                      <div className="flex items-center gap-[0.6vw]">
                        <div className="w-[3vw]" />
                      </div>
                      <p className="mt-[15px] mb-[5px] text-[25px]">COMBATE</p>
                      <div className="flex items-center gap-[0.6vw]">
                        <div
                          className="border-[2px] border-gray-400 p-1 cursor-pointer"
                          onClick={(e) => {
                            setIsModalCreateArms(true);
                            setRecordUid(record.uid);
                          }}
                        >
                          <RiAddFill />
                        </div>
                        <div
                          className="border-[2px] border-gray-400 p-1 cursor-pointer"
                          onClick={() => setEditArms(!editArms)}
                        >
                          <AiFillEye />
                        </div>
                      </div>
                    </div>
                    <div className="flex w-[57vw] h-[5vh] justify-between border-b-[3px] border-gray-800 items-end">
                      <div className="flex justify-around w-[28vw]">
                        <p className="text-[1vw] w-[4vw]">Nome</p>
                        <p className="text-[1vw] w-[4vw]">Tipo</p>
                        <p className="text-[1vw] w-[4vw]">Dano</p>
                      </div>
                      <div className="flex gap-[1vw] justify-around w-[30vw]">
                        <p className="text-[1vw]">Mun. Atual</p>
                        <p className="text-[1vw]">Mun. Máxima</p>
                        <p className="text-[1vw]">Ataque</p>
                        <p className="text-[1vw]">Alcance</p>
                        <p className="text-[1vw]">Defeito</p>
                        <p className="text-[1vw]">Área</p>
                      </div>
                    </div>
                    {getGuns.map((gun) => {
                      return (
                        <div className="flex w-[57vw] h-[6vh] justify-between border-b-[3px] border-gray-900 items-center">
                          <div className="flex w-[27vw] items-center">
                            <div className="flex w-[11.6vw] gap-[1vw] ml-[5px]">
                              {editArms === true ? (
                                <div
                                  className="border-[1px] border-gray-600 flex items-center p-1 cursor-pointer"
                                  onClick={() => {}}
                                >
                                  <BsFillPencilFill />
                                </div>
                              ) : (
                                <div
                                  className="border-[1px] border-gray-600 flex items-center p-1 cursor-pointer"
                                  onClick={() => {
                                    deletedGun(gun.uid);
                                    getAllGuns();
                                  }}
                                >
                                  <BsFillTrashFill />
                                </div>
                              )}

                              <input
                                disabled
                                className="text-[1vw] w-[8vw] bg-transparent focus:focus:outline-none"
                                defaultValue={gun.info.name}
                              ></input>
                            </div>
                            <div className="w-[9vw]">
                              <select
                                disabled
                                defaultValue={gun.info.type}
                                className="w-[7vw] bg-transparent border-b-[2px] border-gray-800"
                                onChange={(e) =>
                                  setGuns({ ...guns, type: e.target.value })
                                }
                              >
                                <option
                                  value=""
                                  className="bg-black-100 text-white"
                                ></option>
                                <option
                                  value="Espadas"
                                  className="bg-black-100 text-white"
                                >
                                  Espadas
                                </option>
                                <option
                                  value="Briga"
                                  className="bg-black-100 text-white"
                                >
                                  Briga
                                </option>
                                <option
                                  value="Arcos"
                                  className="bg-black-100 text-white"
                                >
                                  Arcos
                                </option>
                                <option
                                  value="Armas"
                                  className="bg-black-100 text-white"
                                >
                                  Armas
                                </option>
                              </select>
                            </div>
                            <div className="w-[5.2vw] flex gap-[0.4vw]">
                              <img
                                className="w-[1.4vw] cursor-pointer transition-all duration-[4000ms] hover:-rotate-720"
                                src="/d20.svg"
                                alt="dado"
                                onClick={(e) => {
                                  RollDamage(gun.damage);
                                  setIsModalVisibleDamage(true);
                                }}
                              />
                              <input
                                disabled
                                className="bg-transparent w-[4.5vw] focus:inline-block text-[0.8vw]"
                                defaultValue={gun.damage}
                              />
                            </div>
                          </div>
                          <div className="flex gap-[1vw] w-[29.4vw]">
                            <input
                              disabled
                              className="text-[0.8vw] w-[5.2vw] bg-transparent"
                              defaultValue={gun.info.currentAmmo}
                            />
                            <input
                              disabled
                              className="text-[0.8vw] w-[6.2vw] bg-transparent"
                              defaultValue={gun.info.maximumAmmo}
                            />
                            <input
                              disabled
                              className="text-[0.8vw] w-[3.5vw] bg-transparent"
                              defaultValue={gun.info.attack}
                            />
                            <input
                              disabled
                              className="text-[0.8vw] w-[3.5vw] bg-transparent"
                              defaultValue={gun.info.reach}
                            />
                            <input
                              disabled
                              className="text-[0.8vw] w-[3.3vw] bg-transparent"
                              defaultValue={gun.info.defect}
                            />
                            <input
                              disabled
                              className="text-[0.8vw] w-[2.7vw] bg-transparent"
                              defaultValue={gun.info.area}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Inventario */}
                <div className="flex justify-center items-center pb-[30px]">
                  <div className="flex flex-col items-center rounded-[5px] w-[59vw] h-[630px] bg-gray-opacity gap-[0.8vw]">
                    <div className="border-b-[1px] border-gray-900 w-[57vw] h-[12vh] flex justify-between items-center">
                      <div className="flex items-center gap-[0.6vw]">
                        <div className="w-[3vw]" />
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="mt-[15px] mb-[5px] text-[1.3vw]">
                          INVENTÁRIO
                        </p>
                        <p className="text-[0.8vw]">
                          Peso Total: {resultWeigth} /
                          <input
                            className="focus:outline-none bg-transparent w-[1.5vw]"
                            defaultValue={record.Status.weight}
                            onChange={(e) =>
                              setStatus({
                                ...status,
                                weight: e.target.value,
                              })
                            }
                            onBlur={async () => {
                              await db
                                .collection("record")
                                .doc(record.uid)
                                .set(
                                  {
                                    Status: {
                                      weight: status.weight
                                        ? status.weight
                                        : record.Status.weight,
                                    },
                                  },
                                  { merge: true }
                                );
                            }}
                          />
                        </p>
                      </div>
                      <div className="flex items-center gap-[0.6vw]">
                        <div
                          className="border-[2px] border-gray-400 p-1 cursor-pointer"
                          onClick={(e) => {
                            setIsModalCreateItens(true);
                            setRecordUid(record.uid);
                          }}
                        >
                          <RiAddFill />
                        </div>
                        <div
                          className="border-[2px] border-gray-400 p-1 cursor-pointer"
                          onClick={() => setEditArms(!editArms)}
                        >
                          <AiFillEye />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-[1vw]">
                      <div className="flex w-[57vw] gap-[0.8vw] items-center">
                        <p>Dinheiro:</p>
                        <input
                          className="bg-transparent border-b-[1px] border-gray-900 w-[9vw] text-[1vw] focus:outline-none"
                          onChange={(e) => setDinner(e.target.value)}
                          defaultValue={record.dinner}
                          onBlur={async () => {
                            await db.collection("record").doc(record.uid).set(
                              {
                                dinner: dinner,
                              },
                              { merge: true }
                            );
                          }}
                        />
                      </div>
                      <div className="w-[57vw] flex grid grid-cols-2 content-start gap-4">
                        {getItems.map((item) => {
                          return (
                            <div className="flex gap-[1vw]" key={item.uid}>
                              <div
                                className="border-[1px] border-gray-600 flex items-center p-1 cursor-pointer"
                                onClick={() => deletedItem(item.uid)}
                              >
                                <BsFillTrashFill />
                              </div>
                              <input
                                disabled
                                className="bg-transparent border-b-[1px] border-gray-900 w-[18vw] text-[1vw] focus:outline-none"
                                defaultValue={item.name}
                              />
                              <input
                                disabled
                                className="bg-transparent border-b-[1px] border-gray-900 w-[5vw] text-center text-[1vw] focus:outline-none"
                                defaultValue={item.weight}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

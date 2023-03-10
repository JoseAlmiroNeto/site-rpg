import React, { useEffect, useState } from "react";
import { db } from "../auth/Config";
import firebase from "firebase/app";
import { IoMdSettings } from "react-icons/io";
import { Header } from "../components/Header";
import { ImExit } from "react-icons/im";
import { IconContext } from "react-icons";
import { ModalLarge, ModalSmall } from "../components/Modal";
import Logo from "../assets/loading.jpg";

const Home = ({ auth }) => {
  const [records, setRecords] = useState();
  const [section, setSection] = useState();
  const [user, setUser] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idRecord, setIdRecord] = useState();
  const [exposed, setExposed] = useState();
  const [daystoPlay, setDaystoPlay] = useState(false);
  const [isModalDeleteSection, setIsModalDeleteSection] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { docs } = await db
        .collection("user")
        .where("uid", "==", auth.uid)
        .get();
      setUser(docs.map((doc) => doc.data()));
    }
    fetchData();
    search();
  }, []);

  async function search() {
    if (user === undefined) {
      db.collection("user").doc(auth.uid).set({
        email: auth.email,
        uid: auth.uid,
      });
    }
    const { docs } = await db
      .collection("record")
      .where("user", "==", auth.uid)
      .get();
    setRecords(docs.map((doc) => doc.data()));
    getSections();
  }

  async function getSections() {
    const { docs } = await db
      .collection("sections")
      .where("user", "==", auth.uid)
      .get();
    setSection(docs.map((doc) => doc.data()));
  }

  function createRecord() {
    let id = firebase.database().ref().child("record").push().key;
    db.collection("record")
      .doc(id)
      .set({
        Attributes: {
          force: "1",
          intelligence: "1",
          presence: "1",
          agility: "1",
          energy: "1",
        },
        PersonalDetails: {
          name: "Desconhecido",
          player: "",
          origin: "",
          age: "",
          genre: "",
          birthplace: "",
          placeResidence: "",
          class: "",
          patent: "",
        },
        Status: {
          dying: false,
          currentLife: 0,
          currentSanity: 0,
          currentEffort: 0,
          maximumLife: 0,
          maximumSanity: 0,
          maximumEffort: 0,
          maddened: false,
          seriousInjury: false,
          traumatized: false,
          unconscious: false,
          nex: 5,
          defense: 0,
          protection: 0,
          resistance: 0,
          displacement: 0,
        },
        Configuration: {
          exposed: "No",
          timeToPlay: "",
          daysToPlay: {
            seg: false,
            ter: false,
            qua: false,
            qui: false,
            sex: false,
            sab: false,
            dom: false,
          },
        },
        investigation: "",
        background: "",
        user: auth.uid,
        uid: id,
        dinner: "",
      });
    search();
    db.collection("inventory").doc(id).set({
      arrayItem: [],
      uid: id,
    });
    db.collection("guns").doc(id).set({
      arrayGuns: [],
      uid: id,
    });
    db.collection("abiliity").doc(id).set({
      arrayAbiliity: [],
      uid: id,
    });
    db.collection("skills").doc(id).set({
      arraySkills: [],
      uid: id,
    });
    db.collection("rituals").doc(id).set({
      arrayRituals: [],
      uid: id,
    });
  }

  function createSection() {
    let id = firebase.database().ref().child("sections").push().key;
    db.collection("sections").doc(id).set({
      npc: [],
      players: [],
      creatures: [],
      initiative: [],
      uid: id,
      user: auth.uid,
      name: "Ordo Realitas",
    });
    search();
  }

  async function deletedRecord(uid) {
    await db.collection("skills").doc(uid).delete();
    await db.collection("abiliity").doc(uid).delete();
    await db.collection("guns").doc(uid).delete();
    await db.collection("inventory").doc(uid).delete();
    await db.collection("rituals").doc(uid).delete();
    await db.collection("record").doc(uid).delete();
    setIsModalVisible(false);
    search();
  }

  async function deletedSection(uid) {
    await db.collection("sections").doc(uid).delete();
    setIsModalDeleteSection(false);
    search();
  }

  return (
    <>
      {isModalVisible ? (
        <ModalLarge onClose={(e) => setIsModalVisible(false)}>
          <div className="text-2xl mb-6">Configurações</div>
          <div className="h-[40vh] flex flex-col gap-5">
            <p>UID: {idRecord}</p>
            <div className="flex flex-col">
              <p className="text-sm">
                Permitir que mestres de seções vejam sua ficha?
              </p>
              <select
                className="w-[8vw] bg-gray-800"
                onChange={(e) => setExposed(e.target.value)}
              >
                <option value={"No"}>Não</option>
                <option value={"Yes"}>Sim</option>
              </select>
            </div>
            <div className="flex flex-col">
              Horario para jogar
              <input className="w-[8vw] bg-gray-800" type="time"></input>
            </div>
            <div className="flex flex-col">
              Dias disponíveis para jogar
              <div className="flex gap-1">
                <div className="flex">
                  <input
                    type="checkbox"
                    onChange={() => setDaystoPlay(!daystoPlay)}
                  />
                  <p>Seg</p>
                </div>
                <div className="flex">
                  <input type="checkbox" />
                  <p>Ter</p>
                </div>
                <div className="flex">
                  <input type="checkbox" />
                  <p>Qua</p>
                </div>
                <div className="flex">
                  <input type="checkbox" />
                  <p>Qui</p>
                </div>
                <div className="flex">
                  <input type="checkbox" />
                  <p>Sex</p>
                </div>
                <div className="flex">
                  <input type="checkbox" />
                  <p>Sáb</p>
                </div>
                <div className="flex">
                  <input type="checkbox" />
                  <p>Dom</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-5">
            <button className="bg-green-700 p-1 rounded-md" onClick={(e) => {}}>
              Salvar
            </button>
            <button
              className="bg-red-600 p-1 rounded-md"
              onClick={(e) => {
                deletedRecord(idRecord);
                search();
              }}
            >
              Excluir
            </button>
          </div>
        </ModalLarge>
      ) : null}
      {isModalDeleteSection ? (
        <ModalSmall onClose={(e) => setIsModalDeleteSection(false)}>
          <div className="flex flex-col items-center w-full h-full">
            <p className="w-full h-[20%] border-b-[1px] border-white flex items-center justify-center text-2xl">
              Editar Seção
            </p>
            <div className="flex items-center justify-center w-full h-full">
              <button
                className="bg-red-600 p-1 rounded-md"
                onClick={(e) => {
                  deletedSection(idRecord);
                  search();
                }}
              >
                Excluir
              </button>
            </div>
          </div>
        </ModalSmall>
      ) : null}
      <Header />
      <div className="w-full text-white font-Messiri relative flex items-center justify-center">
        <div className=" w-[95%] h-full flex flex-wrap mt-10 gap-5">
          <button
            className="bg-black-opacity border w-[170px] h-[290px] rounded-md flex flex-col items-center justify-center cursor-pointer hover:text-red-800
            xl:w-[200px] xl:h-[320px]
            2xl:w-[270px] 2xl:h-[420px]
            "
            onClick={createRecord}
          >
            <p className="text-4xl">+</p>
            <p className="text-xl">Novo Personagem</p>
          </button>
          <button
            className="bg-black-opacity border w-[170px] h-[290px] rounded-md flex flex-col items-center justify-center cursor-pointer hover:text-red-800
            xl:w-[200px] xl:h-[320px]
            2xl:w-[270px] 2xl:h-[420px]
            "
            onClick={createSection}
          >
            <p className="text-4xl">+</p>
            <p className="text-xl">Criar Seção</p>
          </button>
          {records !== undefined &&
            records.map((player, index) => {
              return (
                <div
                  key={index}
                  className="bg-black-opacity border rounded-md relative w-[170px] h-[290px]
                  xl:w-[200px] xl:h-[320px]
                  2xl:w-[270px] 2xl:h-[420px]
                "
                >
                  <button
                    className="absolute top-0 right-0 z-10 pt-[15%] pr-[10%]"
                    onClick={(e) => {
                      setIsModalVisible(true);
                      setIdRecord(player.uid);
                    }}
                  >
                    <IconContext.Provider value={{ size: [16] }}>
                      <IoMdSettings />
                    </IconContext.Provider>
                  </button>
                  <a
                    // href={`http://localhost:3000/record/${player.uid}`}
                    href={`https://ficharpg-9a0d5.web.app/record/${player.uid}`}
                    className="w-full h-full flex flex-col items-center justify-evenly"
                  >
                    <img
                      className="w-[50px] h-[50px] rounded-full
                      xl:w-[60px] xl:h-[60px]
                      2xl:w-[80px] 2xl:h-[80px]
                      "
                      src={player.imgUrl ? player.imgUrl : "/user.png"}
                      alt=""
                    />
                    <p>{player.PersonalDetails.name}</p>
                    <div className="flex flex-col items-center">
                      <p className="text-red-400 text-xl">
                        {player.Status.currentLife}/{player.Status.maximumLife}
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
                  </a>
                </div>
              );
            })}
          {section !== undefined &&
            section.map((sec, index) => {
              return (
                <div
                  className="bg-black-opacity border rounded-md relative w-[170px] h-[290px]
                  xl:w-[200px] xl:h-[320px]
                  2xl:w-[270px] 2xl:h-[420px]"
                  key={index}
                >
                  <button
                    className="absolute top-0 right-0 z-10 pt-[15%] pr-[10%]"
                    onClick={(e) => {
                      setIsModalDeleteSection(true);
                      setIdRecord(sec.uid);
                    }}
                  >
                    <IconContext.Provider value={{ size: [16] }}>
                      <IoMdSettings />
                    </IconContext.Provider>
                  </button>
                  <a
                    // href={`http://localhost:3000/section/${sec.uid}`}
                    href={`https://ficharpg-9a0d5.web.app/section/${sec.uid}`}
                    key={sec.uid}
                    className="w-full h-full flex flex-col items-center justify-center gap-10"
                  >
                    <img
                      className="w-[130px] h-[130px] rounded-full object-cover"
                      src={Logo}
                      alt=""
                    />
                    <div className="flex justify w-[100%] justify-center text-2xl text-[#C7A372]">
                      {sec.name}
                    </div>
                    <div className="flex justify w-[100%] justify-center">
                      Players: {sec.players.length}
                    </div>
                  </a>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Home;

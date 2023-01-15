import React, { useEffect, useState } from "react";
import { authConfig, db } from "../auth/config";
import { ModalCreate } from "../components/modal";
import firebase from "firebase/app";
import { IoMdSettings } from "react-icons/io";
import { Header } from "../components/header";
import { ImExit } from "react-icons/im";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

const Home = ({ auth }) => {
  const [records, setRecords] = useState();
  const [user, setUser] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idRecord, setIdRecord] = useState();
  const [exposed, setExposed] = useState();
  const [daystoPlay, setDaystoPlay] = useState(false);
  const [getGuns, setGetGuns] = useState([]);
  const [getItems, setGetItems] = useState([]);

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
  }

  function createRecord() {
    let id = firebase.database().ref().child("record").push().key;
    db.collection("record")
      .doc(id)
      .set({
        Attributes: {
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
        },
        PersonalDetails: {
          name: "Desconhecido",
          player: "",
          occupation: "",
          age: "",
          genre: "",
          birthplace: "",
          placeResidence: "",
        },
        Status: {
          dying: false,
          body: 0,
          currentLife: 0,
          currentSanity: 0,
          currentOccultism: 0,
          maximumLife: 0,
          maximumSanity: 0,
          maximumOccultism: 0,
          extraDamage: 0,
          maddened: false,
          paranormalExposure: 0,
          seriousInjury: false,
          traumatized: false,
          unconscious: false,
          weight: 0,
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
        user: auth.uid,
        uid: id,
      });
    search();
  }

  async function deletedRecord(uid) {
    const { docs } = await db
      .collection("guns")
      .where("record", "==", uid)
      .get();
    if (docs !== undefined) {
      setGetGuns(docs.map((doc) => doc.data()));
      for (let gun of getGuns) {
        db.collection("guns").doc(gun.uid).delete();
      }
    }

    const { docss } = await db
      .collection("inventory")
      .where("record", "==", uid)
      .get();
    if (docss !== undefined) {
      setGetItems(docss.map((doc) => doc.data()));
      for (let item of getItems) {
        db.collection("inventory").doc(item.uid).delete();
      }
    }

    db.collection("record").doc(uid).delete();
    setIsModalVisible(false);
    search();
  }

  return (
    <>
      {isModalVisible ? (
        <ModalCreate onClose={(e) => setIsModalVisible(false)}>
          <div className="text-2xl mb-6">Configurações</div>
          <div className="h-[40vh] flex flex-col gap-5">
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
        </ModalCreate>
      ) : null}
      <Header />
      <div className="h-screen bg-gray-opacity-10">
        <div className="flex flex-wrap gap-9 pl-10 pt-8 pb-8 text-white font-medieval">
          <button
            className="w-[12%] h-[38vh] bg-black-opacity rounded-[15px] flex flex-col items-center justify-center hover:bg-gray-1000"
            onClick={(e) => createRecord()}
          >
            <p className="text-[3vw]">+</p>
            <p>Novo Personagem</p>
          </button>
          <button className="w-[12%] h-[38vh] bg-black-opacity rounded-[15px] flex flex-col items-center justify-center hover:bg-gray-1000">
            <p className="text-[3vw]">+</p>
            <p>Mestrar Seção</p>
          </button>
          {records !== undefined &&
            records.map((record) => {
              return (
                <div className="relative w-[12%] h-[38vh]">
                  <button
                    className="absolute top-0 right-0 z-10 pt-[15%] pr-[10%]"
                    onClick={(e) => {
                      setIsModalVisible(true);
                      setIdRecord(record.uid);
                    }}
                  >
                    <IconContext.Provider
                      value={{ size: [18] }}
                    >
                      <IoMdSettings />
                    </IconContext.Provider>
                  </button>
                  <a
                    href={`http://localhost:3000/record/${record.uid}`}
                    key={record.id}
                    className="w-full h-full bg-black-opacity rounded-[15px] flex flex-col items-center justify-center gap-2 relative"
                  >
                    <div className="flex justify w-[100%] justify-center">
                      <img
                        src={record.imgUrl ? record.imgUrl : "/user.png"}
                        alt=""
                        className="h-[3.5vw] w-[3.5vw] rounded-full object-cover"
                      />
                    </div>
                    <p className="text-[1vw]">{record.PersonalDetails.name}</p>
                    <div className="flex flex-col w-[100%] items-center gap-[0.5vw]">
                      <div className="flex flex-col items-center">
                        <div className="text-[0.8vw] text-red-400">
                          {record.Status.currentLife}/
                          {record.Status.maximumLife}
                        </div>
                        <p className="text-[0.7vw]">Vida</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-[0.8vw] text-blue-300">
                          {record.Status.currentSanity}/
                          {record.Status.maximumSanity}
                        </div>
                        <p className="text-[0.7vw]">Sanidade</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-[0.8vw] text-purple-300">
                          {record.Status.currentOccultism}/
                          {record.Status.maximumOccultism}
                        </div>
                        <p className="text-[0.7vw]">Pontos de Ocultismo</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-[0.8vw] text-purple-300">
                          {record.Attributes.movement}
                        </div>
                        <p className="text-[0.7vw]">Movimento</p>
                      </div>
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

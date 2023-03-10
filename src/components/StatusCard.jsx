import { useEffect, useState } from "react";
import { db } from "../auth/Config";
import firebase from "firebase/app";
import { ModalSmall } from "./Modal";
import Dead from "../assets/dead.png";
import "../global.css";

const StatusPersona = (record) => {
  const [show, setShow] = useState(false);
  const [getStatus, setGetStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModal100, setIsModal100] = useState(false);
  const [isModalSanity, setIsModalSanity] = useState(false);
  const [sani, setSani] = useState([]);
  const [status, setStatus] = useState({
    currentLife: 0,
    currentEffort: 0,
    currentSanity: 0,
    maximumLife: 0,
    maximumEffort: 0,
    maximumSanity: 0,
    nex: 0,
    defense: 0,
    protection: 0,
    resistance: 0,
    displacement: 0,
  });

  useEffect(() => {
    getDocsStatus();
  }, []);

  async function getDocsStatus() {
    const { docs } = await db
      .collection("record")
      .where("uid", "==", record.value.uid)
      .get();
    setGetStatus(docs[0].data());
  }

  const handleClick = () => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 2000);
  };

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
        if (progress !== 100) {
          setLoading(true);
        } else if (progress === 100) {
          getDocsStatus();
        }
      },
      (error) => {
        alert("algum ritual deu errada verifique os sinais");
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          db.collection("record").doc(record.value.uid).set(
            {
              imgUrl: downloadURL,
            },
            { merge: true }
          );
          getDocsStatus();
          setLoading(false);
        });
      }
    );
    getDocsStatus();
  }

  const Sanity = (value) => {
    let sanityValue = parseInt(value);
    let roll100 = Math.floor(Math.random() * 100 + 1);
    sani.push(roll100);
    if (roll100 <= sanityValue) {
      sani.push("Sucesso");
    } else {
      sani.push("Fracasso");
    }
  };

  return (
    <>
      {isModal100 ? (
        <ModalSmall onClose={(e) => setIsModal100(false)}>
          <div className="w-full h-full flex flex-col items-center">
            <div className="h-[20%] w-full flex items-center justify-center font-bold text-2xl border-b-[1px] border-white">
              Rolagem de D100
            </div>
            {!show && (
              <div className="h-[80%] flex items-center">
                <div className="w-5 h-5 rounded-full bg-white animate-ping" />
              </div>
            )}
            {show && (
              <div className="text-[2vw] h-[80%] flex items-center">
                {Math.floor(Math.random() * 100 + 1)}
              </div>
            )}
          </div>
        </ModalSmall>
      ) : null}
      {isModalSanity ? (
        <ModalSmall
          onClose={(e) => {
            setIsModalSanity(false);
            setSani([]);
          }}
        >
          <div className="h-[20%] w-full flex items-center justify-center font-bold text-2xl border-b-[1px] border-white">
            Rolagem de Sanidade
          </div>
          <div className="h-[80%] w-full flex flex-col items-center justify-center">
            {!show && (
              <div className="h-[80%] flex items-center">
                <div className="w-5 h-5 rounded-full bg-white animate-ping" />
              </div>
            )}
            {show && (
              <>
                {sani.map((resul, index) => {
                  return (
                    <div key={index} className="text-3xl">
                      {resul}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </ModalSmall>
      ) : null}
      {
        <div
          className="bg-black-opacity rounded-md flex flex-col justify-between w-[99%] h-[720px] pt-[1%] pb-[1%]
          md:w-[49%] md:h-[720px]
          lg:w-[49%] lg:h-[720px]
          xl:w-[49%] xl:h-[720px]
          2xl:w-[39%] 2xl:h-[720px]
          "
        >
          {/* imgUser */}
          {getStatus.length !== 0 && (
            <>
              <div className="flex justify-around items-center w-full">
                <label
                  for="img"
                  className="h-[115px] w-[115px] rounded-full cursor-pointer relative"
                >
                  {getStatus.Status.dying === true && (
                    <img
                      src={Dead}
                      className="w-7 absolute bottom-0 right-0 m-1"
                      alt=""
                    />
                  )}
                  <img
                    src={getStatus.imgUrl ? getStatus.imgUrl : "/user.png"}
                    alt=""
                    className={
                      loading
                        ? "animate-ping h-[115px] w-[115px]  rounded-full object-cover"
                        : "h-[115px] w-[115px] rounded-full object-cover"
                    }
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
                  className="rounded-full h-24 hover:animate-spin"
                  src="/d100.png"
                  alt="d20"
                  onClick={(e) => {
                    setIsModal100(true);
                    handleClick();
                  }}
                />
              </div>
              <div className="w-full h-full pr-[2%] pl-[2%] flex flex-col justify-around">
                {/* Life */}
                <div>
                  <p className="text-xl">Vida</p>
                  <div className="text-xl flex items-center justify-center w-full h-[35px] rounded-[3px] border-none bg-red-500">
                    <div class="loading">
                      <svg width="64px" height="35px">
                        <polyline
                          points="0.157 23.954, 14 23.954, 21.843 35, 43 0, 50 24, 64 24"
                          id="back"
                        />
                        <polyline
                          points="0.157 23.954, 14 23.954, 21.843 35, 43 0, 50 24, 64 24"
                          id="front"
                        />
                      </svg>
                    </div>
                    <input
                      type="number"
                      className="text-xl w-[50px] h-[25px] bg-transparent border-none text-right text-white"
                      defaultValue={getStatus.Status.currentLife}
                      onChange={(e) => {
                        setStatus({
                          ...status,
                          currentLife: e.target.value,
                        });
                      }}
                      onBlur={async () => {
                        await db
                          .collection("record")
                          .doc(getStatus.uid)
                          .set(
                            {
                              Status: {
                                currentLife: status.currentLife
                                  ? status.currentLife
                                  : getStatus.Status.currentLife,
                              },
                            },
                            { merge: true }
                          );
                      }}
                    />
                    /
                    <input
                      type="number"
                      className="text-xl w-[50px] h-[25px] bg-transparent border-none text-white"
                      defaultValue={getStatus.Status.maximumLife}
                      onChange={(e) =>
                        setStatus({
                          ...status,
                          maximumLife: e.target.value,
                        })
                      }
                      onBlur={async () => {
                        await db
                          .collection("record")
                          .doc(getStatus.uid)
                          .set(
                            {
                              Status: {
                                maximumLife: status.maximumLife
                                  ? status.maximumLife
                                  : getStatus.Status.maximumLife,
                              },
                            },
                            { merge: true }
                          );
                      }}
                    />
                    <div class="loading">
                      <svg width="64px" height="35px">
                        <polyline
                          points="0.157 23.954, 14 23.954, 21.843 35, 43 0, 50 24, 64 24"
                          id="back"
                        />
                        <polyline
                          points="0.157 23.954, 14 23.954, 21.843 35, 43 0, 50 24, 64 24"
                          id="front"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        defaultChecked={getStatus.Status.seriousInjury}
                        onClick={async (e) => {
                          await db
                            .collection("record")
                            .doc(getStatus.uid)
                            .set(
                              {
                                Status: {
                                  seriousInjury:
                                    !getStatus.Status.seriousInjury,
                                },
                              },
                              { merge: true }
                            );
                          getDocsStatus();
                        }}
                      />
                      <p className="text-base">Lesão Grave</p>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        defaultChecked={getStatus.Status.unconscious}
                        onClick={async (e) => {
                          await db
                            .collection("record")
                            .doc(getStatus.uid)
                            .set(
                              {
                                Status: {
                                  unconscious: !getStatus.Status.unconscious,
                                },
                              },
                              { merge: true }
                            );
                          getDocsStatus();
                        }}
                      />
                      <p className="text-base">Inconsciente</p>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        defaultChecked={getStatus.Status.dying}
                        onClick={async (e) => {
                          await db
                            .collection("record")
                            .doc(getStatus.uid)
                            .set(
                              {
                                Status: {
                                  dying: !getStatus.Status.dying,
                                },
                              },
                              { merge: true }
                            );
                          getDocsStatus();
                        }}
                      />
                      <p className="text-base">Morrendo</p>
                    </div>
                  </div>
                </div>
                {/* Sanity */}
                <div>
                  <p className="text-xl">Sanidade</p>
                  <div className="w-full flex items-center justify-between">
                    <div className="text-xl flex items-center justify-center w-[84%] h-[35px] rounded-[3px] border-none bg-blue-1000">
                      <input
                        type="number"
                        className="text-xl w-[50px] h-[25px] bg-transparent border-none text-right text-white"
                        defaultValue={getStatus.Status.currentSanity}
                        onChange={(e) =>
                          setStatus({
                            ...status,
                            currentSanity: e.target.value,
                          })
                        }
                        onBlur={async () => {
                          await db
                            .collection("record")
                            .doc(getStatus.uid)
                            .set(
                              {
                                Status: {
                                  currentSanity: status.currentSanity
                                    ? status.currentSanity
                                    : getStatus.Status.currentSanity,
                                },
                              },
                              { merge: true }
                            );
                        }}
                      />
                      /
                      <input
                        type="number"
                        className="text-xl w-[50px] h-[25px] bg-transparent border-none text-white"
                        defaultValue={getStatus.Status.maximumSanity}
                        onChange={(e) =>
                          setStatus({
                            ...status,
                            maximumSanity: e.target.value,
                          })
                        }
                        onBlur={async () => {
                          await db
                            .collection("record")
                            .doc(getStatus.uid)
                            .set(
                              {
                                Status: {
                                  maximumSanity: status.maximumSanity
                                    ? status.maximumSanity
                                    : getStatus.Status.maximumSanity,
                                },
                              },
                              { merge: true }
                            );
                        }}
                      />
                    </div>
                    <img
                      className="h-12 hover:animate-spin"
                      src="/d100.png"
                      alt="d20"
                      onClick={(e) => {
                        Sanity(getStatus.Status.nex);
                        setIsModalSanity(true);
                        handleClick();
                      }}
                    />
                  </div>
                  <div className="flex justify-evenly">
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        defaultChecked={getStatus.Status.traumatized}
                        onClick={async (e) => {
                          await db
                            .collection("record")
                            .doc(getStatus.uid)
                            .set(
                              {
                                Status: {
                                  traumatized: !getStatus.Status.traumatized,
                                },
                              },
                              { merge: true }
                            );
                          getDocsStatus();
                        }}
                      />
                      <p className="text-base">Traumatizado</p>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        defaultChecked={getStatus.Status.maddened}
                        onClick={async (e) => {
                          await db
                            .collection("record")
                            .doc(getStatus.uid)
                            .set(
                              {
                                Status: {
                                  maddened: !getStatus.Status.maddened,
                                },
                              },
                              { merge: true }
                            );
                          getDocsStatus();
                        }}
                      />
                      <p className="text-base">Enlouquecido</p>
                    </div>
                  </div>
                </div>
                {/* Effort */}
                <div>
                  <p className="text-xl">Esforço</p>
                  <div className="text-xl flex items-center justify-center w-full h-[35px] rounded-[3px] border-none bg-purple-900">
                    <input
                      type="number"
                      className="text-xl w-[50px] h-[25px] bg-transparent border-none text-right text-white"
                      defaultValue={getStatus.Status.currentEffort}
                      onChange={(e) =>
                        setStatus({
                          ...status,
                          currentEffort: e.target.value,
                        })
                      }
                      onBlur={async () => {
                        await db
                          .collection("record")
                          .doc(getStatus.uid)
                          .set(
                            {
                              Status: {
                                currentEffort: status.currentEffort
                                  ? status.currentEffort
                                  : getStatus.Status.currentEffort,
                              },
                            },
                            { merge: true }
                          );
                      }}
                    />
                    /
                    <input
                      type="number"
                      className="text-xl w-[50px] h-[25px] bg-transparent border-none text-white"
                      defaultValue={getStatus.Status.maximumEffort}
                      onChange={(e) =>
                        setStatus({
                          ...status,
                          maximumEffort: e.target.value,
                        })
                      }
                      onBlur={async () => {
                        await db
                          .collection("record")
                          .doc(getStatus.uid)
                          .set(
                            {
                              Status: {
                                maximumEffort: status.maximumEffort
                                  ? status.maximumEffort
                                  : getStatus.Status.maximumEffort,
                              },
                            },
                            { merge: true }
                          );
                      }}
                    />
                  </div>
                  <div className="flex justify-evenly w-full pt-[3%]">
                    <div className="flex flex-col w-[30%] items-center">
                      <p className="text-base">Defesa</p>
                      <input
                        type="number"
                        className="w-[50%] bg-transparent border-b-[3px] border-gray-800 text-center text-2xl"
                        defaultValue={getStatus.Status.defense}
                        onChange={(e) =>
                          setStatus({
                            ...status,
                            defense: e.target.value,
                          })
                        }
                        onBlur={async () => {
                          await db
                            .collection("record")
                            .doc(getStatus.uid)
                            .set(
                              {
                                Status: {
                                  defense: status.defense
                                    ? status.defense
                                    : getStatus.Status.defense,
                                },
                              },
                              { merge: true }
                            );
                        }}
                      />
                    </div>
                    <div className="flex flex-col w-[30%] items-center">
                      <p className="text-base">Proteção</p>
                      <input
                        type="number"
                        className="w-[50%] bg-transparent border-b-[3px] border-gray-800 text-center text-2xl"
                        defaultValue={getStatus.Status.protection}
                        onChange={(e) =>
                          setStatus({
                            ...status,
                            protection: e.target.value,
                          })
                        }
                        onBlur={async () => {
                          await db
                            .collection("record")
                            .doc(getStatus.uid)
                            .set(
                              {
                                Status: {
                                  protection: status.protection
                                    ? status.protection
                                    : getStatus.Status.protection,
                                },
                              },
                              { merge: true }
                            );
                        }}
                      />
                    </div>
                    <div className="flex flex-col w-[30%] items-center">
                      <p className="text-base">Resistência</p>
                      <input
                        type="number"
                        className="w-[50%] bg-transparent border-b-[3px] border-gray-800 text-center text-2xl"
                        defaultValue={getStatus.Status.resistance}
                        onChange={(e) =>
                          setStatus({
                            ...status,
                            resistance: e.target.value,
                          })
                        }
                        onBlur={async () => {
                          await db
                            .collection("record")
                            .doc(getStatus.uid)
                            .set(
                              {
                                Status: {
                                  resistance: status.resistance
                                    ? status.resistance
                                    : getStatus.Status.resistance,
                                },
                              },
                              { merge: true }
                            );
                        }}
                      />
                    </div>
                    <div className="flex flex-col w-[30%] items-center">
                      <p className="text-base">Deslocamento</p>
                      <input
                        className="w-[50%] bg-transparent border-b-[3px] border-gray-800 text-center text-2xl"
                        defaultValue={getStatus.Status.displacement}
                        onChange={(e) =>
                          setStatus({
                            ...status,
                            displacement: e.target.value,
                          })
                        }
                        onBlur={async () => {
                          await db
                            .collection("record")
                            .doc(getStatus.uid)
                            .set(
                              {
                                Status: {
                                  displacement: status.displacement
                                    ? status.displacement
                                    : getStatus.Status.displacement,
                                },
                              },
                              { merge: true }
                            );
                        }}
                      />
                    </div>
                    <div className="flex flex-col w-[30%] items-center">
                      <p className="text-base">Nex</p>
                      <input
                        type="number"
                        className="w-[50%] bg-transparent border-b-[3px] border-gray-800 text-center text-2xl"
                        defaultValue={getStatus.Status.nex}
                        onChange={(e) =>
                          setStatus({
                            ...status,
                            nex: e.target.value,
                          })
                        }
                        onBlur={async () => {
                          await db
                            .collection("record")
                            .doc(getStatus.uid)
                            .set(
                              {
                                Status: {
                                  nex: status.nex
                                    ? status.nex
                                    : getStatus.Status.nex,
                                },
                              },
                              { merge: true }
                            );
                          getDocsStatus();
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      }
    </>
  );
};

export default StatusPersona;

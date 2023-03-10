import React from "react";
import { useState } from "react";
import { db } from "../auth/Config";
import { ModalAverage } from "./Modal";

const PersonalDetail = (record) => {
  const [isModalBackground, setIsModalBackground] = useState(false);
  const [dates, setDates] = useState({
    name: "",
    player: "",
    origin: "",
    age: "",
    genre: "",
    birthplace: "",
    placeResidence: "",
    class: "",
    patent: "",
  });

  return (
    <>
      {isModalBackground ? (
        <ModalAverage
          onClose={(e) => {
            setIsModalBackground(false);
          }}
        >
          <div className="flex flex-col items-center justify-between w-full h-full">
            <div className="w-full border-b-[1px] border-white p-2 flex items-center justify-center text-xl font-bold">
              CRIAR RITUAL
            </div>
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
        <div className="w-[100%] flex flex-col items-center justify-evenly p-[4%]">
          <p className="text-[1.3vw]">DETALHES PESSOAIS</p>
          <div className="w-full">
            <p className="text-xl">Nome</p>
            <input
              className="w-full bg-transparent border-b-[2px] border-gray-800 text-lg"
              defaultValue={record.value.PersonalDetails.name}
              onChange={(e) => setDates({ ...dates, name: e.target.value })}
              onBlur={async () => {
                await db
                  .collection("record")
                  .doc(record.value.uid)
                  .set(
                    {
                      PersonalDetails: {
                        name: dates.name
                          ? dates.name
                          : record.value.PersonalDetails.name,
                      },
                    },
                    { merge: true }
                  );
              }}
            />
          </div>
          <div className="w-full">
            <p className="text-xl">Jogador</p>
            <input
              className="w-full bg-transparent border-b-[2px] border-gray-800 text-lg"
              defaultValue={record.value.PersonalDetails.player}
              onChange={(e) => setDates({ ...dates, player: e.target.value })}
              onBlur={async () => {
                await db
                  .collection("record")
                  .doc(record.value.uid)
                  .set(
                    {
                      PersonalDetails: {
                        player: dates.player
                          ? dates.player
                          : record.value.PersonalDetails.player,
                      },
                    },
                    { merge: true }
                  );
              }}
            />
          </div>
          <div className="w-full">
            <p className="text-xl">Idade</p>
            <input
              className="w-full bg-transparent border-b-[2px] border-gray-800 text-lg"
              defaultValue={record.value.PersonalDetails.age}
              onChange={(e) => setDates({ ...dates, age: e.target.value })}
              onBlur={async () => {
                await db
                  .collection("record")
                  .doc(record.value.uid)
                  .set(
                    {
                      PersonalDetails: {
                        age: dates.age
                          ? dates.age
                          : record.value.PersonalDetails.age,
                      },
                    },
                    { merge: true }
                  );
              }}
            />
          </div>
          <div className="w-full">
            <p className="text-xl">Gênero</p>
            <input
              className="w-full bg-transparent border-b-[2px] border-gray-800 text-lg"
              defaultValue={record.value.PersonalDetails.genre}
              onChange={(e) => setDates({ ...dates, genre: e.target.value })}
              onBlur={async () => {
                await db
                  .collection("record")
                  .doc(record.value.uid)
                  .set(
                    {
                      PersonalDetails: {
                        genre: dates.genre
                          ? dates.genre
                          : record.value.PersonalDetails.genre,
                      },
                    },
                    { merge: true }
                  );
              }}
            />
          </div>
          <div className="w-full">
            <p className="text-xl">Local de nascimento</p>
            <input
              className="w-full bg-transparent border-b-[2px] border-gray-800 text-lg"
              defaultValue={record.value.PersonalDetails.birthplace}
              onChange={(e) =>
                setDates({ ...dates, birthplace: e.target.value })
              }
              onBlur={async () => {
                await db
                  .collection("record")
                  .doc(record.value.uid)
                  .set(
                    {
                      PersonalDetails: {
                        birthplace: dates.birthplace
                          ? dates.birthplace
                          : record.value.PersonalDetails.birthplace,
                      },
                    },
                    { merge: true }
                  );
              }}
            />
          </div>
          <div className="w-full">
            <p className="text-xl">Local de residência</p>
            <input
              className="w-full bg-transparent border-b-[2px] border-gray-800 text-lg"
              defaultValue={record.value.PersonalDetails.placeResidence}
              onChange={(e) =>
                setDates({
                  ...dates,
                  placeResidence: e.target.value,
                })
              }
              onBlur={async () => {
                await db
                  .collection("record")
                  .doc(record.value.uid)
                  .set(
                    {
                      PersonalDetails: {
                        placeResidence: dates.placeResidence
                          ? dates.placeResidence
                          : record.value.PersonalDetails.placeResidence,
                      },
                    },
                    { merge: true }
                  );
              }}
            />
          </div>
          <div className="w-full">
            <p className="text-xl">Origem</p>
            <input
              className="w-full bg-transparent border-b-[2px] border-gray-800 text-lg"
              defaultValue={record.value.PersonalDetails.origin}
              onChange={(e) =>
                setDates({
                  ...dates,
                  origin: e.target.value,
                })
              }
              onBlur={async () => {
                await db
                  .collection("record")
                  .doc(record.value.uid)
                  .set(
                    {
                      PersonalDetails: {
                        origin: dates.origin
                          ? dates.origin
                          : record.value.PersonalDetails.origin,
                      },
                    },
                    { merge: true }
                  );
              }}
            />
          </div>
          <div className="w-full">
            <p className="text-xl">Classe</p>
            <input
              className="w-full bg-transparent border-b-[2px] border-gray-800 text-lg"
              defaultValue={record.value.PersonalDetails.class}
              onChange={(e) =>
                setDates({
                  ...dates,
                  class: e.target.value,
                })
              }
              onBlur={async () => {
                await db
                  .collection("record")
                  .doc(record.value.uid)
                  .set(
                    {
                      PersonalDetails: {
                        class: dates.class
                          ? dates.class
                          : record.value.PersonalDetails.class,
                      },
                    },
                    { merge: true }
                  );
              }}
            />
          </div>
          <div className="w-full">
            <p className="text-xl">Patente</p>
            <input
              className="w-full bg-transparent border-b-[2px] border-gray-800 text-lg"
              defaultValue={record.value.PersonalDetails.patent}
              onChange={(e) =>
                setDates({
                  ...dates,
                  patent: e.target.value,
                })
              }
              onBlur={async () => {
                await db
                  .collection("record")
                  .doc(record.value.uid)
                  .set(
                    {
                      PersonalDetails: {
                        patent: dates.patent
                          ? dates.patent
                          : record.value.PersonalDetails.patent,
                      },
                    },
                    { merge: true }
                  );
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalDetail;

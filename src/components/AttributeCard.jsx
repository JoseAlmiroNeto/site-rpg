import React from "react";
import { useState } from "react";
import { db } from "../auth/Config";
import Attr from "../assets/attr.png";

const Attribute = (record) => {
  const [attributes, setAttributes] = useState({
    agility: 0,
    energy: 0,
    force: 0,
    intelligence: 0,
    presence: 0,
  });

  return (
    <div
      className="bg-black-opacity rounded-md flex w-[99%] h-[720px] border-[1px] border-gray-800
      md:w-[49%] md:h-[720px]
      lg:w-[49%] lg:h-[720px]
      xl:w-[49%] xl:h-[720px]  
      2xl:w-[39%] 2xl:h-[720px]
        "
    >
      <div className="w-full h-full flex flex-col items-center pt-3">
        <p className="text-2xl">ATRIBUTOS</p>
        <div className="w-full h-[600px] relative">
          <img
            className="w-full h-full absolute"
            src={Attr}
            alt=""
          />
          <div className="w-full h-full flex flex-col justify-center items-center gap-36">
            <div className="flex flex-col gap-20 w-full items-center">
              <div className="flex justify-center w-full z-10">
                {/* AGI */}
                <input
                  min="1"
                  max="20"
                  className="text-white w-[80px] text-3xl bg-transparent font-bold text-center"
                  type="number"
                  defaultValue={record.value.Attributes.agility}
                  onChange={(e) =>
                    setAttributes({
                      ...attributes,
                      agility: e.target.value,
                    })
                  }
                  onBlur={async () => {
                    await db
                      .collection("record")
                      .doc(record.value.uid)
                      .set(
                        {
                          Attributes: {
                            agility: attributes.agility
                              ? attributes.agility
                              : record.value.Attributes.agility,
                          },
                        },
                        { merge: true }
                      );
                  }}
                />
              </div>
              <div className="flex justify-between w-[70%] z-10">
                {/* FOR */}
                <input
                  min="1"
                  max="20"
                  className="text-white w-[80px] text-3xl bg-transparent font-bold text-center"
                  type="number"
                  defaultValue={record.value.Attributes.force}
                  onChange={(e) =>
                    setAttributes({
                      ...attributes,
                      force: e.target.value,
                    })
                  }
                  onBlur={async () => {
                    await db
                      .collection("record")
                      .doc(record.value.uid)
                      .set(
                        {
                          Attributes: {
                            force: attributes.force
                              ? attributes.force
                              : record.value.Attributes.force,
                          },
                        },
                        { merge: true }
                      );
                  }}
                />
                {/* INT */}
                <input
                  min="1"
                  max="20"
                  className="text-white w-[80px] text-3xl bg-transparent font-bold text-center"
                  type="number"
                  defaultValue={record.value.Attributes.intelligence}
                  onChange={(e) =>
                    setAttributes({
                      ...attributes,
                      intelligence: e.target.value,
                    })
                  }
                  onBlur={async () => {
                    await db
                      .collection("record")
                      .doc(record.value.uid)
                      .set(
                        {
                          Attributes: {
                            intelligence: attributes.intelligence
                              ? attributes.intelligence
                              : record.value.Attributes.intelligence,
                          },
                        },
                        { merge: true }
                      );
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between w-[51%] z-10">
              {/* PRE */}
              <input
                min="1"
                max="20"
                className="text-white w-[80px] text-3xl bg-transparent font-bold text-center"
                type="number"
                defaultValue={record.value.Attributes.presence}
                onChange={(e) =>
                  setAttributes({
                    ...attributes,
                    presence: e.target.value,
                  })
                }
                onBlur={async () => {
                  await db
                    .collection("record")
                    .doc(record.value.uid)
                    .set(
                      {
                        Attributes: {
                          presence: attributes.presence
                            ? attributes.presence
                            : record.value.Attributes.presence,
                        },
                      },
                      { merge: true }
                    );
                }}
              />
              {/* VIG */}
              <input
                min="1"
                max="20"
                className="text-white w-[80px] text-3xl bg-transparent font-bold text-center"
                type="number"
                defaultValue={record.value.Attributes.energy}
                onChange={(e) =>
                  setAttributes({
                    ...attributes,
                    energy: e.target.value,
                  })
                }
                onBlur={async () => {
                  await db
                    .collection("record")
                    .doc(record.value.uid)
                    .set(
                      {
                        Attributes: {
                          energy: attributes.energy
                            ? attributes.energy
                            : record.value.Attributes.energy,
                        },
                      },
                      { merge: true }
                    );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attribute;

import React, { useEffect, useState } from "react";
import { db } from "../auth/Config";

const AnotationCard = (record) => {
  const [Investigation, setInvestigation] = useState();

  return (
    <div
      className="bg-black-opacity rounded-md flex w-[99%] h-[720px] border-[1px] border-gray-800
    md:w-[49%] md:h-[720px]
    lg:w-[49%] lg:h-[720px]
    xl:w-[49%] xl:h-[720px]
    2xl:w-[39%] 2xl:h-[720px]
    "
    >
      <div className="w-[100%] flex flex-col items-center justify-evenly px-5">
        <p className="text-[1.3vw] h-[10%] w-full flex items-center justify-center">
          ANOTAÇÕES
        </p>
        <div className="w-full h-[85%]">
          <textarea
            rows="10"
            className="w-full h-full bg-transparent border-b-[2px] border-gray-800 text-lg scrollbar"
            defaultValue={record.value.investigation}
            onChange={(e) => setInvestigation(e.target.value)}
            onBlur={async () => {
              await db
                .collection("record")
                .doc(record.value.uid)
                .set(
                  {
                    investigation: Investigation
                      ? Investigation
                      : record.value.investigation,
                  },
                  { merge: true }
                );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AnotationCard;

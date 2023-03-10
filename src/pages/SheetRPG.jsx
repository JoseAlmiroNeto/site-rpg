import { useEffect, useState } from "react";
import { db } from "../auth/Config";
import PersonalDetail from "../components/PersonalCard";
import StatusPersona from "../components/StatusCard";
import Attribute from "../components/AttributeCard";
import AbilityCard from "../components/AbilityCard";
import CombatCard from "../components/CombatCard";
import SkillsCard from "../components/SkillsCard";
import Inventory from "../components/InventoryCard";
import { GiReturnArrow } from "react-icons/gi";
import RitualsCard from "../components/RitualsCard";
import AnotationCard from "./../components/AnotationCard";
import BackgroundCard from "../components/BackgroundCard";

function Records() {
  let uid = window.location.href.split("/")[4];

  const [records, setRecords] = useState([]);
  const [preLoading, setPreLoading] = useState(true);
  const [bgOn, setBgOn] = useState(true);
  const [dates, setDates] = useState({
    name: "",
    player: "",
    occupation: "",
    age: "",
    genre: "",
    birthplace: "",
    placeResidence: "",
  });

  useEffect(() => {
    getRecord();
  }, []);

  async function getRecord() {
    const { docs } = await db
      .collection("record")
      .where("uid", "==", uid)
      .get();
    setRecords(docs.map((doc) => doc.data()));
    setPreLoading(false);
  }

  return (
    <>
      <div
        className={
          bgOn
            ? "w-full flex flex-col items-center font-Messiri justify-center relative text-white"
            : "bg-black-100 w-full flex flex-col items-center font-Messiri justify-center relative text-white"
        }
      >
        <a
          className="absolute top-0 left-0 p-10"
          // href="http://localhost:3000/"
          href="https://ficharpg-9a0d5.web.app/"
        >
          <GiReturnArrow size="50px" />
        </a>
        <div className="absolute top-0 right-0 p-10">
          <label class="relative inline-flex items-center mb-4 cursor-pointer">
            <input type="checkbox" class="sr-only peer" checked={bgOn} />
            <div
              class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
              onClick={() => setBgOn(!bgOn)}
            />
          </label>
        </div>
        <div className="bg-green-600-100 w-full h-[200px] flex flex-col items-center justify-center">
          <img className="h-24" src="/Logo.svg" alt="logo" />
          <p className="text-2xl font-bold">Perfil de Investigador</p>
        </div>
        {records.map((record) => {
          return (
            <div className="w-[93%] flex flex-wrap item justify-center gap-4 text-white">
              <PersonalDetail value={record} />
              <StatusPersona value={record} />
              <Attribute value={record} />
              <AbilityCard value={record} />
              <CombatCard value={record} />
              <SkillsCard value={record} />
              <Inventory value={record} />
              <RitualsCard value={record} />
              <AnotationCard value={record} />
              <BackgroundCard value={record} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Records;

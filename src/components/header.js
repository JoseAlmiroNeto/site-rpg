import { authConfig } from "../auth/config";
import { ImExit } from "react-icons/im";
import { IconContext } from "react-icons";

export function Header() {
  return (
    <div className="bg-gradient-to-b from-red-blood-1000 to-red-blood-800 w-[100%] h-14 flex items-center justify-end">
      <button className="pr-3" onClick={() => authConfig.auth().signOut()}>
        <IconContext.Provider
          value={{ color: "red", size: "1.5em"}}
        >
          <div>
            <ImExit />
          </div>
        </IconContext.Provider>
      </button>
    </div>
  );
}

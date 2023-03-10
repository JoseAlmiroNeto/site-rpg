import React from "react";

export const ModalSmall = ({ id = "modal", onClose = () => {}, children }) => {
  const handleOutsideClick = (e) => {
    if (e.target.id === id) onClose();
  };

  return (
    <div
      id={id}
      className="w-[100vw] h-[100vh] top-0 fixed flex justify-center items-center z-40 font-Messiri"
      onClick={handleOutsideClick}
    >
      <div className="w-[550px] h-[250px] rounded-xl bg-black-100 border-[1px] border-white z-40 relative">
        <button
          className="mr-[10px] cursor-pointer bg-transparent text-[26px] text-white font-bold absolute top-0 right-0 z-50"
          onClick={onClose}
        >
          X
        </button>
        <div className="flex gap-[10px] flex-col items-center justify-center text-white h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export const ModalAverage = ({
  id = "modalAddSkills",
  onClose = () => {},
  children,
}) => {
  const handleOutsideClick = (e) => {
    if (e.target.id === id) onClose();
  };

  return (
    <div
      id={id}
      className="w-[100vw] h-[100vh] top-0 fixed flex justify-center items-center z-40 font-Messiri"
      onClick={handleOutsideClick}
    >
      <div className="w-[550px] h-[450px] rounded-xl bg-black-100 border-[1px] border-white z-40 relative">
        <button
          className="mr-[10px] cursor-pointer bg-transparent text-[26px] text-white font-bold absolute top-0 right-0 z-50"
          onClick={onClose}
        >
          X
        </button>
        <div className="flex gap-[10px] flex-col items-center justify-center text-white h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export const ModalLarge = ({
  id = "modalCreate",
  onClose = () => {},
  children,
}) => {
  const handleOutsideClick = (e) => {
    if (e.target.id === id) onClose();
  };

  return (
    <div
      id={id}
      className="w-[100vw] h-[100vh] top-0 fixed flex justify-center items-center z-40 font-Messiri"
      onClick={handleOutsideClick}
    >
      <div className="w-[500px] h-[730px] rounded-xl bg-black-100 border-[1px] border-white z-40 relative">
        <button
          className="mr-[10px] cursor-pointer bg-transparent text-[26px] text-white font-bold absolute top-0 right-0 z-50"
          onClick={onClose}
        >
          X
        </button>
        <div className="flex gap-[10px] flex-col items-center justify-center text-white h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

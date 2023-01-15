import React from "react";

export const Modal = ({ id = "modal", onClose = () => {}, children }) => {
  const handleOutsideClick = (e) => {
    if (e.target.id === id) onClose();
  };

  return (
    <div
      id={id}
      className="w-[100vw] h-[100vh] fixed flex justify-center items-center font-medieval z-40"
      onClick={handleOutsideClick}
    >
      <div className="w-[550px] h-[250px] rounded-[2px] bg-black-100 border-[1px] border-white z-40">
        <div className="flex items-center border-[1px] border-white">
          <h1 className="w-[100%] text-2xl text-white pl-[15px]">
            Rolagem de dado
          </h1>
          <button
            className="mr-[10px] cursor-pointer bg-transparent text-[26px] text-white font-bold"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div className="flex gap-[10px] flex-col items-center justify-center text-white h-[60%]">
          {children}
        </div>
      </div>
    </div>
  );
};

export const ModalCreate = ({ id = "modalCreate", onClose = () => {}, children }) => {
  const handleOutsideClick = (e) => {
    if (e.target.id === id) onClose();
  };

  return (
    <div
      id={id}
      className="w-[100vw] h-[100vh] fixed flex justify-center items-center font-medieval z-40"
      onClick={handleOutsideClick}
    >
      <div className="w-[25vw] h-[60vh] rounded-[2px] bg-black-100 border-[1px] border-white rounded-xl z-40">
        <div className="flex flex-col items-center justify-center text-white h-[100%]">
          {children}
        </div>
      </div>
    </div>
  );
};

export const ModalAttack = ({ id = "modalAttack", onClose = () => {}, children }) => {
  const handleOutsideClick = (e) => {
    if (e.target.id === id) onClose();
  };

  return (
    <div
      id={id}
      className="w-[100vw] h-[100vh] fixed flex justify-center items-center font-medieval z-40"
      onClick={handleOutsideClick}
    >
      <div className="w-[25vw] h-[75vh] rounded-[2px] bg-black-100 border-[1px] border-white rounded-xl z-40">
        <div className="flex flex-col items-center justify-center text-white h-[100%]">
          {children}
        </div>
      </div>
    </div>
  );
};

export const ModalCreateItems = ({ id = "modal", onClose = () => {}, children }) => {
  const handleOutsideClick = (e) => {
    if (e.target.id === id) onClose();
  };

  return (
    <div
      id={id}
      className="w-[100vw] h-[100vh] fixed flex justify-center items-center font-medieval z-40"
      onClick={handleOutsideClick}
    >
      <div className="w-[550px] h-[250px] rounded-[2px] bg-black-100 border-[1px] border-white z-40">
        <div className="flex items-center border-[1px] border-white">
          <h1 className="w-[100%] text-2xl text-white pl-[15px]">
            Criar Item
          </h1>
          <button
            className="mr-[10px] cursor-pointer bg-transparent text-[26px] text-white font-bold"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div className="flex gap-[10px] flex-col items-center justify-center text-white h-[84%]">
          {children}
        </div>
      </div>
    </div>
  );
};
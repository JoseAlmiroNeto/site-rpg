import React, { useState, useCallback } from "react";
import { withRouter, Link } from "react-router-dom";
import { authConfig } from "../../auth/config";
import { GiPadlock } from "react-icons/gi";
import { FaEnvelope } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";

const SignUp = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const signUpHandler = useCallback(
    async (event) => {
      event.preventDefault();

      const { email, password } = event.target.elements;
      try {
        await authConfig
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert("algum ritual deu errada verifique os sinais");
      }
    },
    [history]
  );

  const onChangeHandler = (event, hook) => {
    hook(event.target.value);
  };

  const inputFields = [
    {
      title: "Name",
      value: name,
      onChange: (event) => onChangeHandler(event, setName),
      name: "name",
      icon: <FaUserAlt />,
    },
    {
      title: "Email",
      value: email,
      onChange: (event) => onChangeHandler(event, setEmail),
      name: "email",
      type: "email",
      icon: <FaEnvelope />,
    },
    {
      title: "Password",
      value: password,
      onChange: (event) => onChangeHandler(event, setPassword),
      name: "password",
      type: "password",
      icon: <GiPadlock />,
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center text-white gap-6 h-screen">
      <div className="flex flex-col items-center">
        <img src="/Logo.svg" alt="" />
        <h1 className="font-bold, text-3xl">Ordo Realitas</h1>
        <span className="text-lg text-gray-200">
          Faça Login e comece a lutar contra o paranormal
        </span>
      </div>
      <form onSubmit={signUpHandler} className="flex flex-col gap-4">
        {inputFields.map((input, index) => (
          <>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-base">{input.title}</span>
              <div className="relative">
                <div className="absolute text-xl top-[10px] left-3">
                  {input.icon}
                </div>
                <input
                  className="border-0 w-[400px] h-[43px] bg-gray-800 outline-none pl-12 pb-[6px]"
                  key={`${index}_${input.name}`}
                  required
                  placeholder={input.title}
                  id={input.name}
                  autoFocus={input.autoFocus}
                  autoComplete={input.autoComplete}
                  type={input.type}
                />
              </div>
            </div>
          </>
        ))}
        <button
          type="submit"
          className="border-0 w-[400px] h-[43px] bg-gradient-to-b from-red-blood-1000 to-red-blood-800 rounded-md"
        >
          Entrar
        </button>
      </form>
      <div className="flex flex-col items-center gap-1">
        <Link
          to="/login"
          className="text-gray-200 underline text-sm cursor-pointer"
        >
          Não possui conta? Crie uam agora!
        </Link>
      </div>
    </div>
  );
};

export default withRouter(SignUp);

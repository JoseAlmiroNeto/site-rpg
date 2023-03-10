import React, { useCallback, useContext, useState } from "react";
import { authConfig } from "../../auth/Config";
import { AuthContext } from "../../auth/AuthContext";
import { Link, Redirect, withRouter } from "react-router-dom";
import { GiPadlock } from "react-icons/gi";
import { FaEnvelope } from "react-icons/fa";

const Login = ({ history }) => {
  const loginHandler = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;

      try {
        await authConfig
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert("algum ritual deu errado verifique os sinais");
      }
    },
    [history]
  );

  const { user } = useContext(AuthContext);
  if (user) {
    return <Redirect to="/" />;
  }

  const inputFields = [
    {
      title: "Digite seu Email",
      autoComplete: "email",
      name: "email",
      autoFocus: true,
      type: "email",
      icon: <FaEnvelope />,
    },
    {
      title: "Password",
      autoComplete: "current-password",
      name: "password",
      autoFocus: false,
      type: "password",
      icon: <GiPadlock />,
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center text-white gap-6 h-screen bg-backgroundLoading bg-cover bg-fixed m-0">
      <div className="flex flex-col items-center">
        <img src="/Logo.svg" alt="" />
        <h1 className="font-bold, text-3xl">Ordo Realitas</h1>
        <span className="text-lg text-gray-200">
          Faça Login e comece a lutar contra o paranormal
        </span>
      </div>
      <form onSubmit={loginHandler} className="flex flex-col gap-4">
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
          className="border-0 w-[400px] h-[43px] bg-gradient-to-b from-red-1000 to-red-800 rounded-md"
        >
          Entrar
        </button>
      </form>
      <div className="flex flex-col items-center gap-1">
        <Link
          to="/sign-up"
          className="text-gray-200 underline text-sm cursor-pointer"
        >
          Não possui conta? Crie uma agora!
        </Link>
      </div>
    </div>
  );
};

export default withRouter(Login);
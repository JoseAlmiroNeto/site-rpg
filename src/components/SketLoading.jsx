import React from 'react'

const SketLoading = () => {
    return (
        <div className="text-white w-full pb-14">
            {/* Logo */}
            <div className="flex flex-col items-center gap-3 justify-center">
                <div
                    className="bg-gray-800 rounded-full animate-pulse w-36 h-36"
                    src="/Logo.svg"
                    alt="logo"
                />
                <div className="bg-gray-800 rounded-md animate-pulse h-[36px] w-[312px]"></div>
            </div>
            <div className="flex flex-col gap-7">
                {/* Perfil */}
                <div className="flex items-center justify-center gap-[3%] w-full ">
                    {/* Detalhes Pessoais */}
                    <div className="bg-gray-800 animate-pulse rounded-md flex " />
                    {/* Status */}
                    <div className="bg-gray-800 animate-pulse rounded-md flex flex-col justify-between h-full pt-[1%] pb-[1%]" />
                </div>
                {/* Atribu/Perici */}
                <div className="flex items-center justify-center gap-[3%] 2xl:h-[638px] xl:h-[500px]">
                    {/* Atri */}
                    <div className="bg-gray-800 animate-pulse h-full rounded-md flex 2xl:w-[30%] xl:w-[30%]" />
                    {/* Perici */}
                    <div className="bg-gray-800 animate-pulse h-full rounded-md flex 2xl:w-[30%] xl:w-[30%]" />
                </div>
                {/* Combate */}
                <div className="flex items-center justify-center 2xl:h-[638px] xl:h-[500px]">
                    <div className="bg-gray-800 animate-pulse w-[63%] h-full rounded-md flex flex-col items-center" />
                </div>
                {/* Inventario */}
                <div className="flex items-center justify-center 2xl:h-[638px] xl:h-[500px]">
                    <div className="bg-gray-800 animate-pulse w-[63%] h-full rounded-md flex flex-col items-center" />
                </div>
            </div>
        </div>
    )
}

export default SketLoading
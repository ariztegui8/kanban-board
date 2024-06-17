import React, { useState } from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { BsColumnsGap } from "react-icons/bs";
import { Separator } from "@/components/ui/separator"
import { LuUsers } from "react-icons/lu";
import { RiLineChartLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { IoChevronDownOutline } from "react-icons/io5";


const ColumnIcons = ({menuColumn, handleMenuColumn}) => {

    return (
        <div className={`p-2 flex flex-col shadow-right min-h-screen  transition-all duration-300 ${menuColumn ? 'w-44' : 'w-14'}`}>
            <div className={`p-2 flex justify-end mb-8`}>
                {menuColumn ?
                    <IoIosArrowBack
                        size={22}
                        color='#808080'
                        className='cursor-pointer'
                        onClick={handleMenuColumn}
                    />
                    :

                    <IoIosArrowForward
                        size={22}
                        color='#808080'
                        className='cursor-pointer'
                        onClick={handleMenuColumn}
                    />
                }
            </div>

            <div className='p-2 flex justify-between gap-2 items-center'>
                <div className='flex items-center gap-2 cursor-pointer'>
                    <BsColumnsGap
                        size={20}
                        color='#85C88A'
                        className='cursor-pointer'
                    />
                    <div className={`${menuColumn ? 'flex' : 'hidden'}`}>
                        <p className='text-[#64748B] text-sm'>Tableros</p>
                    </div>
                </div>

                <div className={`${menuColumn ? 'flex' : 'hidden'}`}>
                    <IoChevronDownOutline
                        size={16}
                        color='#808080'
                        className='cursor-pointer'
                    />
                </div>

            </div>

            <Separator className={`my-4`} />

            <div className='p-2 flex justify-between gap-2 items-center'>
                <div className='flex items-center gap-2 cursor-pointer'>
                    <LuUsers
                        size={20}
                        color='#85C88A'
                        className='cursor-pointer'
                    />
                    <div className={`${menuColumn ? 'flex' : 'hidden'}`}>
                        <p className='text-[#64748B] text-sm'>Equipos</p>
                    </div>
                </div>

                <div className={`${menuColumn ? 'flex' : 'hidden'}`}>
                    <IoChevronDownOutline
                        size={16}
                        color='#808080'
                        className='cursor-pointer'
                    />
                </div>

            </div>

            <Separator className={`my-4`} />

            <div className='p-2 flex justify-between gap-2 items-center'>
                <div className='flex items-center gap-2 cursor-pointer'>
                    <RiLineChartLine
                        size={20}
                        color='#85C88A'
                        className='cursor-pointer'
                    />
                    <div className={`${menuColumn ? 'flex' : 'hidden'}`}>
                        <p className='text-[#64748B] text-sm'>Informes</p>
                    </div>
                </div>

                <div className={`${menuColumn ? 'flex' : 'hidden'}`}>
                    <IoChevronDownOutline
                        size={16}
                        color='#808080'
                        className='cursor-pointer'
                    />
                </div>
            </div>

            <Separator className={`my-4`} />

            <div className='p-2 flex justify-between gap-2 items-center'>
                <div className='flex items-center gap-2 cursor-pointer'>
                    <IoSettingsOutline
                        size={20}
                        color='#85C88A'
                        className='cursor-pointer'
                    />
                    <div className={`${menuColumn ? 'flex' : 'hidden'}`}>
                        <p className='text-[#64748B] text-sm'>Configuración</p>
                    </div>
                </div>

                <div className={`${menuColumn ? 'flex' : 'hidden'}`}>
                    <IoChevronDownOutline
                        size={16}
                        color='#808080'
                        className='cursor-pointer'
                    />
                </div>
            </div>
        </div>
    )
}

export default ColumnIcons

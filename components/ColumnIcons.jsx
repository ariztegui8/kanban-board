import React from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { BsColumnsGap } from "react-icons/bs";
import { Separator } from "@/components/ui/separator"
import { LuUsers } from "react-icons/lu";
import { RiLineChartLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";


const ColumnIcons = () => {
    return (
        <div className='p-4 flex flex-col shadow-right h-screen'>
            <div className='mb-14'>
                <IoIosArrowForward
                    size={20}
                    color='#808080'
                    className='cursor-pointer'
                />
            </div>

            <div >
                <BsColumnsGap
                    size={20}
                    color='#85C88A'
                    className='cursor-pointer'
                />
            </div>
            <Separator className="my-6"/>
            <div >
                <LuUsers
                    size={20}
                    color='#85C88A'
                    className='cursor-pointer'
                />
            </div>
            <Separator className="my-6"/>
            <div >
                <RiLineChartLine
                    size={20}
                    color='#85C88A'
                    className='cursor-pointer'
                />
            </div>
            <Separator className="my-6"/>
            <div >
                <IoSettingsOutline
                    size={20}
                    color='#85C88A'
                    className='cursor-pointer'
                />
            </div>

        </div>
    )
}

export default ColumnIcons
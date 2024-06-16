import React, { useState } from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { BsColumnsGap } from "react-icons/bs";
import { Separator } from "@/components/ui/separator"
import { LuUsers } from "react-icons/lu";
import { RiLineChartLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import Link from 'next/link'


const ColumnIcons = () => {

    const [menuColumn, setMenuColumn] = useState(false)

    const handleMenuColumn = () => {
        setMenuColumn(!menuColumn)
    }


    return (
        <div className={`p-2 flex flex-col shadow-right min-h-screen  transition-all duration-300 ${menuColumn ? 'w-44' : 'w-14'}`}>
            <div className={`p-2 flex justify-end ${menuColumn ? 'mb-4' : 'mb-8'}`}>
                {menuColumn ?
                    <IoIosArrowBack
                        size={20}
                        color='#808080'
                        className='cursor-pointer'
                        onClick={handleMenuColumn}
                    />
                    :

                    <IoIosArrowForward
                        size={20}
                        color='#808080'
                        className='cursor-pointer'
                        onClick={handleMenuColumn}
                    />
                }
            </div>

            <div className='p-2'>
                {menuColumn ?
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="#" passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Tableros
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    :
                    <BsColumnsGap
                        size={20}
                        color='#85C88A'
                        className='cursor-pointer'
                    />
                }
            </div>

            <Separator className={`${menuColumn ? 'my-1' : 'my-4'}`} />

            <div className='p-2'>
                {menuColumn ?
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="#" passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Equipos
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    :
                    <LuUsers
                        size={20}
                        color='#85C88A'
                        className='cursor-pointer'
                    />
                }
            </div>

            <Separator className={`${menuColumn ? 'my-1' : 'my-4'}`} />

            <div className='p-2'>
                {menuColumn ?
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="#" passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Informes
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    :
                    <RiLineChartLine
                        size={20}
                        color='#85C88A'
                        className='cursor-pointer'
                    />
                }
            </div>

            <Separator className={`${menuColumn ? 'my-1' : 'my-4'}`} />

            <div className='p-2'>
                {menuColumn ?
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="#" passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Configuración
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    :
                    <IoSettingsOutline
                        size={20}
                        color='#85C88A'
                        className='cursor-pointer'
                    />
                }
            </div>

        </div>
    )
}

export default ColumnIcons

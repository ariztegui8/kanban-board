import React from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import Link from 'next/link'

const MenuNavegation = () => {
    return (
        <div>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href="#" passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Inicio
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <Link href="#" passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Tablero kanban
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Cronograma</NavigationMenuTrigger>
                        <NavigationMenuContent className="bg-white p-4 w-72 shadow-lg rounded-md">
                            <ul className='w-60'>
                                <li className='mb-1 text-sm text-[#0F172A] cursor-pointer'>
                                    <NavigationMenuLink>Publicaciones</NavigationMenuLink>
                                </li>
                                <li className='mb-1 text-sm text-[#0F172A] cursor-pointer'>
                                    <NavigationMenuLink>Progresos</NavigationMenuLink>
                                </li>
                                <li className='text-sm text-[#0F172A] cursor-pointer'>
                                    <NavigationMenuLink>Calendario</NavigationMenuLink>
                                </li>
                            </ul>

                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Listas</NavigationMenuTrigger>
                        <NavigationMenuContent className="bg-white p-4 shadow-lg rounded-md">
                            <ul className='w-60 '>
                                <li className='mb-1 text-sm text-[#0F172A] cursor-pointer'>
                                    <NavigationMenuLink>Persona asignada</NavigationMenuLink>
                                </li>
                                <li className='mb-1 text-sm text-[#0F172A] cursor-pointer'>
                                    <NavigationMenuLink>Prioridad</NavigationMenuLink>
                                </li>
                                <li className='text-sm text-[#0F172A] cursor-pointer'>
                                    <NavigationMenuLink>Recientes</NavigationMenuLink>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <Link href="#" passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Objetivos
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

export default MenuNavegation
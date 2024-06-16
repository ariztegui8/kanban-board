import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { FiLayout } from "react-icons/fi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ListChecks, Table2 } from 'lucide-react';


const CreateBoard = () => {
    return (
        <div className='flex flex-col items-start justify-between gap-4 mb-10 md:flex-row md:items-center md:mb-5'>
            <div className='hidden md:flex'>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="#">Tableros</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            /
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="#">Equipo Front</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            /
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage>Mis proyectos</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div>
                <p className='text-lg font-semibold text-[#0F172A]'>Tablero Front-End Engineer</p>
            </div>

            <div>
                <Button variant="custom" className='gap-2'>
                    <FiLayout color="#fff" size={22} />
                    Crear tablero
                </Button>
            </div>
        </div>
    )
}

export default CreateBoard
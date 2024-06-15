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
        <div className='flex flex-col items-center justify-between gap-2 mb-5'>
            <div>
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
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="custom" className='gap-2'>
                            <FiLayout color="#fff" size={22}/>
                            Crear tablero
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40">
                       
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <span>Crear tabla</span>
                                <DropdownMenuShortcut> <Table2 className="mr-2 h-4 w-4" /></DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default CreateBoard
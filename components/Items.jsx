import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import { IoIosMore } from "react-icons/io";
import avatar1 from '../assets/avatar1.png';
import { VscPinned } from "react-icons/vsc";
import { HiOutlineBolt } from "react-icons/hi2";
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowDownNarrowWide, ArrowUpNarrowWide, Pencil, Trash2 } from 'lucide-react';

const Items = ({ id, title, description  }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: 'item',
    },
  });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={`p-3 bg-white shadow-md  w-full border border-[#6B959E] ${isDragging && 'opacity-50'}`}

    >
      <div className="">
        <div className='flex items-center justify-between gap-2 mb-3'>
          <div>
            <p className='text-[#6B959E] text-xs'># tarea</p>
          </div>
          <div {...listeners} className='flex-grow cursor-move'>
          <p className='text-white'>Move</p>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div>
                  <IoIosMore
                    size={24}
                    color='#0F172A'
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <span>Editar tarea</span>
                    <DropdownMenuShortcut> <Pencil className="mr-2 h-4 w-4" /></DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Enviar arriba</span>
                    <DropdownMenuShortcut> <ArrowUpNarrowWide className="mr-2 h-4 w-4" /></DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Enviar abajo</span>
                    <DropdownMenuShortcut> <ArrowDownNarrowWide className="mr-2 h-4 w-4" /></DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Eliminar</span>
                    <DropdownMenuShortcut> <Trash2 className="mr-2 h-4 w-4" /></DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className='flex gap-4 mb-4'>
          <div className='w-12 h-12'>
            <img className='w-full h-full rounded-xl' src={avatar1.src} alt="" />
          </div>
          <div>
            <p className='text-sm text-[#0F172A] font-medium mb-1'>{title}</p>
            <p className='text-xs text-[#64748B] bg-slate-300 break-words !important'>{description}</p>
          </div>
        </div>

        <div className='flex justify-between gap-2'>
          <div className='flex gap-2'>
            <div className='flex '>
              <VscPinned
                size={18}
                color='#5EBDB2'
              />
              <p className='text-xs text-[#0F172A]'>Fijar</p>
            </div>

            <Separator orientation="vertical" />

            <div className='flex '>
              <HiOutlineBolt
                size={18}
                color='#5EBDB2'
              />
              <p className='text-xs text-[#0F172A]'>Baja</p>
            </div>
          </div>

          <div>
            <p className='text-[11px] text-[#C7C7C7]'>01 Julio 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Items;

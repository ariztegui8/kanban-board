import { useSortable } from '@dnd-kit/sortable';
import React, { useEffect, useRef } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { IoIosMore } from "react-icons/io";
import { VscPinned } from "react-icons/vsc";
import { HiOutlineBolt } from "react-icons/hi2";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowDownNarrowWide, ArrowUpNarrowWide, Pencil, Trash2 } from 'lucide-react';
import avatar1 from '../assets/avatar1.png';
import { formatearFecha } from '@/helpers/formatearFecha';

const Items = ({ id, title, description, onEdit, numero, priority, date }) => {
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
      className={`p-3 bg-white shadow-md w-full border border-[#6B959E] cursor-default ${isDragging && 'opacity-50'}`}
    >
      <div className="">
        <div className='flex items-center justify-between gap-2 mb-3'>
          <div>
            <p className='text-[#6B959E] text-xs'># tarea {numero}</p>
          </div>
          <div {...listeners} className='flex-grow cursor-move'>
            <p className='text-white'>Move</p>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div>
                  <IoIosMore size={24} color='#0F172A' className='cursor-pointer' />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => onEdit(id, title, description)}>
                    <span>Editar tarea</span>
                    <DropdownMenuShortcut>
                      <Pencil className="mr-2 h-4 w-4" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Enviar arriba</span>
                    <DropdownMenuShortcut>
                      <ArrowUpNarrowWide className="mr-2 h-4 w-4" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Enviar abajo</span>
                    <DropdownMenuShortcut>
                      <ArrowDownNarrowWide className="mr-2 h-4 w-4" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Eliminar</span>
                    <DropdownMenuShortcut>
                      <Trash2 className="mr-2 h-4 w-4" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div {...listeners} className='flex gap-4 mb-4 cursor-move'>
          <div className='w-11 h-11 flex-shrink-0'>
            <img className='w-full h-full rounded-xl' src={avatar1.src} alt="Tarea" />
          </div>
          <div className=''>
            <p className='text-sm text-[#0F172A] font-medium mb-1' style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>{title}</p>
            <p className='text-xs text-[#64748B]' style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>{description}</p>
          </div>
        </div>

        <div className='flex justify-between gap-2'>
          <div className='flex gap-2'>
            <div className='flex '>
              <VscPinned size={18} color='#5EBDB2' className='cursor-pointer'/>
              <p className='text-xs text-[#0F172A]'>Fijar</p>
            </div>

            <Separator orientation="vertical" />

            <div className='flex '>
              <HiOutlineBolt size={18} color='#5EBDB2' />
              <p className='text-xs text-[#0F172A]'>{priority}</p>
            </div>
          </div>

          <div>
            <p className='text-[11px] text-[#C7C7C7]'>{formatearFecha(date)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Items;

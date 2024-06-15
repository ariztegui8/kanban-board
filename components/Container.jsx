import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { HiPlus } from "react-icons/hi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ListChecks } from 'lucide-react';

const Container = ({ id, children, title, description, onAddItem }) => {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: 'container',
    },
  });

  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={`w-full h-full flex flex-col cursor-default md:max-w-72 ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col w-full">
          <div className='bg-[#9AD09E] flex justify-between gap-2 items-center p-2 '>
            <div className='w-max'>
              <h1 className="text-white font-bold">{title}</h1>
            </div>
            <div {...listeners} className='flex-grow cursor-move'>
              <p className='text-[#9AD09E]'>Move</p>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div>
                    <HiPlus size={22} color='#fff' className='cursor-pointer' />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={onAddItem}>
                      <span>Crear tarea</span>
                      <DropdownMenuShortcut>
                        <ListChecks className="mr-2 h-4 w-4" />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>

      <div className="">
        {children}
      </div>
    </div>
  );
};

export default Container;

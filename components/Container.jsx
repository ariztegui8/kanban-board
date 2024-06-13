import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';

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
      className={`w-full h-full p-4 bg-gray-50 rounded-xl flex flex-col gap-y-4 ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex items-center justify-between" {...listeners}>
        <div className="flex flex-col gap-y-1">
          <h1 className="text-gray-800 text-xl">{title}</h1>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>

      {children}
      <Button variant="ghost" onClick={onAddItem}>
        Add Item
      </Button>
    </div>
  );
};

export default Container;

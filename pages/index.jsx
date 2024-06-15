'use client';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import Container from '../components/Container';
import Items from '../components/Items';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import MenuSearch from '@/components/MenuSearch';
import ColumnIcons from '@/components/ColumnIcons';
import CreateBoard from '@/components/CreateBoard';
import { Textarea } from "@/components/ui/textarea"


export default function Home() {
  const [containers, setContainers] = useState([
    { id: `container-1`, title: 'To Do', items: [] },
    { id: `container-2`, title: 'In Progress', items: [] },
    { id: `container-3`, title: 'Done', items: [] },
  ]);
  const [activeId, setActiveId] = useState(null);
  const [currentContainerId, setCurrentContainerId] = useState();
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [showAddItemDialog, setShowAddItemDialog] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (!mounted) {
    return null;
  }

  const onAddOrEditItem = () => {
    if (!itemName || !itemDescription) return;

    if (isEditing) {
      const updatedContainers = containers.map((container) => {
        if (container.items.some((item) => item.id === editingItemId)) {
          return {
            ...container,
            items: container.items.map((item) =>
              item.id === editingItemId ? { ...item, title: itemName, description: itemDescription } : item
            ),
          };
        }
        return container;
      });
      setContainers(updatedContainers);
    } else {

      const id = `item-${uuidv4()}`;
      const updatedContainers = containers.map((container) => {
        if (container.id === currentContainerId) {
          return {
            ...container,
            items: [...container.items, { id, title: itemName, description: itemDescription }],
          };
        }
        return container;
      });
      setContainers(updatedContainers);
    }

    setItemName('');
    setItemDescription('');
    setShowAddItemDialog(false);
    setIsEditing(false);
    setEditingItemId(null);
  };

  const onEditItem = (id, title, description) => {
    setEditingItemId(id);
    setItemName(title);
    setItemDescription(description);
    setIsEditing(true);
    setShowAddItemDialog(true);
  };

  function findValueOfItems(id, type) {
    if (type === 'container') {
      return containers.find((item) => item.id === id);
    }
    if (type === 'item') {
      return containers.find((container) =>
        container.items.find((item) => item.id === id)
      );
    }
  }

  const findItemTitle = (id) => {
    const container = findValueOfItems(id, 'item');
    if (!container) return '';
    const item = container.items.find((item) => item.id === id);
    if (!item) return '';
    return item.title;
  };

  const findItemDescription = (id) => {
    const container = findValueOfItems(id, 'item');
    if (!container) return '';
    const item = container.items.find((item) => item.id === id);
    if (!item) return '';
    return item.description;
  };

  const findContainerTitle = (id) => {
    const container = findValueOfItems(id, 'container');
    if (!container) return '';
    return container.title;
  };

  const findContainerItems = (id) => {
    const container = findValueOfItems(id, 'container');
    if (!container) return [];
    return container.items;
  };

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  }

  const handleDragMove = (event) => {
    const { active, over } = event;

    if (
      active.id.toString().includes('item') &&
      over?.id.toString().includes('item') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeContainer = findValueOfItems(active.id, 'item');
      const overContainer = findValueOfItems(over.id, 'item');

      if (!activeContainer || !overContainer) return;

      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );

      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );
      const overitemIndex = overContainer.items.findIndex(
        (item) => item.id === over.id
      );
      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...containers];
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex
        );

        setContainers(newItems);
      } else {
        let newItems = [...containers];
        const [removeditem] = newItems[activeContainerIndex].items.splice(
          activeitemIndex,
          1
        );
        newItems[overContainerIndex].items.splice(
          overitemIndex,
          0,
          removeditem
        );
        setContainers(newItems);
      }
    }

    if (
      active.id.toString().includes('item') &&
      over?.id.toString().includes('container') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeContainer = findValueOfItems(active.id, 'item');
      const overContainer = findValueOfItems(over.id, 'container');

      if (!activeContainer || !overContainer) return;

      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );

      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );

      let newItems = [...containers];
      const [removeditem] = newItems[activeContainerIndex].items.splice(
        activeitemIndex,
        1
      );
      newItems[overContainerIndex].items.push(removeditem);
      setContainers(newItems);
    }
  };

  function handleDragEnd(event) {
    const { active, over } = event;

    if (
      active.id.toString().includes('container') &&
      over?.id.toString().includes('container') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === active.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === over.id
      );
      let newItems = [...containers];
      newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);
      setContainers(newItems);
    }

    if (
      active.id.toString().includes('item') &&
      over?.id.toString().includes('item') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeContainer = findValueOfItems(active.id, 'item');
      const overContainer = findValueOfItems(over.id, 'item');

      if (!activeContainer || !overContainer) return;
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );
      const overitemIndex = overContainer.items.findIndex(
        (item) => item.id === over.id
      );

      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...containers];
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex
        );
        setContainers(newItems);
      } else {
        let newItems = [...containers];
        const [removeditem] = newItems[activeContainerIndex].items.splice(
          activeitemIndex,
          1
        );
        newItems[overContainerIndex].items.splice(
          overitemIndex,
          0,
          removeditem
        );
        setContainers(newItems);
      }
    }

    if (
      active.id.toString().includes('item') &&
      over?.id.toString().includes('container') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeContainer = findValueOfItems(active.id, 'item');
      const overContainer = findValueOfItems(over.id, 'container');

      if (!activeContainer || !overContainer) return;
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );

      let newItems = [...containers];
      const [removeditem] = newItems[activeContainerIndex].items.splice(
        activeitemIndex,
        1
      );
      newItems[overContainerIndex].items.push(removeditem);
      setContainers(newItems);
    }
    setActiveId(null);
  }

  return (
    <div className="mx-auto ">
      <MenuSearch />
      <Dialog open={showAddItemDialog} onOpenChange={setShowAddItemDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[#0F172A]">{isEditing ? 'Editando tarea' : 'Creando una tarea'}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col w-full items-end gap-y-4">
            <Input
              type="text"
              placeholder="Titulo de la tarea"
              name="itemname"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />

            <Textarea
              placeholder="Descripción de la tarea"
              name="itemdescription"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              className="mb-4"
            />

            <Button onClick={onAddOrEditItem} variant="custom" className='gap-2'>
              {isEditing ? 'Guardar cambios' : 'Agregar'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex ">
        <ColumnIcons />
        <div className='p-4 w-full'>
          <CreateBoard />
          <div className="flex flex-col gap-6 md:flex-row">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragStart={handleDragStart}
              onDragMove={handleDragMove}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={containers.map((i) => i.id)}>
                {containers.map((container) => (
                  <Container
                    id={container.id}
                    title={container.title}
                    key={container.id}
                    onAddItem={() => {
                      setShowAddItemDialog(true);
                      setCurrentContainerId(container.id);
                      setIsEditing(false);
                    }}
                  >
                    <SortableContext items={container.items.map((i) => i.id)}>
                      <div className="flex items-start flex-col gap-4">
                        {container.items.map((i) => (
                          <Items
                            title={i.title}
                            description={i.description}
                            id={i.id}
                            key={i.id}
                            onEdit={onEditItem}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </Container>
                ))}
              </SortableContext>
              <DragOverlay adjustScale={false}>
                {activeId && activeId.toString().includes('item') && (
                  <Items id={activeId} title={findItemTitle(activeId)} description={findItemDescription(activeId)} />
                )}
                {activeId && activeId.toString().includes('container') && (
                  <Container id={activeId} title={findContainerTitle(activeId)}>
                    {findContainerItems(activeId).map((i) => (
                      <Items key={i.id} title={i.title} description={i.description} id={i.id} />
                    ))}
                  </Container>
                )}
              </DragOverlay>
            </DndContext>
          </div>
        </div>
      </div>
    </div>
  );
}

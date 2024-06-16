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

import MenuSearch from '@/components/MenuSearch';
import ColumnIcons from '@/components/ColumnIcons';
import CreateBoard from '@/components/CreateBoard';
import Modal from '@/components/Modal';

export default function Home() {
  const [containers, setContainers] = useState([
    { id: `container-1`, title: 'To Do', items: [] },
    { id: `container-2`, title: 'In Progress', items: [] },
    { id: `container-3`, title: 'Done', items: [] },
  ]);
  const [activeId, setActiveId] = useState(null);
  const [currentContainerId, setCurrentContainerId] = useState();
  const [itemData, setItemData] = useState({
    name: '',
    description: '',
    priority: '',
  });
  const [error, setError] = useState(false);
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
    const { name, description, priority } = itemData;
    if (!name || !description || !priority) {
      setError(true);
      return;
    }

    const date = new Date().toISOString();

    if (isEditing) {
      const updatedContainers = containers.map((container) => {
        if (container.items.some((item) => item.id === editingItemId)) {
          return {
            ...container,
            items: container.items.map((item) =>
              item.id === editingItemId
                ? { ...item, title: name, description, priority, date }
                : item
            ),
          };
        }
        return container;
      });
      setContainers(updatedContainers);
    } else {
      const id = `item-${uuidv4()}`;
      const numero = containers.reduce((acc, container) => acc + container.items.length, 0) + 1;
      const updatedContainers = containers.map((container) => {
        if (container.id === currentContainerId) {
          return {
            ...container,
            items: [...container.items, { id, title: name, description, priority, date, numero }],
          };
        }
        return container;
      });
      setContainers(updatedContainers);
    }

    setError(false);
    setItemData({
      name: '',
      description: '',
      priority: ''
    });
    setShowAddItemDialog(false);
    setIsEditing(false);
    setEditingItemId(null);
  };

  const onEditItem = (id, title, description, priority) => {
    setEditingItemId(id);
    setItemData({ name: title, description, priority });
    setIsEditing(true);
    setShowAddItemDialog(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePriorityChange = (value) => {
    setItemData((prevData) => ({ ...prevData, priority: value }));
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

  const findItemPriority = (id) => {
    const container = findValueOfItems(id, 'item');
    if (!container) return '';
    const item = container.items.find((item) => item.id === id);
    if (!item) return '';
    return item.priority;
  };

  const findItemDate = (id) => {
    const container = findValueOfItems(id, 'item');
    if (!container) return '';
    const item = container.items.find((item) => item.id === id);
    if (!item) return '';
    return item.date;
  };

  const findItemNumero = (id) => {
    const container = findValueOfItems(id, 'item');
    if (!container) return 0;
    const item = container.items.find((item) => item.id === id);
    if (!item) return 0;
    return item.numero;
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

      const activeItemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );
      const overItemIndex = overContainer.items.findIndex(
        (item) => item.id === over.id
      );

      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...containers];
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeItemIndex,
          overItemIndex
        );

        setContainers(newItems);
      } else {
        let newItems = [...containers];
        const [removedItem] = newItems[activeContainerIndex].items.splice(
          activeItemIndex,
          1
        );
        newItems[overContainerIndex].items.splice(
          overItemIndex,
          0,
          removedItem
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

      const activeItemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );

      let newItems = [...containers];
      const [removedItem] = newItems[activeContainerIndex].items.splice(
        activeItemIndex,
        1
      );
      newItems[overContainerIndex].items.push(removedItem);
      setContainers(newItems);
    }
  };

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!active || !over || active.id === over.id) {
      setActiveId(null);
      return;
    }

    if (
      active.id.toString().includes('container') &&
      over.id.toString().includes('container')
    ) {
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === active.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === over.id
      );
      const newItems = arrayMove([...containers], activeContainerIndex, overContainerIndex);
      setContainers(newItems);
    } else if (
      active.id.toString().includes('item') &&
      (over.id.toString().includes('item') || over.id.toString().includes('container'))
    ) {
      const activeContainer = findValueOfItems(active.id, 'item');
      const overContainer = findValueOfItems(over.id, over.id.includes('container') ? 'container' : 'item');

      if (!activeContainer || !overContainer) {
        setActiveId(null);
        return;
      }

      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );
      const activeItemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );

      let newItems = [...containers];
      const [movedItem] = newItems[activeContainerIndex].items.splice(activeItemIndex, 1);

      if (over.id.toString().includes('item')) {
        const overItemIndex = overContainer.items.findIndex((item) => item.id === over.id);
        newItems[overContainerIndex].items.splice(overItemIndex, 0, movedItem);
      } else {
        newItems[overContainerIndex].items.push(movedItem);
      }

      setContainers(newItems);
    }

    setActiveId(null);
  }

  return (
    <div className="mx-auto ">
      <MenuSearch />

      <Modal 
        showAddItemDialog={showAddItemDialog}
        setShowAddItemDialog={setShowAddItemDialog}
        isEditing={isEditing}
        itemData={itemData}
        handleInputChange={handleInputChange}
        error={error}
        handlePriorityChange={handlePriorityChange}
        onAddOrEditItem={onAddOrEditItem}
      />

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
                            priority={i.priority}
                            id={i.id}
                            key={i.id}
                            onEdit={onEditItem}
                            numero={i.numero}
                            date={i.date}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </Container>
                ))}
              </SortableContext>
              <DragOverlay adjustScale={false}>
                {activeId && activeId.toString().includes('item') && (
                  <Items
                    id={activeId}
                    title={findItemTitle(activeId)}
                    description={findItemDescription(activeId)}
                    priority={findItemPriority(activeId)}
                    date={findItemDate(activeId)}
                    numero={findItemNumero(activeId)}
                  />
                )}
                {activeId && activeId.toString().includes('container') && (
                  <Container id={activeId} title={findContainerTitle(activeId)}>
                    {findContainerItems(activeId).map((i, index) => (
                      <Items key={i.id} title={i.title} description={i.description} id={i.id} priority={i.priority} date={i.date} numero={i.numero} />
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

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Modal = ({showAddItemDialog, setShowAddItemDialog, isEditing, itemData, handleInputChange, error, handlePriorityChange, onAddOrEditItem}) => {
    return (
        <div>
            <Dialog open={showAddItemDialog} onOpenChange={setShowAddItemDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-[#0F172A]">{isEditing ? 'Editando tarea' : 'Creando una tarea'}</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col w-full gap-y-4">
                        <Input
                            type="text"
                            placeholder="Titulo de la tarea"
                            name="name"
                            value={itemData.name}
                            onChange={handleInputChange}

                        />

                        <Textarea
                            placeholder="Descripción de la tarea"
                            name="description"
                            value={itemData.description}
                            onChange={handleInputChange}

                        />

                        <div className={`w-full ${error ? '' : 'mb-4'}`}>
                            <Select className="w-full" onValueChange={handlePriorityChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Seleccionar prioridad" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="baja">Baja</SelectItem>
                                        <SelectItem value="media">Media</SelectItem>
                                        <SelectItem value="alta">Alta</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {error &&
                            <div>
                                <p className="text-red-500 text-sm text-left">Todos los campos son requeridos</p>
                            </div>
                        }

                        <Button onClick={onAddOrEditItem} variant="custom" className='gap-2'>
                            {isEditing ? 'Guardar cambios' : 'Agregar'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Modal
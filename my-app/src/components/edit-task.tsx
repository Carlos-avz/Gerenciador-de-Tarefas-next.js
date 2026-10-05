
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose} from "@/src/components/ui/dialog"
import { Pencil } from "lucide-react"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { Task } from "@/lib/generated/prisma/client"
import { useState } from "react"
import { toast } from "sonner"
import { editTask } from "../_actions/edit.task"

type TaskProps = {
  task: Task
  handleGetTasks: () => void
}

const EditTask = ({ task, handleGetTasks }: TaskProps) => {
  const [editedTask, setEditedTask] = useState(task.task)

  const handleEditTask = async () => {
    try{
       if (editedTask !== task.task) {
         toast.success('Você pode mandar as informações ao BD')
       } else {
         toast.error('As informações não foram alteradas')
          return
       }

       await editTask({idTask: task.id, newTask: editedTask})

        await handleGetTasks()
     }catch (error){
        throw error
   }
  }
  return (
    <Dialog>
      <DialogTrigger
        render={<button type="button" className="cursor-pointer p-2"><Pencil className= "text-white"size={20} /></button>}/>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
        </DialogHeader>

        <div className="flex gap-2">
          <Input placeholder="Editar" value={editedTask}  onChange={(e) => setEditedTask(e.target.value)}/>
          <DialogClose render={<Button onClick={handleEditTask}>Editar</Button>}></DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditTask
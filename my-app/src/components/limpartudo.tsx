import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/src/components/ui/alert-dialog";
import { Button } from "@/src/components/ui/button"
import { BrushCleaning, } from 'lucide-react';


type LimpaTudoProps = {
  clearCompletedTasks: () => Promise<void>
  taskList: {
    done: boolean;
    id: string;
    task: string;
}[]
}

const LimpaTudo = ({ clearCompletedTasks, taskList }: LimpaTudoProps) => {
    return (
        <AlertDialog>
         <AlertDialogTrigger render={<Button variant={"outline"} className="cursor-pointer text-xs h-7"><BrushCleaning/>Limpa Tarefas Concluídas</Button>}></AlertDialogTrigger>
       <AlertDialogContent>
         <AlertDialogHeader>
          <AlertDialogTitle>{`Tem certeza que deseja excluir ${taskList.filter(task => task.done).length} itens?`}</AlertDialogTitle>
           <AlertDialogDescription>
         Você vai excluir permanentemente essas tarefas, tenha certeza do que está fazendo.
           </AlertDialogDescription>
         </AlertDialogHeader>
          <AlertDialogFooter>
        <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
        <AlertDialogAction className="cursor-pointer" onClick={clearCompletedTasks}>Sim</AlertDialogAction>
        </AlertDialogFooter>
       </AlertDialogContent>
       </AlertDialog>
    )
}

export default LimpaTudo
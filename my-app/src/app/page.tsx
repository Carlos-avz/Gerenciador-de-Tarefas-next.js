"use client"

import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Separator } from "@/src/components/ui/separator"
import { CirclePlus, Trash2, ListChecks, Sigma, Loader } from 'lucide-react';
import EditTask from "@/src/components/edit-task";
import LimpaTudo from "@/src/components/limpartudo";
import { getTasks } from "../_actions/get-tasks-from-bd";
import { useEffect, useState } from "react";
import { Task } from "@/lib/generated/prisma/client";
import { NewTask } from "../_actions/add-task";
import { deleteTask } from "../_actions/delete-task";
import { toast } from "sonner";
import { updateTaskStatus } from "../_actions/toggle-done";
import Filter from "../components/filter"
import { FilterType } from "../components/filter"
import { deleteCompletedTasks } from "../_actions/clear-completed-tasks";
import { MinecraftWritableBook } from 'minecraft-items-react';

const Home = () => {
  const [taskList, setTaskList] = useState<Task[]>([])
  const [task, setTask] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all')
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
 

  const handleGetTasks = async () => {
    try{
          const tasks = await getTasks()

    if (!tasks) return

    setTaskList(tasks)
    console.log(tasks)
    }catch(error) { 
      console.log("Error em listar")
    }
  };        

  const handleAddTask = async () => {
    setLoading(true)    
    try{
     if (task.length === 0 || !task) {
       toast.error("Insira uma atividade")
       setLoading(false)
       return
     }
    
       const myNewTask = await NewTask(task)

       if (!myNewTask) return

       setTask("")

       toast.success("Atividade adicionada com sucesso")

       await handleGetTasks()
    } catch (error){
     throw error
    }
    setLoading(false)

  };

 const handleDeleteTask = async (id: string) => {
  try {
    console.log("ID recebido:", id);

    const deletedTask = await deleteTask(id);

    console.log("Tarefa deletada:", deletedTask);

    toast.warning("Atividade deletada com sucesso!")
    await handleGetTasks();


  } catch (error) {
    console.error("Erro ao excluir:", error);
  }
  };

 const handleToggleTask = async (taskId: string) => {
   const previousTask = [...taskList]

  try {
    setTaskList((prev) => {
      const updateTaskList = prev.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            done: !task.done
          }
        } else {
           return task
        }
      });

      return updateTaskList
    });
    
    await updateTaskStatus(taskId)
  }catch (error) {
    setTaskList(previousTask)
    console.error("error em toggleTask")
  }
};

 const clearCompletedTasks = async () => {
  try{
  const deletedTask = await deleteCompletedTasks()

    if (!deletedTask) return

  setTaskList(deletedTask)
  toast.success("Tarefas concluídas excluídas com sucesso")
  } catch(error) {

  }
 }

  useEffect(() => {
    handleGetTasks()
  }, [])

  useEffect(() => {
    switch(currentFilter) {
     case "all": 
       setFilteredTasks(taskList)
       break
      case "pending":
        const pendingTasks = taskList.filter(task => !task.done)
        setFilteredTasks(pendingTasks)
        break
      case "completed":
        const completedTasks = taskList.filter(task => task.done)
        setFilteredTasks(completedTasks)
        break
    }
  }, [currentFilter, taskList])

  return (
  <main
  className="w-full h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/knightBlue.jpeg')",
}}>
      <Card className="w-lg ps-2 bg-white/5 backdrop-blur-md border border-white/30" 
       style={{
        boxShadow:
        "rgba(0, 0, 0, 0.25) 0MinecraftDiamondpx 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
    }}>
        <CardHeader className="flex gap-2">
        <Input placeholder="Adicionar Tarefa" onChange={(e) => setTask(e.target.value)} value={task}/>
        <Button variant="default" className="cursor-pointer" onClick={handleAddTask}>{loading ? <Loader className="animate-spin"/> : <CirclePlus/>}Cadastrar</Button>
      </CardHeader>

    <CardContent>
        <Separator className="mb-4"/>

        <Filter currentFilter = {currentFilter} setCurrentFilter = {setCurrentFilter}/>

        <div className="mt-4 border-b-2"> {/*Elemento Pai*/}

          {taskList.length === 0 && (<p className="flex items-center gap-2 border-t py-4 text-xs text-white"><MinecraftWritableBook/>Você não possui atividades cadastradas.</p>)}

          {filteredTasks.map(task => (
          <div className="h-14 flex justify-between items-center border-t-2 border-x-2 text-white" key={task.id}>
            <div className={`${task.done ? `w-1 h-full bg-blue-400` : `w-1 h-full bg-red-400`}`}></div>
            <p className="flex-1 px-2 cursor-pointer" onClick={() => handleToggleTask(task.id)}>{task.task}</p>
            <div className="flex gap-1 items-center">
              <EditTask task={ task } handleGetTasks={handleGetTasks}/>
              <Trash2 size={20} className="cursor-pointer text-white" onClick={() => handleDeleteTask(task.id)}/>
            </div>
          </div>
        ))}

        </div>

      <div className="flex justify-between mt-2">
        <div className="flex gap-1 items-center text-white">
          <ListChecks size={22}/>
          <p>Tarefas Concluídas ({taskList.filter(task => task.done).length}/{taskList.length})</p>
        </div>
        
        <LimpaTudo clearCompletedTasks={clearCompletedTasks} taskList = {taskList}/>

      </div>
      
      <div className="h-3 w-full bg-gray-300 mt-4 rounded-3xl">
        <div className="h-full bg-blue-500 rounded-3xl" style={{ width: `${((taskList.filter(task => task.done).length) / taskList.length) * 100}%`}}></div>
      </div>

      <div className="flex justify-end items-center mt-2 gap-2 text-white">
        <Sigma size={17}/>
        <p className="text-xs">{taskList.length} Tarefas no Total</p>
      </div>
      

    </CardContent>

      </Card>
    </main>
  )
}

export default Home;
"use server"

import { prisma } from "../utils/prisma";

export const NewTask = async (tasks: string) => {
    try {
     if (!tasks) return

     const newTask = await prisma.task.create({
         data: {
             task: tasks,
             done: false
         }
     })

     if (!newTask) return

     return newTask

    }catch(error){
        throw error
    }
}
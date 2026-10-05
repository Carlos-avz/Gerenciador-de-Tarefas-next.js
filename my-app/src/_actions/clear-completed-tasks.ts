"use server"
import { prisma } from "../utils/prisma";

export const deleteCompletedTasks = async () => {
   try{
     await prisma.task.deleteMany({
        where: { done: true }
    })

    const allTask = await prisma.task.findMany()

    if (!allTask) return

    return allTask

   }catch (error) {
    throw error
   }
}
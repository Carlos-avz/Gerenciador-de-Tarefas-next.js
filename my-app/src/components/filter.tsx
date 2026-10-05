import { Badge } from "@/src/components/ui/badge";
import { Check, List, CircleMinus } from 'lucide-react';
import React from "react";

export type FilterType = "all" | "pending" | "completed"

type FilterProps = {
    currentFilter: FilterType
    setCurrentFilter: React.Dispatch<React.SetStateAction<FilterType>>
}

const Filter = ({ currentFilter, setCurrentFilter }: FilterProps) =>{
    return (
        <div className="flex gap-2">
          <Badge className={`cursor-pointer ${currentFilter === "all" ? "text-black" : "text-white"}`}  variant={`${currentFilter === "all" ? "default" : "outline"}`} onClick={() => setCurrentFilter("all")}><List/>Todos</Badge>
          <Badge className={`cursor-pointer ${currentFilter === "pending" ? "text-black" : "text-white"}`} variant={`${currentFilter === "pending" ? "default" : "outline"}`} onClick={() => setCurrentFilter("pending")}><CircleMinus/>Não Finalizado</Badge>
          <Badge className={`cursor-pointer ${currentFilter === "completed" ? "text-black" : "text-white"}`} variant={`${currentFilter === "completed" ? "default" : "outline"}`} onClick={() => setCurrentFilter("completed")}><Check/>Concluido</Badge>
        </div>

    )
}

export default Filter
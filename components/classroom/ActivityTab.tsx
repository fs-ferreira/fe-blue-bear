"use client";

import { useState } from "react";
import { Separator } from "../ui/separator";
import { useSession } from "next-auth/react";
import { STUDENT_ROLE } from "@/lib/utils";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";

type Activity = {
    id: string;
    name: string;
    description: string;
    dueDate: string;
    status: "completed" | "pending" | "overdue";
};

const activitiesData: Activity[] = [
    {
        id: "1",
        name: "Trabalho II",
        description: "Implementação de um sistema de gerenciamento de atividades.",
        dueDate: "2024-10-30",
        status: "pending",
    },
    {
        id: "4",
        name: "Trabalho I",
        description: "Implementação de um sistema de gerenciamento de atividades.",
        dueDate: "2024-08-30",
        status: "completed",
    },
    {
        id: "2",
        name: "Projeto Final de Engenharia",
        description: "Desenvolver um projeto completo com base no aprendizado do semestre.",
        dueDate: "2024-11-05",
        status: "completed",
    },
    {
        id: "3",
        name: "Relatório de Pesquisa",
        description: "Análise crítica de um artigo científico.",
        dueDate: "2024-09-15",
        status: "overdue",
    },
];

export default function ActivityTab() {
    const [activities, setActivities] = useState<Activity[]>(activitiesData);
    const { data: session }: any = useSession();

    function getStatusStyle(status: Activity["status"]) {
        switch (status) {
            case "completed":
                return "text-green-600";
            case "pending":
                return "text-yellow-600";
            case "overdue":
                return "text-red-600";
            default:
                return "text-muted-foreground";
        }
    }

    function sortActivities(a: Activity, b: Activity) {
        const statusOrder = {
            overdue: 1,
            pending: 2,
            completed: 3,
        };

        return statusOrder[a.status] - statusOrder[b.status];
    }

    return (
        <div className="flex flex-col gap-4 w-full p-4">
            {/* Título da aba */}
            <div>
                <div className="flex flex-col sm:flex-row gap-2 sm:justify-between">
                <h1 className="font-semibold text-xl">Atividades</h1>
                {session?.user?.role !== STUDENT_ROLE && <Button variant={"outline"}>Abrir atividade</Button>}
                </div>
                <p className="font-normal text-muted-foreground">
                    Acompanhe suas atividades pendentes, concluídas e atrasadas.
                </p>
            </div>

            <Separator />

            {/* Lista de atividades */}
            <div className="flex flex-col gap-6">
                {activities.sort(sortActivities).map(activity => (
                    <div className="flex flex-col gap-2" key={activity.id}>
                        <div className="flex justify-between items-center">
                            <h2 className="text-md font-medium">{activity.name}</h2>
                            {session?.user?.role === STUDENT_ROLE ?
                                <span className={`text-sm font-semibold ${getStatusStyle(activity.status)}`}>
                                    {activity.status === "completed" && "Concluída"}
                                    {activity.status === "pending" && "Pendente"}
                                    {activity.status === "overdue" && "Atrasada"}
                                </span>
                                : <Button variant={"outline"} className="w-12"><Pencil/></Button>
                            }
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <div className="text-sm text-muted-foreground">
                            Data de Entrega: <span className="font-bold">{new Date(activity.dueDate).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

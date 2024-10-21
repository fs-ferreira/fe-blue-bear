"use client";

import { ClassroomSummary } from "@/app/core/entities/classroom/classroomSumary";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface ClassroomCardProps {
    classroom: ClassroomSummary;
}


export default function ClassroomCard({ classroom }: ClassroomCardProps) {

    const router = useRouter();

    return (
        <Card className="hover:scale-[1.02] hover:cursor-pointer shadow-md hover:ring-1 hover:ring-primary" onClick={() => router.push(`salas/${classroom.id}`)}>
            <CardContent className="flex justify-between items-center pt-6">

                <div className="space-y-2">
                    <CardTitle className="mb-3">{classroom.discipline.name}</CardTitle>
                    <CardDescription>Professor: <span className="font-bold">{classroom.professor.fullName}</span> ({classroom.professor.email})</CardDescription>
                    <CardDescription>Carga horária: <span className="font-bold">{classroom.discipline.creditHours}h</span></CardDescription>
                </div>
                <ChevronRight className="text-primary" />
            </CardContent>
        </Card>
    )

}
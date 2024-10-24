"use client"

import { Course } from "@/app/core/entities/course/course";
import { courseColumns } from "@/app/core/entities/course/courseColumns";
import { CourseService } from "@/app/core/services/course.service";
import { DataTable } from "@/components/shared/DataTable";
import { PageLayout } from "@/components/shared/PageLayout";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CoursesPage() {
    const { data: session }: any = useSession();
    const [courses, setCourses] = useState<Course[]>([]);
    const [reloadCourses, setReloadCourses] = useState(true);
    const router = useRouter();

    const courseService = new CourseService(session);

    const fetchCourses = async () => {
        const courses = await courseService.findAll();
        setCourses(courses);
        setReloadCourses(false);
    };

    useEffect(() => {
        if (session?.user?.role !== 'admin') {
            router.replace('/nao-autorizado')
        }
        if (session && reloadCourses) {
            fetchCourses();
        }
    }, [session, reloadCourses]);


    const handleGoToDisciplines = () => {
        router.push('disciplinas')
    }
    
    const handleGoToCourseForm = (id: string) => {
        router.push(`cursos/${id}`)
    }

    const handleDeleteById = async (id:string) => {
        const response = await courseService.deleteById(id);
        if (response) {
            fetchCourses();
        }
    }


    return (
        <PageLayout title="Cursos">
            <div className="flex justify-between p-6 gap-3">
                <Button variant={"outline"} className="font-semibold text-muted-foreground" onClick={handleGoToDisciplines}>Disciplinas</Button>
                <Button variant={"outline"} className="w-12" onClick={() => router.push('cursos/novo')}><PlusIcon /></Button>
            </div>
            <CardContent>
                <DataTable columns={courseColumns({ hasEdit: true, hasDelete: true, editFn: (course: Course) => handleGoToCourseForm(course.id), deleteFn: handleDeleteById })} 
                data={courses} loading={reloadCourses} />
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant={"outline"} onClick={() => router.push('/main')}>Voltar</Button>
            </CardFooter>
        </PageLayout>
    );
}
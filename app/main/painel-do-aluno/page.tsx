
"use client";

import { Student } from "@/app/core/entities/student/student";
import { CourseType, courseTypeDisplayNames } from "@/app/core/enums/courseType.enum";
import { StudentService } from "@/app/core/services/student.service";
import InfoItem from "@/components/student/InfoItem";
import InfoSection from "@/components/student/InfoSection";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateSample, STUDENT_ROLE } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function StudentAreaPage() {
    const { data: session }: any = useSession();
    const [student, setStudent] = useState<Student>();
    const [reloadStudent, setReloadStudent] = useState(true);

    const studentService = new StudentService(session);

    const fetchStudent = async (email: string) => {
        const response = await studentService.findByUserEmail(email);
        setReloadStudent(false)
        if (!response) return;
        setStudent(response)
    };


    useEffect(() => {
        if (!session) return;

        if (session.user.role === STUDENT_ROLE && reloadStudent) {
            fetchStudent(session.user.email);
        }
    }, [session, reloadStudent]);



    return (
        <div className="flex flex-col gap-8">
            {student ? <h1 className="font-semibold text-xl">{student?.user.fullName}</h1> : <Skeleton className="h-[28px] w-[250px] rounded-xl animate-pulse" />}
            <InfoSection title="Informações gerais">
                <InfoItem label="E-mail" value={student?.user.email} />
                <InfoItem label="Data de nascimento" value={student ? formatDateSample(student.dateOfBirth) : undefined} />
                <InfoItem label="RG" mask="99.999.999-9" value={student?.rg} />
                <InfoItem label="CPF" mask="cpf" value={student?.cpf} />
                <InfoItem label="Celular" mask="(99) [9] 9999-9999" value={student?.phone} />
            </InfoSection>

            <InfoSection title="Informações gerais">
                <InfoItem label="Matrícula(RA)" className="md:col-span-2" value={student?.ra} />
                <InfoItem label="Curso" value={student?.course.courseName} />
                <InfoItem label="Tipo do curso" value={courseTypeDisplayNames[student?.course?.courseType as CourseType]} />
                <InfoItem label="Mensalidade" mask={"brl-currency"} value={student?.course.monthlyFee.toString()} />
                <InfoItem label="Desconto" mask={"99[,99]%"} value={student?.tuitionDiscount.toFixed(2)} />
            </InfoSection>


            <InfoSection title="Endereço">
                <InfoItem label="CEP" mask={'99999-999'} value={student?.cep} />
                <InfoItem label="Estado" value={student?.state} />
                <InfoItem label="Município" value={student?.city} />
                <InfoItem label="Bairro" value={student?.neighborhood} />
                <InfoItem label="Número" value={student?.houseNumber} />
                <InfoItem label="Rua" className="md:col-span-2" value={student?.street} />
                <InfoItem label="Complemento" className="md:col-span-2" value={student?.complement || 'Não informado'} />
            </InfoSection>

        </div>
    )
}
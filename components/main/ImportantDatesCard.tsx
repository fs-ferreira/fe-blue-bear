import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export default function ImportantDatesCard() {
    const importantDates = [
        {
            id: 1,
            date: "26 SET",
            title: "Prova 01",
            subject: "Psicologia",
        },
        {
            id: 2,
            date: "05 OUT",
            title: "Entrega de Trabalho",
            subject: "Sociologia",
        },
        {
            id: 3,
            date: "12 OUT",
            title: "Prova 02",
            subject: "História",
        },
        {
            id: 4,
            date: "18 OUT",
            title: "Entrega de Projeto",
            subject: "Matemática",
        },
    ];

    return (
        <Card className="flex flex-col order-4 overflow-hidden">
            <CardHeader>
                <CardTitle>Datas importantes</CardTitle>
                <CardDescription className="italic text-sm font-extralight">
                    Próximas provas, entrega de atividades, etc...
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-3 max-h-[120px] overflow-auto">
                {importantDates.map((dateInfo) => (
                    <div key={dateInfo.id} className="flex items-center gap-4">
                        <div className="bg-muted size-12 min-w-12 text-center flex items-center justify-center border-2 border-primary">
                            <span className="font-mono font-bold text-lg leading-none text-primary tracking-tighter">
                                {dateInfo.date.split(" ")[0]} <br /> {dateInfo.date.split(" ")[1]}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-semibold leading-none">{dateInfo.title}</p>
                            <p className="text-sm text-muted-foreground">{dateInfo.subject}</p>
                        </div>
                        <div className="ml-auto">
                            <ChevronRight className="text-primary" />
                        </div>
                    </div>
                ))}
            </CardContent>
            <CardFooter className="flex justify-end">
                <span className="text-muted-foreground hover:text-primary hover:cursor-pointer transition-all hover:scale-105">
                    Ver mais
                </span>
            </CardFooter>
        </Card>
    );
}

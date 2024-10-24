import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export default function ImportantDatesCard() {
    return (
        <Card className="flex flex-col order-4">
            <CardHeader>
                <CardTitle>Datas importantes</CardTitle>
                <CardDescription className="italic text-sm font-extralight">Próximas provas, entrega de atividades, etc...</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-3">
                {/* Substitua com um map() para gerar dinamicamente as datas importantes */}
                <div className="flex items-center gap-4">
                    <div className="bg-muted size-12 text-center flex items-center justify-center border-2 border-primary">
                        <span className="font-mono font-bold text-lg leading-none text-primary tracking-tighter">26 <br /> SET</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-semibold leading-none">Prova 01</p>
                        <p className="text-sm text-muted-foreground">Psicologia</p>
                    </div>
                    <div className="ml-auto">
                        <ChevronRight />
                    </div>
                </div>
                {/* Adicione mais datas importantes aqui */}
            </CardContent>
            <CardFooter className="flex justify-end">
                <span className="text-muted-foreground hover:text-primary hover:cursor-pointer transition-all hover:scale-105">Ver mais</span>
            </CardFooter>
        </Card>
    );
}
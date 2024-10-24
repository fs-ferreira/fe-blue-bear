import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NoticeBoardCard() {
    const notices = [
        {
            id: 1,
            title: "Horário de funcionamento especial",
            date: "23 de outubro, 2024",
            description: "A universidade funcionará das 8h às 16h durante o feriado da próxima semana.",
        },
        {
            id: 2,
            title: "Aulas suspensas",
            date: "20 de outubro, 2024",
            description: "Devido a um problema técnico, as aulas de todos os cursos serão suspensas até novo aviso.",
        },
        {
            id: 3,
            title: "Prazo para matrículas",
            date: "15 de outubro, 2024",
            description: "O prazo final para matrículas no próximo semestre é dia 30 de outubro. Não perca!",
        },
        {
            id: 4,
            title: "Semana Acadêmica",
            date: "12 de outubro, 2024",
            description: "Participe da nossa Semana Acadêmica com diversas palestras e workshops!",
        }
    ];

    return (
        <Card className="order-3 overflow-hidden pb-6">
            <CardHeader>
                <CardTitle>Mural de Avisos</CardTitle>
                <CardDescription className="italic text-sm font-extralight">
                    Últimas notícias da instituição.
                </CardDescription>
            </CardHeader>
            <CardContent className="max-h-[200px] overflow-auto">
                <ul className="space-y-4">
                    {notices.map((notice) => (
                        <li key={notice.id} className="border-b pb-2">
                            <h4 className="font-semibold">{notice.title}</h4>
                            <p className="text-xs text-muted-foreground">{notice.date}</p>
                            <p className="text-sm">{notice.description}</p>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}

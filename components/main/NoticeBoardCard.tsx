import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NoticeBoardCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Mural de Avisos</CardTitle>
                <CardDescription className="italic text-sm font-extralight">Últimas notícias da instituição.</CardDescription>
            </CardHeader>
            <CardContent>
                {/* Conteúdo do mural de avisos */}
            </CardContent>
        </Card>
    );
}


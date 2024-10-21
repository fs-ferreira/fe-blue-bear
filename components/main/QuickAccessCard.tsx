import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function QuickAccessCard() {
    return (
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle>Acesso rápido</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
                <Button variant={"link"}>
                    <Link href={'main/users'}>Usuários</Link>
                </Button>
                <Button variant={"link"}>
                    <Link href="#">Painel de Gestão</Link>
                </Button>
                {/* Adicione mais itens de acesso rápido aqui */}
            </CardContent>
        </Card>
    );
}

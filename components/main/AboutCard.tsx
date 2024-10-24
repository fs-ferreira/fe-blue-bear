import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutCard() {
    return (
        <Card className="sm:row-span-2 flex flex-col order-2">
            <CardHeader>
                <CardTitle className="text-2xl">Sobre o Blue Bear</CardTitle>
                <CardDescription>SaaS Acadêmico para Universidades</CardDescription>
            </CardHeader>
            <CardContent className="font-light lg:text-lg text-justify space-y-4 flex-grow">
                <p><span className="italic font-bold">Blue Bear</span> é uma solução SaaS acadêmica, projetada para universidades que desejam modernizar seus sistemas educacionais.</p>
                <p>Desenvolvido com <span className="italic font-bold">Next.js 14, ShadCN, Java Spring Boot e PostgreSQL</span>, ele oferece uma plataforma escalável, eficiente e fácil de usar, proporcionando uma experiência fluida para administradores, professores e alunos.</p>
                <p>Com foco em <span className="italic font-bold">usabilidade</span> e <span className="italic font-bold">performance</span>, o Blue Bear atende às necessidades de instituições de ensino superior, adaptando-se ao crescimento e garantindo <span className="italic font-bold">segurança</span> e <span className="italic font-bold">flexibilidade</span> no ambiente educacional digital.</p>
            </CardContent>
            <CardFooter>
                <div className="text-end w-full italic font-extralight">
                    <p>Este projeto se encontra em sua versão de MVP</p>
                </div>
            </CardFooter>
        </Card>
    );
}

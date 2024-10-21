import { PageLayout } from "@/components/shared/PageLayout"
import { SidebarNav } from "@/components/shared/SidebarNav"
import { Separator } from "@/components/ui/separator"

const sidebarNavItems = [
    {
        title: "Seus dados",
        href: "/main/painel-do-aluno",
    },
    {
        title: "Notas",
        href: "/main/painel-do-aluno/notas",
    },
    {
        title: "Requerimentos",
        href: "/main/painel-do-aluno/requerimentos",
    },
    {
        title: "Pagamentos",
        href: "/main/painel-do-aluno/pagamentos",
    }
 
]

interface StudentPanelLayoutProps {
    children: React.ReactNode
}

export default function StudentPanelLayout({ children }: StudentPanelLayoutProps) {
    return (
        <PageLayout title="">
            <div className="space-y-6 p-6 md:p-10 pb-16 md:block">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">Área do aluno</h2>
                    <p className="text-muted-foreground">
                        Bem vindo(a) ao seu painel de informações! Consulte seus dados, boletim de notas, requerimentos e pagamentos.
                    </p>
                </div>
                <Separator className="my-6" />
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 w-full">
                    <aside className="-mx-4 lg:w-1/5">
                        <SidebarNav items={sidebarNavItems} />
                    </aside>
                    <div className="flex-1">{children}</div>
                </div>
            </div>
        </PageLayout>
    )
}
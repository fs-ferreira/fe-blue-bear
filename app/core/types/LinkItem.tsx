import { Archive, CalendarRange, CreditCard, GraduationCap, Home, NotebookText, School, SquareLibrary, SquareUser, Users2 } from 'lucide-react';

export type LinkItem = {
    href: string;
    title: string;
    icon: JSX.Element;
    adminOnly?: boolean;
    studentOnly?: boolean;
  };
  
  export const links: LinkItem[] = [
    { href: '/main', title: 'Painel', icon: <Home /> },
    { href: '/main/users', title: 'Usuários', icon: <Users2 />, adminOnly: true },
    { href: '/main/disciplinas', title: 'Disciplinas', icon: <NotebookText />, adminOnly: true },
    { href: '/main/cursos', title: 'Cursos', icon: <SquareLibrary />, adminOnly: true },
    { href: '/main/semestres', title: 'Gestão de períodos', icon: <CalendarRange />, adminOnly: true },
    { href: '/main/alunos', title: 'Alunos', icon: <SquareUser />, adminOnly: true },
    { href: '/main/pagamento', title: 'Financeiro', icon: <CreditCard />, adminOnly: true },
    { href: '/main/requerimento', title: 'Requerimentos', icon: <Archive />, adminOnly: true },
    { href: '/main/painel-do-aluno', title: 'Área do Aluno', icon: <GraduationCap />, studentOnly: true },
    { href: '/main/salas', title: 'Salas de Aula', icon: <School /> },
  ];
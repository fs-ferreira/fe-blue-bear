const ContentTab = () => {
    return (
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-semibold">Bem-vindo ao Conteúdo da Sala de Aula</h2>
        <p className="text-muted-foreground">
          Esta aba contém informações importantes sobre a disciplina, incluindo materiais, agenda, e atualizações.
          Fique atento aos próximos conteúdos que serão postados aqui.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Agenda semanal de estudos</li>
          <li>Material de leitura e vídeos</li>
          <li>Avisos importantes da turma</li>
          <li>Links para recursos adicionais</li>
        </ul>
        <p className="text-muted-foreground">
          Para mais detalhes sobre o andamento da disciplina, atividades e avaliações, explore as outras abas.
        </p>
      </div>
    );
  };
  
  export default ContentTab;
  
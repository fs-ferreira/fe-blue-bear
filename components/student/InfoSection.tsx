export default function InfoSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <section className="space-y-3">
        <h3 className="font-medium text-base">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base font-normal text-muted-foreground">
          {children}
        </div>
      </section>
    );
  };
  
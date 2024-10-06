import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface PageLayoutProps {
  title: string;
  children: ReactNode;
}

export const PageLayout = ({ title, children }: PageLayoutProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
      <Card>
        {children}
      </Card>
    </div>
  );
};

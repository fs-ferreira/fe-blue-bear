import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { withMask } from "use-mask-input";

type Mask = 'datetime' | 'email' | 'numeric' | 'currency' | 'decimal' | 'integer' | 'percentage' | 'url' | 'ip' | 'mac' | 'ssn' | 'brl-currency' | 'cpf' | 'cnpj' | (string & {}) | (string[] & {}) | null;

interface InfoItemProps {
  label: string;
  value?: string;
  className?: string;
  mask?:Mask
}

export default function InfoItem({ label, value, className, mask }:InfoItemProps ) {
  return (
    <div className={cn("text-base", className)}>
      {label}: {value ? <span ref={withMask(mask || '')} className="font-bold">{value}</span> : <Skeleton className="h-[28px] w-[250px] rounded-xl" />}
    </div>
  );
};

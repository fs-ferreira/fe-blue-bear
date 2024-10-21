import { Loader2 } from "lucide-react";

export default function Loader() {
    return (
        <div className="w-full gap-3 h-[30vh] flex justify-center items-center">
            <Loader2 className="size-5 animate-spin text-primary" />
            <span className="italic font-medium animate-pulse">Carregando...</span>
        </div>
    )
}
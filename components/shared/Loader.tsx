import { ReloadIcon } from "@radix-ui/react-icons";

export default function Loader() {
    return (
        <div className="w-full gap-3 h-[30vh] flex justify-center items-center">
            <ReloadIcon className="size-5 animate-spin text-primary" />
            <span className="italic font-medium animate-pulse">Carregando...</span>
        </div>
    )
}
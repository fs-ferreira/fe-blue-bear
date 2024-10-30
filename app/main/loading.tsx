import { LoaderCircle } from "lucide-react"

export default function Loading() {
    return (
        <div className="h-screen-minus-nav flex-col flex items-center justify-center gap-3">
            <LoaderCircle className="size-20 text-primary animate-spin"/>
            <p className="animate-pulse">Por favor, aguarde...</p>
        </div>
    )
}
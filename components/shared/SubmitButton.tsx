'use client';

import { Loader } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";

export interface SubmitButtonProps extends ButtonProps {
    loading: boolean;
    title?: string;
}


export default function SubmitButton({ loading, title = 'Salvar', ...props }: SubmitButtonProps) {
    return (
        <Button type="submit" {...props} disabled={loading}>
            {loading ? <Loader className="animate-spin" /> : title}
        </Button>
    );
}

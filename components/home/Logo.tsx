interface LogoProps {
    title: string;
}

export default function Logo({ title }: LogoProps) {
    return (
        <div className="w-full h-full hidden lg:block">
            <div className="h-full flex flex-col justify-center items-end">
                <span className="text-[48px] xl:text-7xl font-extrabold text-center">{title}</span>
            </div>
        </div>
    );
}

"use client";

import { usePathname, useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const locales = [
    { code: "en", label: "English", flag: '/icons/flags/us.svg' },
    { code: "fr", label: "Français", flag: "/icons/flags/fr.svg" },
    { code: "es", label: "Español", flag: "/icons/flags/es.svg" },
];

const LocaleSwitch = () => {
    const router = useRouter();
    const pathname = usePathname();

    const currentLocale = pathname.split("/")[1];

    const changeLocale = (locale: string) => {
        const segments = pathname.split("/");
        segments[1] = locale;
        const newPath = segments.join("/") || "/";
        router.push(newPath);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-25 p-0 border-none shadow-none cursor-pointer text-base">
                    <Languages className="size-5" />
                    {locales.find((l) => l.code === currentLocale)?.label?.slice(0, 3) ?? ""}
                    <ChevronDown className="size-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-25">
                {locales.map(({ code, label, flag }) => (
                    <DropdownMenuItem
                        key={code}
                        onClick={() => changeLocale(code)}
                        className={cn(currentLocale === code ? "bg-accent text-[#006CFA]" : null, "flex items-center gap-1")}
                    >
                        <Image
                            src={flag}
                            alt={label}
                            width={20}
                            height={14}
                            priority
                        />
                        {label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LocaleSwitch;


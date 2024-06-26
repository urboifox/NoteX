'use client';
import icons from "@/lib/icons";
import Input from "./Input";
import { useQueryString } from "@/hooks/useQueryString";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type SearchInputProps = {
    placeholder?: string;
    param?: string;
}

export default function SearchInput({ placeholder = "Search...", param = "q" }: SearchInputProps) {

    const { appendQueryString, deleteQueryString } = useQueryString();
    const router = useRouter();
    const searchTimeout = useRef<NodeJS.Timeout | null>(null);
    const searchParams = useSearchParams();
    const q = searchParams.get(param);
    const [value, setValue] = useState(q || "");

    useEffect(() => {
        if (!value) {
            searchTimeout.current = null;
            const queryString = deleteQueryString(param);
            router.push(`?${queryString}`, { scroll: false });
        } else {
            searchTimeout.current = setTimeout(() => {
                const queryString = appendQueryString(param, value);
                router.push(`?${queryString}`, { scroll: false });
            }, 500);
        }
    }, [value, appendQueryString, deleteQueryString, param, router]);

    return (
        <Input
            onChange={(e) => setValue(e.target.value)}
            value={value}
            icon={icons.search}
            placeholder={placeholder}
        />
    );
}

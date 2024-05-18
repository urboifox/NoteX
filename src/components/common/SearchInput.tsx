'use client';
import icons from "@/lib/icons";
import Input from "./Input";
import { useQueryString } from "@/hooks/useQueryString";
import { useRouter } from "next/navigation";

type SearchInputProps = {
    placeholder?: string;
    param?: string;
}

export default function SearchInput({ placeholder = "Search...", param = "q" }: SearchInputProps) {

    const { appendQueryString, deleteQueryString } = useQueryString();
    const router = useRouter();
    let searchTimeout: NodeJS.Timeout | null = null;

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        if (searchTimeout) clearTimeout(searchTimeout);

        if (!e.target.value) {
            const queryString = deleteQueryString(param);
            router.push(`?${queryString}`, { scroll: false });
        } else {
            searchTimeout = setTimeout(() => {
                const queryString = appendQueryString(param, e.target.value);
                router.push(`?${queryString}`, { scroll: false });
            }, 500);
        }
    }

    return (
        <Input
            onChange={handleSearch}
            icon={icons.search}
            placeholder={placeholder}
        />
    );
}

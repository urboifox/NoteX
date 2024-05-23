'use client';

import icons from "@/lib/icons";
import { AuthAtom } from "@/recoil/atoms/AuthAtom";
import { useRecoilValue } from "recoil";
import Button from "../common/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/helpers/cn";

export default function BlogStats({ blog }: { blog: BlogResponse }) {

    const [loading, setLoading] = useState(false);
    const auth = useRecoilValue(AuthAtom);
    const router = useRouter();

    async function handleToggleLike() {
        if (auth) {
            setLoading(true);
            fetch(`/api/blogs/like?blogId=${blog._id}`).then(() => {
                router.refresh();
            })
            .finally(() => setLoading(false));
        }
    }

    return (
        <div className="flex select-none items-center gap-3">
            {
                blog.creatorId === auth?._id && (
                    <div className="text-lg">
                        {blog.published ? icons.globe : icons.lock}
                    </div>
                )
            }
            <div className="flex items-center gap-1 font-number">
                {icons.eye} {blog.viewsCount}
            </div>
            <Button disabled={loading} onClick={handleToggleLike} className={cn("flex cursor-pointer transition-colors duration-200 items-center gap-1 font-number", blog.likesIds.includes(auth?._id ? auth._id : "") ? "text-red-500" : "")}>
                {auth && blog.likesIds.includes(auth._id) ? icons.heartFill : icons.heart}{" "}
                {blog.likesCount}
            </Button>
        </div>
    );
}

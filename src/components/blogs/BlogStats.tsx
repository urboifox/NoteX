'use client';

import icons from "@/lib/icons";
import { AuthAtom } from "@/recoil/atoms/AuthAtom";
import { useRecoilValue } from "recoil";
import Button from "../common/Button";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/helpers/cn";

export default function BlogStats({ blog }: { blog: BlogResponse }) {

    const [stateBlog, setStateBlog] = useState(blog);
    const auth = useRecoilValue(AuthAtom);
    const router = useRouter();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { username } = useParams();

    async function handleToggleLike() {
        if (auth) {
            if (stateBlog.likesIds.includes(auth._id)) {
                setStateBlog((prev) => ({
                    ...prev,
                    likesIds: prev.likesIds.filter((id) => id !== auth._id),
                    likesCount: prev.likesCount - 1
                }))
            } else {
                setStateBlog((prev) => ({
                    ...prev,
                    likesIds: [...prev.likesIds, auth._id],
                    likesCount: prev.likesCount + 1
                }))
            }
        }
    }

    useEffect(() => {
        const controller = new AbortController();

        timeoutRef.current = setTimeout(() => {
            fetch(`/api/blogs?blogId=${stateBlog._id}`, {
                method: "PATCH",
                body: JSON.stringify(stateBlog),
                signal: controller.signal
            }).then(() => {
                router.refresh();
            });
        }, 1000);

        return () => {
            controller.abort();
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };

    }, [stateBlog, router]);

    async function togglePublish() {
        if (auth) {
            setStateBlog((prev) => ({
                ...prev,
                published: !prev.published
            }))
        }
    }

    return (
        <div className="flex select-none items-center gap-3">
            <div className="flex items-center gap-1 font-number">
                {icons.eye} {stateBlog.viewsCount}
            </div>
            {!username && stateBlog.creatorId === auth?._id && (
                <Button  onClick={togglePublish} className="text-xl p-2">
                    {stateBlog.published ? icons.globe : icons.lock}
                </Button>
            )}
            <Button
                onClick={handleToggleLike}
                className={cn(
                    `flex cursor-pointer transition-colors duration-200 items-center gap-1 font-number`,
                )}
            >
                {auth && stateBlog.likesIds.includes(auth?._id)
                    ? icons.heartFill
                    : icons.heart}{" "}
                {stateBlog.likesCount}
            </Button>
        </div>
    );
}

'use client';

import Link from "next/link";
import Button from "../common/Button";
import icons from "@/lib/icons";
import Modal from "../common/Modal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { AuthAtom } from "@/recoil/atoms/AuthAtom";

export default function BlogActions({ blogId, creatorId }: { blogId: string, creatorId: string }) {

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const auth = useRecoilValue(AuthAtom);

    const router = useRouter();

    async function handleDeleteBlog() {
        setLoading(true);
        await fetch(`/api/blogs?blogId=${blogId}`, {
            method: "DELETE"
        })
        .then(async (res) => {
            if (res.status !== 200) {
                const data = await res.json();
                toast.error(data.message);
            } else {
                // TODO: switch to router.back(), now it doesnt refresh the page
                router.push('/blog');
                router.refresh();
            }
        })
        .finally(() => {
            setLoading(false);
            setShowModal(false);
        });
    }

    return auth?._id === creatorId && (
        <>
            <Modal
                loading={loading}
                text="Are you sure you want to delete this blog?"
                onSubmit={handleDeleteBlog}
                visible={showModal}
                onCancel={() => setShowModal(false)}
            />
            <div className="flex items-center gap-3">
                <Link href={`/blog/${blogId}/edit`}>
                    <Button className="p-3">{icons.edit}</Button>
                </Link>
                <Button
                    onClick={() => setShowModal(true)}
                    className="p-3 text-red-600"
                >
                    {icons.trash}
                </Button>
            </div>
        </>
    );
}

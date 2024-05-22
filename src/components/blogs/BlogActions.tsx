'use client';

import Link from "next/link";
import Button from "../common/Button";
import icons from "@/lib/icons";
import Modal from "../common/Modal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function BlogActions({ blogId }: { blogId: string }) {

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

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

    return (
        <>
            <Modal loading={loading} text="Are you sure you want to delete this blog?" onSubmit={handleDeleteBlog} visible={showModal} onCancel={() => setShowModal(false)} />
            <div className="flex items-center gap-3">
                <Link href={`/blog/${blogId}/edit`}>
                <Button>
                    {icons.edit}
                </Button>
                </Link>
                <Button onClick={() => setShowModal(true)} className="text-red-600">
                {icons.trash}
                </Button>
            </div>
        </>
    )
}

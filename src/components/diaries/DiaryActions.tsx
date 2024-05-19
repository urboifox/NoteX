'use client';

import Link from "next/link";
import Button from "../common/Button";
import icons from "@/lib/icons";
import Modal from "../common/Modal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DiaryActions({ diaryId }: { diaryId: string }) {

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    async function handleDeleteDiary() {
        setLoading(true);
        await fetch(`/api/diaries?diaryId=${diaryId}`, {
            method: "DELETE"
        })
        .then(async (res) => {
            if (res.status !== 200) {
                const data = await res.json();
                toast.error(data.message);
            } else {
                // TODO: switch to router.back(), now it doesnt refresh the page
                router.push('/diary');
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
            <Modal loading={loading} text="Are you sure you want to delete this diary?" onSubmit={handleDeleteDiary} visible={showModal} onCancel={() => setShowModal(false)} />
            <div className="flex items-center gap-3">
                <Link href={`/diary/${diaryId}/edit`}>
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

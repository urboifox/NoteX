'use client';
import { formatTime } from "@/helpers/formatTime";
import Button from "../common/Button";
import icons from "@/lib/icons";
import { useState } from "react";
import Modal from "../common/Modal";
import { cn } from "@/helpers/cn";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SessionListItem({session}: {session: SessionResponse}) {

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleDeleteSession() {
      setLoading(true);

      await fetch(`/api/sessions?sessionId=${session._id}`, {
        method: "DELETE",
      })
      .then( async (res) => {
        if (res.status !== 200) {
          const data = await res.json();
          toast.error(data.message);
        } else {
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
        <Modal
          loading={loading}
          text="Are you sure you want to delete this session"
          onSubmit={handleDeleteSession}
          onCancel={() => setShowModal(false)}
          visible={showModal}
        />
        <li
          key={session._id}
          className={cn(
            `flex items-center justify-between p-2 rounded-md border border-white/10 trasnition-colors duration-200 hover:border-white/50`,
            loading ? "opacity-50" : ""
          )}
        >
          <p>{session.sessionName}</p>
          <div className="flex items-center gap-3">
            <time className="font-number">{formatTime(session.time)}</time>
            <Button onClick={() => setShowModal(true)} className="text-red-600 text-xs">{icons.trash}</Button>
          </div>
        </li>
      </>
    );
}

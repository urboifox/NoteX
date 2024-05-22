'use client';
import { useState } from 'react';
import Button from '../common/Button'
import Modal from '../common/Modal';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function DeleteAllTodosButton({ todosCount }: { todosCount: number }) {
    const [visible, setVisible] = useState(false);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    function handleDeleteTodos() {
        setLoading(true);
        fetch("/api/todos/delete-all", { method: "DELETE" })
            .then(() => {
                setVisible(false);
                router.refresh();
                toast.success("All todos deleted");
            })
            .finally(() => setLoading(false));
    }

    return (
        <>
            <Modal
                loading={loading}
                text="Are you sure you want to delete all todos?"
                onCancel={() => setVisible(false)}
                onSubmit={handleDeleteTodos}
                visible={visible}
            />
            <Button  disabled={todosCount <= 0} onClick={() => setVisible(true)}>Delete All</Button>
        </>
    );
}

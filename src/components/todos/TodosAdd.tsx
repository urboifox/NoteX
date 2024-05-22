'use client';
import React, { useEffect, useState } from 'react'
import Input from '../common/Input'
import Button from '../common/Button'
import icons from '@/lib/icons'
import { useFormState, useFormStatus } from 'react-dom';
import { createTodo } from '@/actions/todosActions';
import { useRouter } from 'next/navigation';

export default function TodosAdd() {

    const [state, formAction] = useFormState(createTodo, { success: false });

    return (
        <form action={formAction} className="flex items-center w-full gap-3">
            <FormControls state={state} />
        </form>
    );
}

function FormControls({ state }: any) {

    const { pending } = useFormStatus();
    const [value, setValue] = useState('');
    const router = useRouter();
    const inputRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (state.success) {
            setValue('');
            router.refresh();
            inputRef.current?.focus();
        }
    }, [state, router])

    return (
        <>
            <Input
                ref={inputRef}
                disabled={pending}
                hideErrorTitle
                value={value}
                onChange={(e) => setValue(e.target.value)}
                error={state.errors?.title}
                name="title"
                placeholder="New Todo..."
                className="w-full"
                inputClassName="bg-transparent placeholder:font-normal"
            />
            <Button className="h-full" disabled={pending} type="submit">
                {icons.plus}
            </Button>
        </>
    );
}
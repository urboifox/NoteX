'use client';
import React, { ChangeEvent, ChangeEventHandler, useEffect, useRef, useState } from 'react'
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
    const router = useRouter();
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [value, setValue] = useState('');
    const [aiText, setAiText] = useState('');
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (state.success) {
            setValue('');
            router.refresh();
            inputRef.current?.focus();
        }
    }, [state, router])

    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            fetch(`/api/ai?text=${value}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: value }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setAiText(data.data);
                });
        }, 1000);

    }, [value])

    useEffect(() => {
        console.log(aiText);
    }, [aiText])


    return (
        <>
            <Input
                ref={inputRef}
                disabled={pending}
                hideErrorTitle
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    setAiText("");
                }}
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
'use client';
import { createTodo } from '@/actions/todosActions';
import { TODO_TAGS } from '@/constants';
import icons from '@/lib/icons';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Button from '../common/Button';
import Input from '../common/Input';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/helpers/cn';
import useOutsideClick from '@/hooks/useOutsideClick';

export default function TodosAdd() {

    const [state, formAction] = useFormState(createTodo, { success: false });

    return (
        <form action={formAction} className="flex relative items-center w-full gap-3">
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
    const [activeTag, setActiveTag] = useState(TODO_TAGS[0]);
    const [visible, setVisible] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useOutsideClick({
        ref: buttonRef,
        handler: () => setVisible(false)
    })

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

            <div className="flex items-center gap-3">
                <AnimatePresence>
                    {visible && (
                        <motion.ul
                            initial={{ opacity: 0, scaleY: 0 }}
                            animate={{ opacity: 1, scaleY: 1 }}
                            exit={{
                                opacity: 0,
                                scaleY: 0,
                                transition: { delay: 0.3 },
                            }}
                            className="absolute origin-bottom overflow-hidden flex flex-wrap max-w-full w-64 gap-2 z-40 bottom-10 bg-white/10 p-2 backdrop-blur-sm rounded-md right-0 flex-row-reverse"
                        >
                            {TODO_TAGS?.map((tag, i) => {
                                return (
                                    <motion.li
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: 1,
                                            transition: { delay: 0.3 },
                                        }}
                                        exit={{ opacity: 0 }}
                                        onClick={() => setActiveTag(tag)}
                                        key={i}
                                        className={cn(
                                            "text-xs select-none rounded-md text-center border cursor-pointer p-1 transition-colors duration-200 hover:bg-white/10"
                                        )}
                                        style={{
                                            borderColor: tag.color,
                                            color: tag.color,
                                        }}
                                    >
                                        {tag.name}
                                    </motion.li>
                                );
                            })}
                        </motion.ul>
                    )}
                </AnimatePresence>
                <Button
                    ref={buttonRef}
                    onClick={() => setVisible(!visible)}
                    className="text-xs"
                    style={{
                        borderColor: activeTag.color,
                        color: activeTag.color,
                    }}
                >
                    {activeTag.name}
                </Button>
                <input type='hidden' name='tag' value={JSON.stringify(activeTag)} />
            </div>

            <Button className="h-full" disabled={pending} type="submit">
                {icons.plus}
            </Button>
        </>
    );
}
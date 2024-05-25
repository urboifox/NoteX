'use client';
import { createTodo } from '@/actions/todosActions';
import { TODO_TAGS } from '@/constants';
import { cn } from '@/helpers/cn';
import useOutsideClick from '@/hooks/useOutsideClick';
import icons from '@/lib/icons';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Button from '../common/Button';
import Input from '../common/Input';

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
    const [lastValueFromAI, setLastValueFromAI] = useState(false);

    useOutsideClick({
        ref: buttonRef,
        handler: () => setVisible(false)
    })

    useEffect(() => {
        if (state.success) {
            setValue('');
            setAiText('');
            router.refresh();
            inputRef.current?.focus();
        }
    }, [state, router])

    useEffect(() => {
        const controller = new AbortController();
        debounceRef.current = setTimeout(() => {
            value.trim() && !lastValueFromAI && value.length < 20 && fetch(`/api/ai`, {
                method: 'POST',
                body: JSON.stringify({ text: value }),
                signal: controller.signal
            })
                .then((res) => res.json())
                .then((data) => {
                    setAiText(data.data.replace(/\n/g, ''));
                    setLastValueFromAI(true);
                })
                .catch((err) => {
                    console.log(err);
                    setLastValueFromAI(true);
                    setAiText('');
                });
        }, 1000);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
                controller.abort();
            }
        }

    }, [value, lastValueFromAI])

    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Tab') {
            e.preventDefault();
            setAiText("");
            setValue(prev => (prev + aiText).replace(/'  '/g, ' '));
        } else {
            setLastValueFromAI(false);
        }

        // handle arrows
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            setLastValueFromAI(true);
        }

        if (e.key === 'Backspace') {
            setLastValueFromAI(true);
            setAiText('');
        }
    }

    return (
        <>
            <div className="relative w-full overflow-hidden">
                <Input
                    ref={inputRef}
                    disabled={pending}
                    hideErrorTitle
                    value={value}
                    onKeyDown={handleKeyPress}
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
                <AnimatePresence>
                    {aiText && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0 } }}
                            onClick={() => inputRef.current?.focus()}
                            className="gap-1 absolute top-1/2 select-none w-max cursor-text -translate-y-1/2 left-[8.8px] flex items-center"
                        >
                            <span className='text-transparent w-max'>{value}</span>
                            <span className='text-neutral-500 w-max'>{aiText}</span>
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>

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
                <input
                    type="hidden"
                    name="tag"
                    value={JSON.stringify(activeTag)}
                />
            </div>

            <Button className="h-full" disabled={pending} type="submit">
                {icons.plus}
            </Button>
        </>
    );
}
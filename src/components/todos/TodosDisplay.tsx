'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Modal from '../common/Modal';
import Radio from '../common/Radio';
import TodoItem from './TodoItem';
import { useRecoilState } from 'recoil';
import { TodosAtom } from '@/recoil/atoms/TodosAtom';

export default function TodosDisplay({ todos }: { todos: TodoResponse[] }) {

    const [data, setData] = useRecoilState(TodosAtom);
    const [selectedTodo, setSelectedTodo] = useState<TodoResponse | null>(null);
    const [filterMethod, setFilterMethod] = useState('all');

    useEffect(() => {
        setData(todos);
    }, [todos, setData]);

    function handleDeleteTodo() {
        setData(data.filter((todo) => todo._id !== selectedTodo?._id));
        
        // TODO: implement delete
        toast.success(`Todo Deleted`);

        setSelectedTodo(null);
    }

    function handleChangeTodoStatus(todo: TodoResponse) {
        setData(data.map((t) => (t._id === todo._id ? { ...t, completed: !t.completed } : t)));
        // TODO: implement update
    }

    const filteredData = data.filter((todo) => {
        if (filterMethod === 'todo') {
            return !todo.completed;
        } else if (filterMethod === 'completed') {
            return todo.completed;
        } else {
            return true;
        }
    });

    return (
        <>
            <Modal onCancel={() => setSelectedTodo(null)} visible={!!selectedTodo} text={`Delete ${selectedTodo?.title}`} onSubmit={handleDeleteTodo} />
            <div className='flex flex-wrap gap-3 mb-3'>
                <Radio onChange={(e) => setFilterMethod(e.target.value)} value={'all'} defaultChecked label="All" name="filter" />
                <Radio onChange={(e) => setFilterMethod(e.target.value)} value={'completed'} label="Completed" name="filter" />
                <Radio onChange={(e) => setFilterMethod(e.target.value)} value={'todo'} label="Todo" name="filter" />
            </div>
            {filteredData.map((todo, i) => (
                <TodoItem onClick={handleChangeTodoStatus} onDelete={(todo) => setSelectedTodo(todo)} todo={todo} key={i} />
            ))}
        </>
    );
}

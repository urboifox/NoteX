import TodosDisplay from "./TodosDisplay";

export default async function TodosContent() {
    const todos = [
        {
            _id: '1',
            title: "Todo 1",
            completed: false,
            createdAt: '1231312',
            archived: false,
            updatedAt: '12314',
            dueDate: '123124',
            description: "Description " + Math.random(),
            tags: ["tag1", "tag2"],
        },
        {
            _id: '2',
            title: "Todo 2",
            completed: false,
            createdAt: '1231312',
            archived: false,
            updatedAt: '12314',
            dueDate: '123124',
            description: "Description " + Math.random(),
            tags: ["tag1", "tag2"],
        },
        {
            _id: '3',
            title: "Todo 3",
            completed: false,
            createdAt: '1231312',
            archived: false,
            updatedAt: '12314',
            dueDate: '123124',
            description: "Description " + Math.random(),
            tags: ["tag1", "tag2"],
        },
    ];

    return (
        <div className="flex flex-col gap-2">
            <TodosDisplay todos={todos} />
        </div>
    );
}

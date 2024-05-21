import { loading } from "@/functions/loading"

export default async function TodosProgress() {
    await loading();
    
    return (
        <div>
            1/3
        </div>
    )
}

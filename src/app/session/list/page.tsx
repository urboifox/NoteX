import { getSessions } from "@/functions/sessions";
import { formatTime } from "@/helpers/formatTime";

export default async function SessionListPage() {

    const sessions = await getSessions();

    return (
        <div className="container">
            {
                sessions.map(session => {
                    return <div key={session._id}>{formatTime(session.time)}</div>
                })
            }
        </div>
    )
}

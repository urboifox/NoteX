import Button from "@/components/common/Button";
import PaginationArrows from "@/components/common/PaginationArrows";
import SessionListItem from "@/components/session/SessionListItem";
import { getSessions } from "@/functions/sessions";
import icons from "@/lib/icons";
import Link from "next/link";

const limit = 8;
export default async function SessionListPage({ searchParams: { page } }: { searchParams: { page: string } }) {

    const sessions = await getSessions(parseInt(page), limit);

    return (
        <div className="flex flex-col justify-between gap-5 items-end container page pb-5">
            <div className="flex flex-col gap-4 w-full">
                <Link href={"/session"}>
                    <Button>{icons.arrowLeft} Back</Button>
                </Link>
                <ul className="flex flex-col gap-4 w-full">
                    <li className="flex gap-2 text-neutral-500 items-center justify-between">
                        <p>Session Name</p>
                        <p>Session Duration</p>
                    </li>
                    {sessions.data.map((session) => {
                        return (
                            <SessionListItem key={session._id} session={JSON.parse(JSON.stringify(session))} />
                        );
                    })}
                </ul>
            </div>

            <div className="z-50">
                <PaginationArrows perPage={limit} count={sessions.count} />
            </div>
        </div>
    );
}

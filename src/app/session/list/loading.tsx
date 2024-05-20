import Button from '@/components/common/Button';
import PaginationArrows from '@/components/common/PaginationArrows';
import SessionListItem from '@/components/session/SessionListItem';
import icons from '@/lib/icons';
import Link from 'next/link';
import React from 'react'

const limit = 8;
export default function SessionsListLoading() {
  return (
        <div className="flex flex-col justify-between gap-5 items-end container page pb-5">
            <div className="flex flex-col gap-4 w-full">
                <Link href={"/session"} className="w-max">
                    <Button>{icons.angleLeft} Back</Button>
                </Link>
                <ul className="flex flex-col gap-4 w-full">
                    <li className="flex gap-2 text-neutral-500 items-center justify-between">
                        <p>Session Name</p>
                        <p>Session Duration</p>
                    </li>
                    {Array(limit).fill(0).map((_, i) => {
                        return (
                            <SessionListItem key={i} session={{} as SessionResponse} />
                        );
                    })}
                </ul>
            </div>

            <div className="z-50">
                <PaginationArrows perPage={limit} count={0} />
            </div>
        </div>
  )
}

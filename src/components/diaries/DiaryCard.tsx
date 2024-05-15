import { dateFormat } from '@/lib/dateFormat'
import icons from '@/lib/icons'
import Link from 'next/link'
import React from 'react'

export default function DiaryCard({diary}: {diary: DiaryResponse}) {
  return (
    <div className="relative transition-colors duration-100 hover:bg-white/5 flex flex-col gap-2 p-6 rounded-md border border-white/10 bg-white/10">
        <div className="flex items-center justify-between gap-2">
            <time className="text-xs text-primary/80">{dateFormat(diary.createdAt, "relative")}</time>
            <Link href={`/diary/${diary.id}`} className="text-white/50 transition-all duration-200 hover:text-white hover:translate-x-1 hover:-translate-y-1 cursor-pointer -rotate-45">
                {icons.arrowRight}
            </Link>
        </div>
        <Link href={`/diary/${diary.id}`}>
            <h2 title={diary.title} className="text-xl font-bold line-clamp-1">{diary.title}</h2>
        </Link>
        <p title={diary.description} className="line-clamp-2 font-light text-neutral-400">{diary.description}</p>
    </div>
  )
}

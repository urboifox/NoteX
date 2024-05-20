import React from 'react'
import DiaryForm from '../forms/DiaryForm'
import { getDiaryById } from '@/functions/diaries'

export default async function EditDiaryFormContent({diaryId}: {diaryId: string}) {
    
    const diary = await getDiaryById(diaryId);

    return (
        <>
            <DiaryForm diary={JSON.parse(JSON.stringify(diary))} />
        </>
    );
}

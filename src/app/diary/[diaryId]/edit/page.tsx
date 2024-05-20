import Button from "@/components/common/Button";
import DiaryForm from "@/components/forms/DiaryForm";
import { getDiaryById } from "@/functions/diaries";
import icons from "@/lib/icons";
import Link from "next/link";

export default async function EditDiaryPage({params: {diaryId}}: {params: {diaryId: string}}) {

    const diary = await getDiaryById(diaryId);

    return (
        <div className="container pb-10">
            <Link className="mb-5 w-max flex" href={`/diary/${diaryId}`}>
                <Button>{icons.angleLeft} Back</Button>
            </Link>

            <DiaryForm diary={diary} />
        </div>
    );
}

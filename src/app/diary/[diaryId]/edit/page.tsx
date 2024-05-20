import Button from "@/components/common/Button";
import EditDiaryFormContent from "@/components/diaries/EditDiaryFormContent";
import EditDiaryFormLoading from "@/components/skeletons/Diary/EditDiaryFormLoading";
import icons from "@/lib/icons";
import Link from "next/link";
import { Suspense } from "react";

export default async function EditDiaryPage({params: {diaryId}}: {params: {diaryId: string}}) {
    return (
        <div className="container pb-10">
            <Link className="mb-5 w-max flex" href={`/diary/${diaryId}`}>
                <Button>{icons.angleLeft} Back to diary</Button>
            </Link>

            <Suspense fallback={<EditDiaryFormLoading />}>
                <EditDiaryFormContent diaryId={diaryId} />
            </Suspense>
        </div>
    );
}

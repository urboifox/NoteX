import Button from "@/components/common/Button";
import dbConnect from "@/config/db";
import { getDiaries, getDiaryById } from "@/functions/diaries";
import icons from "@/lib/icons";
import Diary from "@/models/diaryModel";
import Link from "next/link";

export default async function OneDiaryPage({ params: { diaryId } }: { params: { diaryId: string } }) {

  const diary = await getDiaryById(diaryId);

  return diary ? (
    <div className="container flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <Link href="/diary">
          <Button>
            {icons.arrowLeft} Back
          </Button>
        </Link>

        <div className="flex items-center gap-3">
          <Link href={`/diary/${diaryId}/edit`}>
            <Button>
              {icons.edit}
            </Button>
          </Link>
          <Button>
            {icons.trash}
          </Button>
        </div>
      </div>
      <h1 className="text-2xl font-light text-neutral-500">{diary?.brief}</h1>
      <div className="p-5 bg-white/10 rounded-md border border-white/10" dangerouslySetInnerHTML={{ __html: diary?.content || "" }} />
    </div>
  ) : (
    <div className="container">
      <h1>404</h1>
    </div>
  );
}
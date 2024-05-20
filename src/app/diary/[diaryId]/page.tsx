import Button from "@/components/common/Button";
import DiaryActions from "@/components/diaries/DiaryActions";
import { getDiaryById } from "@/functions/diaries";
import icons from "@/lib/icons";
import Link from "next/link";

export default async function OneDiaryPage({ params: { diaryId } }: { params: { diaryId: string } }) {

  const diary = await getDiaryById(diaryId);

  return diary ? (
      <div className="container flex flex-col gap-5">
          <Link href="/diary">
              <Button>{icons.angleLeft} Back</Button>
          </Link>
          <div className="flex items-end justify-between">
              <h1 className="text-2xl font-light text-neutral-500">
                  {diary?.brief}
              </h1>
              <DiaryActions diaryId={JSON.parse(JSON.stringify(diaryId))} />
          </div>
          <div
              className="p-5 bg-white/10 rounded-md border border-white/10"
              dangerouslySetInnerHTML={{ __html: diary?.content || "" }}
          />
      </div>
  ) : (
      <div className="container">
          <h1>404</h1>
      </div>
  );
}
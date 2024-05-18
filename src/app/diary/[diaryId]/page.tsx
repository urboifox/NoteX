export default function OneDiaryPage({ params: { diaryId } }: { params: { diaryId: string } }) {
  return (
    <div className="container">
      <h1>{diaryId}</h1>
    </div>
  )
}

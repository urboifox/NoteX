import icons from "@/lib/icons";

export default function ErrorDisplay({ error }: { error: string | undefined }) {
  return (
    <>
      {error && (
        <small className={"p-2 rounded-md bg-white/5 font-light border border-red-500 text-red-500 flex items-center gap-1"}>
          {icons.infoCircle}
          {typeof error === "string" ? error : error[0]}
        </small>
      )}
    </>
  )
}

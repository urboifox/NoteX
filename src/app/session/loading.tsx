import Button from "@/components/common/Button";
import SessionContentLoading from "@/components/skeletons/session/SessionContentLoading";
import icons from "@/lib/icons";
import Link from "next/link";

export default function SessionPageLoading() {
  return (
    <div className='container page flex flex-col'>
        <div className="flex gap-3 items-center">
          <Link href={'/'}>
            <Button>
              {icons.angleLeft} Back
            </Button>
          </Link>
          <Link href={'/session/list'}>
            <Button className="text-2xl">
              {icons.listUnordered}
            </Button>
          </Link>
        </div>

        <SessionContentLoading />
    </div>
  )
}

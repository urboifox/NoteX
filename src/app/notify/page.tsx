'use client'

import Button from "@/components/common/Button"
import useNotification from "@/hooks/useNotification"

export default function NotifyPage() {

    const { notify } = useNotification();

    function handleNotify() {
        notify("hello world", {
            body: "I'm a notification",
        })
    }

  return (
    <div className="container page">
      <Button onClick={handleNotify}>
        notify
      </Button>
    </div>
  )
}

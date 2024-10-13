import { Tooltip } from "@radix-ui/themes"
import { ArrowLeft } from "lucide-react"
import { Link, useNavigate } from "react-router"

export default function TopAppBar({ content, back }: { content: React.ReactNode; back?: boolean }) {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-12 items-center border-b px-3 font-bold">
      {back && (
        <Tooltip content="戻る">
          <Link
            className="-ml-1 mr-5 rounded-full p-2 hover:bg-neutral-100"
            to="/home/"
            onClick={() => navigate(-1)}>
            <ArrowLeft className="text-neutral-600" size={18} />
          </Link>
        </Tooltip>
      )}
      {content}
    </div>
  )
}

import { ArrowLeft } from 'lucide-preact'
import { ComponentChildren } from 'preact'
import { useRouter } from '~/router'

export default function TopAppBar({ content, back }: { content: ComponentChildren; back?: boolean }) {
  const router = useRouter()

  return (
    <div className="flex min-h-12 items-center border-b px-3 font-bold">
      {back && (
        <button
          type="button"
          className="-ml-1 mr-5 rounded-full p-2 hover:bg-neutral-100"
          title="戻る"
          onClick={router.back}>
          <ArrowLeft className="text-neutral-600" size={18} />
        </button>
      )}
      {content}
    </div>
  )
}

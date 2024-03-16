import { Loader2 } from "lucide-react"

export default function BottomSpinner() {
  return (
    <div className="mx-auto flex items-center justify-center gap-1 py-4 font-bold">
      <Loader2 className="animate-spin" size={24} />
      <p>Loading...</p>
    </div>
  )
}

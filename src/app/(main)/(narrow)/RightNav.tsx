import clsx from "clsx"

export default function RightNav() {
  const w = "w-96"
  return (
    <div className={w}>
      <div className={clsx(w, "fixed flex h-full flex-col gap-4 border-l pl-8 pt-2.5")}>
        <input className="rounded-full bg-gray-200 px-4 py-2" placeholder="検索" />
        <div className="px-4 font-inter text-xs text-gray-600">
          <a className="hover:underline" href="/about/">
            minskeyについて
          </a>
          <p className="mt-1">&copy; 2024 YamaD</p>
        </div>
      </div>
    </div>
  )
}

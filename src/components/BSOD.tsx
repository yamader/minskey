export default function BSOD({ error }: { error: unknown }) {
  const h2class = "mt-6 mb-3 text-4xl font-bold after:content-[':']"

  function reset() {
    location.reload()
  }

  const armageddon = () => {
    localStorage.clear()

    // これとか？
    // https://github.com/pmndrs/jotai/issues/404

    alert("localStorageだけ削除しました")
    reset()
  }

  return (
    <div className="flex h-screen bg-sky-600 px-2 font-inter text-xl text-white">
      <div className="m-auto flex w-full max-w-5xl flex-col">
        <h1 className="mb-2 flex space-x-6 text-9xl font-black">
          <span className="hover:animate-spin">🤯</span>
          <span>Error!</span>
        </h1>

        <h2 className={h2class}>Message</h2>
        <p>
          A serious error has occurred in this application. However, it may be fixed by simply
          reloading...
        </p>
        <p>Nanka eigo de kaite mitakedo yousuruni oteage no joutai.</p>

        <h2 className={h2class}>Reason</h2>
        <pre className="whitespace-normal break-all font-mono">{error + ""}</pre>

        <h2 className={h2class}>Action</h2>
        <p>
          Resetting data is a <span className="font-black uppercase">last</span> resort.
        </p>
        <div className="my-3 space-x-4 text-2xl">
          <button
            className="rounded bg-neutral-200 px-3 py-1 font-bold text-black hover:bg-neutral-300"
            onClick={reset}>
            reload
          </button>
          <button
            className="rounded bg-red-500 px-3 py-1 font-bold uppercase hover:bg-red-600"
            onClick={armageddon}>
            reset all data
          </button>
        </div>
      </div>
    </div>
  )
}

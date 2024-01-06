"use client"

import { useId, useState } from "react"

export default function Switch({
  children,
  init,
  onChange,
  readonly,
}: {
  children?: React.ReactNode
  init: boolean
  readonly?: boolean
  onChange: (value: boolean) => void
}) {
  const id = useId()
  const [checked, setChecked] = useState(init)

  // css参考
  // https://tailwindflex.com/@samuel33/animated-toggle-switch

  return (
    <div className="flex items-center">
      <label htmlFor={id} style={{ paddingRight: 15 }}>
        {children}
      </label>
      <input
        type="checkbox"
        className="peer sr-only opacity-0"
        id={id}
        checked={checked}
        onChange={() => {
          if (readonly) return
          setChecked(!checked)
          onChange(!checked)
        }}
      />
      <label
        className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-lime-400 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-lime-400"
        htmlFor={id}>
        <span className="sr-only">Enable</span>
      </label>
    </div>
  )
}

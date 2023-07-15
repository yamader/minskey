"use client"

import { useTLStream } from "."

export default function TLProvider({ children }: { children: React.ReactNode }) {
  useTLStream()
  return children
}

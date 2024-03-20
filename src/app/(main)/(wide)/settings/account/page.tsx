"use client"

import RawJson from "~/components/RawJson"
import H2 from "~/components/html/H2"
import { useMultiAccounts } from "~/features/auth"

export default function AccountSettingsPage() {
  const { multiAccounts } = useMultiAccounts()

  return (
    <>
      <H2>生データ</H2>
      <RawJson json={multiAccounts} />
      <hr />
    </>
  )
}

export default function IdStr({ username, host }: { username: string; host: string }) {
  return (
    <span className="font-mono font-medium text-neutral-400">
      <span className="text-neutral-800">@{username}</span>@{host}
    </span>
  )
}

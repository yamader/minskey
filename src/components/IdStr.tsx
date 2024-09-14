export default function IdStr({ username, host }: { username: string; host: string }) {
  return (
    <span className="font-medium font-mono text-neutral-400">
      <span className="text-neutral-800">@{username}</span>@{host}
    </span>
  )
}

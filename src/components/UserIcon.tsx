export default function UserIcon({ src }: { src?: string | null }) {
  return <img className="h-full overflow-hidden rounded-full" src={src || "/anon.png"} alt="icon" />
}

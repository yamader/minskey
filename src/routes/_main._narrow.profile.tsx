import { Tooltip } from "@radix-ui/themes"
import { Suspense, use } from "react"
import { useSearchParams } from "react-router"
import Anon from "~/assets/anon.png"
import BottomSpinner from "~/components/BottomSpinner"
import IdStr from "~/components/IdStr"
import TopAppBar from "~/components/TopAppBar"
import { useAPI } from "~/features/api"
import { Note } from "~/features/note"
import NotePreview from "~/features/note/NotePreview"
import { User, statusEmoji } from "~/features/user"
import { hostname } from "~/libs/utils"

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileContent />}>
      <ProfileFetch />
    </Suspense>
  )
}

function ProfileFetch() {
  const api = useAPI()
  const [searchParams] = useSearchParams()

  if (!api) return <ProfileContent />

  const id = searchParams.get("user")

  let userFetch: ReturnType<typeof api.showName>
  if (id) {
    const [, username, host] = id.split("@")
    userFetch = api.showName(username, host)
  } else {
    userFetch = api.me()
  }
  const user = use(userFetch)
  if (user) user.host ??= hostname(api.host)

  const notesFetch = user && api.userNotes(user.id)
  const notes = (notesFetch && use(notesFetch)) ?? []

  return <ProfileContent user={user} notes={notes} />
}

function ProfileContent({ user = null, notes = [] }: { user?: User | null; notes?: Note[] }) {
  const onlineStatus = user?.onlineStatus ?? "unknown"

  return (
    <>
      <TopAppBar
        content={
          <div>
            <p className="font-bold text-lg">{user?.name}</p>
          </div>
        }
        back
      />
      <div className="min-h-48 w-full bg-black" />
      <div className="-mb-20 -translate-y-1/2 ml-4 h-fit w-fit">
        {/* todo: grow */}
        <div className="h-36 w-36 overflow-hidden rounded-[100%] border-4 transition-all hover:rounded-xl">
          <img className="h-full w-full object-cover" src={user?.avatarUrl ?? Anon} alt="avatar" />
        </div>
        <div className="absolute right-2 bottom-2 flex">
          <Tooltip content={onlineStatus}>
            <span className="cursor-default text-3xl leading-none">
              {statusEmoji(onlineStatus)}
            </span>
          </Tooltip>
        </div>
      </div>
      {user ? (
        <div className="p-4">
          <div className="font-bold text-2xl">{user.name}</div>
          <div className="text-sm">
            <IdStr username={user.username} host={user.host!} />
          </div>
        </div>
      ) : (
        <div className="animate-pulse p-4">dummy</div>
      )}
      <div className="flex flex-col gap-px bg-gray-200 py-px">
        {notes.map(note => (
          <NotePreview note={note} key={note.id} />
        ))}
      </div>
      <BottomSpinner />
    </>
  )
}

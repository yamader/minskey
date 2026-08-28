import { useCallback, useEffect, useState } from "preact/hooks"
import BottomSpinner from "~/components/BottomSpinner"
import TopAppBar from "~/components/TopAppBar"
import { useAPI } from "~/features/api"
import { useBottom } from "~/features/common"
import NotePreview from "~/features/note/NotePreview"
import { UserList, useListTimeline, useLists } from "~/features/user-list"
import { Link, usePathname, useSearchParams } from "~/router"

const inputClass =
  "w-full rounded-md border-2 p-2 shadow-none focus:border-lime-400 focus:outline-none"
const actionClass =
  "rounded-md bg-stone-700 px-3 py-1 font-bold text-white hover:bg-stone-600 active:bg-stone-500"

export default function ListsPage() {
  const params = useSearchParams()
  const listId = params.get("list")

  return listId ? <ListTimeline key={listId} listId={listId} /> : <ListsIndex />
}

function ListsIndex() {
  const api = useAPI()
  const { lists, refresh } = useLists()
  const [name, setName] = useState("")

  const create = () => {
    if (api && name) api.listCreate(name).then(refresh)
    setName("")
  }

  return (
    <>
      <form
        className="flex gap-2 border-b bg-white p-3"
        onSubmit={e => {
          e.preventDefault()
          create()
        }}>
        <input
          className={inputClass}
          placeholder="新しいリスト名"
          value={name}
          onChange={e => setName((e.target as HTMLInputElement).value)}
        />
        <button
          type="submit"
          className="rounded-md bg-lime-500 px-3 py-1 font-bold text-white hover:bg-lime-400">
          作成
        </button>
      </form>
      <div className="flex flex-col gap-px bg-gray-200 py-px">
        {lists?.map(list => (
          <ListRow key={list.id} list={list} onChanged={refresh} />
        ))}
      </div>
      <BottomSpinner />
    </>
  )
}

function ListRow({ list, onChanged }: { list: UserList; onChanged: () => void }) {
  const api = useAPI()
  const base = usePathname().startsWith("/deck") ? "/deck/lists" : "/lists"
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(list.name)

  const save = () => {
    if (api && name) api.listUpdate(list.id, name).then(onChanged)
    setEditing(false)
  }

  const remove = () => {
    if (api && confirm("リストを削除しますか？")) api.listDelete(list.id).then(onChanged)
  }

  return (
    <div className="flex items-center gap-2 border-b bg-white p-3">
      {editing ? (
        <>
          <input
            className={inputClass}
            value={name}
            onChange={e => setName((e.target as HTMLInputElement).value)}
          />
          <button type="button" className={actionClass} onClick={save}>
            保存
          </button>
        </>
      ) : (
        <>
          <Link className="grow" href={`${base}?list=${list.id}`}>
            <div className="font-bold">{list.name}</div>
            {list.userIds && (
              <div className="text-neutral-500 text-sm">{list.userIds.length} users</div>
            )}
          </Link>
          <button type="button" className={actionClass} onClick={() => setEditing(true)}>
            編集
          </button>
          <button type="button" className={actionClass} onClick={remove}>
            削除
          </button>
        </>
      )}
    </div>
  )
}

function ListTimeline({ listId }: { listId: string }) {
  const api = useAPI()
  const { notes, more } = useListTimeline(listId)
  const [list, setList] = useState<UserList | null>(null)
  const [member, setMember] = useState("")

  const reload = useCallback(() => {
    if (api) api.listShow(listId).then(res => setList(res ?? null))
  }, [api, listId])

  useEffect(() => {
    reload()
  }, [reload])

  useBottom(more)

  const addMember = () => {
    if (!api || !member) return
    const at = member.split("@").filter(Boolean)
    const find = at.length === 1 ? api.showId(at[0]) : api.showName(at[0], at[1] ?? null)
    find.then(u => {
      if (u) api.listPush(listId, u.id).then(reload)
      setMember("")
    })
  }

  const removeMember = (userId: string) => {
    if (api) api.listPull(listId, userId).then(reload)
  }

  return (
    <>
      <TopAppBar back content={<span className="text-lg">{list?.name ?? "リスト"}</span>} />
      <div className="border-b bg-white p-3">
        <form
          className="flex gap-2"
          onSubmit={e => {
            e.preventDefault()
            addMember()
          }}>
          <input
            className={inputClass}
            placeholder="メンバーを追加 (@user@host / id)"
            value={member}
            onChange={e => setMember((e.target as HTMLInputElement).value)}
          />
          <button
            type="submit"
            className="rounded-md bg-lime-500 px-3 py-1 font-bold text-white hover:bg-lime-400">
            追加
          </button>
        </form>
        <div className="mt-2 flex flex-wrap gap-1">
          {list?.userIds?.map(id => (
            <span
              key={id}
              className="flex items-center gap-1 rounded bg-neutral-100 px-2 py-0.5 text-xs">
              {id}
              <button
                type="button"
                className="text-neutral-500 hover:text-red-500"
                onClick={() => removeMember(id)}>
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-px bg-gray-200 py-px">
        {notes.map(note => (
          <NotePreview note={note} key={note.id} />
        ))}
      </div>
      <BottomSpinner />
    </>
  )
}

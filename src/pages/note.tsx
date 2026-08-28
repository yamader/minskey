import { useLocalNote, useNoteReplies } from '~/features/note'
import NotePreview from '~/features/note/NotePreview'
import { useSearchParams } from '~/router'

export default function NotePage() {
  const searchParams = useSearchParams()
  const noteId = searchParams.get('id') ?? ''

  const note = useLocalNote(noteId)
  const replies = useNoteReplies(noteId)

  if (!note) {
    return <div>Loading...</div>
  }

  return (
    <>
      <NotePreview note={note} />

      {replies || <h2>Replies</h2>}
      {replies?.map(reply => (
        <div key={reply.id}>
          <NotePreview note={reply} />
        </div>
      ))}
    </>
  )
}

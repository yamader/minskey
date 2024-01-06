import Nav from "./Nav"
import PictureDialog from "~/features/note/PictureDialog"
import NoteDialog from "~/features/note/NoteDialog"

export default function NavLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Nav />
      <NoteDialog />
      <PictureDialog />
    </>
  )
}

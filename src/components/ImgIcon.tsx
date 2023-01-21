// todo:
// - profileを受け取って表示
// - 右下にアクティブ状態の表示
export default function ImgIcon({ src }: { src: string | null }) {
  return src ? (
    <img className="h-12 w-12 overflow-hidden rounded-full" src={src} alt="icon" />
  ) : (
    <img className="h-12 w-12 overflow-hidden rounded-full" src="/anon.png" alt="default icon" />
  )
}

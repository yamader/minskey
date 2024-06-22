export type DriveFile = {
  id: string
  createdAt: string
  isSensitive: boolean
  name: string
  thumbnailUrl: string
  url: string
  type: string
  size: number
  md5: string
  blurhash: string
  comment: string | null
  properties: Record<string, any>
}

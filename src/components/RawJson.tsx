export default function RawJson({ json }: { json: unknown }) {
  return (
    <pre className="m-2 whitespace-normal break-all rounded border bg-neutral-100 p-2 text-sm leading-4">
      <code>{JSON.stringify(json)}</code>
    </pre>
  )
}

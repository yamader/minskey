import { MfmNode as MfmNodeType, MfmSimpleNode, parse, parseSimple } from "mfm-js"
import { Fragment } from "preact"
import { useMemo } from "preact/hooks"
import CustomEmoji from "~/features/common/CustomEmoji"

// react-mfm の薄い代替 (ミニマル実装)

export default function Mfm({ text }: { text: string }) {
  const nodes = useMemo(() => parse(text), [text])
  return <MfmNodes nodes={nodes} />
}

export function MfmSimple({ text }: { text: string }) {
  const nodes = useMemo(() => parseSimple(text), [text])
  return <MfmNodes nodes={nodes} />
}

function MfmNodes({ nodes }: { nodes: (MfmNodeType | MfmSimpleNode)[] }) {
  return (
    <>
      {nodes.map((node, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: パース結果の順序は固定のため
        <MfmNode key={i} node={node} />
      ))}
    </>
  )
}

function MfmNode({ node }: { node: MfmNodeType | MfmSimpleNode }) {
  switch (node.type) {
    case "text": {
      const text = node.props.text.replace(/\r\n?/g, "\n")
      return (
        <>
          {text.split("\n").map((line, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: 改行位置は固定のため
            <Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </>
      )
    }
    case "unicodeEmoji":
      return <span className="mfm-emoji">{node.props.emoji}</span>
    case "emojiCode":
      return <CustomEmoji name={node.props.name} />
    case "bold":
      return (
        <b>
          <MfmNodes nodes={node.children} />
        </b>
      )
    case "small":
      return (
        <small className="mfm-small">
          <MfmNodes nodes={node.children} />
        </small>
      )
    case "italic":
      return (
        <i className="mfm-italic">
          <MfmNodes nodes={node.children} />
        </i>
      )
    case "strike":
      return (
        <del>
          <MfmNodes nodes={node.children} />
        </del>
      )
    case "inlineCode":
      return <code className="mfm-inlineCode">{node.props.code}</code>
    case "blockCode":
      return (
        <pre className="mfm-blockCode">
          <code>{node.props.code}</code>
        </pre>
      )
    case "quote": {
      const content = <MfmNodes nodes={node.children} />
      return node.props?.nowrap ? (
        <span className="mfm-quote">{content}</span>
      ) : (
        <div className="mfm-quote">{content}</div>
      )
    }
    case "center":
      return (
        <div className="mfm-center">
          <MfmNodes nodes={node.children} />
        </div>
      )
    case "url":
      return (
        <a className="mfm-link" href={node.props.url} rel="nofollow noopener">
          {node.props.url}
        </a>
      )
    case "link":
      return (
        <a className="mfm-link" href={node.props.url} rel="nofollow noopener">
          <MfmNodes nodes={node.children} />
        </a>
      )
    case "mention":
      return (
        <a
          className="mfm-mention"
          href={
            node.props.host
              ? `https://${node.props.host}/@${node.props.username}`
              : `/@${node.props.username}`
          }
          rel="nofollow noopener">
          {node.props.acct}
        </a>
      )
    case "hashtag":
      return (
        <a className="mfm-hashtag" href={`/tags/${node.props.hashtag}`} rel="nofollow noopener">
          #{node.props.hashtag}
        </a>
      )
    case "plain":
      return (
        <span>
          <MfmNodes nodes={node.children} />
        </span>
      )
    case "fn":
      // todo: アニメーション等は未対応
      return (
        <span>
          <MfmNodes nodes={node.children} />
        </span>
      )
    case "search":
      return <span className="mfm-search">{node.props.query}</span>
    case "mathInline":
      return <span className="mfm-mathInline">{node.props.formula}</span>
    case "mathBlock":
      return (
        <div className="mfm-mathBlock">
          <code>{node.props.formula}</code>
        </div>
      )
  }
}

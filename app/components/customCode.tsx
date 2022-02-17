import clsx from 'clsx'
import * as React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { HiCheckCircle, HiClipboard } from 'react-icons/hi'

export function Pre(props: React.ComponentPropsWithRef<'pre'>) {
  return <pre {...props}>{props.children}</pre>
}

export default function CustomCode(props: React.ComponentPropsWithRef<'code'>) {
  const textRef = React.useRef<HTMLDivElement>(null)
  const [isCopied, setIsCopied] = React.useState<boolean>(false)

  const language = props.className?.includes('language')
    ? props.className.replace('language-', '').replace(' code-highlight', '')
    : null

  return (
    <code {...props} data-code-type={language && 'code-block'}>
      {language ? (
        <div ref={textRef} className="overflow-auto px-4 pt-8 pb-3">
          {props.children}
        </div>
      ) : (
        <span>{props.children}</span>
      )}

      {language && (
        <div className="absolute top-0 left-6 rounded-b-md border border-t-0 border-gray-600 px-3 py-1">
          <span className="select-none font-medium text-pink">{language}</span>
        </div>
      )}

      {language && (
        <CopyToClipboard
          text={textRef?.current?.textContent ?? ''}
          onCopy={() => {
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 1500)
          }}
        >
          <button className="absolute top-2 right-2 rounded border border-gray-600 p-2 text-lg transition-colors hover:bg-gray-700 md:block">
            {isCopied ? (
              <HiCheckCircle className="text-green-400" />
            ) : (
              <HiClipboard />
            )}
          </button>
        </CopyToClipboard>
      )}
    </code>
  )
}

import { cn } from "@/modules/shared/lib/utils"
import { ExternalLink } from "lucide-react"
import { PropsWithChildren, ReactNode, useState } from "react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"

type SkillMarkdownProps = {
  content: string
  className?: string
}

type CodeBlockProps = {
  inline?: boolean
  className?: string | undefined
}

type ImageProps = {
  src?: string | undefined
  alt?: string | undefined
}

type LinkProps = {
  href?: string | undefined
  title?: string | undefined
}

type HeadingProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6
}

type ListProps = { ordered?: boolean }

function CodeBlock({
  children,
  className,
  inline,
}: PropsWithChildren<CodeBlockProps>) {
  const match = /language-(\w+)/.exec(className || "")
  const language = match ? match[1] : ""

  if (inline)
    return (
      <code className="rounded-md bg-gradient-to-r from-purple-100 to-pink-100 px-2 py-1 font-mono text-sm text-purple-800 dark:from-purple-900/30 dark:to-pink-900/30 dark:text-purple-200">
        {children}
      </code>
    )

  return (
    <div className="group relative my-6">
      <div className="overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-1 shadow-2xl">
        <div className="rounded-lg bg-slate-900/90 backdrop-blur-sm">
          {/* Terminal-style header */}
          <div className="flex items-center justify-between border-b border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-slate-700/50 px-4 py-3">
            <div className="flex items-center space-x-3">
              {/* Terminal dots */}
              <div className="flex space-x-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm font-medium text-slate-300">
                {language ? `${language.toUpperCase()}` : "CODE"}
              </span>
            </div>
          </div>

          {/* Code content */}
          <div className="relative">
            <SyntaxHighlighter
              language={language || "text"}
              customStyle={{
                margin: 0,
                padding: "1.5rem",
                backgroundColor: "transparent",
                color: "#e2e8f0",
                fontSize: "0.875rem",
                lineHeight: "1.6",
                fontFamily:
                  "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
              }}
              showLineNumbers={true}
              lineNumberStyle={{
                color: "#64748b",
                paddingRight: "1rem",
                minWidth: "2.5rem",
              }}
              wrapLines={true}
              wrapLongLines={true}
            >
              {children as any}
            </SyntaxHighlighter>

            {/* Gradient overlay for depth */}
            <div className="pointer-events-none absolute inset-0 rounded-b-lg bg-gradient-to-t from-slate-900/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ImageRenderer({ src, alt }: ImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <figure className="my-6">
      <div className="relative overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-700">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="flex animate-pulse space-x-4">
              <div className="h-4 w-4 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex-1 space-y-2 py-1">
                <div className="h-2 w-3/4 rounded bg-gray-300 dark:bg-gray-600"></div>
                <div className="h-2 w-1/2 rounded bg-gray-300 dark:bg-gray-600"></div>
              </div>
            </div>
          </div>
        )}
        {hasError && (
          <div className="flex items-center justify-center bg-gray-50 p-8 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
            <span>Failed to load image</span>
          </div>
        )}

        {!hasError && (
          <img
            src={src}
            alt={alt}
            className={cn(
              "h-auto w-full max-w-full transition-opacity duration-300",
              isLoading ? "opacity-0" : "opacity-100",
            )}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false)
              setHasError(true)
            }}
            loading="lazy"
          />
        )}
      </div>

      {alt && (
        <figcaption className="mt-2 text-center text-sm text-gray-600 italic dark:text-gray-400">
          {alt}
        </figcaption>
      )}
    </figure>
  )
}

function LinkRenderer({ href, children }: PropsWithChildren<LinkProps>) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-1 rounded-sm text-blue-600 underline decoration-2 underline-offset-2 transition-colors duration-200 hover:text-blue-800 hover:decoration-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:text-blue-400 dark:hover:text-blue-300 dark:hover:decoration-blue-300"
    >
      {children}
      <ExternalLink size={14} className="flex-shrink-0" />
    </a>
  )
}

function HeadingRenderer({ level, children }: PropsWithChildren<HeadingProps>) {
  return {
    1: (children: ReactNode) => (
      <h1 className="mt-8 mb-6 text-3xl font-bold text-gray-900 first:mt-0 md:text-4xl dark:text-gray-100">
        {children}
      </h1>
    ),
    2: (children: ReactNode) => (
      <h2 className="mt-6 mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
        {children}
      </h2>
    ),
    3: (children: ReactNode) => (
      <h3 className="mt-5 mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
        {children}
      </h3>
    ),
    4: (children: ReactNode) => (
      <h4 className="mt-4 mb-3 text-lg font-medium text-gray-800 dark:text-gray-200">
        {children}
      </h4>
    ),
    5: (children: ReactNode) => (
      <h5 className="mt-3 mb-2 text-base font-medium text-gray-700 dark:text-gray-300">
        {children}
      </h5>
    ),
    6: (children: ReactNode) => (
      <h6 className="mt-3 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {children}
      </h6>
    ),
  }[level](children)
}

function ListRenderer({ ordered, children }: PropsWithChildren<ListProps>) {
  const Tag = ordered ? "ol" : "ul"
  const listClasses = cn(
    "my-4 space-y-2",
    ordered ? "list-decimal list-inside" : "list-disc list-inside",
    "text-gray-700 dark:text-gray-300",
  )

  return <Tag className={listClasses}>{children}</Tag>
}

function ListItemRenderer({ children }: PropsWithChildren) {
  return <li className="pl-2 leading-relaxed">{children}</li>
}

export function SkillMarkdown({ content, className }: SkillMarkdownProps) {
  return (
    <div
      className={cn("prose prose-gray dark:prose-invert max-w-none", className)}
    >
      <ReactMarkdown
        components={{
          code: CodeBlock,
          img: ImageRenderer,
          a: LinkRenderer,
          h1: ({ children }) => (
            <HeadingRenderer level={1}>{children}</HeadingRenderer>
          ),
          h2: ({ children }) => (
            <HeadingRenderer level={2}>{children}</HeadingRenderer>
          ),
          h3: ({ children }) => (
            <HeadingRenderer level={3}>{children}</HeadingRenderer>
          ),
          h4: ({ children }) => (
            <HeadingRenderer level={4}>{children}</HeadingRenderer>
          ),
          h5: ({ children }) => (
            <HeadingRenderer level={5}>{children}</HeadingRenderer>
          ),
          h6: ({ children }) => (
            <HeadingRenderer level={6}>{children}</HeadingRenderer>
          ),
          ul: ({ children }) => (
            <ListRenderer ordered={false}>{children}</ListRenderer>
          ),
          ol: ({ children }) => (
            <ListRenderer ordered={true}>{children}</ListRenderer>
          ),
          li: ListItemRenderer,
          p: ({ children }) => (
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              {children}
            </p>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-4 border-l-4 border-blue-500 bg-blue-50 py-2 pl-4 text-gray-700 italic dark:bg-blue-900/20 dark:text-gray-300">
              {children}
            </blockquote>
          ),
          hr: () => (
            <hr className="my-8 h-px border-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600" />
          ),
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto">
              <table className="min-w-full border-collapse overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="border-b border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:border-gray-700 dark:text-gray-100">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-gray-200 px-4 py-3 text-sm text-gray-700 dark:border-gray-700 dark:text-gray-300">
              {children}
            </td>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-gray-900 dark:text-gray-100">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="text-gray-800 italic dark:text-gray-200">
              {children}
            </em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

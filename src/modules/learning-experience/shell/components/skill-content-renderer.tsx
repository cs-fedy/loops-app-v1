import { SkillMarkdown } from "@/components/ui/skill-markdown"
import { useSkillContent } from "../services/use-skill-content"

export function SkillContentRenderer({ contentUrl }: { contentUrl: string }) {
  const { markdownContent } = useSkillContent(contentUrl)

  return (
    <SkillMarkdown
      content={markdownContent}
      className="font-outfit text-base leading-relaxed text-white [&_*]:text-white [&_a]:text-white [&_blockquote]:text-white [&_em]:text-white [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white [&_h5]:text-white [&_h6]:text-white [&_li]:text-white [&_p]:text-white [&_strong]:text-white"
    />
  )
}

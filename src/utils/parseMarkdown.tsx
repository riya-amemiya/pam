import ReactMarkdown from "react-markdown";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
export const parseMarkdown = (markdown: string) => {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm, remarkGemoji]}>
      {markdown}
    </ReactMarkdown>
  );
};

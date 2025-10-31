import React from 'react';

// Render rich text from JSON strings with:
// - Paragraphs: split by \n\n or <br><br>
// - Line breaks inside paragraph: single \n or <br>
// - Inline styles via simple markdown: **bold**, *italic*, __bold__, _italic_
// Prefer markdown in JSON instead of raw HTML for safety.

function renderInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = text;

  // Supports:
  // - Span with classes: [text]{.class-one class-two}
  // - Bold: **text** or __text__
  // - Italic: *text* or _text_
  // - Line breaks: <br> or \n
  const regex = /\[([^\]]+)\]\{\.([a-zA-Z0-9_\-\s]+)\}|\*\*([^*]+)\*\*|__([^_]+)__|\*([^*]+)\*|_([^_]+)_|<br\s*\/?\s*>|\n/g;
  let idx = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(remaining)) !== null) {
    const matchStart = match.index;
    const matchText = match[0];

    if (matchStart > 0) {
      parts.push(remaining.slice(0, matchStart));
    }

    if (match[1] && match[2]) {
      // span with custom classes
      const content = match[1] as string;
      const classes = (match[2] as string).trim();
      parts.push(
        <span key={`c-${idx++}`} className={classes}>
          {renderInlineMarkdown(content)}
        </span>
      );
    } else if (match[3] || match[4]) {
      // bold
      const content = (match[3] || match[4]) as string;
      parts.push(<strong key={`b-${idx++}`}>{content}</strong>);
    } else if (match[5] || match[6]) {
      // italic
      const content = (match[5] || match[6]) as string;
      parts.push(<em key={`i-${idx++}`}>{content}</em>);
    } else {
      // line break
      parts.push(<br key={`br-${idx++}`} />);
    }

    remaining = remaining.slice(matchStart + matchText.length);
    regex.lastIndex = 0; // reset for new remaining string
  }

  if (remaining) parts.push(remaining);
  return parts;
}

type RenderRichTextOptions = { as?: 'p' | 'span' };

export function renderRichText(raw: string, options: RenderRichTextOptions = {}): React.ReactNode {
  const Tag: 'p' | 'span' = options.as === 'span' ? 'span' : 'p';
  if (!raw) return null;

  // Normalize paragraph separators
  const normalized = raw.replace(/<br\s*\/?\s*><br\s*\/?\s*>/gi, '\n\n');

  const paragraphs = normalized
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(Boolean);

  return (
    <>
      {paragraphs.map((p, i) => (
        <Tag key={i}>{renderInlineMarkdown(p)}</Tag>
      ))}
    </>
  );
}



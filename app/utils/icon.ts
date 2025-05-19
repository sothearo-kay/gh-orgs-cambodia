export function addFillColor(content: string, name?: string, prefix?: string) {
  if (prefix !== "lucide") return content;

  return (
    content
      // Remove fill="none" so it doesn't block your color
      .replace(/fill="none"/g, "")
      // Force fill color (you can use currentColor or a hex value)
      .replace(/<path/g, '<path fill="currentColor"')
      // Force stroke to match currentColor too
      .replace(/stroke="[^"]*"/g, 'stroke="currentColor"')
  );
}

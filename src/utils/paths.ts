export function appendBasePath(path: string): string {
  const basePath = "";
  if (path.startsWith('/')) {
    return `${basePath}${path}`;
  }
  return path;
}
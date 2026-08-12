export function appendBasePath(path: string): string {
  const basePath = "/Alan-Luu-Website-Pages" ;
  if (path.startsWith('/')) {
    return `${basePath}${path}`;
  }
  return path;
}
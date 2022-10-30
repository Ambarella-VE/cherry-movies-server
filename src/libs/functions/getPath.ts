export default function getPath(): string | undefined{
  const path: string | undefined = process.env.PWD
  return path
}

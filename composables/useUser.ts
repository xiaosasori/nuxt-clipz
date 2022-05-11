export default function () {
  return useState<User | null>('user', () => null)
}

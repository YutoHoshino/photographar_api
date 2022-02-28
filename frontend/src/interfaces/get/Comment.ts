export interface Comment {
  id: number,
  text: string,
  user: {
    id: number,
    name: string,
    image?: { url: string},
  }
}
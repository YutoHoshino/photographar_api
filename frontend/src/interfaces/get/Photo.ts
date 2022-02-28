export interface Photo {
  id: number,
  image: { url: string },
  post_id: number,
  created_at: Date,
  updated_at: Date,
}
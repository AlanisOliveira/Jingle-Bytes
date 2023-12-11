import { Category } from "./category"
import { Place } from "./place"

export type Event = {
  id: string | undefined,
  name: string,
  description: string | undefined,
  date: Date,
  category: Category | undefined,
  category_id: string | undefined,
  place: Place | undefined,
  place_id: string | undefined,
}
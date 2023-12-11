import { Category } from "../types/category"
import { Event } from "../types/event"
import { Place } from "../types/place"

export function transformEvents(events: Event[]) {
  // return events.map((e) => {
  //   return { ...e, date: new Date(e.date) } as Event
  // })

  return events.map(transformEvent)
}

export function transformEvent(event: Event) {
  return { ...event, date: new Date(event.date) } as Event
}

export function transformEventDetail(event: Event, category: Category, place: Place) {
  console.log(JSON.stringify(place))
  return {
    ...transformEvent(event),
    category: category,
    place: place
  } as Event
}
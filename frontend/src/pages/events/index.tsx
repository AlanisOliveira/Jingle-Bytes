import EventCard from "../../components/cards/event_card"
import { useSearch } from "../../context/search_global"
import Layout from "../../components/layout"
import EventsFilter from "../../components/events_filter"

export default function Events() {
	const { events, } = useSearch()



	return (
		<>
			<Layout>

				<div className="flex flex-col items-center justify-center	">
					<div className="text-[#2C5234]	text-4xl font-bold">
						Eventos
					</div>
					<div className="max-w-[80%]">
						<EventsFilter />
						<div className="flex flex-col gap-4">
							{events.map((e) => (
								<EventCard event={e} />
							))}
						</div>
					</div>
				</div>
			</Layout>

		</>
	)
}
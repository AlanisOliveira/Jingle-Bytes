import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { httpClient } from "../../../client/axios";
import { Event } from "../../../types/event";
import { transformEvent } from "../../../utils/transform_events";
import Layout from "../../../components/layout";

import { EventDetail } from "../../../types/event_detail";
import { CalendarIcon, WatchIcon } from "../../../utils/icons";

export default function EventDetails() {

	const [event, setEvent] = useState<Event>()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { event_id } = useParams();


	console.log(event_id)

	function getEvents(event_id: string | undefined) {
		if (event_id) {
			setIsLoading(true)
			httpClient.get<EventDetail>("/event/details/" + event_id)
				.then(({ data }) => setEvent(transformEvent(data.event)))
				.catch((e) => console.error(e))
				.then(() => setIsLoading(false))
		}

	}

	useEffect(() => {
		getEvents(event_id)
	}, [])

	if (isLoading) {
		return (
			<>
				Loading...
			</>
		)
	}

	return (
		<>
			<Layout>
				<div className="flex justify-center items-center">


					<div className="grid grid-cols-2 max-w-[80%] ">
						<div className="grid-cols-1 bg-[#2C5234] text-black text-lg	p-2 rounded-s-xl">
							<div className="text-2xl font-bold	">
								{event?.name}
							</div>
							<div className="">
								{event?.description}
							</div>

							<div className="flex justify-between">
								<div className="flex gap-2 items-center">
									<CalendarIcon/>
									{event?.date.toLocaleDateString()}
								</div>
								<div className="flex gap-2  items-center">
									<WatchIcon/>
									{event?.date.toLocaleTimeString()}
								</div>

							</div>
						</div>
						<div className="grid-cols-1 bg-[#0C1811] text-white p-2 rounded-e-xl text-lg" >
							<div className="font-bold">
								Local: {event?.place?.name}
							</div>
							<div className="">
								Endereço: {event?.place?.address}
							</div>
							<div className="">
								Cidade: {event?.place?.city}
							</div>
							<div className="">
								Estado: {event?.place?.state}
							</div>
							<div className="">
								Pais: {event?.place?.country}
							</div>
						</div>
					</div>
				</div>
			</Layout>

		</>
	)
}


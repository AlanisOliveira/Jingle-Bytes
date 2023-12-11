import { ReactNode, createContext, useContext, useEffect, useState } from "react";

import { FilterProps } from "../types/filter";
import { httpClient } from "../client/axios";



import { Event } from "../types/event";
import { transformEvents } from "../utils/transform_events";
import { encodeQueryParamsToRequest } from "../utils/encode_query";


type SearchProps = {
	children: ReactNode;
	// filters?: FilterProps | undefined;
}

interface SearchContextType {
	events: Event[];
	// filters: FilterProps | undefined;
	load: () => void
	setFiltersParams: React.Dispatch<React.SetStateAction<FilterProps | undefined>>;
	filterEvents: () => void;
	isLoading: boolean;

}

export const SearchContext = createContext({} as SearchContextType);



export const SearchContextProvider = ({ children }: SearchProps) => {

	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [filters, setFiltersParams] = useState<FilterProps | undefined>()
	const [events, setEvents] = useState<Event[]>([] as Event[])



	function filterEvents() {
		if (filters) {
			setIsLoading(true)
			httpClient
				.get<Event[]>("/event/find?" + encodeQueryParamsToRequest(filters))
				.then(({ data }) => setEvents(transformEvents(data)))
				.then(() => setIsLoading(false))
				.catch((e) => console.error(e))
		}
	}

	function getAllEvents() {
		setIsLoading(true)
		httpClient.get<Event[]>("/event/all")
			.then(({ data }) => setEvents(transformEvents(data)))
			.then(() => setIsLoading(false))
			.catch((e) => console.error(e))
	}


	function load() {
		if (filters) {
			// console.log("filtered")
			filterEvents()
		} else {
			getAllEvents()
			// console.log("notFilterd")
		}
	}


	useEffect(load, [filters])

	// console.log(filters)

	return (
		<SearchContext.Provider
			value={{
				// filters,
				setFiltersParams,
				load,
				events,
				filterEvents,
				isLoading
			}}
		>
			{children}
		</SearchContext.Provider>
	)
}


export const useSearch = () => {
	return useContext(SearchContext);
}

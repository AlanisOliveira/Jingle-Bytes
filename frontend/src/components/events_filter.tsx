import { useState } from "react"
import { useSearch } from "../context/search_global"
import { FilterProps } from "../types/filter"
import { useGlobal } from "../context/global_context"
import DatePickerComponent from "../components/date_picker_component"
import { SearchIcon } from "../utils/icons"

export default function EventsFilter() {

  const {  setFiltersParams } = useSearch()

	const [filter, setFilter] = useState<FilterProps | undefined>()
	const { categories, places } = useGlobal()

	function handle_search(e: React.FormEvent) {
		e.preventDefault()
		if(filter) {
			setFiltersParams(filter)
		}
	}
  return (
    <form onSubmit={handle_search} className="flex p-4 gap-2 items-center">

      <div className="flex flex-col">
        <label className=" text-gray-700 dark:text-white text-sm font-bold mb-2">
          Pesquisa
        </label>
        <input value={filter?.search} onChange={(e) => setFilter((ev) => ({ ...ev, search: e.target.value } as FilterProps))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " id="name" type="text" placeholder="Nome" />
      </div>
      <div className="flex flex-col">

        <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" >
          Data
        </label>
        <DatePickerComponent classExtend={""} onChange={(date) => setFilter((ev) => ({ ...ev, dates: date.toDateString() } as FilterProps))} value={filter?.dates ? new Date(filter?.dates) : undefined} />
      </div>
      <div className="flex flex-col">

        <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Categoria</label>
        <select value={filter?.categories} onChange={(c) => setFilter((e) => ({ ...e, categories: c.target.value } as FilterProps))} id="categories" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected disabled>Escolha uma categoria</option>

          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div className="flex flex-col">

        <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Local</label>
        <select value={filter?.places} onChange={(p) => setFilter((e) => ({ ...e, places: p.target.value } as FilterProps))} id="places" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected disabled>Escolha uma Local</option>
          {places.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>

      </div>
      <button type="submit" className="bg-black rounded-full bg-opacity-40 p-2">
        <SearchIcon />
      </button>

    </form >
  )
}
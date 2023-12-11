
import { useState } from 'react'
import { Event } from '../../../types/event';
import { httpClient } from '../../../client/axios';
import { useGlobal } from '../../../context/global_context';
import DatePickerComponent from '../../../components/date_picker_component';
import Layout from '../../../components/layout';
import CreatePlace from '../../../components/modal/create_place';
import CreateCategory from '../../../components/modal/create_category';
import { useSearch } from '../../../context/search_global';





export default function CreateEvent() {


	const [newEvent, setEvent] = useState<Event>({} as Event);
	const [showCreateCategory, setShowCreateCategory] = useState<boolean>(false);
	const [showCreatePlace, setShowCreatePlace] = useState<boolean>(false);
	const { categories, places, isLoading } = useGlobal()
	const { load } = useSearch()





	async function create_event(e: React.FormEvent) {
		e.preventDefault()
		httpClient.post("/event", { ...newEvent }).then(() =>

			load()
		)
	}

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
				<div className="flex justify-center">
					<CreatePlace isOpen={showCreatePlace} setIsOpen={setShowCreatePlace} />
					<CreateCategory isOpen={showCreateCategory} setIsOpen={setShowCreateCategory} />

					<div className="">

						<form onSubmit={create_event} className="rounded px-8 pt-6 pb-8 mb-4">
							<div className="pb-4">
								<label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="name">
									Nome
								</label>
								<input value={newEvent?.name} onChange={(e) => setEvent((ev) => ({ ...ev, name: e.target.value }))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " id="name" type="text" placeholder="Nome" />
							</div>
							<div className="pb-4">
								<label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="description">
									Descrição
								</label>
								<input value={newEvent?.description} onChange={(e) => setEvent((ev) => ({ ...ev, description: e.target.value }))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="description" type="text" placeholder="Descrição" />
							</div>
							<div className="pb-4">
								<label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="name">
									Data
								</label>
								<DatePickerComponent classExtend={""} onChange={(date) => setEvent((ev) => ({ ...ev, date: date }))} value={newEvent?.date} />
							</div>
							<div className="pb-4">
								<div className="flex items-center justify-between">
									<label htmlFor="categories" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Categoria</label>
									<button
										onClick={() => setShowCreateCategory(true)}
										className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
									> criar categoria</button>
								</div>
								<select value={newEvent.category_id} onChange={(c) => setEvent((e) => ({ ...e, category_id: c.target.value }))} id="categories" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
									<option selected disabled>Escolha uma categoria</option>
									{categories.map((c) =>
										<option key={c.id} value={c.id}>
											{c.name}
										</option>
									)}
								</select>
							</div>
							<div className="pb-4">
								<div className="flex items-center justify-between">

									<label htmlFor="places" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">Local</label>
									<button
										onClick={() => setShowCreatePlace(true)}
										className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
									> criar evento
									</button>
								</div>
								<select value={newEvent.place_id} onChange={(p) => setEvent((e) => ({ ...e, place_id: p.target.value }))} id="places" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
									<option selected disabled>Escolha uma Local</option>
									{places.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
								</select>
							</div>
							<div className="flex justify-center	">

								<button
									type="submit"
									className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"

								>
									Salvar
								</button>
							</div>

						</form>

					</div>
				</div>

			</Layout>
		</>
	)
}
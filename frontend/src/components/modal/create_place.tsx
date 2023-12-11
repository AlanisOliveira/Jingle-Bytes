import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { httpClient } from '../../client/axios'

import { Place } from '../../types/place'
import { useGlobal } from '../../context/global_context'

type CreatePlaceProps = {

  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  // categories: Category[],
  // places: Place[]
}


export default function CreatePlace({ isOpen, setIsOpen }: CreatePlaceProps) {


  const [newPlace, setPlace] = useState<Place>({} as Place);
  const { update_places } = useGlobal()



  async function create_place(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      await httpClient.post("/place", { ...newPlace })
      update_places()
      closeModal()
    } catch (error) {
      console.error(error)
    }

  }



  function closeModal() {
    setIsOpen(false)
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex flex-col items-center w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Criar Local
                  </Dialog.Title>
                  <form onSubmit={create_place} className="rounded px-8 pt-6 pb-8 mb-4">
                    <div className="w-full max-w-xs">
                      <div className="pb-4">
                        <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="name">
                          Nome
                        </label>
                        <input value={newPlace.name}
                          onChange={(e) => setPlace((pl) => ({ ...pl, name: e.target.value }))}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                          id="name"
                          type="text"
                          placeholder="Nome" />
                      </div>

                      <div className="pb-4">
                        <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="description">
                          Endereço
                        </label>
                        <input
                          value={newPlace.address}
                          onChange={(e) => setPlace((pl) => ({ ...pl, address: e.target.value }))}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          id="description"
                          type="text"
                          placeholder="Descrição" />
                      </div>
                      <div className="pb-4">
                        <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="description">
                          Bairro
                        </label>
                        <input
                          value={newPlace.neighborhood}
                          onChange={(e) => setPlace((pl) => ({ ...pl, neighborhood: e.target.value }))}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          id="description"
                          type="text"
                          placeholder="Descrição" />
                      </div>
                      <div className="pb-4">
                        <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="description">
                          Cidade
                        </label>
                        <input
                          value={newPlace.city}
                          onChange={(e) => setPlace((pl) => ({ ...pl, city: e.target.value }))}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          id="description"
                          type="text"
                          placeholder="Descrição" />
                      </div>
                      <div className="pb-4">
                        <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="description">
                          Estado
                        </label>
                        <input
                          value={newPlace.state}
                          onChange={(e) => setPlace((pl) => ({ ...pl, state: e.target.value }))}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          id="description"
                          type="text"
                          placeholder="Descrição" />
                      </div>
                      <div className="pb-4">
                        <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="description">
                          Pais
                        </label>
                        <input
                          value={newPlace.country}
                          onChange={(e) => setPlace((pl) => ({ ...pl, country: e.target.value }))}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          id="description"
                          type="text"
                          placeholder="Descrição" />
                      </div>



                    </div>
                    <div className="flex justify-between w-full">
                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Cancelar
                        </button>
                      </div>
                      <div className="mt-4">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"

                        >
                          Salvar
                        </button>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
import { Link } from "react-router-dom"
import { Event } from "../../types/event"
import { EditIcon, TrashIcon } from "../../utils/icons"
import { routes } from "../../utils/routes"
import UpdateDialog from "../modal/update_event_dialog"
import { useState } from "react"
import DeleteModal from "../modal/delete_event_modal"

type EventCardProps = {
  event: Event,
  editing?: boolean
}

export default function EventCard({ event, editing }: EventCardProps) {
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

  return (
    <>
      {editing &&
        (
          <>
            <UpdateDialog event={event} isOpen={showUpdateModal} setIsOpen={setShowUpdateModal} />
            <DeleteModal id={event.id!} isOpen={showDeleteModal} setIsOpen={setShowDeleteModal} />
          </>
        )}
      <div className="bg-[#0C1811] text-white rounded-lg p-4">
        <div className="flex justify-between">
          <Link to={routes.event_details.route.split(":")[0] + event.id}>
            <div className="">
              <div className="">
                {event.name}
              </div>
              <div className="flex gap-6 items-center w-full">
                <div className="">
                  {/* <div className="">
                    Local: {event.place?.name}
                  </div> */}
                  <div className="">
                    Data: {event.date.toLocaleDateString()}
                  </div>
                  <div className="">
                    Horário: {event.date.toLocaleTimeString()}
                  </div>
                </div>
                <div className="">
                  Descrição: {event.description}
                </div>

              </div>

            </div>
          </Link>
          {editing &&
            (
              <>
                <div className="flex flex-col justify-between">
                  <button
                    className="bg-white dark:bg-black rounded-full bg-opacity-10 dark:bg-opacity-40 p-2"
                    onClick={() => setShowUpdateModal(true)}>

                    <EditIcon />
                  </button>
                  <button
                    className="bg-white dark:bg-black rounded-full bg-opacity-10 dark:bg-opacity-40 p-2"
                    onClick={() => setShowDeleteModal(true)} >

                    <TrashIcon />
                  </button>
                </div>
              </>
            )}

        </div>
      </div >
    </>
  )
}
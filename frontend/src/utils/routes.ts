import Home from "../pages";
import Events from "../pages/events";
import EventDetails from "../pages/event/details";
import CreateEvent from "../pages/event/create";
import ManageEvents from "../pages/manage_events";


// interface RoutesProps  {
//   name: string;
//   route: string;
//   element: React.ReactNode;
//   hidden: boolean;
// }


export const routes = {
  home: { name: "Home", route: "/", element: () => Home(), hidden: true },
  events: { name: "Encontre Eventos", route: "/events", element: () => Events(), hidden: false },
  create_events: { name: "Crie Seu Evento", route: "/event/create", element: () => CreateEvent(), hidden: false },
  event_details: { name: "Detalhe do Evento", route: "/event/details/:event_id", element: () => EventDetails(), hidden: true },
  edit_events: { name: "Editar Eventos", route: "/manage_events", element: () => ManageEvents(), hidden: false },

}
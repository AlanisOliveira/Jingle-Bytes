import { ReactNode, createContext, useContext, useEffect, useState } from "react";

import { httpClient } from "../client/axios";
import { GenericResponse } from "../types/generic_response";
import { Category } from "../types/category";
import { Place } from "../types/place";

type GlobalProps = {
  children: ReactNode;
}

interface GlobalContextType {
  categories: Category[];
  isLoading: boolean;
  places: Place[];
  update_categories: () => void
  update_places: () => void
}

export const GlobalContext = createContext({} as GlobalContextType);



export const GlobalContextProvider = ({ children }: GlobalProps) => {

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [places, setPlaces] = useState<Place[]>([])


  useEffect(() => {
    // getAllEvents()
    setIsLoading(true)
    Promise.all([
      httpClient.get<Category[]>("/category/all").then(({ data }) => setCategories(data)),
      httpClient.get<Place[]>("/place/all").then(({ data }) => setPlaces(data)),


    ]).then(() => {
      setIsLoading(false)
    }).catch((e) => console.error(e))

  }, [])


  function update_categories() {
    setIsLoading(true)
    httpClient.get<GenericResponse<Place[]>>("/place/all")
      .then(({ data }) => setPlaces(data.data))
      .catch((e) => console.error(e))
      .then(() => setIsLoading(false))

  }

  function update_places() {
    setIsLoading(true)
    httpClient.get<GenericResponse<Place[]>>("/place/all")
      .then(({ data }) => setPlaces(data.data))
      .catch((e) => console.error(e))
      .then(() => setIsLoading(false))
  }

  return (
    <GlobalContext.Provider
      value={{
        places,
        categories,
        isLoading,
        update_categories,
        update_places,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}


export const useGlobal = () => {
  return useContext(GlobalContext);
}

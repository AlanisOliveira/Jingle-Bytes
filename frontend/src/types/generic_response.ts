

export type GenericResponse<T> = {
  data: T
  status: string
  error: string | undefined
}


import { FilterProps } from "../types/filter";

export function encodeQueryParamsToRequest(filters: FilterProps) {

  const urlSearchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {

    urlSearchParams.append(key, String(value));
  }

  return urlSearchParams
}

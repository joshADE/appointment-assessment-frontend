import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuditableBaseEntity } from '../types/common/entity'
import { Response } from '../types/common/result'


// Define a service using a base URL and expected endpoints
export const appointmentManagementApi = createApi({
  reducerPath: 'appointmentApi',
  tagTypes: ['Guest', 'Staff', 'Service', 'Appointment'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:44365/api/' }),
  endpoints: () => ({}),
  refetchOnMountOrArgChange: 60,
})

// for cache invalidation
export function providesList<R extends { id: string | number }[], T extends string>(
  resultsWithIds: R | undefined,
  tagType: T
) {
  return resultsWithIds 
  ?   [
          { type: tagType, id: 'LIST' },
          ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
      ]
  : [{ type: tagType, id: 'LIST' }]
}

export function getListFromResponse<T extends AuditableBaseEntity>(
  response?: Response<T[]>,
) {
  return response?.data?.map(({ id }) => ({ id }));
}

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {  } = appointmentManagementApi
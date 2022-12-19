import { appointmentManagementApi, providesList, getListFromResponse } from "../api";
import { AddServiceRequest, Service } from "../../types/service/service";
import { Response } from "../../types/common/result";

export const serviceApi = appointmentManagementApi.injectEndpoints({
    endpoints: (builder) => ({
        getServices: builder.query<Response<Service[]>, void>({
            query: () => ({ url: 'services' }),
            providesTags: (response) => providesList(getListFromResponse(response), 'Service'),
        }),
        addService: builder.mutation<Response<Service>, AddServiceRequest>({
            query: (service) => ({
                url: 'services',
                method: 'POST',
                body: service,
            }),
            invalidatesTags: [{ type: 'Service', id: 'LIST' }, { type: 'Appointment', id: 'LIST' }],
        })
    }),
})

export const { 
    useGetServicesQuery,
    useAddServiceMutation,
} = serviceApi;

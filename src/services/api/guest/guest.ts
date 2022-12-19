import { appointmentManagementApi, providesList, getListFromResponse } from "../api";
import { AddGuestRequest, Guest } from "../../types/guest/guest";
import { Response } from "../../types/common/result";

export const guestApi = appointmentManagementApi.injectEndpoints({
    endpoints: (builder) => ({
        getGuests: builder.query<Response<Guest[]>, void>({
            query: () => ({ url: 'guests' }),
            providesTags: (response) => providesList(getListFromResponse(response), 'Guest'),
        }),
        addGuest: builder.mutation<Response<Guest>, AddGuestRequest>({
            query: (guest) => ({
                url: 'guests',
                method: 'POST',
                body: guest,
            }),
            invalidatesTags: [{ type: 'Guest', id: 'LIST' }, { type: 'Appointment', id: 'LIST' }],
        })
    }),
})

export const { 
    useGetGuestsQuery,
    useAddGuestMutation,
} = guestApi;

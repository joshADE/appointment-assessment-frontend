import { appointmentManagementApi, providesList, getListFromResponse } from "../api";
import { Guest } from "../../types/guest/guest";
import { Response } from "../../types/common/result";

export const guestApi = appointmentManagementApi.injectEndpoints({
    endpoints: (builder) => ({
        getGuests: builder.query<Response<Guest[]>, void>({
            query: () => ({ url: 'guests' }),
            providesTags: (response) => providesList(getListFromResponse(response), 'Guest'),
        }),
    }),
})

export const { 
    useGetGuestsQuery,
} = guestApi;

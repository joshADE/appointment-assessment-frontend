import { appointmentManagementApi, providesList, getListFromResponse } from "../api";
import { AddAppointmentRequest, Appointment } from "../../types/appointment/appointment";
import { Response } from "../../types/common/result";

export const appointmentApi = appointmentManagementApi.injectEndpoints({
    endpoints: (builder) => ({
        getAppointments: builder.query<Response<Appointment[]>, void>({
            query: () => ({ url: 'appointments' }),
            providesTags: (response) => providesList(getListFromResponse(response), 'Appointment'),
        }),
        addAppointment: builder.mutation<Response<Appointment>, AddAppointmentRequest>({
            query: (appointment) => ({
                url: 'appointments',
                method: 'POST',
                body: appointment,
            }),
            invalidatesTags: [{ type: 'Appointment', id: 'LIST' }],
        })
    }),
})

export const { 
    useGetAppointmentsQuery,
    useAddAppointmentMutation,
} = appointmentApi;

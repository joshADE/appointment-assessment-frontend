import { appointmentManagementApi, providesList, getListFromResponse } from "../api";
import { AddStaffRequest, Staff } from "../../types/staff/staff";
import { Response } from "../../types/common/result";

export const staffApi = appointmentManagementApi.injectEndpoints({
    endpoints: (builder) => ({
        getStaffs: builder.query<Response<Staff[]>, void>({
            query: () => ({ url: 'staffs' }),
            providesTags: (response) => providesList(getListFromResponse(response), 'Staff'),
        }),
        addStaff: builder.mutation<Response<Staff>, AddStaffRequest>({
            query: (staff) => ({
                url: 'staffs',
                method: 'POST',
                body: staff,
            }),
            invalidatesTags: [{ type: 'Staff', id: 'LIST' }, { type: 'Appointment', id: 'LIST' }],
        })
    }),
})

export const { 
    useGetStaffsQuery,
    useAddStaffMutation,
} = staffApi;

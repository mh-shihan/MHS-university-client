import type {
  TAcademicSemester,
  TQueryParam,
  TResponseRedux,
} from '../../../types';
import { baseApi } from '../../api/baseApi';

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllAcademicSemester: builder.query({
      query: args => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((param: TQueryParam) => {
            params.append(param.name, param.value as string);
          });
        }
        return {
          url: '/academic-semesters',
          method: 'GET',
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicSemester: builder.mutation({
      query: data => ({
        url: '/academic-semesters/create-academic-semester',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllAcademicSemesterQuery,
  useAddAcademicSemesterMutation,
} = academicManagementApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // react hook 자동 생성

export const developmentApi = createApi({
    reducerPath: "developmentApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
    endpoints: (builder) => ({
        getDevApi: builder.query({
            query: (menu) => menu,
        }),
    }),
});

export const { useGetDevApiQuery } = developmentApi;

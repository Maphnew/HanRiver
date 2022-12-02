import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { developmentApi } from "../query/developmentQuery";
import sideMenuReducer from "../slices/sideMenuSlice";
import messageReducer from "../slices/message-slice";
import commonCodeReducer from "../slices/common-code-slice";
import metaClassReducer from "../slices/meta-class-slice";
import userReducer from "../slices/user-slice";
import roleReducer from "../slices/role-slice";

export const store = configureStore({
    reducer: {
        sideMenu: sideMenuReducer,
        messageManagement: messageReducer,
        commonCodeManagement: commonCodeReducer,
        metaClassManagement: metaClassReducer,
        userManagement: userReducer,
        roleManagement: roleReducer,
        [developmentApi.reducerPath]: developmentApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(developmentApi.middleware),
});

setupListeners(store.dispatch);

import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Views from "./views";
import AuthViews from "./views/auth-views";

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Views />
            </BrowserRouter>
        </Provider>
    );
};

export default App;

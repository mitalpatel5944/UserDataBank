import React from "react";
import App from "./app";
import { Provider } from 'react-redux'
import { store } from './redux/store'

class Kernel extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

export default Kernel;

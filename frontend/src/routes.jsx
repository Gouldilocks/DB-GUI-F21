import {LoggedIn, LoggedOut} from "./Util/PrivateRoute";
import {
    LoginPage,
    SignUpPage,
    DashboardPage,
    Deliveries,
    OrderPage,
} from "./Pages";

export const routes = [
    { path: "/login", element: <LoggedIn><LoginPage/></LoggedIn> },
    { path: "/signup", element: <LoggedIn><SignUpPage/></LoggedIn> },
    { path: "/", element: <LoggedOut><DashboardPage/></LoggedOut> },
    { path: "/deliveries", element: <LoggedOut><Deliveries/></LoggedOut> },
    { path: "/order", element: <LoggedOut><OrderPage/></LoggedOut> }
]
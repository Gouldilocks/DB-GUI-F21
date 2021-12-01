import {isLogin} from "../Util/utils";
import {getLoggedIn} from "../Api/UserRoutes";

export class UserService {

    hasUser() {
        return (this.getUser() !== null);
    }

    getUser() {
        if(window.user)
            return window.user;
        else
            return null;
    }

    setUser(user) {
        window.user = user;
    }

    loadUser(callback) {
        if (isLogin()) {
            getLoggedIn().then((user) => {
                window.user = user;
                callback(user);
            });
        }
    }

    signOut() {
        window.inventory = undefined;
        window.user = undefined;
        sessionStorage.setItem("userId", null);
    }

}
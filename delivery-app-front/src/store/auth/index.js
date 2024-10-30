import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js"

export default {
    namespaced: true,
    state(){
        return {
            userIsLoggedIn: false,
            userLogin: "",
            authList: [
                {
                    id: 1,
                    msg: "test"
                },
                {
                    id: 2,
                    msg: "test2"
                }
            ]
        }
    },
    mutations,
    actions,
    getters
}
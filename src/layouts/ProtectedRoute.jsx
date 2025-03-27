import { Navigate, Outlet } from "react-router-dom";
import { getUserToken } from "../utilities/helper";

const PrivateCheck = ({ auth }) => {
    const authToken = getUserToken();

    return (
        <>
            {
                (authToken && auth) ? <Outlet /> :
                    (authToken && !auth) ? <Navigate to="/Dashboard" /> :
                        (!authToken && !auth) ? <Outlet /> : <Navigate to="/" />
            }
        </>
    )
}

export default PrivateCheck;
import { BrowserRouter } from "react-router-dom";
import RouteApp from "./RouteApp";

function RouteInit()
{
    return(
        <BrowserRouter>
           <RouteApp/>
        </BrowserRouter>

    )
}
export default RouteInit;
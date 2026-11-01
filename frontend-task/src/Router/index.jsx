import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Home from "../Pages/Home";
import Auth from "../Pages/Auth";
import About from "../Pages/About";
import Tasks from "../Pages/Tasks";
import Protected from "../Layout/Protected";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:'auth',
                element:<Auth/>
            },
            {
                path:'about',
                element:<About/>
            },{
                element:<Protected/>,
                children:[
                    {
                        path:'tasks',
                        element:<Tasks/>
                    }
                ]
            }
        ]
    }
])

export default router
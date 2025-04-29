import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../components/NotFound";
import SingleBlog from "../components/SingleBlog";
import CreateBlog from "../components/CreateBlog";
import EditBlog from "../components/EditBlog";
import UsersList from "../components/UsersList";
import UserPage from "../components/UserPage";
import CreateUser from "../components/CreateUser";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <NotFound />,
        children: [
            { path: "/", element: <App /> },
            { path: "/blogs/:blogId", element: <SingleBlog /> },
            { path: "/create-blog", element: <CreateBlog /> },
            { path: "/edit-blog/:blogId", element: <EditBlog /> },
            { path: "/users", element: <UsersList /> },
            { path: "/users/:userId", element: <UserPage /> },
            { path: "/create-user", element: <CreateUser /> },
        ]
    }
])


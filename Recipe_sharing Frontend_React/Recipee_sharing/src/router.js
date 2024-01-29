

import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Register from "./components/auth/register";
import Login from "./components/auth/Login";
import ProfileList from "./components/ProfileList";
import Recipe from "./components/Recipe"
import CreateRecipe from "./components/CreateRecipe";


const router = createBrowserRouter([
    { path: '/', element: <App/> },
    { path: '/login', element: <Login/> },
    { path: '/register', element:<Register/>},
    { path: '/profiles', element:<ProfileList/>},
    { path: '/recipe-details/:recipeId', element: <Recipe/> },
    { path: '/recipe', element: <CreateRecipe/> },
]);

export default router;
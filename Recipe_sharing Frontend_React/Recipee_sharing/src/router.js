import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Register from "./components/auth/register";
import Login from "./components/auth/Login";
import RecipeList from "./components/Recipe/RecipeList";
import Profile from "./components/Profile/Profile";
import RecipeForm from "./components/Recipe/RecipeForm";
import RecipeEdit from "./components/Recipe/RecipeEdit";
import RecipeRatingComponent from "./components/Recipe/RecipeRatingComponent";
import RecipeTagComponent from "./components/Recipe/RecipeTagComponent";
import UpdateProfileComponent from "./components/Profile/UpdateProfile"
import ActivityFeed from "./components/ActivityFeed";
import AdminDashboard from "./components/AdminDashboard"
import CreateProfile from "./components/Profile/CreateProfile";

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/recipe/list', element: <RecipeList /> },
  { path: '/recipe/:id/edit', element: <RecipeEdit /> },
  { path: '/recipe/create', element: <RecipeForm /> },
  { path: '/recipe/rating/:id', element: <RecipeRatingComponent /> },
  { path: '/recipe-tag/:id', element: <RecipeTagComponent /> },
  { path: '/profiles', element: <Profile /> },
  { path: '/create/profiles', element: <CreateProfile /> },
  { path: '/update-profile', element: <UpdateProfileComponent /> },
  { path: '/activity', element: <ActivityFeed /> },
  { path: '/admin', element: <AdminDashboard /> },
]);

export default router;

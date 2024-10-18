import { createBrowserRouter, Navigate } from "react-router-dom"
import DefaultPage from "./Project/DefaultPage"
import MainPage from "./Modules/Main"
import Person from "./Modules/Person"
import Company from "./Modules/Company"
import Violation from "./Modules/Violation"
import Event from "./Modules/Event"
import OwnerWrapper from "./Modules/Person/OwnerMultiForm/OwnerWrapper"
import { OwnerMultiForm } from "./Modules/Person/OwnerMultiForm"
import { EventPage } from "./Modules/Event/EventForm"
import { Events } from "./Modules/Event/EventView"
import { ViolationPage } from "./Modules/Violation/ViolationForm"
import Login from "./Project/LoginPage/Login"
import Admin from "./Modules/Admin"
import LoginPage from "./Project/LoginPage"
import PersonView from "./Modules/Person/PersonView"
import CompanyView from "./Modules/Company/CompanyView"
import PersonMultiForm from "./Modules/Person/PersonMultiForm"
import CompanyMultiForm from "./Modules/Company/CompanyMultiForm"


const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultPage />,
        children: [
            {
                path: "/",
				element: <Navigate to="/main" />,
            },
            {
                path: "/main",
                element: <MainPage />
            },
            {
                path: "/persons",
				element: <Person />,
            },
            {
                path: "/persons/:id",
                element: <PersonMultiForm />
            },
            {
                path: "/persons/add",
                element: <PersonMultiForm />
            },
            {
                path: "/persons/view/:id",
                element: <PersonView />,
            },
            {
                path: "/companies",
				element: <Company />,
            },
            {
                path: "/companies/view/:id",
                element: <CompanyView />
            },
            {
                path: "/companies/:id",
                element: <CompanyMultiForm />
            },
            {
                path: "/companies/add",
                element: <CompanyMultiForm />
            },
            {
                path: "/companies/:id/owner/add",
				element: <OwnerMultiForm/>
            },
            {
                path: "/companies/:id/owner/:id",
				element: <OwnerWrapper/>
            },
            {
                path: "/companies/:id/director/add",
				element: <OwnerMultiForm/>
            },
            {
                path: "/companies/:id/director/:id",
				element: <OwnerWrapper/>
            },
            {
                path: "/companies/:id/affiliated/add",
				element: <OwnerMultiForm/>
            },
            {
                path: "/companies/:id/affiliated/:id",
				element: <OwnerMultiForm/>
            },
            {
                path: "/events",
				element: <Event />,
            },
            {
                path: "/events/add",
                element: <EventPage />
            },
            {
                path: "/events/:id",
                element: <EventPage />
            },
            {
                path: "/events/view/:id",
                element: <Events />
            },
            {
                path: "/violations",
				element: <Violation />,
            },
            {
                path: "/violations/add",
				element: <ViolationPage />,
            },
            {
                path: "/admin/users",
                element: <Admin />
            }
        ]
    },
    {
        path: "/",
        element: <LoginPage />,
        children: [
            {
                path: "/login",
                element: <Login/>
            }
        ]
    },
])
export default router
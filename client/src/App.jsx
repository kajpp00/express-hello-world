import './App.css';
import { Form, Route, Link, createBrowserRouter, createRoutesFromElements, RouterProvider, Outlet } from 'react-router-dom'

import Home, { loader as homeLoader, action as formAction } from './components/Home'
// import User, { loader as userLoader, action as userAction } from './components/User'
// import Create, { action as createAction } from './components/Create'
// import ViewData, {loader as viewLoader} from './components/ViewData'
// import { action as deleteAction } from './components/Delete'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Nav />}>
    <Route index element={<Home />} loader={homeLoader} action={formAction}/>
    {/* <Route path="/view" element={<ViewData/>} loader={viewLoader}/> */}
    {/* <Route path="/user/:id" element={<User />} action={userAction} loader={userLoader} /> */}
    {/* <Route path="/create" element={<Create />} action={createAction} /> */}
    {/* <Route path="/user/:id/:index" action={deleteAction} /> */}
  </Route>
))


function App() {
  return (
    <RouterProvider router={router} />
  );
}

function Nav() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* <li><Link to="/create">Create User</Link></li> */}
          {/* <li><Link to="/view">View Data</Link></li> */}
        </ul>
      </nav>
      <Outlet />
    </>
  )
}


export default App;

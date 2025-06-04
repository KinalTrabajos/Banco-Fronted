import {useRoutes} from "react-router-dom";
import routes from "./routes.jsx"

export const App = () => {

  let element = useRoutes(routes);

  return (
    <>
      {element}

    </>
  )
}

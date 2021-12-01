import {useRoutes, BrowserRouter} from 'react-router-dom';
import './App.scss';
import {routes} from "./routes";

const Routing = () => {
	return useRoutes(routes);
}

function App () {
  return (
	<>
		<BrowserRouter>
			<Routing/>
		</BrowserRouter>
	</>
  );
}

export default App;

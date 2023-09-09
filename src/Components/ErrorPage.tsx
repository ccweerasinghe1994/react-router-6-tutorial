import { useRouteError,isRouteErrorResponse } from 'react-router-dom';
import  {ReactNode} from "react";
const ErrorPage = () => {
	const error = useRouteError();
	let Errormessage:ReactNode;
	if(isRouteErrorResponse(error)){
		if (error.status===404){
			const {message,statusText} = error;
			Errormessage = <i>{statusText || message}</i>
		}
	}
	console.error(error);

	return (
		<div id="error-page">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				{Errormessage}
			</p>
		</div>
	);
};

export default ErrorPage;

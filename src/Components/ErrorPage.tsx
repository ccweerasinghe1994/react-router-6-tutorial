import {useRouteError, isRouteErrorResponse} from 'react-router-dom';
import {ReactNode} from "react";

const ErrorPage = () => {
    const errorObject = useRouteError();
    let Errormessage: ReactNode;
    if (isRouteErrorResponse(errorObject)) {
        console.error(errorObject);
        if (errorObject.status === 404) {
            const {statusText, error} = errorObject;
            if (error) {
                Errormessage = <i>{statusText || (error.message)}</i>
            }
            Errormessage = <i>{'some thing went wrong'}</i>
        }
    }


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

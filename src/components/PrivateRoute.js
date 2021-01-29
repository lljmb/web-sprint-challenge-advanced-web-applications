// necessary imports
import React from 'react';
import { Route, Redirect } from 'react-router-dom';


//Task List:
//1. Build a PrivateRoute component that redirects if user is not logged in
const PrivateRoute = ({component: Component, ...rest}) => {
    return(
        // render the entire route with the rest of its components
        <Route {...rest}
        render={(props) => {
            // see if token exists
            if(localStorage.getItem('token')){
                // if it does, return the component passed into the app with all of its props
                return <Component {...props} />
            } else {
                // if the token does not exist, redirect to the login page
                return <Redirect to='/login'/>
            }
        }
        }/>
    )
}

export default PrivateRoute





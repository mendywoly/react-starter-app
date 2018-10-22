import React from 'react'
import Adapter from '../Adapter'
import { Redirect, Route } from 'react-router-dom'
import SideBar from '../Menu/SideBar'

const PrivateRoute = ({ component: Component, ...rest }) => {

    // Add your own authentication on the below line.
    const isLoggedIn = Adapter.isLoggedIn()
  
    return (
      <Route
        {...rest}
        render={props =>
          isLoggedIn ? (
                <React.Fragment>
                    <div className='grid'>
                        <div className="side-bar"> 
                            <SideBar />
                        </div>
                        <div className="main-content">
                            <Component {...props} />
                        </div>
                    </div>
                </React.Fragment>
          ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          )
        }
      />
    )
  }
  
  export default PrivateRoute
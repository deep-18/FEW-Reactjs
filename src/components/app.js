import '../utils/fonts/fontstyle.css';
import '../utils/util.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { useState } from 'react';
import '../utils/masonry';
import { AuthProvider } from '../context/AuthContext';

import All from './categories/all';
import Chair from './categories/chair';
import Sofa from './categories/sofa';
import Bed from './categories/bed';
import Cabinet from './categories/cabinet';
import Table from './categories/table'; 
import Cart from './cart';
import Login from './login';
import Register from './register';
import ProductInfo from './productinfo';
import UpdateProfile from './updateprofile';
import Main from './main';
import Orders from './orders';
import Box from './home';
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';

const App = () => {
    // const [color, setColor] = useState('#683E2D');
    return (
        <div className="app">
            <Router>
                <AuthProvider>
                    <Route render={({location}) => (
                        <TransitionGroup>
                            <CSSTransition
                            key={location.key}
                            >
                                <Switch location={location}>
                                    <Route exact path="/" component={Main} />
                                    <Route exact path="/shop-all" component={All} />
                                    <Route exact path="/chair" component={Chair} />
                                    <Route exact path="/sofa" component={Sofa}/>
                                    <Route exact path="/bed" component={Bed}/>
                                    <Route exact path="/cabinet" component={Cabinet}/>
                                    <Route exact path="/table" component={Table}/>
                                    <Route exact path="/cart" component={Cart}/>
                                    <Route exact path="/login" component={Login}/>
                                    <Route exact path="/register" component={Register}/>
                                    <Route exact path="/productinfo" component={ProductInfo}/>
                                    <Route exact path="/updateprofile" component={UpdateProfile}/>
                                    <Route exact path="/orders" component={Orders}/>
                                    <Route exact path="/home" component={Box}/>
                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>                 
                    )} />
                </AuthProvider>    
            </Router> 
        </div>
    )
}
export default App;
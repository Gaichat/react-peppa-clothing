import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import { Switch, Route } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import HatsPage from "./pages/hatspage/hatspage.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.util"

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { currentUser: null }
    }

    unsubscribeFroAuth = null;

    componentDidMount() {
        //async because request to our firestore
        /*
        Whenever we call the onAuthStateChanged() or onSnapshot() methods from our auth  library or referenceObject,
         we get back a function that lets us unsubscribe from the listener we just instantiated.
         */
        this.unsubscribeFroAuth = auth.onAuthStateChanged( async userAuth => {
               // this.setState( {currentUser: user}) ;
                //createUserProfileDocument(user);
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                //
                userRef.onSnapshot( snapshot => {
                    this.setState({
                        currentUser: ({
                            id: snapshot.id,
                            ...snapshot.data()
                        })
                    }, () => console.log(this.state)); ///setState is async we need to use a callback
                });
            }else{
                this.setState({currentUser: userAuth});
            }
            }
        );
    }

    componentWillUnmount() {
        /*
        Calling the unsubscribe function when the component is about to unmount is the best way to
        make sure we don't get any memory leaks in our application related to listeners still being open
         even if the component that cares about the listener is no longer on the page.
         */
        this.unsubscribeFroAuth = null;
    }

    render() {
        return (
            <div>
                <Header currentUser={this.state.currentUser}/>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route exact path='/hats' component={HatsPage}/>
                    <Route exact path='/shop' component={ShopPage}/>
                    <Route exact path='/signin' component={SignInAndSignUpPage}/>
                </Switch>
            </div>
        );
    }
}

export default App;

import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import { Switch, Route, Redirect } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import HatsPage from "./pages/hatspage/hatspage.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.util"
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.action';

class App extends React.Component {

    unsubscribeFroAuth = null;

    componentDidMount() {
        const {setCurrentUser} = this.props;
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
                    setCurrentUser({
                            id: snapshot.id,
                            ...snapshot.data()
                    });
                });
            }else{
                setCurrentUser(userAuth);
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
                <Header/>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route exact path='/hats' component={HatsPage}/>
                    <Route exact path='/shop' component={ShopPage}/>
                    <Route exact path='/signin' render={() => this.props.currentUser? (<Redirect to='/'/>): <SignInAndSignUpPage/>}/>
                </Switch>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});
//from the state we destructu our userReducer
const mapStateToPops = ({user}) => ({
    currentUser: user.currentUser
});

export default connect(mapStateToPops, mapDispatchToProps)(App);

const {
    Router,
    Route, Redirect
    } = ReactRouter;

//const routes = (
//    <Route name="root" handler={App} path="/">
//        <Route name="todoList" path="/lists/:listId" handler={TodoListPage}/>
//        <Route name="join" path="/join" handler={AuthJoinPage}/>
//        <Route name="signin" path="/signin" handler={AuthSignInPage}/>
//        <DefaultRoute handler={AppLoading}/>
//        <NotFoundRoute handler={AppNotFound}/>
//    </Route>
//);


router = (
    <Router history={ReactRouterHistory}>


        <Route component={App} path="/">
            <Route path="login" component={Signin}/>

            <Redirect from="customization" to="/customization/colors"/>
            <Route path="customization" component={Customization}>
                <Route path="colors" component={ColorsPage}/>
                <Route path="themes" component={Themes}/>
                <Route path="inline-styles" component={InlineStyles}/>
            </Route>
        </Route>
    </Router>
);
var component;
Meteor.startup(function () {
    injectTapEventPlugin();
    //router.run(function (Handler, state) {
    //    React.render(<Handler/>, document.getElementById("app-container"));
    //});


    // Finally we render a `Router` component with some `Route`s, it'll do all
    // the fancy routing stuff for us.

    component =
        React.render(router, document.body);
});

var mySubmitFunc = function (error, state) {

    if (!error) {
        if (state === "signIn") {
            // Successfully logged in
            // ...
            //console.log(component);
            component.transitionTo('/');
        }
        if (state === "signUp") {
            // Successfully registered
            // ...
            router.transitionTo('/');
        }
    }
};

AccountsTemplates.configure({
    onSubmitHook: mySubmitFunc
});

//<Route path="join" component={Inbox}/>

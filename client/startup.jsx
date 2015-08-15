const {
    Router,
    Route
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

Meteor.startup(function () {
    injectTapEventPlugin();
    //router.run(function (Handler, state) {
    //    React.render(<Handler/>, document.getElementById("app-container"));
    //});


    // Finally we render a `Router` component with some `Route`s, it'll do all
    // the fancy routing stuff for us.
    React.render((
        <Router history={ReactRouterHistory}>
            <Route path="/" component={App}>
                <Route path="login" component={Signin}/>
            </Route>
        </Router>
    ), document.body);
});

//<Route path="join" component={Inbox}/>

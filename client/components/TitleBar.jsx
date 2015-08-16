const {Navigation, Router} = ReactRouter;
const {FlatButton, AppBar}  = mui;
const ThemeManager = new mui.Styles.ThemeManager();


TitleBar = React.createClass({
    mixins: [ReactMeteorData, Navigation],
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    getChildContext: function () {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },
    getMeteorData() {
        return {
            currentUser: Meteor.user()
        }
    },
    handleClick() {
        "use strict";
        if (!this.data.currentUser) {
            this.transitionTo("/login");
        } else {
            AccountsTemplates.logout();
            this.transitionTo("/");
        }
    },
    render() {
        "use strict";
        var label = "Sign In";
        if (this.data.currentUser) {
            //console.dir(this.data.currentUser);
            label = this.data.currentUser.emails[0];
        }

        return (
            <AppBar
                title="Edwo"
                iconElementRight={
                    //<SignInButton />
                    <FlatButton label={label} onClick={this.handleClick} />
                    }/>
        )
    }
});

var mySubmitFunc = function(error, state){

    if (!error) {
        if (state === "signIn") {
            // Successfully logged in
            // ...
            router.transitionTo('/');
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

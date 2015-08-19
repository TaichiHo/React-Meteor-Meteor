const {Navigation, Router} = ReactRouter;
const {FlatButton, Avatar, Toolbar, ToolbarGroup, ToolbarTitle, IconButton, FontIcon, DropDownMenu, AppBar}  = mui;
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

        var itemOnRight = <FlatButton label={label} onClick={this.handleClick}/>;
        if (this.data.currentUser) {
            itemOnRight =
                <ToolbarGroup key={1} float="right">
                    <IconButton touch={true}>
                        <Avatar size={30}>
                            A
                        </Avatar>
                    </IconButton>
                </ToolbarGroup>;
        }


        return (
            <div>
                <Toolbar title="Edward">
                    <ToolbarGroup key={0} float="left">


                        <ToolbarTitle text="Edwo"/>
                    </ToolbarGroup>
                    <ToolbarGroup key={2} float="left">
                        <IconButton iconClassName="material-icons md-light" tooltipPosition="bottom-center"
                                    tooltip="Sky">menu</IconButton>
                    </ToolbarGroup>
                    {itemOnRight}
                </Toolbar>
            </div>
        )
    }
});
//<ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
//    htmlFor="demo-menu-lower-right">
//    <li className="mdl-menu__item">Some Action</li>
//    <li className="mdl-menu__item">Another Action</li>
//    <li disabled className="mdl-menu__item">Disabled Action</li>
//    <li className="mdl-menu__item">Yet Another Action</li>
//</ul>
var mySubmitFunc = function (error, state) {

    if (!error) {
        if (state === "signIn") {
            // Successfully logged in
            // ...
            console.log(router);
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

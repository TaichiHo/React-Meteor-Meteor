const {Navigation, Router} = ReactRouter;
const {FlatButton, Avatar, Toolbar, ToolbarGroup, ToolbarTitle, IconButton, FontIcon, DropDownMenu, AppBar}  = mui;

const ThemeManager = new mui.Styles.ThemeManager();

//const {IconMenu, MenuItem, MenuDivider} = mui.menus.icon-menu;
const {IconMenu} = mui;

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
    getInitialState() {
        "use strict";
        return {
            iconMenuValue: 0
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
    _handleIconMenuChange(e, value) {
        "use strict";
        this.setState({
            iconMenuValue: 0
        });
        if (value == "signout") {
            AccountsTemplates.logout();
        }
    },
    render() {
        "use strict";
        var label = "Sign In";
        if (this.data.currentUser) {
            //console.dir(this.data.currentUser);
            label = this.data.currentUser.emails[0];
        }

        var avatarIcon =
            <IconButton touch={true}>
                <Avatar size={30}>
                    A
                </Avatar>
            </IconButton>;

        var itemOnRight = <FlatButton label={label} onClick={this.handleClick}/>;
        if (this.data.currentUser) {
            itemOnRight =
                <IconMenu iconButtonElement={avatarIcon}
                          onChange={this._handleIconMenuChange}
                          value={this.state.iconMenuValue}
                          openDirection="bottom-left">
                    <MenuItem value="profile" primaryText="Profile"/>
                    <MenuItem value="settings" primaryText="Settings"/>
                    <MenuItem value="help" primaryText="Help"/>
                    <MenuItem value="signout" primaryText="Sign Out"/>
                </IconMenu>
                //<IconMenu iconButtonElement={avatarIcon}
                //          onChange={this._handleIconMenuChange}
                //          >
                //    <MenuItem index={0} primaryText="Profile"/>
                //    <MenuItem index={1} primaryText="Settings"/>
                //    <MenuItem index={2} primaryText="Help"/>
                //    <MenuDivider />
                //    <MenuItem index={3} primaryText="Sign Out"/>
                //</IconMenu>
            ;
        }


        return (
            <div>
                <AppBar title="Edward" iconElementRight={itemOnRight}
                        onLeftIconButtonTouchTap={this.props.onLeftIconButtonTouchTap}
                        style={{position: 'fixed', top: 0}}>

                </AppBar>
            </div>
        )
    }
});
//<ul className=" mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
//    htmlFor=" demo-menu-lower-right">
//    <li className=" mdl-menu__item">Some Action</li>
//    <li className=" mdl-menu__item">Another Action</li>
//    <li disabled className=" mdl-menu__item">Disabled Action</li>
//    <li className=" mdl-menu__item">Yet Another Action</li>
//</ul>


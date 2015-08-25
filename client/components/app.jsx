const {
    RaisedButton, AppBar, IconButton, FlatButton, FontIcon, AppCanvas, Styles,
    } = mui;

let { Colors, Spacing, Typography } = Styles;


const ThemeManager = new mui.Styles.ThemeManager();

App = React.createClass({
    mixins: [ReactMeteorData],
    getInitialState: function () {
        return {
            selectedPlayerId: null
        };
    },
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
            players: Players.find({}, {sort: {score: -1, name: 1}}).fetch(),
            selectedPlayer: Players.findOne(this.state.selectedPlayerId),
            currentUser: Meteor.user()
        }
    },
    selectPlayer(playerId) {
        this.setState({
            selectedPlayerId: playerId
        });
    },
    addPointsToPlayer(playerId) {
        Players.update(playerId, {$inc: {score: 5}});
    },
    render() {
        let styles = this.getStyles();
        let bottomBar;
        if (this.state.selectedPlayerId) {
            bottomBar = (
                <div className="details">
                    <div className="name">{this.data.selectedPlayer.name}</div>
                    <RaisedButton
                        onClick={this.addPointsToPlayer.bind(
              this, this.state.selectedPlayerId)}
                        style={{float: "right"}}
                        label="Add 5 points"
                        primary={true}/>
                </div>
            )
        } else {
            bottomBar = <div className="message">Click a player to select</div>;
        }

        // <IconButton iconClassName="material-icons">clear</IconButton>
        return (

            <AppCanvas>
                <TitleBar
                          zDepth={0} onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}/>


                {this.props.children}


                <AppLeftNav ref="leftNav"/>

                <FullWidthSection style={styles.footer}>
                    <p style={styles.p}>
                        A simple example integrating React, Meteor, Material_UI. Created By Taichi Ho.
                        Great thanks to <a style={styles.a} href="http://call-em-all.com">Call-Em-All</a> and their awesome <a style={styles.a}
                                             href="https://github.com/callemall/material-ui/graphs/contributors">contributors</a>.
                    </p>
                </FullWidthSection>
            </AppCanvas>
        );


//            <div className="outer">
//        <div className="logo"></div>
//        <h1 className="title">Leaderboard</h1>
//
//        <div className="subtitle">Select a scientist to give them points</div>
//        <Leaderboard players={this.data.players}
//selectedPlayerId={this.state.selectedPlayerId}
//onPlayerSelected={this.selectPlayer}/>
//{ bottomBar }
//</div>
    },

    _onLeftIconButtonTouchTap() {
        this.refs.leftNav.toggle();
    },
    getStyles() {
        let darkWhite = Colors.darkWhite;
        return {
            footer: {
                backgroundColor: Colors.grey900,
                textAlign: 'center'
            },
            a: {
                color: darkWhite
            },
            p: {
                margin: '0 auto',
                padding: 0,
                color: Colors.lightWhite,
                maxWidth: 335
            },
            github: {
                position: 'fixed',
                right: Spacing.desktopGutter / 2,
                top: 8,
                zIndex: 5,
                color: 'white'
            },
            iconButton: {
                color: darkWhite
            },
        };
    }
});

const {Card, CardText}  = mui;


const ThemeManager = new mui.Styles.ThemeManager();


Signin = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    getChildContext: function () {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },
    componentDidMount() {
        // Use Meteor Blaze to render login buttons
        this.view = Blaze.render(Template.atForm,
            React.findDOMNode(this.refs.container));
    },
    componentWillUnmount() {
        // Clean up Blaze view
        Blaze.remove(this.view);
    },
    render() {
        "use strict";
        return (
            <Card className="outer">
                <CardText ref="container">
                </CardText>
            </Card>
        );
    }
});
//
//AccountsUIWrapper = React.createClass({
//
//    render() {
//        // Just render a placeholder container that will be filled in
//        return
//    }
//});
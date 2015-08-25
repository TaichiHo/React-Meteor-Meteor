const {Card, CardText, Styles, Mixins}  = mui;

let { Spacing, Colors } = Styles;
let { StyleResizable, StylePropable } = Mixins;
const ThemeManager = new mui.Styles.ThemeManager();


Signin = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    mixins: [StyleResizable, StylePropable],

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
        let styles = this.getStyles();
        return (
            <div style={styles.root}>
                <Card className="outer">
                    <CardText ref="container">
                    </CardText>
                </Card>
            </div>
        );
    },
    getStyles(){
        let subNavWidth = Spacing.desktopKeylineIncrement * 3 + 'px';
        let styles = {
            root: {
                paddingTop: Spacing.desktopKeylineIncrement + 'px'
            },
            rootWhenMedium: {
                position: 'relative'
            },
            secondaryNav: {
                borderBottom: 'solid 1px ' + Colors.grey300,
                borderTop: 'solid 1px ' + Colors.grey300,
                //overflow: 'hidden'
            },
            content: {
                boxSizing: 'border-box',
                padding: Spacing.desktopGutter + 'px',
                maxWidth: (Spacing.desktopKeylineIncrement * 14) + 'px'
            },
            secondaryNavWhenMedium: {
                borderTop: 'none',
                borderBottom: 'none',
                position: 'absolute',
                top: '64px',
                width: subNavWidth
            },
            contentWhenMedium: {
                marginLeft: subNavWidth,
                borderLeft: 'solid 1px ' + Colors.grey300,
                minHeight: '800px'
            }
        };

        if (this.isDeviceSize(StyleResizable.statics.Sizes.MEDIUM) ||
            this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
            styles.root = this.mergeStyles(styles.root, styles.rootWhenMedium);
            styles.secondaryNav = this.mergeStyles(styles.secondaryNav, styles.secondaryNavWhenMedium);
            styles.content = this.mergeStyles(styles.content, styles.contentWhenMedium);
        }

        return styles;
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
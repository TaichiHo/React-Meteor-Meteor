let { Menu, Mixins, Styles, Tabs, Tab, DropDownMenu} = mui;

let { Spacing, Colors } = Styles;
let { StyleResizable, StylePropable } = Mixins;
const ThemeManager = new mui.Styles.ThemeManager();

PageWithNav = React.createClass({

    mixins: [StyleResizable, StylePropable],

    contextTypes: {
        router: React.PropTypes.func
    },

    propTypes: {
        menuItems: React.PropTypes.array
    },

    getChildContext: function () {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },
    childContextTypes: {
        muiTheme: React.PropTypes.object
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
    },
    _getTabs() {
        "use strict";
        return this.props.menuItems.map(function (child) {
            console.log(child.text + "  " + child.route);
            return (
                <Tab
                    label={child.text}
                    route={child.route}/>
            );
        })
    },
    render() {
        let styles = this.getStyles();
        //
        var menu =
            <DropDownMenu autoWidth={false} style={{width:'100%'}} menuItems={this.props.menuItems}/>;
        if (this.isDeviceSize(StyleResizable.statics.Sizes.MEDIUM) ||
            this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
            menu = <Menu
                ref="menuItems"
                zDepth={0}
                menuItems={this.props.menuItems}
                selectedIndex={this._getSelectedIndex()}
                onItemTap={this._onMenuItemClick}/>;
        }

        // style={styles.secondaryNav}
        return (
            <div style={styles.root}>
                <div style={styles.secondaryNav}>
                    {menu}
                </div>
                <div style={styles.content}>
                    {this.props.child}
                </div>

            </div>
        );
    },

    _getSelectedIndex() {
        let menuItems = this.props.menuItems;
        let currentItem;

        for (let i = menuItems.length - 1; i >= 0; i--) {
            currentItem = menuItems[i];
            if (currentItem.route && this.context.router.isActive(currentItem.route)) return i;
        }
    },

    _onMenuItemClick(e, index, item) {
        this.context.router.transitionTo(item.route);
    }

});

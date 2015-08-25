Customization = React.createClass({

    render() {
        let menuItems = [
            {route: '/customization/themes', text: 'Themes'},
            {route: '/customization/inline-styles', text: 'Inline Styles'},
            {route: '/customization/colors', text: 'Colors'},
        ];

        return (
            <div>
                <PageWithNav menuItems={menuItems} child={this.props.children}/>

            </div>
        );
    }
});
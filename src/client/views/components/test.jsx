import React from 'react';

export class HelloPrinter extends React.Component {

    get fullName () {
        return `${this.props.firstname} ${this.props.surname}`;
    }

    render () {
        return <div>Hello, {this.fullName}</div>;
    }

}

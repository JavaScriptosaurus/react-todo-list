import React from 'react';

export default React.createClass({

    getInitialState: function () {
        return {
            text: ''
        };
    },

    handleSubmit: function (e) {
        e.preventDefault();
        /*
         * TODO: Handle empty.
         */
        this.props.onSubmit(this.state.text);
        this.setState({text: ''});
    },

    onChange: function (e) {
        this.setState({text: e.target.value});
    },

    render: function () {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <span>Add item</span>
                    <input onChange={this.onChange} value={this.state.text} />
                </label>
                <button>+</button>
            </form>
        );
    }

});

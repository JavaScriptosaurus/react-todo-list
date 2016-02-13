import React from 'react';

export default React.createClass({

    getInitialState: function () {
        return {
            title: '',
            description: '',
            dueDate: new Date()
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
            <form className='insert-item' onSubmit={this.handleSubmit}>
                <input onChange={this.onChange} value={this.state.title} />
                <input onChange={this.onChange} value={this.state.description} />
                <input onChange={this.onChange} value={this.state.dueDate} />
                <button aria-label='Add list item'>
                    <i className='fa fa-2x fa-plus'></i>
                </button>
            </form>
        );
    }

});

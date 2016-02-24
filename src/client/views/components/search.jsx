import React from 'react';

export default React.createClass({

    handleSearch: function (event) {
        this.props.onSearch(event.target.value);
    },

    render: function () {
        return (
            <label className='search'>
                <div>
                    Search to-do items
                    <i className='fa fa-search'></i>
                </div>
                <input
                    disabled={this.props.inEdit}
                    type='search'
                    onChange={this.handleSearch}
                    value={this.props.searchText}
                    placeholder='Search by name, description, or date.' />
            </label>
        );
    }

});

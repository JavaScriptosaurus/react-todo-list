import React from 'react';

import InsertItem from './components/insertItem.jsx';
import ItemList from './components/itemList.jsx';

/**
 * TODO:
 * - ARIA / Keyboard
 * - React Animations
 * - Move data to model, move away from state.
 */

export default React.createClass({

    getInitialState: function () {
        const items = JSON.parse(localStorage.getItem('todoItems'));
        return {
            items: items || ['Item', 'Another Item']
        };
    },

    handleSubmit: function (todoItem) {
        const items = this.state.items;
        items.push(todoItem);
        this.updateState(items);
    },

    handleRemove: function (index) {
        const items = this.state.items;
        items.splice(index, 1);
        this.updateState(items);
    },

    updateState: function (items) {
        this.setState({items});
        localStorage.setItem('todoItems', JSON.stringify(this.state.items));
    },

    render: function () {
        return (
            <div>
                <h1>Todo App</h1>
                <ItemList onRemove={this.handleRemove} items={this.state.items} />
                <InsertItem onSubmit={this.handleSubmit} />
            </div>
        );
    }

});

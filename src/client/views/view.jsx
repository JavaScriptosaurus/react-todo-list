import React from 'react';

import ItemList from './components/itemList.jsx';
import InsertItem from './components/insertItem.jsx';

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
            items: items && items.map(this.parseDates) || [{
                description: `This is where you would write details of your
                    upcoming event.`,
                dueDate: new Date('2016-09-16 17:30'),
                title: 'Example item'
            }, {
                description: `You can write whatever you want, as long as it
                    helps you to reach your dreams 💖`,
                dueDate: new Date('2016-12-31 11:59'),
                title: 'A second example'
            }],
            inEdit: false
        };
    },

    insertItem: function () {
        const items = this.state.items;
        items.push({
            description: `New item description.`,
            dueDate: new Date(),
            title: 'New item heading'
        });
        this.updateState({
            inEdit: items.length - 1},
            items
        );
    },

    /**
     * Restores JavaScript dates from strings.
     * @param {object} item
     * @returns {object} item
     */
    parseDates: item => {
        item.dueDate = new Date(item.dueDate);
        return item;
    },

    handleDelete: function (index) {
        const items = this.state.items;
        items.splice(index, 1);
        this.updateState({items});
    },

    handleEdit: function (index) {
        this.setState({inEdit: index});
    },

    handleUpdate: function (index, todoItem) {
        const items = this.state.items;
        items[index] = todoItem;
        this.updateState({items});
    },

    updateState: function (stateToMerge) {
        this.setState(stateToMerge);
        localStorage.setItem('todoItems', JSON.stringify(this.state.items));
    },

    render: function () {
        return (
            <div className='todo-app'>
                <h1>React To-Do App</h1>
                <ItemList
                    inEdit={this.state.inEdit}
                    items={this.state.items}
                    handleEdit={this.handleEdit}
                    onDelete={this.handleDelete}
                    onUpdate={this.handleUpdate} />
                <button type='button' onClick={this.insertItem}>Add item...</button>            </div>
        );
    }

});

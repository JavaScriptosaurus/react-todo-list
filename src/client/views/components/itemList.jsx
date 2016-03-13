import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import TodoItem from './todoItem.jsx';

export default React.createClass({

    checkSearch: function (itemText) {
        return itemText.toLowerCase()
            .match(this.props.searchText.toLowerCase());
    },

    render: function () {
        const inEdit = this.props.inEdit;
        const items = this.props.items.map(({description, dueDate, uuid, title, addingNewItem}, index) => {

            const isEditing = inEdit === index;

            /*
             * Check if the item matches our search string, returns nothing if
             * item doesn't match search. Items in edit are excluded.
             */
            if (!this.checkSearch(`${title} ${description} ${dueDate.toDateString()}`) && !isEditing) {
                return;
            }

            const isDisabled = inEdit !== false && inEdit !== index;

            return (
                <TodoItem
                    key={uuid}
                    uuid={uuid}
                    description={description}
                    dueDate={dueDate}
                    index={index}
                    inEdit={isEditing}
                    isDisabled={isDisabled}
                    onDelete={this.props.onDelete}
                    onEdit={this.props.handleEdit}
                    onUpdate={this.props.onUpdate}
                    title={title}
                    addingNewItem={addingNewItem} />
            );
        });
        return (
                <ReactCSSTransitionGroup
                    className='item-list'
                    component='ol'
                    transitionName='item'
                    transitionLeaveTimeout={300}
                    transitionEnterTimeout={350}>
                    {items}
                </ReactCSSTransitionGroup>
        );
    }

});

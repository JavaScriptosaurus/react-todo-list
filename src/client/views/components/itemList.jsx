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
        const items = this.props.items.map((item, index) => {
            const {description, dueDate, uuid, title, isNewItem} = item;
            const isEditing = inEdit === index;

            /*
             * Check if the item matches our search string, returns nothing if
             * item doesn't match search. Items in edit are excluded.
             */
            const searchMatch = this.checkSearch(`${title} ${description} ` +
                `${dueDate.toDateString()}`);
            if (!searchMatch && !isEditing) {
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
                    isNewItem={isNewItem} />
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

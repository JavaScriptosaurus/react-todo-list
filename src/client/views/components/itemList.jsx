import React from 'react';

import TodoItem from './TodoItem.jsx';

export default React.createClass({

    render: function () {
        const inEdit = this.props.inEdit;
        const items = this.props.items.map(({description, dueDate, title}, index) => {
            const isDisabled = inEdit !== false && inEdit !== index;
            const isEditing = inEdit === index;
            return (
                <TodoItem
                    key={index}
                    description={description}
                    dueDate={dueDate}
                    index={index}
                    inEdit={isEditing}
                    isDisabled={isDisabled}
                    onDelete={this.props.onDelete}
                    onEdit={this.props.handleEdit}
                    onUpdate={this.props.onUpdate}
                    title={title} />
            );
        });
        return (
            <ol className='item-list'>
                {items}
            </ol>
        );
    }

});

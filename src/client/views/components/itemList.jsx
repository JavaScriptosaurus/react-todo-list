import React from 'react';

export default React.createClass({

    onClick: function (index) {
        this.props.onRemove(index);
    },

    render: function () {
        const items = this.props.items.map((item, index) => {
            return (
                <li key={index}>
                    {item}
                    <button onClick={this.onClick.bind(this, index)} type="button">X</button>
                </li>
            );
        });
        return (
            <ol>
                {items}
            </ol>
        );
    }

});

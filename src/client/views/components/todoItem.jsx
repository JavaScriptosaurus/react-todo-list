import React from 'react';
import ReactDOM from 'react-dom';
import setCursorToEnd from '../../utils/contentEditableCursorToEnd.js';

export default React.createClass({

    getInitialState: function () {
        const {description, dueDate, uuid, title} = this.props;
        return {
            inEdit: this.props.inEdit,
            description,
            dueDate: dueDate.toDateString(),
            uuid,
            title
        };
    },

    componentDidMount: function () {
        if (this.state.inEdit) {
            this.focusOnHeading();
        }

        if (this.props.isNewItem) {
            ReactDOM.findDOMNode(this)
                .addEventListener('transitionend', this.scrollToElement);
        }
    },

    componentDidUpdate: function () {
        if (this.state.inEdit && this.state.awaitingFocus) {
            this.focusOnHeading();
            this.setState({awaitingFocus: false});
        }
    },

    focusOnHeading: function () {
        setCursorToEnd(ReactDOM.findDOMNode(this)
            .getElementsByTagName('h2')[0]);
    },

    getActionButtons: function (isDisabled) {
        if (this.state.inEdit) {
            return (
                <span>
                    <button type='button'
                        disabled={isDisabled}
                        className='button-save'
                        aria-label='Cancel edit of todo item'
                        onClick={this.handleBack}>
                        <i className='fa fa-2x fa-times'></i>
                    </button>
                    <button type='button'
                        disabled={isDisabled}
                        className='button-save'
                        aria-label='Save todo item'
                        onClick={this.handleSave}>
                        <i className='fa fa-2x fa-save'></i>
                    </button>
                </span>
            );
        } else {
            return (
                <span>
                    <button type='button'
                        disabled={isDisabled}
                        className='button-edit'
                        aria-label='Edit todo item'
                        onClick={this.handleEdit}>
                        <i className='fa fa-2x fa-pencil'></i>
                    </button>
                    <button type='button'
                        disabled={isDisabled}
                        className='button-delete'
                        aria-label='Delete todo item'
                        onClick={this.handleDelete}>
                        <i className='fa fa-2x fa-trash-o'></i>
                    </button>
                </span>
            );
        }
    },

    handleBack: function () {
        const {description, dueDate, title, isNewItem} = this.props;
        if (isNewItem) {
            this.handleDelete();
        } else {
            this.setState({
                inEdit: false,
                description,
                dueDate: dueDate.toDateString(),
                title});
        }
        this.props.onEdit(false);
    },

    handleChange: function (state, event) {
        if (state === 'dueDate') {
            // TODO: Handle date?
            // Maybe we should have a datepicker (HTML5 type=date input)?
        }
        // TODO: Handle <br> tags before stripping.
        // IDEA: Markup editor?
        this.setState({[state]: event.target.textContent});
    },

    handleDelete: function () {
        this.props.onDelete(this.props.index);
    },

    handleEdit: function () {
        this.setState({inEdit: true});
        this.props.onEdit(this.props.index);
        this.setState({awaitingFocus: true});
    },

    handleSave: function () {
        const {description, dueDate, uuid, title} = this.state;
        this.setState({inEdit: false});
        this.props.onEdit(false);
        this.props.onUpdate(this.props.index, {
            description,
            dueDate: new Date(dueDate),
            uuid,
            title
        });
    },

    scrollToElement: function () {
        const bounds = ReactDOM.findDOMNode(this).getBoundingClientRect();
        const isVisible = (bounds.top >= 0) && (bounds.bottom <= window.innerHeight);

        if (!isVisible) {
            window.scrollBy(0, bounds.bottom - bounds.top);
        }
    },

    render: function () {
        const {title, description, dueDate, isDisabled} = this.props;
        const inEdit = this.state.inEdit;
        const html = {
            description: {
                __html: (inEdit) ? this.state.description : description
            },
            dueDate: {
                __html: (inEdit) ? this.state.dueDate : dueDate.toDateString()
            },
            title: {
                __html: (inEdit) ? this.state.title : title
            }
        };
        return (
            <li>
                <article>
                    <h2
                        contentEditable={inEdit}
                        dangerouslySetInnerHTML={html.title}
                        onBlur={this.handleChange.bind(this, 'title')} />
                    <p
                        contentEditable={inEdit}
                        dangerouslySetInnerHTML={html.description}
                        onBlur={this.handleChange.bind(this, 'description')} />
                </article>
                <menu>
                    <span className='due-date'>
                        Due: <time
                            contentEditable={inEdit}
                            dangerouslySetInnerHTML={html.dueDate}
                            onBlur={this.handleChange.bind(this, 'dueDate')} />
                    </span>
                    {this.getActionButtons(isDisabled)}
                </menu>
            </li>
        );
    }

});

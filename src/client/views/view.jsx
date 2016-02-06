import React from 'react';
import ReactDOM from 'react-dom';
import {HelloPrinter} from './components/test.jsx';

export default {
    init: function () {
        ReactDOM.render(
            <HelloPrinter firstname="John" surname="Smith" />,
            document.querySelector('div.first')
        );
        ReactDOM.render(
            <HelloPrinter firstname="Jame" surname="Doe" />,
            document.querySelector('div.second')
        );
    }
};

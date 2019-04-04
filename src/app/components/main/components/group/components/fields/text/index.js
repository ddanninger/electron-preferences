'use strict';

import React from 'react';
import './style.scss';

const { ipcRenderer } = window.require('electron');

class TextField extends React.Component {

    state = {};
    hasError = false;

    render() {

        return (
            <div className="field field-text">
                <div className="field-label">{ this.label }</div>
                <input type={ this.inputType } onChange={ this.onChange.bind(this) } value={ this.value }/>
                { this.help && <span className="help">{ this.help }</span> }
                { this.hasError && this.errorMessage && <span className="error">{ this.errorMessage }</span> }
            </div>
        );

    }

    get field() {

        return this.props.field;

    }

    get value() {

        return this.props.value || '';

    }

    get label() {

        return this.field.label;

    }

    get inputType() {

        return this.field.inputType || "text";

    }

    get help() {

        return this.field.help;

    }

    get validator() {

        return this.field.validator;

    }

    get errorMessage() {

        return this.field.errorMessage;

    }

    onChange(e) {
        if (this.validator) {
            const result = ipcRenderer.sendSync('runValidator', this.validator, e.target.value);
            if (!result) {
                this.hasError = true;
                return;
            }
        }
        this.hasError = false;
        return this.props.onChange(e.target.value);
    }

}

export default TextField;

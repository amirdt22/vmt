/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './textInput.css';
import lightClasses from './lightTextInput.css';

class TextInput extends Component {
  textInput = React.createRef();

  componentDidMount() {
    const { focus } = this.props;
    if (focus) {
      this.textInput.current.focus();
    }
  }

  componentDidUpdate() {
    const { focus } = this.props;
    if (focus) {
      this.textInput.current.focus();
    }
  }

  render() {
    const {
      light,
      autoComplete,
      type,
      width,
      name,
      placeholder,
      change,
      onKeyDown,
      value,
      size,
      label,
    } = this.props;
    const styles = light ? lightClasses : classes;
    let derivedAutoComplete = autoComplete || type;
    if (type === 'password') {
      derivedAutoComplete = 'current-password';
    }
    return (
      <div className={styles.Container} style={{ width }}>
        <input
          ref={this.textInput}
          autoComplete={derivedAutoComplete}
          className={styles.Input}
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          onChange={change}
          onKeyDown={onKeyDown}
          value={value}
          style={{ fontSize: size }}
          // eslint-disable-next-line react/destructuring-assignment
          data-testid={this.props['data-testid'] || null}
        />
        {label ? (
          <label className={styles.Label} htmlFor={name}>
            {label}
          </label>
        ) : null}
      </div>
    );
  }
}

TextInput.propTypes = {
  light: PropTypes.bool.isRequired,
  autoComplete: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default TextInput;

import React, { FC, useState } from 'react';
import '../form.scss';

export const GoAInputEmail: FC = () => {
  const [emailValid, setEmailValid] = useState(true);
  const [email, setEmail] = useState('');

  const handleEmailInput = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailValid(validateEmail(value))
  }
  const validateEmail = (value) => {
    return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
  }
  return (
    <div >
      <input type="email" required name="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailInput} />
      <p className="goa-form-error-message" style={{ display: `${emailValid ? 'none' : 'block'}` }} >
        Enter a valid e-mail address</p>
    </div>
  );
}

export default GoAInputEmail;
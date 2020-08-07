import React, { useState, Fragment, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const initialState = {
  name: "",
  email: "",
  phone: "",
  type: "personal",
};

const ContactForm = () => {
  const [contact, setContact] = useState(initialState);
  const contactContext = useContext(ContactContext);
  const { name, email, phone, type } = contact;
  const { addContact, current, updateContact, clearCurrent } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact(initialState);
    }
  }, [contactContext, current]);

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current) {
      updateContact(contact);
    } else {
      addContact(contact);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <Fragment>
      <h2 className='text-primary'>
        {current ? "Edit Contact" : "Add Contact"}
      </h2>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={name}
          onChange={onChange}
          required
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          name='email'
          onChange={onChange}
          required
        />
        <input
          type='text'
          placeholder='Phone'
          name='phone'
          value={phone}
          onChange={onChange}
        />
        <input
          type='radio'
          name='type'
          value='personal'
          checked={type === "personal"}
          onChange={onChange}
        />
        Personal{" "}
        <input
          type='radio'
          name='type'
          value='professional'
          checked={type === "professional"}
          onChange={onChange}
        />
        Professional{" "}
        <div>
          <input
            type='submit'
            value={current ? "Update Contact" : "Add Contact"}
            className='btn btn-primary btn-block'
          />
        </div>
        {current && (
          <div>
            <button className='btn btn-light btn-block' onClick={clearAll}>
              Clear
            </button>
          </div>
        )}
      </form>
    </Fragment>
  );
};

export default ContactForm;

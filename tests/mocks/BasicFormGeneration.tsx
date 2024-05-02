import { FormConfig } from '../../src/types';
import { Formactory } from '../../src/index';
import React from 'react';


function BasicFormGeneration(props) {

  const [data, setData] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const userForm : FormConfig = {
    form: {
      props : {
        className: "form-group",
        data: data,
        onSubmit: props.onSubmit,
        setData: setData,
        ["data-testid"]:"user-form",
      },
    }, 
    schema : [
      {
        name: "username",
        key: "username", // Unique key for the field
        props: {
          ["data-testid"]: "username-input",
          className: "form-control",
          placeholder: "Enter username",
          type: "text",
          onChange: (e) => setData({...data, username: e.target.value}),
        },
        type: "input",
        label: {
          text: "Username",
          props: {
            ["data-testid"]: "username-label", // Unique key for the label
            className: "form-label",
          }
        },
        }, 
        {
          name: "email",
          type: "input",
          key: "email",
          props: {
            ["data-testid"]: "email-input",
            className: "form-control",
            placeholder: "Enter email",
            type: "email",
            onChange: (e) => setData({...data, email: e.target.value}),
          },
          label: {
            text: "Email",
            props: {
              ["data-testid"]: "email-label",
              className: "form-label",
            }
          }
        },
        {
          name: "password",
          type: "input",
          key: "email",
          label: {
            text: "Password",
            props: {
              className: "form-label",
              ["data-testid"]: "password-label",

            }
          },
          props: {
            ["data-testid"]: "password-input",
            className: "form-control",
            placeholder: "Enter password",
            type: "password",
            onChange: (e) => setData({...data, password: e.target.value}),

          }
        },
        {
          name: "submit",
          key: "submit",
          type: "custom",
          component: "button",
          props: {
            className: "btn btn-primary",
            type: "submit",
            ["data-testid"]: "submit-button",
          },
          children: <span>submit</span>
        }
    ]
  }
  return (
    <Formactory {...userForm} />
  );
}

export default BasicFormGeneration;
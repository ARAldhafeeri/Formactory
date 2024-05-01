# Introduction

Formactory is a ReactJS library that changes the way developers build forms for good reasons. It replaces cumbersome hard-coded HTML with a declarative JSON schema, dramatically enhancing the maintainability of large, complex forms.

## Key Features

- Schema-Driven: Define form structure and elements in a clear, concise JSON format.
- Extensibility: Seamlessly use standard HTML elements, custom components, or your favorite UI library components.
- React Hook Form Integration: Leverage the power of react-hook-form for efficient form management.
- Validation Ready: Integrate with validation libraries like Zod for robust data validation.

## Why Formactory?

Increased Maintainability: Manage even the most complex forms with ease. Schema updates make form-wide changes a breeze.
Improved Developer Experience: Focus on form logic, not HTML wrangling.
Example (React Hook Form, Zod)


## Comparison

| Feature              | Hard-coded HTML                    | Declarative ( Schema Driven )                |
|----------------------|------------------------------------|----------------------------------------------|
| Learning Curve       | Just HTML                          | JSON declarative way                         |
| Complexity           | Simple forms are strightforward    | Large, complex forms become easier to manage |
| Maintainability      | Changes can affect many HTML parts | Schema updates propagate changes easily      |
| Developer experience | Great                              | Better                                       |

## Getting Started

### Installation
```bash
npm install formacotry
```
### Basic Usage

- Creating a simple form with Formactory, with three input fields and a submit button.
```jsx

import { Formactory } from 'formactory';
import React from 'react';


function App(props) {

  const [data, setData] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const userForm = {
    form: {
      props : {
        className: "form-group",
        onSubmit: console.log("test")
      },
      action: "test",
      data: data,
      setData: setData,
    }, 
    schema : [
      {
        name: "username",
        props: {
          className: "form-control",
          placeholder: "Enter username",
          type: "text",
          onChange: (e) => setData({...data, username: e.target.value}),
        },
        type: "input",
        label: {
          text: "Username",
          props: {
            className: "form-label",
          }
        },
        }, 
        {
          name: "email",
          type: "input",
          props: {
            className: "form-control",
            placeholder: "Enter email",
            type: "email",
            onChange: (e) => setData({...data, email: e.target.value}),
          },
          label: {
            text: "Email",
            props: {
              className: "form-label",
            }
          }
        },
        {
          name: "password",
          type: "input",
          label: {
            text: "Password",
            props: {
              className: "form-label",

            }
          },
          props: {
            className: "form-control",
            placeholder: "Enter password",
            type: "password",
            onChange: (e) => setData({...data, password: e.target.value}),

          }
        },
        {
          name: "submit",
          type: "custom",
          component: "button",
          props: {
            className: "btn btn-primary",
            type: "submit",
          },
          children: <span>submit</span>
        }
    ]
  }
  return (
    <Formactory {...userForm} />
  );
}

export default App;

```

### Advanced Usage

- Using react-hook-form and zod for validation
install the following packages
```bash
npm install react-hook-form @hookform/resolvers zod
```
```jsx
import { Formactory } from 'formactory';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  username: z.string().min(1, {message : "username required!"}).max(10),
  email: z.string().email({message : "email required!"}),
  password: z.string().min(6, {message : "password required!"}),
});


function App(props) {
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const [data, setData] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const onSubmit = (data) => {
    console.log(data);
  }



  const userForm = {
    form: {
      props : {
        className: "form-group",
        onSubmit: handleSubmit(onSubmit)
      },
      action: "test",
      data: data,
      setData: setData,
    }, 
    schema : [
      {
        name: "username",
        props: {
          className: "form-control",
          placeholder: "Enter username",
          type: "text",
          onChange: (e) => setData({...data, username: e.target.value}),
          ...register("username"),
        },
        type: "input",
        label: {
          text: "Username",
          props: {
            className: "form-label",
          }
        },
        error: {
          text: errors.username?.message,
          props: {
            className: "text-danger",
          }
        }

        },

        {
          name: "email",
          type: "input",
          props: {
            className: "form-control",
            placeholder: "Enter email",
            type: "email",
            onChange: (e) => setData({...data, email: e.target.value}),
            ...register("email"),
          },
          label: {
            text: "Email",
            props: {
              className: "form-label",
            }
          },
          error: {
            text: errors.email?.message,
            props: {
              className: "text-danger",
            }
          }
        },
        {
          name: "password",
          type: "input",
          label: {
            text: "Password",
            props: {
              className: "form-label",

            }
          },
          props: {
            className: "form-control",
            placeholder: "Enter password",
            type: "password",
            onChange: (e) => setData({...data, password: e.target.value}),
            ...register("password"),
          },
          error: {
            text: errors.password?.message,
            props: {
              className: "text-danger",
            }
          }
        },
        {
          name: "submit",
          type: "custom",
          component: "button",
          props: {
            className: "btn btn-primary",
            type: "submit",
          },
          children: <span>submit</span>
        }
    ]
  }
  return (
    <Formactory {...userForm} />
  );
}
```

### Contract Reference

#### `contract.form`

| Property | Type | Description |
|----------|------|-------------|
| props | object | Form element props |
] customComponents | object | Custom form component from ui libraries |


#### `contract.schema`

| Property | Type | Description |
|----------|------|-------------|
| name | string | Field name |
| type | string | Field type |
| props | object | Field element props |
| label | object | Label element |
| error | object | optional Error element |
| children | react node | Custom react elements |
| component | react component | Custom component |






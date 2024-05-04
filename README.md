# Introduction

![Formactory](https://github.com/ARAldhafeeri/Formactory/blob/main/formactory.png?raw=true&height=500&width=500)

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

## What is Formactory?
An abstraction layer that simplifies form creation by using a JSON schema to define form structure and elements. Formactory then going to parse the schema and render the form elements accordingly. The library intergratable with existing React tools.

## Dynamic forms  
Formfactory already passes schema and data to useEffect, so you can use the schema to update the form based on user interaction. This is useful for dynamic forms that change based on user input. To create dynamic forms, all you have to do is set the schema of the form as a react state, and update the schema based on user interaction, conditions and so on. 


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

- Creating a simple form with Formactory, create input and button.
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
1. using external libraries zod, react-hook-form.
2. using FormState to handle form state for dynamic forms.

#### using external libraries zod, react-hook-form.
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
  email: z.string().email({message : "email required!"}),
});


function App(props) {
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const [data, setData] = React.useState({
    email: "",
  });

  const onSubmit = (data) => {
    console.log(data);
  }



  const userForm = {
    form: {
      props : {
        className: "form-group",
        onSubmit: handleSubmit(onSubmit),
        action: "test",
      },
      data: data,
    }, 
    schema : [

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
    ]
  }
  return (
    <Formactory {...userForm} />
  );
}

```

#### using FormState to handle form state for dynamic forms.
This example will add a new field to the form when the user checks the checkbox. Even though this is a simple example, it demonstrates how to use FormState to handle form state for dynamic forms.

Formactory will create local state for the form, based on rules, those
rules are checked when form data is updated. If rules are met form actory will dispatch an action to update the form schema and re-render the form based on the action handler. A rule consist of three main parts:
1. `on` : the form mutation action that will trigger the handler to update the form schema.
2. `handler` : the function that will update the form schema based on the action.
3. `condition` : checked when data is updated, if condition evaulates to true, the handler will be called with schema updating logic, and form ui will be re-rendered with the new logic.

Here is an example, when checkbox clicked, new field will appear, and when unchecked, new field will disappear. 

```jsx
import React from 'react'
import { Formactory } from 'formactory';

export default function App(props) {

  const [data, setData] = React.useState({
    new: "",
  });
  const [toggle, setToggle] = React.useState(false);
 
const userForm  = {
    form: {
      props : {
        className: "form-group",
        data: data,
        setData: setData,
        onCLick: props.onSubmit,
        ["data-testid"]:"user-form",
      },
    }, 
    schema : [
        {
          name: "toggle",
          type: "checkbox",
          key: "toggle",
          props: {
            ["data-testid"]: "toggle-input",
            className: "form-control",
            onChange:  (e) => setToggle(e.target.checked),
          },
        },
  ],
  rules : [
    {
      on: "showNewInput",
      condition: {operator: "equal", values: [toggle, true ]},
      action: function(schema) {
        return {
          schema: [...schema, {
            name: "new",
            type: "input",
            key: "new",
            props: {
              ["data-testid"]: "new-input",
              className: "form-control",
              placeholder: "Enter new",
              type: "text",
              onChange: (e) => setData({...data, new: e.target.value}),
            },
            label: {
              text: "New",
              props: {
                ["data-testid"]: "new-label",
                className: "form-label",
              }
            }
          }]
        }
      }
    },
    {
      on: "hideNewInput",
      condition: {operator: "equal", values: [toggle, false ]},
      action: function (schema) { return schema.filter((field) => field.key !== "password")}
    }
  ]
}

  return (
    <Formactory {...userForm} />
  )
}
```

### using with rich ui libraries
Formactory is compatible with rich ui libraries like antd, material-ui, and so on. Here is an example of using Formactory with material-ui, all you have to do is use the custom component type and pass the component as a prop to the schema.

```bash
npm install @mui/material @mui/icons-material
```
```jsx
import { Formactory } from 'formactory';
import React from 'react';
import { Input, Button, Form } from 'antd';

const  App = () => {
  const [data, setData] = React.useState({
    username: "", 
  })

  const userForm = {
    form: {
      customComponent: Form,
      props : {
        className: "form-group",
        onSubmit: console.log("test")
      },
      data: data,
    }, 
    schema : [
        {
          name: "username",
          type: "custom",
          component: Input,
          props: {
            className: "form-control",
            placeholder: "Enter username",
            type: "text",
            onChange: (e) => setData({...data, username: e.target.value}),
          },
          label: {
            text: "Username",
            props: {
              className: "form-label",
            }
          },
        }, 
        {
          name: "submit",
          type: "custom",
          component: Button,
          props: {
            className: "btn btn-primary",
            type: "submit",
          },
          children: <span>submit</span>
        }
    ]
  }
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
| name | string | Field name , caution : this is unique idenfier for field, not field name property |
| type | string | Field type |
| props | object | Field element props |
| label | object | Label element |
| error | object | optional Error element |
| children | react node | Custom react elements |
| component | react component | Custom component |
| rules | object | Form rules for dynamic forms |
| rules.on | string | Form action |
| rules.condition | object | Form condition |
| rules.condition.operator | string | Form condition operator |
| rules.condition.values | array or single value with when operator | Form condition values |








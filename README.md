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
          "name": "submit",
          "type": "input",
          "key": "submit",
          "props": {
            "type": "submit",
            "name": "submit",
          },
        },
    ]
  }
  return (
    <Formactory {...userForm} />
  );
}

```

#### Handling dynamic forms, optimizing re-renders with formactory & react-form-hook.

note : v3.0.10 and above

This example will add a new field to the form when the user checks the checkbox. Even though this is a simple example, it demonstrates how to use formactory to handle form state for dynamic forms. Note the following example uses react-form-hook, using react-form-hook will minimize the re-renders even though the dynamic form might requires high reactivities and re-renders.

Formactory will create form reactivity based on the rules you provide. The rules are an array of objects with three parts:
1. `on` : the form mutation action that will trigger the handler to update the form schema.
2. `handler` : the function that will update the form schema based on the action, takes one parameter which is the form schema.
3. `condition` : checked when data is updated, if condition evaulates to true, the handler will be called with schema updating logic, and form ui will be re-rendered with the new logic.

Two main hooks :


```
useFormReactivity(formSettings, [dependencies])
```

- formSettings : is formactory settings object that contains the form schema, form settings, and rules.
- dependencies : is the data in which you want the form to be reactive to.

rules format : 
```JSON
[
  {on: "name-of-action", condition: {operator: "equal", values: [true, false]}, action: "function(settings) { return settings }" }
]
```
- on : the form mutation action that will trigger the handler to update the form schema.
- condition : checked when data is updated, if condition evaulates to true, the handler will be called with schema updating logic, and form ui will be re-rendered with the new logic.
- action : the function that will update the form schema based  the condition, action name, takes one parameter which is the form settings.

```
useFormMutator()
```
returns the following :
- appendFild : add a new field to the form settings. 
  + inputs: form settings, field settings
```
appendField(formSettings, fieldSettings);
```
- removeField : remove a field from the form settings.
  + inputs: form settings, field name
```
removeField(formSettings, fieldName);
```
- fieldExists : check if a field exists in the form settings.
  + inputs: form settings, field name
```
fieldExists(formSettings, fieldName);
```
- swapField : swap two fields in the form settings.
  + inputs: form settings, field name, field name
```
swapField(formSettings, fieldName, fieldName);
```
- replaceField : replace a field in the form settings.
  + inputs: form settings, field name, field settings
```
replaceField(formSettings, fieldName, fieldSettings);
```





```jsx
import React, { useEffect } from 'react'
import { Formactory, useFormMutator, useFormReactivity } from 'formactory';
import { useForm, useFormContext } from 'react-hook-form';

export default function ConditionalFormGeneration(props) {
  // get form mutator functions
  const { appendField, removeField, fieldExists, swapField, updateInput, replaceField } = useFormMutator();
  // get form hook functions
  const { register, handleSubmit, formState, watch } = useForm({
    defaultValues: {
      username: "",
      email: "",
      toggle: false,
      new: "",
    },
  });

  // watch for toggle change
  const toggle  = watch('toggle', false)
  console.log('toggle', toggle)

  // submit handler
  const ss = (data) => {
    console.log(data);
  }

  // form settings
  const settings = {
    form : {
      props : {
        onSubmit: handleSubmit(ss),
      },
    }, 
    // form schema
    schema : [
      {
        name: "username",
        type: "input",
        props: {
          ...register("username"),
        },
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
            ...register("email"),
          },
          label: {
            text: "Email",
            props: {
              className: "form-label",
            }
          }
        },
        {
          name: "toggle",
          type: "checkbox",
          key: "toggle",
          props: {
            ...register("toggle"),
          },
        },
        {
          "name": "submit",
          "type": "input",
          "key": "submit",
          "props": {
            "type": "submit",
            "name": "submit",
          },
        },
    ],
    // rules for dynamic forms
    rules: [
      {
        on: "showNewInput",
        condition: {operator: "equal", values: [toggle, true] },
        action: function(settings) {
          const field = {
            name: "new",
            type: "input",
            props: {
              type: "text",
              ...register("new"),
            },
            label: {
              text: "New",
              props: {
              }
            }
          };

          return fieldExists(settings, "new") ? settings : appendFild(settings, field);
        }
    },
      {
        on: "hideNewInput",
        condition: {operator: "equal", values: [toggle, false]},
        action: function(settings) {
          return fieldExists(settings, "new") ? removeField(settings, "new") : settings;
        }
      },
    ]
  };

  // init form reactivity
  const { formReactivity } = useFormReactivity(settings, [toggle]);

  // render dynamic form
  return (
    <Formactory form={formReactivity.form} schema={formReactivity.schema} />
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
};
```

### Contract Reference

#### `contract.form`

| Property | Type | Description |
|----------|------|-------------|
| props | object | Form element props |
] customComponents | object | Custom form component from ui libraries |


#### `contract.schema`

- list of fields, where each field is an object with the following properties:
| Property | Type | Description |
|----------|------|-------------|
| name | string | Field name |
| type | string | Field type |
| props | object | Field element props |
| label | object | Label element |
| error | object | optional Error element |
| children | react node | Custom react elements |
| component | react component | Custom component |

caution : name, type are field for formactory. Add name, type to field.props

#### `contract.rules`

- list of rules, where each rule is an object with the following properties:
| Property | Type | Description |
|----------|------|-------------|
| on | string | Form action |
| condition | object | Condition to trigger the handler |
| action | function | Handler function |

Note : the handler function should pass the form settings and return the updated form settings when condition is meet.
Note : condition is an object with the following properties:
| Property | Type | Description |
|----------|------|-------------|
| operator | string | Operator to compare values |
| values | array | Values to compare : except for when operation it's boolean value |

operator options: 
- equal : values should be equal
- notEqual : values should not be equal
- greaterThan : value a should be greater than value b
- lessThan : value a should be less than value b
- greaterThanOrEqual : value a should be greater than or equal to value b
- lessThanOrEqual : value a should be less than or equal to value b
- when : a js expression that evaluates to true, or a value.










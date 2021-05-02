import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            name="firstName"
            onChange={event => this.props.handleChange(event)}
            value={this.props.formData.firstName}
          />
          <input
            type="text"
            name="lastName"
            onChange={event => this.props.handleChange(event)}
            value={this.props.formData.lastName} />
        </form>
      </div>
    )
  }
}

export default Form;
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 /* import React from 'react';

class Form extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    submittedData: []
    // we can create an array for our submitted data
  }
  // controlling forms makes it more convenient to share form values between components.
  // Since the form values are stored in state, they are easily passed down as props or
  // sent upward via function supplied in props.

  handleFirstNameChange = event => {
    this.setState({
      firstName: event.target.value
    })
  }

  handleLastNameChange = event => {
    this.setState({
      lastName: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    let formData = { firstName: this.state.firstName, lastName: this.state.lastName }
    this.sendFormDataSomewhere(formData) */
    /* 
    
    this.sendFormDataSomewhere(formData): A form, when submitted should send the form data
    somewhere. As mentioned a moment ago, the traditional HTML way was to send data to a server
    or another page using the action attribute. In React, we handle requests with asynchronous
    JavaScript. We won't go into the details of this works just yet, but we can think of
    sendFormDataSomewhere() as the code that handles sending our data off. This function might
    be defined in the same form component, but is more often provided as a prop.
    
    */
  /* }

  listOfSubmissions = () => {
    return this.state.submittedData.map(data => {
      return <div><span>{data.firstName}</span><span>{data.lastName}</span></div>
      // return data from the submittedData array of objects
      // this component will render previous form submissions on the page! We have a fully
      // functioning controlled form
    })
  }
  // anonymous functions pass in events as arguments
  // the event contains data about the target, which is whatever DOM element the event
  // was triggered on. That target, being an input, has a value attribute. This attribute is 
  // equal to whatever is currently entered into that particular input.

  render() {
    // now that we're controlling the form with state, we want to set up a way to submit our
    // form. For this, we use a second event, onSubmit, added to the form in JSX.
    // now, whenever the form is submitted, an anonymous function will be called.
    return (
      <div>
      <form onSubmit={event => this.handleSubmit(event)}>
        <input type="text" name="firstName" onChange={event => this.handleFirstNameChange(event)} value={this.state.firstName} />
        <input type="text" name="lastName" onChange={event => this.handleLastNameChange(event)} value={this.state.lastName} />
        <input type="submit"/>
      </form>
      {this.listOfSubmissions()}
      </div>
    )
  }
}
// onChange is the event handler
// Form inputs in React come with specific events. onChange will fire every time the value
// of an input changes.

export default Form; 

// Forms in React are similar to their HTML counterparts. The JSX we write is
// almost identical. The way we store and handle form data, however, is entirely
// new. In React, it is often a good idea to set up controlled forms. A controlled form
// is a form that derives its input values from state.

/* 

Form elements include <input>, <textarea>, <select>, and <form> itself. When we talk about
inputs in this lession, we broadly mean the form elements (<input>, <textarea>, <select>) and
not always specifically just <input>.

To control the value of these inputs, we use a prop specific to that type of input:

- for <input>, <textarea>, and <option>, we use value, as we have seen.

- for <input type="checkbox" and <input type="radio", we use checked

Each of these attributes can be set based on a state value. Each also has an onChange event
listener, allowing use to update state when a user interacts with a form.

React provides us with two ways of setting and getting values in form elements. These two methods
are called uncontrolled and controlled components. The differences are subtle, but it's important
to recognize them - and use them accordingly (spoiler: most of the time, we'll use controlled
components).

The quickest way to check if a component is controlled or uncontrolled is to check for value
or defaultValue. Of the component has a value prop, it is controlled (the state of the
component is being contolled by React). If it doesn't have a value prop, it's an uncontrolled
component. Uncontrolled components can optionally have a defaultValue prop to set its initial
value. These two props (value and defaultValue) are mutually exclusive: a component is either
controlled or uncontrolled, but it cannot be both

Uncontrolled Components

In uncontrolled components, the state of the component's value is kept in the DOM itself like
a regular old HTML form -- in other words, the form element in question (e.g. an <input>) has
its own internal state. To retrieve that value, we would need direct access to the DOM 
component that holds the value, or we'd have to add an onChange handler.

To set an initial value for the element, we'd use the defaultValue prop. We can't use the value
prop for this: we're not using state to explicitly store its value, so the component would never
update its value anymore (since we're rendering the same thing). Uncontrolled forms still work
just fine in React

To submit an uncontrolled form, we can use the onSubmit handler just as before:

<form onSubmit={ event => this.handleSubmit(event)}>
...
</form>

All the form data in an uncontrolled form is accessible within the event, but accesing can
sometimes be a pain, as you end up writing things like event.target.children[0].value to get
the value of our first input.

handleSubmit = event => {
  event.preventDefault()
  const firstName = event.target.children[0].value
  const lastName = event.target.children[1].value
  this.sendFormDataSomewhere({ firstName, lastName })
} 

On a larger form this can turn into some dense code.

Controlled Component

In controlled components, we explicitly set the value of a component using state, and update
that value in response to any changes the user makes. While it takes a little bit of set up
to implement, it makes some other parts of our code easier. For instance, in a basic controlled
form, our handleSubmit() function can be relatively simple:

handleSubmit = event => {
  event.preventDefault()
  this.sendFormDataSomewhere(this.state)
} 

If our entire state object is just the controlled form data, we can send the entire object
around wherever it needs to go. Not only that, if we expanded our form to have 20 controlled 
inputs, this handleSubmit doesn't change. It just sends all 20 state values wherever we need
to go upon submission.

Why Use Controlled Forms When We Do Not Have To

Controlled forms can be very useful for specific purposes - since we can set our state 
elsewhere, its easy to populate forms from existing available data.

When we have a controlled form, the state does not need to be stored in the same component.
We could store state in a parent component, instead. To demonstrate this, we'll need to create
new component. To keep it simple, we'll call this ParentComponent. ParentComponent can maintain
all the functions while Form just handles the display of JSX:

// src/components/ParentComponent
import React from 'react';
import Form from './Form'

class ParentComponent extends React.Component {
  state = {
    firstName: "",
    lastName: "",
  }

  handleFirstNameChange = event => {
    this.setState({
      firstName: event.target.value
    })
  }

  handleLastNameChange = event => {
    this.setState({
      lastName: event.target.value
    })
  }

  render() {
    return (
      <Form
        formData={this.state}
        handleFirstNameChange={this.handleFirstNameChange}
        handleLastNameChange={this.handleLastNameChange}
      />
    )
  }
}

export default ParentComponent;

Then Form can become:

// src/components/Form
import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            onChange={event => this.props.handleFirstNameChange(event)}
            value={this.props.formData.firstName}
          />
          <input
            type="text"
            onChange={event => this.props.handleLastNameChange(event)}
            value={this.props.formData.lastName}
          />
        </form>
      </div>
    )
  }
}

export default Form; 

Previously, our application was rendering Form directly inside src/index.js. Now, however, 
we've added a component that renders Form as a child. Because of this change, you'll need to
update src/index.js so that it renders ParentComponent instead of Form.

Aside: Submission functionality is ommitted here for simplicity. Also, if you're following
along in the example files, don't forget to update index.js to point ParentComponent.

With ParentComponent, we've moved all the form logic up one level.

Being able to store form data in other components opens up some interesting doors for us.
We could, for instance, create another component, a sibling of Form, that lives displays
our form data.

// src/components/DisplayData
import React from 'react';

class DisplayData extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.formData.firstName}</h1>
        <h1>{this.props.formData.lastName}</h1>
      </div>
    )
  }
}

export default DisplayData 

And adding it alongside it alongside Form (also wrapping both in a div:

  // src/components/ParentComponent
import React from 'react';
import Form from './Form'
import DisplayData from './DisplayData'

class ParentComponent extends React.Component {
  ...
  render() {
    return (
      <div>
        <Form
          formData={this.state}
          handleFirstNameChange={this.handleFirstNameChange}
          handleLastNameChange={this.handleLastNameChange}
        />
        <DisplayData formData={this.state} />
      </div>
    )
  }
} ... 

Now we have a component that reads from the same state we're changing with the form.

This can be a very useful way to capture user input and utilize it throughout your application,
even if a server is not involved.

The opposite can also be true - Imagine a user profile page with an 'Edit' button that opens
a form for updating user info. When a user clicks that 'Edit' button, they expect to see a 
form with their user data pre-populated. This way, they can easily make small changes without
rewriting all their profile info.

Just like we did with ParentComponent, this could be achieved by populating a form with data
from props! After all, if we have a React app that is displaying user information, that
information is stored somewhere on the app.

Conclusion

Using a controlled component is the preferred way to do things in React - it allows us to keep 
all component state in the React state, istead of relying on the DOM to retrieve the element's
value through its internal state.

Using a controlled form, whenever our state changes, the component re-renders, rendering the
input with the new updated value. If we don't update the state, our input will not update
when the user types. In other words, we need to update our input's state programatically.

It might seem a little counterintuitive that we need to be so verbose, but this actually open 
the doore to additional functionality. For example, let's say we want to write an input that
only takes the number 0 through 5. We can now validate the data the user enters before we set 
it on the state, allowing us to block any invalid values. We could optionally set another state
property (for example, isInvalidNumber). Using that state property, we can show an error in
our component to indicate that the user tried to enter an invalid value.

If we tried to do this using an uncontrolled component, the input would be entered regardless,
since we don't have controll over the internal state of the input. In our onChange handler, we'd
have to roll the input back to its previous value, which is pretty tedious!

Bonus - Abstracting setState when onChange is Triggered

You're still here? Well, while you are, let's talk about the onChange event we've got set up now
in our ParentComponent. We have two methods in the class that seem very very similar:

handleFirstNameChange = event => {
  this.setState({
    firstName: event.target.value
  })
}

handleLastNameChange = event => {
  this.setState({
    lastName: event.target.value
  })
} 

Since each one is changing a different value in our state, we've got them separated here. You 
can imagine that once we've got a more complicated form, this route may result in a very
cluttered component. Instead of separate methods, we could actually condense this down into one
abstracted component. Since event is being passed in as the argument, we have access to some of
the event.target attributes that may be present.

If we give our inputs name attributes, we can access them as event.target.name:

<input type="text" name="firstName" value={this.state.firstName} />
<input type="text" name="lastName" value={this.state.lastName} /> 

If we make sure the name attributes match keys in our state, we can write a generic handleChange
method like so:

handleChange = event => {
  this.setState({
    [event.target.name]: event.target.value
  })
} 

If we connect this method to both of our inputs, they will both correctly update state. Why?
Because for the first input, event.target.name is set to firstName, while in the second input,
it is set to lastName. Each input's name attribute will change which part of state is actually
updated!

Here is the full, final code using this new function:

// src/components/ParentComponent
import React from 'react';
import Form from './Form'
import DisplayData from './DisplayData'

class ParentComponent extends React.Component {
  state = {
    firstName: "",
    lastName: "",
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <Form
          formData={this.state}
          handleChange={this.handleChange}
        />
        <DisplayData formData={this.state} />
      </div>
    )
  }
}

export default ParentComponent; 

// src/components/Form
import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            name="firstName"
            onChange={event => this.props.handleChange(event)}
            value={this.props.formData.firstName}
          />
          <input
            type="text"
            name="lastName"
            onChange={event => this.props.handleChange(event)}
            value={this.props.formData.lastName} />
        </form>
      </div>
    )
  }
}

export default Form; 

// src/components/DisplayData.js
import React from 'react';

class DisplayData extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.formData.firstName}</h1>
        <h1>{this.props.formData.lastName}</h1>
      </div>
    )
  }
}

export default DisplayData 

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import ParentComponent from './components/ParentComponent';

ReactDOM.render(
  <div>
    <ParentComponent/>
  </div>,
  document.getElementById('root')
); 



*/
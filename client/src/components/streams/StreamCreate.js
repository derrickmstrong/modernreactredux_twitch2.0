import React from 'react';
import { Field, formValues, reduxForm } from 'redux-form';

const StreamCreate = props => {
  // console.log(props)

  const renderError = ({error, touched}) => {
      if (error && touched) {
          return (
              <div className="ui error message">
                  <div className="header">{error}</div>
              </div>
          )
      }
  }

  const renderInput = ({ input, label, meta }) => {
    // console.log(input)
    // console.log(meta)
    return (
      <div className={`field ${meta.error && meta.touched ? 'error' : ''}`}>
        <label>{label}</label>
        {/* Add all formProps to the input element  */}
        <input {...input} autoComplete='off' />
        {renderError(meta)}
      </div>
    );
  };

  const onSubmit = formValues => {
    console.log(formValues);
  };

  return (
    <form className='ui form error' onSubmit={props.handleSubmit(onSubmit)}>
      <Field 
      name='title' 
      label='Enter Title' component={renderInput} />
      <Field
        name='description'
        label='Enter Description'
        component={renderInput}
      />
      <button className='ui button primary'>Submit</button>
    </form>
  );
};

// Form validation
const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }
  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }

  return errors;
};

export default reduxForm({
  form: 'streamCreate',
  validate: validate
})(StreamCreate);

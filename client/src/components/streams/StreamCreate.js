import React from 'react';
import { connect } from 'react-redux'
import { createStream } from '../../store/actions';
import StreamForm from './StreamForm';

const StreamCreate = props => {
  // console.log(props)

  const onSubmit = formValues => {
    // console.log(formValues);
    // dispatch createNewStream action on Submit
    props.createNewStream(formValues)
  };

  return (
    <div>
      <h3>Create a Stream</h3>
      <StreamForm onSubmit={onSubmit} />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    createNewStream: (formValues) => dispatch(createStream(formValues))
  }
}

export default connect(null, mapDispatchToProps)(StreamCreate);
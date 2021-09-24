import _ from 'lodash'
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../store/actions';
import StreamForm from './StreamForm';

const StreamEdit = props => {
  console.log(props);
  const id = props.match.params.id;

  useEffect(() => {
    props.getStream(id);
    return () => {};
  }, []);

  if (!props.stream) return 'Loading...';
  // const { title, description } = props.stream;

  const onSubmit = formValues => {
    console.log(formValues);
    props.editStream(id, formValues)
  };

  return (
    <div>
      <h3>Edit a Stream</h3>
      <StreamForm
        onSubmit={onSubmit}
        // Use lodash _.pick to pick out only the items from the object that we need omitting id and userId in this case
        initialValues={_.pick(props.stream, 'title', 'description')}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStream: id => dispatch(fetchStream(id)),
    editStream: (id, formValues) => dispatch(editStream(id, formValues)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamEdit);

import React, { Fragment, useEffect } from 'react';
import Modal from '../Modal';
import history from '../../history';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { deleteStream, fetchStream } from '../../store/actions';

const StreamDelete = props => {
  console.log(props);
  const { id } = props.match.params;

  useEffect(() => {
    props.getStream(id);
    return () => {};
  }, []);
  
  // Check if stream has loaded yet; if not, do not show modal
  if (!props.stream) return null

  // Now destructure props
  const { deleteStream } = props
  const { title } = props.stream

  const renderActions = () => {
    return (
      <Fragment>
        <button onClick={() => deleteStream(id)} className='ui button negative'>Delete</button>
        <Link to='/' className='ui button'>Cancel</Link>
      </Fragment>
    );
  };

  const onDismiss = () => {
    return history.push('/');
  };

  return (
    <div>
      StreamDelete
      <Modal
        title={`Delete ${title}?`}
        content={`Are you sure you want to delete the stream: ${title}?`}
        actions={renderActions()}
        onDismiss={onDismiss}
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
    deleteStream: id => dispatch(deleteStream(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamDelete);

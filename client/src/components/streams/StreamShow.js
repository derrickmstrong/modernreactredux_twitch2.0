import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../store/actions';

const StreamShow = props => {
  console.log(props);
  const { id } = props.match.params;
  
  useEffect(() => {
    props.getStreams(id);
    return () => {};
  }, []);
  
  // Check if stream has loaded yet; if not, return null (or nothing)
  if (!props.stream) return null;
  
  // Now destructure props.stream
  const { title, description } = props.stream;

  return (
    <Fragment>
      <h1>{title}</h1>
      <h5>{description}</h5>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStreams: id => dispatch(fetchStream(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamShow);

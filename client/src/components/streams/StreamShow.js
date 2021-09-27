import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../store/actions';

const StreamShow = props => {
  console.log(props);
  const { id } = props.match.params;
  const { title, description } = props.stream;

  useEffect(() => {
    props.getStreams(id);
    return () => {};
  }, []);

  // Check if stream has loaded yet; if not, return null (or nothing)
  if (!props.stream) return null;

  return (
    <Fragment>
      {title}
      {description}
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

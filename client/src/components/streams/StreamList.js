import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../store/actions';
import { Link } from 'react-router-dom';

const StreamList = ({ streams, getAllStreams, currentUserId, isSignedIn }) => {
  console.log(streams, getAllStreams, currentUserId);
  useEffect(() => {
    getAllStreams();
    return () => {};
  }, []);

  const renderAdmin = stream => {
    if (stream.userId === currentUserId) {
      return (
        <div className='right floated content'>
          <Link to={`/streams/edit/${stream.id}`} className='ui button primary'>Edit</Link>
          <Link to={`/streams/delete/${stream.id}`} className='ui button negative'>Delete</Link>
        </div>
      );
    }
  };

  const renderCreate = () => {
    if (isSignedIn) {
      return (
        <div style={{ textAlign: 'right'}}>
          <Link to='/streams/new' className='ui button primary'>
            Create New Stream
          </Link>
        </div>
      );
    }
  };

  const renderList = streams.map(stream => {
    if (currentUserId !== stream.userId) return null;
    return (
      <div className='item' key={stream.id}>
        {/* In otder for Semantic UI to format button correctly, renderAdmin(stream) has to be at top */}
        {renderAdmin(stream)}
        <i className='large middle aligned icon camera' />
        <div className='content'>
          <Link to={`/streams/${stream.id}`} className="header">{stream.title}</Link>
          <div className='description'>{stream.description}</div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <h2>Streams</h2>
      <div className='ui celled list'>{renderList}</div>
      {renderCreate()}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    streams: Object.values(state.streams), // Turns object values into an array; map through prop
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllStreams: () => dispatch(fetchStreams()), // dispatch as prop on page load
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StreamList);

import React, { Fragment, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../store/actions';
import flv from 'flv.js';

const StreamShow = props => {
  console.log(props);
  const { id } = props.match.params;
  const videoRef = useRef();
let flvPlayer;

  useEffect(() => {
    props.getStreams(id);
    console.log('VR:', videoRef);
    buildPlayer();
    return () => {
      flvPlayer.destroy()
    };
  }, []);

  const buildPlayer = () => {
    
    if (flvPlayer || !props.stream) {
      return;
    }
    flvPlayer = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`,
    });
    flvPlayer.attachMediaElement(videoRef.current);
    flvPlayer.load();
    // flvPlayer.play();
  };

  // Check if stream has loaded yet; if not, return null (or nothing)
  if (!props.stream) return null;

  // Now destructure props.stream
  const { title, description } = props.stream;

  return (
    <Fragment>
      <video ref={videoRef} style={{ width: '100%' }} controls={true} />
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

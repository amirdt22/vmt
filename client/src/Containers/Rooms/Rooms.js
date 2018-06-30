import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NewRoom from './NewRoom/NewRoom';
// import classes from './rooms.css';
import * as actions from '../../store/actions/';
import { connect } from 'react-redux';

class Rooms extends Component {
  // local state describing which rooms should be displayed
  // all, or just the user's
  state = {
    allRooms: true,
  }
  componentDidMount() {
    console.log(this.props.history.location.pathname)
    console.log(this.props.match)
    // only dispatch action if we need to
    if (!this.props.rooms.length) {
      this.props.getRooms();
    }
  }

  filter = (event) => {
    console.log('filtering')
    event.preventDefault();
    this.setState({allRooms: !this.state.allRooms})
  }

  render() {
    const rooms = this.state.allRooms ? 'rooms' : 'myRooms';
    const roomElems = this.props[rooms].map(room => (
      <li><label>Name: </label><Link to={`/room/${room._id}`}>{room.roomName}</Link></li>
    ))
    return (
      <div className='container-fluid'>
        <div className='row-fluid'>
          <div className='col-md-2'>
            <label>Show rooms created by me:</label>
            <input type='checkbox' name='showMyRooms' onClick={this.filter}/>
            <ul>
              {roomElems}
            </ul>
          </div>
          <div className='col-md-10'>
            {(this.props.match.path === '/rooms/new') ? <NewRoom /> : null}
          </div>
        </div>
      </div>
    )
  }
}

// connect react functions to redux actions
const mapDispatchToProps = dispatch => {
  return {
    getRooms: (username, password) => dispatch(actions.getRooms()),
  }
}

// connect redux store to react props
const mapStateToProps = store => {
  return {
    rooms: store.roomsReducer.rooms,
    myRooms: store.authReducer.myRooms
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Rooms);

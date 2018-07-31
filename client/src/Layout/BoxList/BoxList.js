import React from 'react';
import ContentBox from '../../Components/UI/ContentBox/ContentBox';
import { Link } from 'react-router-dom';
import classes from './boxList.css';
import glb from '../../global.css';
const boxList = props => {
  console.log(props)
  let listElems = [];
  if (props.list) {
    listElems = props.list.map((item, i)=> {
      let notifications = 0;
      // attach notification icon to the box if it has active notifications
      if (props.notifications && item.notifications) {
        notifications = item.notifications.length
      }
      const linkPath = props.dashboard ? '/dashboard' : '/publicResource';
      const resource = props.resource.substring(0, props.resource.length - 1)
      const suffix = (resource === 'course') ? 'rooms' : 'summary'
      return (<div className={classes.ContentBox} key={i}>
        <ContentBox
          title={<Link className={glb.Link} to={`${linkPath}/${resource}/${item._id}/${suffix}`} key={item._id}>{item.name}</Link>}
          notifications={notifications}
          locked={!item.isPublic} // @TODO Should it appear locked if the user has access ? I can see reasons for both
        >
          {item.description}
        </ContentBox>
      </div>)
      })
  }
  return <div className={classes.Container}>{listElems}</div>;
}


export default boxList;

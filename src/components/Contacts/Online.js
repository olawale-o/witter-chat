import { useGlobal } from '../../context/global';
import './Online.css';

export default function OnlineContacts({users}) {
  // const { followersListIds } = useGlobal();
  // check for user followers who is online
  // const onlineUsers = Object.entries(users).filter(([_,v]) => v.online === true).filter(([k, v]) => followersListIds.includes(k));
  
  // all followers and followings of a user who is online
  const onlineUsers = Object.entries(users).filter(([_,v]) => v.online === true);
  return (
    <div className="online-contact">
      <div className="online-contact__header">
        <span className='text-lg text-black'>Online now</span>
        <div className="online-contact__count">12</div>
      </div>
      <ul className="online-contact__list">
        {onlineUsers.map(([k, user], i) => (
          <li key={k} className="online-contact__list-item">
            <div className="online-contact__list-item__img-container">
              {user?.avatar ? (<img
                  src={user.avatar}
                  alt="avatar"
                  className="chat-sidebar__detail__img"
                />) :
                (<span className="text-sm text-orange">{user.username[0].toUpperCase()}</span>)
              }
              <div className="online" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 
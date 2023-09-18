import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getContactService } from "../../services/friendService";
import './Contact.css';

const Contact = ({
  user,
  setSelectedUser,
  selectedCurrentUser
}) => {
  return (
    <li className={`contact-item ${selectedCurrentUser?.username === user.username && 'active'}`}>
      <button className="contact-button" onClick={() => setSelectedUser(user)}>
        <div className="contact-item__container">
          <div className="contact-item__left">
            {
              user?.avatar ? (<img
                  src={user.avatar}
                  alt="avatar"
                  className="chat-sidebar__detail__img"
                />
              ) : (
                <span className="text-sm text-orange">{user.username[0].toUpperCase()}</span>
              )
            }
          </div>
          <div className="contact-item__right">
            <div className="last-chat">
              <span className="last-chat__username">{user.username}</span>
              <span className="last-chat__message">{user?.hasMessage}</span>
              {/* {user?.hasNewMessage && (<div className="new-message" />)} */}
            </div>
            <div className="chat-state">
              <span>16:45</span>
              <div className={`online-state ${user.online ? 'online' : user.idle ? 'idle' : user.busy ? 'busy' : null}` }/>
            </div>
          </div>
        </div>
      </button>
    </li>
  );
}

const Contacts = ({ setSelectedUser, selectedCurrentUser }) => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    getContactService(JSON.parse(localStorage.getItem('user')).user._id).then((result) => {
      setContacts(result.followers);
    })
  }, []);
  return (
    <div className="contacts">
      <span className="text-lg text-black">Chats</span>
      <input type="text" placeholder="Search for chats" className="input" />
      <ul className="contact-list">
        {
          contacts.length ? (
            <>
              {contacts.map((contact) => (
                <Contact
                  key={contact.connection._id}
                  user={contact.connection}
                  setSelectedUser={setSelectedUser}
                  selectedCurrentUser={selectedCurrentUser}
                />
              ))}
            </>
          ) : 
          (<Link to="/friends">Suggestions</Link>)
        }
      </ul>
    </div>
  )
};

export default Contacts;

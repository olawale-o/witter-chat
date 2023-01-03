import React from "react";

const Contact = ({
  user,
  setSelectedUser,
}) => {
  return (
    <li className="contact-item">
      <button className="contact-button" onClick={() => setSelectedUser(user)}>
        <div className="contact">
          <div className="avatar-container" />
          <div className="last-message">
            <div className="username-container">
              <span>{user.username}</span>
              {user.hasNewMessage && (<div className="new-message" />)}
            </div>
            <span className="text">text</span>
          </div>
          <div className="chat-state">
            <span>16:45</span>
            <div className={`online-state ${user.online ? 'online' : user.idle ? 'idle' : user.busy ? 'busy' : null}` }/>
          </div>
        </div>
      </button>
    </li>
  )
}

const Contacts = ({ setSelectedUser, onlineUsers }) => {
  return (
    <ul className="contacts">
      {Object.entries(onlineUsers).map(([k, v]) =>{
        return (
          <Contact
            key={k}
            user={v}
            setSelectedUser={setSelectedUser}
          />
        )
      })}
    </ul>
  )
};

export default Contacts;

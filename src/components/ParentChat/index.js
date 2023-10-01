import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useSocketContext } from "../../context/socket";
import Profile from "../Profile";
import ChatArea from "../ChatArea/ChatArea";

export default function ParentChat() {
  const { selectedUser, socket, messages, setMessages, lastMessageRef } = useSocketContext();
  return (
    <div className="chat-area">
    {
      selectedUser.userId ? (
        <div className="chat-area__content">     
          <nav className="chat-area__nav">
              <div className="chat-area__nav--left">
                <input type="text" className="input input--bg-grey" placeholder="Search for a message" />
                <div className="theme-buttons">
                  <button type="button" className="btn btn__square btn--green btn--light">
                    <span className="icon icon--white">
                      <MdOutlineLightMode />
                    </span>
                  </button>
                  <button type="button" className="btn btn__square btn--dark">
                    <span className="icon icon--green">
                      <MdOutlineDarkMode />
                    </span>
                  </button>
                </div>
              </div>
              <div className="chat-area__nav--right">
                <span className="text-gray text-lg f-600">21, October 2023</span>
              </div>
          </nav>    
          <div className="box">
            <ChatArea
              socket={socket}
              selectedUser={selectedUser}
              messages={messages}
              setMessages={setMessages}
              lastMessageRef={lastMessageRef}
            />
            <Profile
              //user={selectedUser}
            />
          </div>
        </div>
      ) :
      (<div className="no-chat">Please select a user to chat with</div>)
    }
    </div>
  )
}
import { useLoaderData } from "react-router-dom";
import { getFriendSuggestionService } from "../../services/friendService";

export async function loader() {
  return getFriendSuggestionService('suggestion')  
}

const FriendSuggestion = () => {
  const followers = useLoaderData();
  return (
    <ul className="friend-list">
      {
        followers.users.slice(0, 20).map((follower) => (
          <li className="friend-item" key={follower._id}>
            <div className="friend">
              <div className="left">
                <div className="friend-item__image-container">
                  {
                    follower?.avatar ? (<img className="img" src={follower.avatar} alt="avatar" />) : 
                    (<span>{follower.username[0].toUpperCase()}</span>)
                  }
                </div>
                <div className="summary">
                  <span className="title">{follower.username}</span>
                </div>
              </div>
              <button type="button" className="cta">Follow</button>
            </div>
          </li>
        ))
      }
    </ul>
  )  
};
  
export default FriendSuggestion;
  
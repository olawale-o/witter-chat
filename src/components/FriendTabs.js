import { Link } from 'react-router-dom';

const FriendTabs = () => {
  const tabs = [{ index: 1, title: 'friends', link: '/friends'}, { index: 2, title: 'request', link: '/friends/request'}];
  return (
    <div className="tab-bar" role="tablist" aria-label="Status">
      <ul className="tabs">
        {tabs.map((tab) => (
          <li role={tab.title} key={tab.index} className={`tab-item`}>
            <Link to={`${tab.link}`}>
              {tab.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendTabs;

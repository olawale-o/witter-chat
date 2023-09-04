import { Link } from 'react-router-dom';

const LinkTabs = ({ tabs }) => {
  return (
    <div className="tab-bar" role="tablist" aria-label="Status">
      <ul className="tabs">
        {tabs.map((tab) => (
          <li role={tab.title} key={tab.index} className={`tab-item`}>
            <Link to={`${tab.link}`} className="tab-link">
              {tab.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ButtonTabs = ({ tabs }) => {
  return (
    <div className="tab-bar" role="tablist" aria-label="Status">
      <ul className="tabs">
        {tabs.map((tab) => (
          <li role={tab.title} key={tab.index} className={`tab-item`}>
            <button type="button" className="tab-link">
              {tab.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { LinkTabs, ButtonTabs }

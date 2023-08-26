import './Online.css';

export default function OnlineContacts({users}) {;
  return (
    <div className="online-contact">
      <div className="online-contact__header">
        <span className='text-lg text-black'>Online now</span>
        <div className="online-contact__count">12</div>
      </div>
      <ul className="online-contact__list">
        {Object.entries(users).filter(([_,v]) => v.online === true).map(([k, user], i) => (
          <li key={k} className="online-contact__list-item">
            <div className="online-contact__list-item__img-container">
              <span className="text-sm text-orange">{user.username[0].toUpperCase()}</span>
              <div className="online" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 
import {BsFileEarmarkMinus} from 'react-icons/bs';
import './style.css';

export default function Profile() {
  return (
    <div className="profile">
      <div className="profile__content">
        <div className="profile__details">
          <div className="profile__avatar">
            
          </div>
          <span className="text-lg text-black">Devon Lane</span>
          <span className="text-gray text-sm">@devon_lane</span>
        </div>
        <div className="divider" />
        <div className="shared-files">
          <div className="shared-files__header">
            <span className="text-black text-lg">Shared Files</span>
            <span className="text-sm">See all</span>
          </div>
          <ul className="shared-files__list">
            <li className="shared-files__list-item">
              <div className="shared-file">
                <div className="shared-file--left icon-container">
                  <BsFileEarmarkMinus size="20" />
                </div>
                <div className="shared-file__details">
                  <span className="shared-file__name text-black text-sm">Mockups.zip</span>
                  <span className="shared-file__time text-gray">Oct 21, 2021 at 02:07</span>
                </div>
                <div className="shared-file--right">
                    <span></span>
                  <span className="shared-file__size text-gray text-sm">1.86mb</span>
                </div>
              </div>
            </li>
            <li className="shared-files__list-item">
              <div className="shared-file">
                <div className="shared-file--left icon-container">
                  <BsFileEarmarkMinus size="20" />
                </div>
                <div className="shared-file__details">
                  <span className="shared-file__name text-black text-sm">Mockups.zip</span>
                  <span className="shared-file__time text-gray">Oct 21, 2021 at 02:07</span>
                </div>
                <div className="shared-file--right">
                    <span></span>
                  <span className="shared-file__size text-gray text-sm">1.86mb</span>
                </div>
              </div>
            </li>
            <li className="shared-files__list-item">
              <div className="shared-file">
                <div className="shared-file--left icon-container">
                  <BsFileEarmarkMinus size="20" />
                </div>
                <div className="shared-file__details">
                  <span className="shared-file__name text-black text-sm">Mockups.zip</span>
                  <span className="shared-file__time text-gray">Oct 21, 2021 at 02:07</span>
                </div>
                <div className="shared-file--right">
                    <span></span>
                  <span className="shared-file__size text-gray text-sm">1.86mb</span>
                </div>
              </div>
            </li>
            <li className="shared-files__list-item">
              <div className="shared-file">
                <div className="shared-file--left icon-container">
                  <BsFileEarmarkMinus size="20" />
                </div>
                <div className="shared-file__details">
                  <span className="shared-file__name text-black text-sm">Mockups.zip</span>
                  <span className="shared-file__time text-gray">Oct 21, 2021 at 02:07</span>
                </div>
                <div className="shared-file--right">
                    <span></span>
                  <span className="shared-file__size text-gray text-sm">1.86mb</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="divider" />
        <div className="shared-links">
          <div className="shared-files__header">
            <span className="text-black text-lg">Shared Links</span>
            <span className="text-sm">See all</span>
          </div>
          <ul className="shared-files__list">
            <li className="shared-files__list-item">
              <div className="shared-file">
                <div className="shared-file__details">
                  <span className="shared-file__name text-black text-sm">dribble.com</span>
                  <span className="shared-file__time text-gray">Oct 21, 2021</span>
                </div>
                <div className="shared-file--right">
                  <span className="shared-file__size text-gray text-sm">1.86mb</span>
                </div>
              </div>
            </li>
            <li className="shared-files__list-item">
              <div className="shared-file">
                <div className="shared-file__details">
                  <span className="shared-file__name text-black text-sm">dribble.com</span>
                  <span className="shared-file__time text-gray">Oct 21, 2021</span>
                </div>
                <div className="shared-file--right">
                  <span className="shared-file__size text-gray text-sm">1.86mb</span>
                </div>
              </div>
            </li>
            <li className="shared-files__list-item">
              <div className="shared-file">
                <div className="shared-file__details">
                  <span className="shared-file__name text-black text-sm">dribble.com</span>
                  <span className="shared-file__time text-gray">Oct 21, 2021</span>
                </div>
                <div className="shared-file--right">
                  <span className="shared-file__size text-gray text-sm">1.86mb</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
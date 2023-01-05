import React from "react";
import { Form, redirect } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import { profileService } from '../../services/authService';

export async function action({ request }) {
  const formData = await request.formData();
  const formDataEntries = Object.fromEntries(formData);
  const data = await profileService({
    username: formDataEntries.username,
    email: formDataEntries.email,
    name: formDataEntries.fullname,
  });
  localStorage.setItem('user', JSON.stringify(data));
  return redirect('/chat');
}
  
const Profile = () => {
  const profile = JSON.parse(localStorage.getItem('user')).user
  const [formValues, setFormValues] = React.useState({
    username: profile.username,
    email: profile.email,
    fullname: profile.name,
  });

  const fileInputRef = React.useRef(null);

  const onFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const resetForm = () => setFormValues({
    username: '',
    email: '',
    fullname: '',
  })

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="container login_container">
      <div className="login_container-header">
        <div className="profile-img-container">
          <button
            className="upload-btn"
            onClick={handleFileClick}
          >
            <span><BiPencil /></span>
          </button>
          <input type="file" className="file" ref={fileInputRef} />
        </div>
        <h2 className="heading heading_2">{profile.username}</h2>
      </div>
      <Form method="post" className="form login_form">
        <div className="login_form-content">
          <input
           type="email"
           name="email"
           className="input"
           value={formValues.email}
           onChange={onFormChange}
           placeholder="Email"
          />
          <input
           type="text"
           name="username"
           className="input"
           value={formValues.username}
           onChange={onFormChange}
           placeholder="Username"
          />
          <input
           type="text"
           name="fullname"
           className="input"
           value={formValues.fullname}
           onChange={onFormChange}
           placeholder="Full name"
          />
          <div className="buttons">
            <button type="button" className="btn btn_login" onClick={resetForm}>Reset</button>
            <button type="submit" className="btn btn_login">Update</button>
          </div>
      </div>
     </Form>
    </div>
  );
};

export default Profile;

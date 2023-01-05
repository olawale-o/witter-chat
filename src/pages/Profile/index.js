import React from "react";
import { Form, redirect } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import { profileService } from '../../services/authService';

export async function action({ request }) {
  const formData = await request.formData();
  const data = await profileService(formData);
  localStorage.setItem('user', JSON.stringify(data));
  return redirect('/chat');
}
  
const Profile = () => {
  const profile = JSON.parse(localStorage.getItem('user')).user
  const [formValues, setFormValues] = React.useState({
    id: profile.id,
    username: profile.username,
    email: profile.email,
    name: profile.name,
    avatar: profile.avatar
  });

  const fileInputRef = React.useRef(null);
  const imgRef = React.useRef(null);
  const [image, setImage] = React.useState('');

  const onFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const resetForm = () => setFormValues({
    username: '',
    email: '',
    name: '',
    avatar: profile.avatar,
    id: profile.id,
  })

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const onFileChange = (e) => {
    const fileUploaded = URL.createObjectURL(e.target.files[0]);
    setImage(fileUploaded);
  };

  return (
    <div className="container login_container">
      <div className="login_container-header">
        <div className="profile-img-container">
          {image && (<img src={image} ref={imgRef} alt="avatar" />)}
          <button
            className="upload-btn"
            onClick={handleFileClick}
          >
            <span><BiPencil /></span>
          </button>
        </div>
        <h2 className="heading heading_2">{profile.username}</h2>
      </div>
      <Form method="post" className="form login_form" encType="multipart/form-data">
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
           name="name"
           className="input"
           value={formValues.name}
           onChange={onFormChange}
           placeholder="Full name"
          />
          <input
           type="hidden"
           name="avatar"
           className="input"
           value={formValues.avatar}
          />
          <input
           type="hidden"
           name="id"
           className="input"
           value={formValues.id}
          />
          <input
            type="file"
            className="file"
            ref={fileInputRef}
            onChange={onFileChange}
            accept="image/png, image/jpeg"
            name="profile"
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

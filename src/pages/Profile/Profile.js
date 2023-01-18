import React from "react";
import { Form, redirect, useNavigate, useLoaderData, useOutletContext } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import { profileService } from '../../services/authService';

export async function loader() {
  return { 
    data: JSON.parse(localStorage.getItem('user')),
    newProfile: JSON.parse(localStorage.getItem('profile')),
  }
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = await profileService(formData);
  localStorage.setItem('user', JSON.stringify(data));
  localStorage.setItem('profile', true);
  return redirect('/profile');
}
  
const Profile = () => {
  const navigate = useNavigate();
  const [socket] = useOutletContext();
  const { newProfile, data } = useLoaderData();
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
  const [image, setImage] = React.useState(profile.avatar || 'https://images.pexels.com/photos/10758999/pexels-photo-10758999.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load');
  const canvasRef = React.useRef(null);

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

  const compressImage = async (file, { quality = 1, type = file.type }) => {
    // Get as image data
    const imageBitmap = await createImageBitmap(file);

    // Draw to canvas
    const canvas = document.createElement('canvas');
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imageBitmap, 0, 0);

    // Turn into Blob
    const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, type, quality)
    );

    // Turn Blob into File
    return new File([blob], file.name, {
        type: blob.type,
    });
  };

  const cropImage = (image) => {
    // use min size so we get a square
    const size = Math.min(image.naturalWidth, image.naturalHeight);
    // let's update the canvas size
    canvasRef.current.width = size;
    canvasRef.current.height = size;

    // draw image to canvas
    const ctx = canvasRef.current.getContext('2d');
    ctx.drawImage(image, 0, 0);

    // only draw image where mask is
    ctx.globalCompositeOperation = 'destination-in';

    // draw our circle mask
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(
      size * 0.5, // x
      size * 0.5, // y
      size * 0.5, // radius
      0, // start angle
      2 * Math.PI // end angle
    );
    ctx.fill();
    // restore to default composite operation (is draw over current image)
    ctx.globalCompositeOperation = 'source-over';
    // show canvas
    canvasRef.current.hidden = false;
  };

  const onFileChange = async (e) => {
    const fileUploaded = URL.createObjectURL(e.target.files[0]);
    const image = new Image();
    image.onload = cropImage(image);
    image.src = fileUploaded;
    setImage(fileUploaded);
  };

  React.useEffect(() => {
    if (newProfile) {
      socket.emit('profile change', { user: data.user });
      navigate('/chat');
    }
    const imageObj = new Image();

    imageObj.onload = () => cropImage(imageObj);
    imageObj.src = image;
    
  }, [data, navigate, socket, newProfile, image]);


  return (
    <div className="container login_container">
      <div className="login_container-header">
        <div className="profile-img-container">
          <canvas ref={canvasRef} hidden />
          <img src={image} ref={imgRef} alt="avatar" style={{ display: 'none' }} />
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
           value={formValues.avatar || ''}
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

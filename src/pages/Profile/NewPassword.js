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
  
const NewPassword = () => {
  const navigate = useNavigate();
  const [socket] = useOutletContext();
  const { newProfile, data } = useLoaderData();
  const profile = JSON.parse(localStorage.getItem('user')).user
  const [formValues, setFormValues] = React.useState({
    id: profile.id,
    password: profile.password,
    confirmPassword: profile.confirmPassword,
  });

  const image = React.useRef(profile.avatar || 'https://images.pexels.com/photos/10758999/pexels-photo-10758999.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load');
  const canvasRef = React.useRef(null);

  const onFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const resetForm = () => setFormValues({
    password: '',
    confirmPassword: '',
    id: profile.id,
  })

  const cropImage = (image) => {
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

  React.useEffect(() => {
    if (newProfile) {
      socket.emit('profile change', { user: data.user });
      navigate('/chat');
    }
    const imageObj = new Image();

    imageObj.onload = () => cropImage(imageObj);
    imageObj.src = image.current;
    
  }, [data, navigate, socket, newProfile, image]);


  return (
    <div className="container login_container">
      <div className="login_container-header">
        <div className="profile-img-container">
          <canvas ref={canvasRef} hidden />
        </div>
        <h2 className="heading heading_2">{profile.username}</h2>
      </div>
      <Form method="post" className="form login_form" encType="multipart/form-data">
        <div className="login_form-content">
          <input
           type="password"
           name="password"
           className="input"
           value={formValues.password}
           onChange={onFormChange}
           placeholder="*********"
          />
          <input
           type="password"
           name="confirmPassword"
           className="input"
           value={formValues.confirmPassword}
           onChange={onFormChange}
           placeholder="*********"
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

export default NewPassword;

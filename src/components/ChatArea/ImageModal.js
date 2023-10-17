import './ChatArea.css';

const ImageModal = ({ src, action }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="image-placeholder">
          <img className="modal-image" src={src} alt="preview" />
        </div>
        <button type="button" className="btn modal-btn w--100 bg-green" onClick={action}>Send</button>
      </div>
    </div>
  );
};

export { ImageModal };

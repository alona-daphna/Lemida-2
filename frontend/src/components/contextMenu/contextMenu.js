import './contextMenu.css';

const ContextMenu = ({ onClose, onPinClick, onDeleteClick }) => {
  const handlePinClick = () => {
    onPinClick();
    onClose();
  };

  const handleDeleteClick = () => {
    onDeleteClick();
    onClose();
  };

  return (
    <div className="contact-menu">
      <div className="option" onClick={handlePinClick}>
        Pin
      </div>
      <div className="option" onClick={handleDeleteClick}>
        Delete
      </div>
    </div>
  );
};

export default ContextMenu;

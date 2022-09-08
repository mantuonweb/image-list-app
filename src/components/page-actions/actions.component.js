import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PublishIcon from '@material-ui/icons/Publish';
import SaveIcon from '@material-ui/icons/Save';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import { setStoreImage, addImageItem } from './../../store/imageSlice';
export default function PageActions() {
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState('');

  const [imageTitle, setImageTitle] = React.useState('');
  const [imageDescription, setImageDescription] = React.useState('');
  const [imageTags, setImageTags] = React.useState('');

  const currentImage = useSelector((state) => {
    return state.imageManagement.currentImage;
  });
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    if (image && imageTitle && imageDescription && imageTags) {
      dispatch(
        addImageItem({
          image,
          title: imageTitle,
          description: imageDescription,
          tags: imageTags,
        })
      );
    }
  };
  const onFileSelect = async (e) => {
    const files = e?.target?.files;
    if (files && files.length) {
      const file = files[0];
      const format = file.type;
      if (format?.includes('image')) {
        const _imageBase64Data = await fileToBase64(file);
        setImage(_imageBase64Data);
        dispatch(setStoreImage(_imageBase64Data));
      }
    }
  };
  const fileToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (e) => reject(e);
    });
  };
  const handleImage = (e) => {
    onFileSelect(e);
  };

  function onImageTitleChange(event) {
    setImageTitle(event?.target?.value);
  }
  function onImageDescriptionChange(event) {
    setImageDescription(event?.target?.value);
  }
  function onImageTagsChange(event) {
    setImageTags(event?.target?.value);
  }
  return (
    <div className="action-list">
      <input
        hidden
        accept="image/*"
        id="icon-button-file"
        type="file"
        onChange={handleImage}
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PublishIcon />
        </IconButton>
      </label>
      <IconButton
        disabled={!image}
        aria-label="save"
        color="primary"
        component="span"
        onClick={handleOpen}
      >
        <SaveIcon />
      </IconButton>
      <IconButton disabled aria-label="more">
        <MoreHorizIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Save Image?'}</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
            <img className="modal-image" src={currentImage} />
            <TextField
              id="image-title"
              label="Title"
              onChange={onImageTitleChange}
            />
            <TextField
              id="image-description"
              label="Description"
              onChange={onImageDescriptionChange}
            />
            <TextField
              id="standard-tags"
              label="tags"
              onChange={onImageTagsChange}
            />
            <div></div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleClose}
            color="primary"
            disabled={!(imageTitle && imageDescription && imageTags)}
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

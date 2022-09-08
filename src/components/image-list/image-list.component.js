import React from 'react';
import ImageCard from './../card/card-image';
import { useSelector } from 'react-redux';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import Typography from '@material-ui/core/Typography';

export default function ImageList() {
  const imageList = useSelector((state) => {
    return state.imageManagement.imageList.filter(
      (item) =>
        item.title?.includes(state.imageManagement.searchText) ||
        item.description?.includes(state.imageManagement.searchText)
    );
  });
  return imageList?.length ? (
    <div className="image-list">
      {imageList.map((imageItem) => (
        <ImageCard className="image-container" image={imageItem}></ImageCard>
      ))}
    </div>
  ) : (
    <div className="no-image">
      <div>
        <Typography variant="h6" noWrap></Typography>
        <div>
          <NotInterestedIcon />
        </div>
      </div>
    </div>
  );
}

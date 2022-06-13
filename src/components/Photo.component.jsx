import React, { useState } from "react";
import InfinitePhoto from "./InfinitePhoto.component";
import Sidebar from "./Sidebar.component";

const Photo = () => {
  const [albumId, setalbumId] = useState(1);
  const url = `https://demo-api11101997.herokuapp.com/photos/getallphotos?page=1&albumId=${albumId}`;
  const album_URL = `https://demo-api11101997.herokuapp.com/photos/getallalbum?_page=1&_limit=10`;

  const albumIDfromSideBar = (id) => {
    setalbumId(id);
  };

  return (
    <div className="wrapper d-flex align-items-stretch">
      <Sidebar initialUrl={album_URL} setAlbId={albumIDfromSideBar} />
      <InfinitePhoto
        initialUrl={url}
        QueryID={"photos" + albumId}
        albumId={albumId}
      />
    </div>
  );
};

export default Photo;

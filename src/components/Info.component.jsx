import React from "react";

const info1 = (props) => {
  const { thumbnailUrl, title, id, albumId } = props.albuminfo;
  return (
    <>
      <div className="col-lg-4">
        <div className="card">
          <img src={thumbnailUrl} className="card-img-top" alt="Waterfall" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">Album ID : {albumId}</p>
            <p className="card-text">Photo ID : {id}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default info1;

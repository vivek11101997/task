import React from "react";
import { useInfiniteQuery } from "react-query";
import { Link, NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { FadeLoader } from "react-spinners";

const Sidebar = ({ initialUrl, setAlbId }) => {
  const fetchUrl = async (url) => {
    const response = await fetch(url, { mode: "cors" });
    return response.json();
  };

  const { data, fetchNextPage, hasNextPage, isLoading, isError, isFetching } =
    useInfiniteQuery(
      "fetch_albums",
      ({ pageParam = initialUrl }) => fetchUrl(pageParam),
      { getNextPageParam: (lastPage) => lastPage.next || undefined }
    );

  if (isLoading) {
    return (
      <div className="col-md-3 pb-3">
        <div
          style={{ textAlign: "center" }}
          className="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm"
        >
          <Skeleton height={168} width={266} />
          <Skeleton height={18} width={266} />
          <Skeleton height={18} width={266} />
        </div>
      </div>
    );
  }

  if (isError) return <div className="loading">Something want wrong</div>;
  return (
    <>
      {isFetching && (
        <div className="loading">
          <FadeLoader
            height={15}
            radius={1}
            width={3}
            margin={5}
            loading
            color="#FE5EFA"
            speedMultiplier={1.5}
          />
        </div>
      )}
      <nav id="sidebar">
        <div className="p-4 pt-5">
          <h1>
            <Link to="/photos/1" className="logo">
              DEMO
            </Link>
          </h1>
          <ul className="list-unstyled components mb-5">
            {data.pages.map((pageData) => {
              return pageData.content.map((albuminfo) => {
                return (
                  <li
                    key={albuminfo.id}
                    onClick={() => {
                      setAlbId(albuminfo.id);
                    }}
                  >
                    {/* <Link to={`/photos/` + albuminfo.id}>{albuminfo.id}</Link> */}
                    <NavLink
                      to={`/photos/` + albuminfo.id}
                      activeStyle={{
                        fontWeight: "900",
                        Color: "#0080FF",
                      }}
                    >
                      {`Album  ` + albuminfo.id}
                    </NavLink>
                  </li>
                );
              });
            })}
          </ul>
          <button
            disabled={!hasNextPage}
            onClick={fetchNextPage}
            type="button"
            className="btn btn-primary"
          >
            Load More
          </button>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;

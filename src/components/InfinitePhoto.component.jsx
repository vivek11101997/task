import React from "react";
import Skeleton from "react-loading-skeleton";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import Info from "./Info.component";
import { FadeLoader } from "react-spinners";

const fetchUrl = async (url) => {
  const response = await fetch(url, { mode: "cors" });
  return response.json();
};

const InfinitePhoto = ({ initialUrl, QueryID, albumId }) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, isFetching } =
    useInfiniteQuery(
      QueryID,
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
    <div>
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
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        <div className="most_popular">
          <div className="row">
            <div id="content" className="p-4 p-md-5 pt-5">
              <div
                id="carouselMultiItemExample"
                className="carousel slide carousel-dark text-center"
                data-mdb-ride="carousel"
              >
                <div className="carousel-inner py-4">
                  <h5 className="m-0">Album {albumId}</h5>
                  <div className="carousel-item active">
                    <div className="container">
                      <div className="row">
                        {data.pages.map((pageData) => {
                          return pageData.content.map((albuminfo) => {
                            return (
                              <Info key={albuminfo.id} albuminfo={albuminfo} />
                            );
                          });
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default InfinitePhoto;

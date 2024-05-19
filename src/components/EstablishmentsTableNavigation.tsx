import React from "react";
import "./EstablishmentsTableNavigation.css";

type EstablishmentsTableNavigationType = {
  pageNum: number;
  pageCount: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

export const EstablishmentsTableNavigation = (
  props: EstablishmentsTableNavigationType
) => {
  const { pageNum, pageCount, onPreviousPage, onNextPage } = props;
  return (
    <nav>
      <button
        type="button"
        className="button"
        disabled={pageNum <= 1}
        onClick={onPreviousPage}
      >
        Previous
      </button>
      <span>{pageNum}</span>
      <button
        type="button"
        className="button"
        disabled={pageNum >= pageCount}
        onClick={onNextPage}
      >
        Next
      </button>
    </nav>
  );
};

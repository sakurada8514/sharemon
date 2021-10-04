import React from "react";

type LoadMoreButtonProps = {
  loadMore: () => void;
};

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ loadMore }) => {
  return (
    <div className="flex justify-center">
      <button className="text-gray-500 text-sm py-4" onClick={loadMore}>
        さらに読み込む…
      </button>
    </div>
  );
};
export default LoadMoreButton;

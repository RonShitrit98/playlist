export const postService = {
  getPlaylistGrid,
  getNewPost,
  handlePostPlacment,
};

function getPlaylistGrid(height = 6) {
  var grid = [];
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < 3; j++) {
      grid.push({
        row: i + 1,
        col: j + 1,
      });
    }
  }
  return grid;
}

function handlePostPlacment(position, tile) {
  console.log(position, tile);
  if (!position.cols.length) {
    position.row = tile.row;
    position.cols.push(tile.col);
  } else if (position.row !== tile.row) {
    (position.row = tile.row), (position.cols = [tile.col]);
  } else if (position.cols.includes(tile.col)) {
    const idx = position.cols.findIndex((col) => col === tile.col);
    if (
      (idx === 0 || !idx < position.cols.length - 1) &&
      position.cols.length > 1
    ) {
      position.cols.splice(idx, 1);
    } else return;
  } else {
    position.cols.push(tile.col);
  }
  position.cols.sort((a, b) => a - b);
  if (
    position.cols.length === 2 &&
    position.cols[1] === 3 &&
    position.cols[0] === 1
  )
    position.cols.splice(1, 0, 2);
  return position;
}

function getNewPost() {
  return {
    style: {
      position: {
        cols: [],
      },
    },
    media: [],
    createdAt: null,
    createdBy: null,
  };
}

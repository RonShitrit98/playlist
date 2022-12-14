export const postService = {
  getPlaylistGrid,
  getNewPost,
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

function getNewPost() {
  return {
    title: "",
    description: "",
    type: "",
    style: {
      position: {
        cols: [],
      },
    },
    media: {},
    createdAt: null,
    createdBy: null,
  };
}

const modData = useMemo(
    () => [
      {
        faculty: 13,
        pubs: 31,
        adj: 3,
      },
      {
        faculty: 14,
        pubs: 1,
        adj: 6,
      },
      {
        faculty: 15,
        pubs: 2,
        adj: 3,
      },
      {
        faculty: 15,
        pubs: 5,
        adj: 63,
      },
    ],
    []
);

// TODO: add filter for areas so only relevant faculties are returned
// endpoint returns data for expnded section for one university
// this could be used to separate the data for the main rows and expanded rows
export default (req, res) => {
    res.status(200).json(modData);
};
  
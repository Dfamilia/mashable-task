exports.getItems = (req, res) => {
  const navList = [
    { type: 'home', name: 'Mashable', category: null },
    { type: 'none', name: 'VIDEO', category: null },
    { type: 'dd', name: 'ENTERTAINMENT', category: ['Entertainment', 'Comedy', 'Movie', 'TV', 'Music'] },
    { type: 'dd', name: 'CULTURE', category: [] },
    { type: 'dd', name: 'TECH', category: [] },
    { type: 'dd', name: 'SCIENCE', category: [] },
    { type: 'dd', name: 'SOCIAL GOOD', category: [] },
    { type: 'ddl', name: 'SHOP', category: [] },
    { type: 'ddl', name: 'MORE', category: [] },
  ];

  res.send(navList);
};

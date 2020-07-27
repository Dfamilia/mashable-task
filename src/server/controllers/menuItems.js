exports.getItems = (req, res) => {
  const navList = [
    { type: 'home', name: 'Mashable' },
    { type: 'none', name: 'VIDEO' },
    { type: 'dd', name: 'ENTERTAINMENT' },
    { type: 'dd', name: 'CULTURE' },
    { type: 'dd', name: 'TECH' },
    { type: 'dd', name: 'SCIENCE' },
    { type: 'dd', name: 'SOCIAL GOOD' },
    { type: 'ddl', name: 'SHOP' },
    { type: 'ddl', name: 'MORE' },
  ];

  res.send(navList);
};

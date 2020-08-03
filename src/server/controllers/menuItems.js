exports.getItems = (req, res) => {
  const navList = [
    { type: 'home', name: 'Mashable', category: null },
    { type: 'none', name: 'VIDEO', category: null },
    { type: 'dd', name: 'ENTERTAINMENT', category: ['Entertainment', 'Comedy', 'Movie', 'TV', 'Music'] },
    { type: 'dd', name: 'CULTURE', category: ['Culture', 'Celebrities', 'Media', 'Sex', 'Art'] },
    { type: 'dd', name: 'TECH', category: ['Tech', 'Mobile', 'Home', 'Business'] },
    { type: 'dd', name: 'SCIENCE', category: ['Science', 'Space', 'Climate'] },
    { type: 'dd', name: 'SOCIAL GOOD', category: ['Social', 'Lgbt', 'Activism'] },
    { type: 'ddl', name: 'SHOP', category: ['Tech', 'Life', 'Culture', 'Tech', 'Life', 'Culture'] },
    { type: 'ddl', name: 'MORE', category: ['Tech', 'Life', 'Culture', 'Tech', 'Life', 'Culture'] },
  ];

  res.send(navList);
};

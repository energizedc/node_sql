inquirer
  .prompt([
    {
      type: 'expand',
      name: 'manager',
      message: 'Please choose a selection',
      choices: [
        {
          key: 'a',
          value: 'View Products For Sale',
        },
        {
          key: 'b',
          value: 'View Low Inventory',
        },
        {
            key: 'c',
            value: 'Add To Inventory',
          },
          {
            key: 'd',
            value: 'Add New Product',
          },
      ],
    },
  ])
  .then(answers => {
    console.info('Answer:', answers.manager);
  });

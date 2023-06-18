import models from '../models/init-models';

const seedUsers = async () => {
  try {

    if (models.users.count() > 0) {
      console.log('Data User already seeded');
    } else {
      const users = [
        { userId: '01177b41-0e90-4e29-a1c4-7f8a0af54bf0', userName: 'John Doe'},
        { userId: 'e947a507-43b9-4bb8-8158-9695c3ab09f7', userName: 'Jane Smith'},
      ];


      for (let user of users) {
        await models.users.create(user);
        console.log(`User ${user.userName} created`);
      }
    }
  } catch (error) {
      console.error('Seeder error:', error);
    }
};

export default  {
  seedUsers
};

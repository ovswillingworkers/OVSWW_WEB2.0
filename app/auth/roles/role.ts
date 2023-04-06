export enum Role {
    Admin = 'admin',
    Moderator = 'moderator',
    User = 'user',
  }
  
  export const permissions = {
    [Role.Admin]: {
      Post: {
        read: true,
        create: true,
        update: true,
        delete: true,
        // add any additional permissions for admin here
      },
    
      // add any additional models for admin here
    },
    [Role.Moderator]: {
      Post: {
        read: true,
        create: true,
        update: true,
        delete: true, // moderators can't delete posts
        // add any additional permissions for moderator here
      },
    
      // add any additional models for moderator here
    },

  };
  
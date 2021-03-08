import {User} from '../user/user.model';

export default {
  Message: {
    from: async (message) => {
      const foundSender = await User.findById(message.from);
      if (foundSender) return foundSender;
      throw new Error(`User with id: ${message.from} doesn't exist`);
    }
  }
};

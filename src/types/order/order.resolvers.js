import {User} from '../user/user.model';

export default {
  Order: {
    lead: async (order) => {
      const foundLead = await User.findById(order.lead);
      if (foundLead) return foundLead;
      throw new Error(`User with id: ${order.lead} doesn't exist`);
    }
  }
};

import { Op } from "sequelize";

class UserBusiness {
  condition(filters: any) {
    const condition = {
      age: { [Op.like]: filters.age },
    };

    return condition;
  }
}

export default UserBusiness;

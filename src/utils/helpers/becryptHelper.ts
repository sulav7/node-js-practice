import bcryptjs from "bcryptjs";
const bcryptPassword = async (password: string): Promise<string> => {
  const hash = await bcryptjs.genSalt(10);
  const hashedPassword = bcryptjs.hash(password, hash);

  return hashedPassword;
};

export { bcryptPassword };

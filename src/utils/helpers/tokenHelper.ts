import uuid from "uuid-with-v6";

const token = (): string => {
  return uuid.v6();
};

export default token;

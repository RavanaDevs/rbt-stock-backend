import token from "../models/token";

export const saveToken = async (t: String) => {
  await token.create({ token: t });
  console.log("token saved");
};

export const deleteToken = async (t: String) => {
  await token.deleteOne({ token: t });
  console.log("Token deleted")
};

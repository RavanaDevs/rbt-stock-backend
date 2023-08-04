import token from "../models/token";

export const saveToken = async (t: String) => {
  const tokenExist = await token.findOne({ token: t }).exec();
  console.log(tokenExist)
  if (tokenExist ) {
    console.log("Token exists");
    return;
  }

  await token.create({ token: t });
  console.log("Token saved");
};

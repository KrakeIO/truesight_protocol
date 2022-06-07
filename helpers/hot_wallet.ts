import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY_STRING = process.env.HOT_WALLET_SECRET_KEY;

export {
  SECRET_KEY_STRING
};
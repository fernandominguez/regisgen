module.exports = {
  DEFAULT_LOCALE: "es",
  LOCALES: ["es", "en"],
  LOCALES_PATH: "./config/locales",
  MYSQL_HOST: "mysql-server",
  MYSQL_USER: "regisgen",
  MYSQL_PASSWORD: "negsiger",
  MYSQL_DATABASE: "regisgen",
  PORT: 5000,
  SALT: "$2a$10$wENMOiXaNvkXN9BmCbh4ZO",
  TOKEN_EXPIRE_TIME: 12,
  TOKEN_EXPIRE_UNITS: "hours",
  TOKEN_SECRET: process.env.TOKEN_SECRET || "R3g1Sg3Ns3cR3tK3y",
  UPLOAD_DIR: "./tmp/upload/",
  DOWNLOAD_DIR: "./tmp/download/"
};

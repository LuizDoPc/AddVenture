module.exports = {
  dialect: "postgres",
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true
    }
  },
  host: "ec2-54-243-47-196.compute-1.amazonaws.com",
  username: "vapedhxvkccgys",
  password: "6ffc534833ab051c793b327f6d38bc7135d68c200e224be1215639ca95a7f466",
  database: "df8je49nh2c3cv",
  port: "5432",
  define: {
    timestamps: true,
    underscored: true
  },
  logging: false
};

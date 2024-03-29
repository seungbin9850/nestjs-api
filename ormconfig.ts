import config from './src/config';
import { ConnectionOptions } from 'typeorm';
import { User } from './src/entities';
import { Post } from 'src/entities/post.entity';

const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  host: config.mysql.host,
  port: 3306,
  username: config.mysql.username,
  password: config.mysql.password,
  database: config.mysql.name,
  synchronize: true,
  logging: true,
  timezone: '+09:00',
  entities: [User, Post],
};

export default connectionOptions;

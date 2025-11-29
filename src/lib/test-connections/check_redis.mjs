import { createClient } from 'redis';
import dotenv  from 'dotenv'

dotenv.config();

// Initialize Redis
const redis = await createClient({ url: process.env.REDIS_URL}).connect();

const keys = await redis.keys('*');
console.log('All Redis Keys:', keys);
const result = await redis.get("item");
console.log(result)


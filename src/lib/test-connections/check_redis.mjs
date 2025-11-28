import { createClient } from 'redis';


// Initialize Redis
const redis = await createClient({ url: process.env.REDIS_URL}).connect();

await redis.set("item", "water")
const result = await redis.get("item");
console.log(result)


import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}


declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}
const clientOptions = {
  serverSelectionTimeoutMS: 5000, 
  connectTimeoutMS: 10000, 
  maxPoolSize: 10,
  retryWrites: true,
  tls: true,
  tlsAllowInvalidCertificates: true, 
  tlsAllowInvalidHostnames: true, 

  maxIdleTimeMS: 30000,
  socketTimeoutMS: 45000,

  retryReads: true,
  heartbeatFrequencyMS: 30000,
};

const createClientPromise = (): Promise<MongoClient> => {
  const mongoClient = new MongoClient(uri, clientOptions);
  
  return mongoClient.connect().catch((error) => {
    console.error('MongoDB connection failed:', error.message);
    console.log('MongoDB operations will be disabled due to connection failure');
    throw error;
  });
};

if (process.env.NODE_ENV === 'development') {
  
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = createClientPromise();
  }
  clientPromise = global._mongoClientPromise;
} else {
  
  clientPromise = createClientPromise();
}
process.on('unhandledRejection', (reason, promise) => {
  if (reason && typeof reason === 'object' && 'name' in reason) {
    const error = reason as Error;
    if (error.name === 'MongoServerSelectionError' || error.name === 'MongoNetworkError') {
      console.error('MongoDB connection error handled:', error.message);
      return;
    }
  } console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

export default clientPromise; 
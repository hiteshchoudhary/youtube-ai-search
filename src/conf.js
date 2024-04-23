const conf = {
  brightDataApiToken: String(process.env.BRIGHT_DATA_API_TOKEN),
  brightDataCollectorId: String(process.env.BRIGHT_DATA_COLLECTOR_ID),
  appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
  appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID),
};

export default conf;

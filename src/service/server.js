import conf from "@/conf";
import { Client, Databases, ID, Query } from "appwrite";

export class Service {
  appwriteClient = new Client();

  /** @type { Databases } */
  databases;

  constructor() {
    this.appwriteClient.setEndpoint(conf.appwriteUrl);
    this.appwriteClient.setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.appwriteClient);
  }

  /**
   * @param { { keywords: string; query: string } } body
   */
  async triggerScraping(body) {
    try {
      // Check if we have pending data in database
      const allCollectorDocument = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId
      );

      const emptyCollectorDocument = allCollectorDocument.documents.filter(
        (d) => !d.collections
      );

      if (emptyCollectorDocument.length > 0)
        throw new Error("We already have a pending request, please wait...");

      // Trigger Web Scrapping
      const response = await fetch(
        `https://api.brightdata.com/dca/trigger?collector=${conf.brightDataCollectorId}&queue_next=1`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${conf.brightDataApiToken}`,
          },
          body: JSON.stringify(body),
        }
      );

      /** @type {{ collection_id: string; start_eat: string }} */
      const data = await response.json();

      // Save Triggure
      const document = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          ...body,
          collectionId: data.collection_id,
          collections: null,
        }
      );

      return {
        success: true,
        message: "Created",
        data: document,
      };
    } catch (error) {
      return {
        success: false,
        message: String(error?.message) || "Internal Server Error...",
      };
    }
  }

  async insertScrappedData(data) {
    try {
      const allCollectorDocument = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId
      );

      const emptyCollectorDocument = allCollectorDocument.documents.filter(
        (d) => !d.collections
      );

      if (emptyCollectorDocument.length === 0)
        throw new Error("No pending collection available");

      const document = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        emptyCollectorDocument[0].$id,
        {
          collections: data ? JSON.stringify(data) : null,
        }
      );

      return {
        success: true,
        message: "Inserted",
        data: document,
      };
    } catch (error) {
      return {
        success: false,
        message: String(error?.message) || "Internal Server Error...",
      };
    }
  }

  async getScrappedData(id) {
    try {
      const collectorDocument = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id
      );

      return {
        success: true,
        message: "Queries Fetched",
        data: collectorDocument,
      };
    } catch (error) {
      return {
        success: false,
        message: error?.message || "Internal Server Error",
      };
    }
  }
}

const service = new Service();

export default service;

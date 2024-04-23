import conf from "@/conf";
import { Client, Databases, Query } from "appwrite";

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
   * @param {{query: string; keywords: string}} data
   * @returns {Promise<{ success: boolean; message: string; data?: import("appwrite").Models.Document }>}
   */
  async registerQuery(data) {
    try {
      const response = await fetch("/api/registerQuery", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const json = await response.json();

      return json;
    } catch (error) {
      return {
        success: false,
        message: error?.message || "Internal Server Error",
      };
    }
  }

  async getQueryList() {
    try {
      const allCollectorDocument = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId
      );

      const NonEmptyCollectorDocument = allCollectorDocument.documents.filter(
        (d) => d.collections
      );

      return {
        success: true,
        message: "Queries Fetched",
        data: {
          documents: NonEmptyCollectorDocument,
          total: allCollectorDocument.total,
        },
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

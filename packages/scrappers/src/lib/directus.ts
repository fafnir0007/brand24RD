import { Directus } from "@directus/sdk";
import { DirectusKV as DirectusKVSchema, env as envSchema } from "../schemas";

const {
  DIRECTUS_TOKEN,
  DIRECTUS_URL,
  CF_ACCESS_CLIENT_ID,
  CF_ACCESS_CLIENT_SECRET,
} = envSchema.parse(process.env);

const directusSDK = new Directus(DIRECTUS_URL, {
  auth: {
    staticToken: DIRECTUS_TOKEN,
  },
  transport: {
    headers: {
      "CF-Access-Client-Id": CF_ACCESS_CLIENT_ID,
      "CF-Access-Client-Secret": CF_ACCESS_CLIENT_SECRET,
    },
  },
});

export const directus = {
  getClient: () => directusSDK,
  getKVItem: async (key: string) => {
    const result = await directusSDK
      .items("kv")
      .readOne(key)
      .then(DirectusKVSchema.parse);
    return result.value;
  },
};

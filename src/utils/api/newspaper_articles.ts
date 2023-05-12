import { directusInstance, miliSearchInstance } from "./axiosConfiguration";

const getDirectusNewsPaperArticle = () => {
  return directusInstance
    .get("/items/newspaper_articles")
    .then((res) => res?.data);
};

const getMilisearchNewsPaperArticle = (param: string) => {
  return miliSearchInstance
    .get(`/indexes/news_article/search`, {
      params: {
        q: param,
      },
      headers: {
        // TODO: Key in env is not being injected, check why
        Authorization: `Bearer ${
          process.env.NEXT_PUBLIC_MEILI_SEARCH_KEY ??
          "45bfcd6483b1aeed26cc20594ecfe1be6dd9c82158489f18525ddcb61df34599"
        }`,
      },
    })
    .then((res) => res?.data?.hits);
};

export { getDirectusNewsPaperArticle, getMilisearchNewsPaperArticle };

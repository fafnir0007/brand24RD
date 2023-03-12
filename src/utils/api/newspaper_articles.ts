import { directusInstance, miliSearchInstance } from './axiosConfiguration';

const getDirectusNewsPaperArticle = () => {
  return directusInstance
    .get('/items/newspaper_articles')
    .then((res) => res?.data);
};

const getMilisearchNewsPaperArticle = (param: string) => {
  return miliSearchInstance
    .get(`/indexes/news_article/search`, {
      params: {
        q: param,
      },
    })
    .then((res) => res?.data?.hits);
};

export { getDirectusNewsPaperArticle, getMilisearchNewsPaperArticle };

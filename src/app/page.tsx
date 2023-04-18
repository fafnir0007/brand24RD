'use client';
import {
  getDirectusNewsPaperArticle,
  getMilisearchNewsPaperArticle,
} from '@/utils/api/newspaper_articles'
import LayoutWrapper from '@/ui/components/layout-wrapper/LayoutWrapper';
import AccordionLabel from '@/ui/base/accordion/Accordion'
import {useAppSelector, useAppDispatch} from '@/redux/hooks'
import {addArticles} from '@/redux/slices/articles'
import {getArticlesSelector, getSearchSelector} from '@/redux/selectors'
import { useQuery } from 'react-query'

export default function Home() {
  // Directus call
  // const {isLoading, data} = useQuery('items/newspaper_articles', getDirectusNewsPaperArticle)
  // MiliSearch call

  const dispatch = useAppDispatch()

  const search = useAppSelector(getSearchSelector)
  const articles = useAppSelector(getArticlesSelector)

  const { isLoading } = useQuery(
    ['/indexes/news_article/search', search],
    () => getMilisearchNewsPaperArticle(search),{
      onSuccess: data => dispatch(addArticles(data))
    }
  )

  return (
    <main>
        {isLoading ? null : <AccordionLabel highlight={search} data={articles}/> }
    </main>
  )
}

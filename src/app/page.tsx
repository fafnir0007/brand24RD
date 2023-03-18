'use client';
import SideBar from '@/ui/components/sidebar/Sidebar';
import sideBar from '@/utils/mock/sideBar';
import Header from '@/ui/components/header/Header';
import user from '@/utils/mock/header';
import {
  getDirectusNewsPaperArticle,
  getMilisearchNewsPaperArticle,
} from '@/utils/api/newspaper_articles'
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
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar data={sideBar} />
        <div style={{ width: '100%' }}>
          <Header user={user}/>
          {/* {isLoading ? null : <AccordionLabel highlight={search} data={articles}/> } */}
        </div>
      </div>
    </main>
  )
}

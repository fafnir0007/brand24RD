'use client';
import {
  getDirectusNewsPaperArticle,
  getMilisearchNewsPaperArticle,
} from '@/utils/api/newspaper_articles'
import AccordionLabel from '@/ui/base/accordion/Accordion'
import {useAppSelector, useAppDispatch} from '@/redux/hooks'
import {addArticles} from '@/redux/slices/articles'
import {updateNewsPaperOptions} from '@/redux/slices/newspaper-options'
import {getArticlesSelector, getSearchSelector, getCheckBoxNewsPaperListSelector} from '@/redux/selectors'
import { useQuery } from 'react-query'
import CheckboxList from '@/ui/components/checkbox-list/CheckBoxList';
import useStyles from './pageCss'

export default function Home() {
  // Directus call
  // const {isLoading, data} = useQuery('items/newspaper_articles', getDirectusNewsPaperArticle)
  // MiliSearch call

  const dispatch = useAppDispatch()

  const search = useAppSelector(getSearchSelector)
  const articles = useAppSelector(getArticlesSelector)
  const newsPaperCheckBoxList = useAppSelector(getCheckBoxNewsPaperListSelector)

  const { isLoading } = useQuery(
    ['/indexes/news_article/search', search],
    () => getMilisearchNewsPaperArticle(search),{
      onSuccess: data => dispatch(addArticles(data))
    }
  )
  console.log(newsPaperCheckBoxList)

  const { classes } = useStyles();
  
  return (
    <main>
      <div className={classes.root}>
          <div className={classes.accordionSection}>
            {isLoading ? null : <AccordionLabel highlight={search} data={articles}/> }
          </div>
          <div className={classes.checkBoxSection}>
            <span className={classes.sideBartitle}>Periodicos</span>
            <CheckboxList onChangeCheckBox={(value:number)=>{dispatch(updateNewsPaperOptions(value))}} list={newsPaperCheckBoxList} />
        </div>
      </div>
    </main>
  )
}

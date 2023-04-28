'use client';
import {
  getDirectusNewsPaperArticle,
  getMilisearchNewsPaperArticle,
} from '@/utils/api/newspaper_articles'
import AccordionLabel from '@/ui/base/accordion/Accordion'
import { Group } from '@mantine/core';

import { useState } from 'react';
import {useAppSelector, useAppDispatch} from '@/redux/hooks'
import {addArticles} from '@/redux/slices/articles'
import {updateNewsPaperOptions} from '@/redux/slices/newspaper-options'
import { updateSentimentOptions } from '@/redux/slices/sentiment-options';
import {getArticlesSelector, getSearchSelector, getCheckBoxNewsPaperListSelector, getCheckBoxSentimentListSelector} from '@/redux/selectors'
import { useQuery } from 'react-query'
import CheckboxList from '@/ui/components/checkbox-list/CheckBoxList';
import useStyles from './pageCss'
import { DatePicker } from '@mantine/dates';
import { DatesProvider, MonthPickerInput, DatePickerInput } from '@mantine/dates';

export default function Home() {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

  // Directus call
  // const {isLoading, data} = useQuery('items/newspaper_articles', getDirectusNewsPaperArticle)
  // MiliSearch call

  const dispatch = useAppDispatch()

  const search = useAppSelector(getSearchSelector)
  const articles = useAppSelector(getArticlesSelector)
  const newsPaperCheckBoxList = useAppSelector(getCheckBoxNewsPaperListSelector)
  const sentimentCheckBoxList = useAppSelector(getCheckBoxSentimentListSelector)

  const { isLoading } = useQuery(
    ['/indexes/news_article/search', search],
    () => getMilisearchNewsPaperArticle(search),{
      onSuccess: data => dispatch(addArticles(data))
    }
  )
console.log(sentimentCheckBoxList)
  const { classes } = useStyles();
  
  return (
    <main>
      <div className={classes.root}>
          <div className={classes.accordionSection}>
            {isLoading ? null : <AccordionLabel highlight={search} data={articles}/> }
          </div>
          <div className={classes.filterSideBarSection}>
            <span className={classes.sideBartitle}>Newspaper</span>
            <CheckboxList onChangeCheckBox={(value:number)=>{dispatch(updateNewsPaperOptions(value))}} list={newsPaperCheckBoxList} />
            
            <span className={classes.sideBartitle}>Sentiment Analysis</span>
            <CheckboxList onChangeCheckBox={(value:number)=>{dispatch(updateSentimentOptions(value))}} list={sentimentCheckBoxList} />

            <DatePickerInput mt="md" onChange={setValue} label="Pick date" type='range' placeholder="Pick date" />
        </div>
      </div>
    </main>
  )
}

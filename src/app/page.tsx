'use client';
import { useState } from 'react';
import SideBar from '@/ui/components/sidebar/Sidebar';
import sideBar from '@/utils/mock/sideBar';
import Header from '@/ui/components/header/Header';
import user from '@/utils/mock/header';
import {
  getDirectusNewsPaperArticle,
  getMilisearchNewsPaperArticle,
} from '@/utils/api/newspaper_articles';
import AccordionLabel from '@/ui/base/accordion/Accordion'

import { useQuery } from 'react-query';

export default function Home() {
  const [search, setSearch] = useState('casd');

  // Directus call
  // const {isLoading, data} = useQuery('items/newspaper_articles', getDirectusNewsPaperArticle)
  // MiliSearch call
  const { isLoading, data, refetch } = useQuery(
    ['/indexes/news_article/search', search],
    () => getMilisearchNewsPaperArticle(search)
  );

  const handleOnSearch = (e: any) => {
    setSearch(e.target.value);
    refetch();
  };

  return (
    <main>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar data={sideBar} />
        <div style={{ width: '100%' }}>
          <Header user={user} handleOnSearch={handleOnSearch} />
          {isLoading ? null :<AccordionLabel highlight={search} data={data}/> }
        </div>
      </div>
    </main>
  );
}

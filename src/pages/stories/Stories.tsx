import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useStores } from '../../hooks/useStores';

import { STORIES_PER_PAGE } from '../../config/pagination';

import { StoryListsTypes } from '../../types/story';

import MainLayout from '../../layouts/main/MainLayout';
import StoryListCard from '../../components/common/card/story/list/StoryListCard';
import Pagination from '../../components/common/pagination/Pagination';

import { Container } from '../../components/styled/container';
import { FullContent } from '../../components/styled/content';
import {Button, CircularProgressCustom} from '../../components/common/card/story/list-item/styles';

const Stories = () => {
  const params = useParams();
  const type = params.type as StoryListsTypes;

  const { storiesStore } = useStores();
const [Reload, SetReload]=useState<boolean>(false);
  const [IsLoading, SetLoading]=useState<boolean>(false);

  const [page, setPage] = useState<number>(1);

  const itemsList = storiesStore.stories;
  const totalCount = storiesStore.lists[type].length;

  useEffect(() => {
    SetLoading(true);

    async function fetchListAndItems() {
      setPage(1);
      await storiesStore.fetchStoriesList(type);
      await storiesStore.fetchListItems(type, 1);
    }
    fetchListAndItems().then(()=>    SetLoading(false));

    return () => {
      storiesStore.clearList();
    };
  }, [params.type, Reload]);

  useEffect(() => {
    SetLoading(true);

    if (itemsList?.length !== 0) {
      storiesStore.fetchListItems(type, page).then(()=>SetLoading(false));
    }
  }, [page,Reload]);

  return (
    <MainLayout>
      <Container>
        <FullContent>
          <Button onClick={()=>SetReload(!Reload)}>
            reload
          </Button>

          {IsLoading?<CircularProgressCustom  />:       <>
            <Pagination
              pagesCount={Math.floor(totalCount / STORIES_PER_PAGE)}
              currentPage={page}
              setPage={setPage}
          />
            <StoryListCard stories={itemsList}  /></>  }
        </FullContent>
      </Container>
    </MainLayout>
  );
};

export default observer(Stories);

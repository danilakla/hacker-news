import React from 'react';

import { formatTime } from '../../../../../utils/helpers/time';

import { ItemInterface } from '../../../../../types/item';

import { Wrapper, Title, Row, Score, Author, Time } from './styles';
import {CommentsCount, Source} from "../list-item/styles";

type Props = {
  story: ItemInterface;
};

const StorySingleCard: React.FC<Props> = ({ story }) => (
  <Wrapper>
    <Title>{story.title}</Title>
      <Row>
          <Source href={story.url} target="_blank">
              <Row>
                  ({story.url})
              </Row>
          </Source>
      </Row>

      <Row>
      <Score>{story.score} points</Score>| by
      <Author to={`/user/${story.by}`}>{story.by}</Author>
      <Time>{formatTime(story.time)}</Time>

    </Row>
      <Row>
          <CommentsCount>{story.descendants} comments</CommentsCount>

      </Row>
  </Wrapper>
);

export default StorySingleCard;

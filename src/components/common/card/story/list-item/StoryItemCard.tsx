import React from 'react';

import { StoryInterface } from '../../../../../types/story';

import {
  Wrapper,
  Score,
  Title,
  Source,
  Author,
  AuthorUnderline,
  Line,
  CommentsCount,
  Row,
  SourceLink,
} from './styles';
import {Time} from "../single/styles";
import {formatTime} from "../../../../../utils/helpers/time";

type Props = {
  story: StoryInterface;
};

const StoryItemCard: React.FC<Props> = ({ story }) => (
  <Wrapper>
    <Score>{story.score}</Score>

    <div>

      <SourceLink to={`/story/${story.id}`}>
        <Row>
          <Title>{story.title}</Title>
        </Row>
      </SourceLink>
      <Source href={story.url} target="_blank">
        <Row>
          ({story.domainUrl})
        </Row>
      </Source>
      <Row>
        <Author to={`/user/${story.by}`}>
          By <AuthorUnderline>{story.by}</AuthorUnderline>
        </Author>
        {(story.descendants || story.descendants === 0) && (
          <>
            <Line />
            <SourceLink to={`/story/${story.id}`}>
              <CommentsCount>{story.descendants} comments</CommentsCount>
            </SourceLink>

          </>
        )}
      </Row>
      <Time>{formatTime(story.time)}</Time>

    </div>
  </Wrapper>
);

export default StoryItemCard;

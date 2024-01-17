import { data as commentsData } from '../assets/dummy-data/comments-data';

import Comments from '../components/Comments';
import Wrapper from '../components/Wrapper';

export default function Commentspage() {
  return (
    <>
      <Wrapper>
        <Comments comments={commentsData} />
      </Wrapper>
    </>
  );
}

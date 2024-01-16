import cards from "./assets/dummy-data/data";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import AsideMenu from "./components/AsideMenu";
import Comments from "./components/Comments";
import { data as commentsData } from "./assets/dummy-data/comments-data";

export default function App() {
  return (
    <main className="grid grid-cols-[100px_1fr] min-h-screen place-items-center bg-slate-900">
      <AsideMenu />
      <div className="w-full py-4">
        <Wrapper>
          {cards.map((card) => (
            <Card data={card} key={card.id} />
          ))}
          <Comments comments={commentsData} />
        </Wrapper>
      </div>
    </main>
  );
}

import cards from './assets/data';
import Card from './components/Card';
import Wrapper from './components/Wrapper';

export default function App() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-900 px-4">
      <Wrapper>
        {cards.map((card) => (
          <Card data={card} key={card.id} />
        ))}
      </Wrapper>
    </main>
  );
}

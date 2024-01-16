import cards from './assets/dummy-data/cards-data';
import { data as commentsData } from './assets/dummy-data/comments-data';
import { footerData } from './assets/dummy-data/footer-data';

import Card from './components/Card';
import CardSearchForm from './components/CardSearchForm';
import Wrapper from './components/Wrapper';
import AsideMenu from './components/AsideMenu';
import Comments from './components/Comments';
import Footer from './components/Footer';

import { useState } from 'react';

export default function App() {
  const [searchName, setSearchName] = useState('');
  function handleChange(value: string): void {
    setSearchName(value);
  }

  const filteredCards = cards.filter((card) =>
    searchName
      ? card.name.toLowerCase().includes(searchName.toLowerCase()) ||
        card.name.toLowerCase().startsWith(searchName.toLowerCase())
      : true
  );

  return (
    <main className="grid min-h-screen grid-cols-[100px_1fr] place-items-center bg-slate-900">
      <AsideMenu />
      <div className="w-full py-4">
        <CardSearchForm onSearchName={handleChange} />
        <Wrapper>
          {filteredCards.length > 0 ? (
            filteredCards.map((card) => <Card data={card} key={card.id} />)
          ) : (
            <p className="pl-2 text-lg text-rose-500">Nie ma takiej karty</p>
          )}
          <Comments comments={commentsData} />
        </Wrapper>
      </div>
      <div className="col-start-2 w-full text-center">
        <Wrapper>
          <Footer footerData={footerData} />
        </Wrapper>
      </div>
    </main>
  );
}

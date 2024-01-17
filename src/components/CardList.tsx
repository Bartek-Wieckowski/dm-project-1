import { useState } from 'react';

import cards from '../assets/dummy-data/cards-data';

import Card from './Card';
import CardSearchForm from './CardSearchForm';
import Wrapper from './Wrapper';

export default function CardList() {
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
    <>
      <CardSearchForm onSearchName={handleChange} />
      <Wrapper>
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => <Card data={card} key={card.id} />)
        ) : (
          <p className="pl-2 text-lg text-rose-500">Nie ma takiej karty</p>
        )}
      </Wrapper>
    </>
  );
}

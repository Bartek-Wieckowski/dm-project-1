import { useState } from 'react';
// import cards from "../../assets/dummy-data/cards-data";
import Card from './Card';
import CardSearchForm from './CardSearchForm';
import Wrapper from '../Wrapper';
import { CardProps } from '../../types/CardProps.type';
import Loader from '../Loader';

interface ClientPropsType {
  cards: CardProps[];
}

export default function CardList({ cards }: ClientPropsType) {
  const [searchName, setSearchName] = useState('');

  function handleChange(value: string) {
    setSearchName(value);
  }

  const filteredCards = searchName
    ? cards.filter(
        (card) =>
          card.name.toLowerCase().includes(searchName.toLowerCase()) ||
          card.name.toLowerCase().startsWith(searchName.toLowerCase())
      )
    : cards;

  return (
    <>
      <CardSearchForm onSearchName={handleChange} />
      <Wrapper>
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => <Card {...card} key={card.id} />)
        ) : cards.length > 0 ? (
          <p className="pl-2 text-lg text-rose-500">Nie ma takiej karty</p>
        ) : (
          <Loader />
        )}
      </Wrapper>
    </>
  );
}

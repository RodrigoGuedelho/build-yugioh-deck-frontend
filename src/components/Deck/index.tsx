import deckService from "../../services/DeckService";
import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { CardPage } from "../../dtos/CardPage";
import { v4 as uuidv4 } from 'uuid';
import "./deck.css";
import { useRouter } from "next/router";

const { Meta } = Card;
function Deck() {
  const [cards, setCards] = useState<CardPage>();
  const router = useRouter();

  
  useEffect(() => {
    async function loadData() {
      if (router.query.id !== undefined) {
        const response = await deckService.findCards(Number(router.query.id), 10, 0);
        setCards(response.data);
      }
      
    }
    loadData();
  }, [router.query.id]);


  return (
    <main>
      <h1 className='title'>{'Deck de ' + router.query.description}</h1>
     
      <div className='card-container'>
      {cards && cards.content.map((card)=> {
          return (
            <Card key={uuidv4()}
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src={card.image} />}
            >
              <Meta title={card.name} description={card.description} />
            </Card>
          )
        })} 
      </div>
    </main>
  )
}

export default Deck;
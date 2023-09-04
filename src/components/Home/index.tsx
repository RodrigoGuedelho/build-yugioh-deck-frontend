import React, { useEffect, useState } from 'react';
import auth from '../../services/Auth';
import { Card } from 'antd';
import "./home.css";
import { DeckDTO } from '../../dtos/deckDTO';
import deckService from '../../services/DeckService';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import Banner from '../Banner';
import RegisterDeck from '../RegisterDeck';

const { Meta } = Card;
function Home() {
  const [decks, setDecks] = useState<DeckDTO[]>([]);
  const router = useRouter();
  const [openCreateDeck, setOpenCreateDeck] = useState<boolean>(false);

  function logout(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    auth.logout();
  }

  async function loadData() {
    const response = await deckService.findAll();
    setDecks(response.data);
  }
  useEffect(() => {
    loadData();
  }, []);

  return (
    <main className="">

      <Banner />
      <h1 className='title'>Sua Lista de Decks</h1>
      <div className='card-container'>
        <RegisterDeck open={openCreateDeck} setOpen={setOpenCreateDeck} loadDecks={loadData} />
        <Card className='card-new-deck' key={`card-deck-${uuidv4()}`}
              hoverable
              style={{ width: 240, height:240 }}
              cover={<img alt="deck" src="card.png" />}
              onClick={()=> setOpenCreateDeck(true)}
            >
              <Meta title={"Criar Deck"} description='' />
        </Card>

        {decks && decks.map((deck)=> {
          function navigateDeckPage() {
            router.push(`/deck?id=${deck.id}&&description=${deck.description}`)
          }
          return (
            <Card key={`card-deck-${deck.id}`}
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src="deck.png" />}
              onClick={navigateDeckPage}
            >
              <Meta title={deck.description} description='' />
            </Card>
          )
        })} 
      </div>
    </main>
  );
}

export default Home;
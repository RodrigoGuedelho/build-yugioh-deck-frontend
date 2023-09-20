import React, { useEffect, useState } from 'react';
import auth from '../../services/Auth';
import { Button, Card, Popconfirm, notification } from 'antd';
import "./home.css";
import { DeckDTO } from '../../dtos/deckDTO';
import deckService from '../../services/DeckService';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import Banner from '../Banner';
import RegisterDeck from '../RegisterDeck';
import { DeleteOutlined } from '@ant-design/icons';
import type { NotificationPlacement } from 'antd/es/notification/interface';

const { Meta } = Card;
function Home() {
  const [decks, setDecks] = useState<DeckDTO[]>([]);
  const router = useRouter();
  const [openCreateDeck, setOpenCreateDeck] = useState<boolean>(false);

  const [api, contextHolder] = notification.useNotification();
  const Context = React.createContext({ name: 'Default' });

  function logout(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    auth.logout();
  }

  async function deleteDeck(deckId: Number){
    try {
      const response = await deckService.remove(deckId);
      if (response.status === 204) {
        openNotificationSuccess("Operação realizada com sucesso.");
        loadData();
      }
    } catch (error: any) {
      openNotificationError(error.message);
    }
  }

  async function loadData() {
    const response = await deckService.findAll();
    setDecks(response.data);
  }
  useEffect(() => {
    loadData();
  }, []);


  function openNotificationError (message: string) {
    const placement: NotificationPlacement = 'topRight';
    api.error({
      message: `Notification`,
      description:  message,
      placement,
    });
  };

  function openNotificationSuccess (message: string) {
    const placement: NotificationPlacement = 'topRight';
    api.success({
      message: `Notification`,
      description:  message,
      placement,
    });
  };

  return (
    <main className="">
      {contextHolder}
      <Banner />
      <h1 className='title'>Sua Lista de Decks</h1>
      <div className='deck-container'>
        <RegisterDeck open={openCreateDeck} setOpen={setOpenCreateDeck} loadDecks={loadData} />
        
        <Card className='card-new-deck' key={`card-deck-${uuidv4()}`}
              hoverable
              style={{ width: 240}}
              cover={<img alt="deck" src="card.png" />}
              onClick={()=> setOpenCreateDeck(true)}
            >
              <Meta title={"Criar Deck"} description='' style={{ width: 240 }} />
        </Card>

        {decks && decks.map((deck)=> {
          function navigateDeckPage() {
            router.push(`/deck?id=${deck.id}&&description=${deck.description}`)
          }
          return (
            <Card key={`card-deck-${deck.id}`}
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src="deck.png" onClick={navigateDeckPage} />}   
            >
              <Meta title={deck.description} description='' style={{ width: 240 }}/>

              <Popconfirm
                  title="Remover Deck"
                  description="Você tem certeza que deseja remover esse deck?"
                  onConfirm={()=> deleteDeck(deck.id)}
                  onCancel={()=> console.log("sd")}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button className={"btn-delete"} type="primary" danger icon={<DeleteOutlined />} 
                  />
                </Popconfirm>
            </Card>
          )
        })}
      </div>
    </main>
  );
}

export default Home;
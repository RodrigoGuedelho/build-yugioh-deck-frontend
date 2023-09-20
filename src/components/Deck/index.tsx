import deckService from "../../services/DeckService";
import { Button, Card, FloatButton, Tooltip, notification, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { CardPage } from "../../dtos/CardPage";
import { v4 as uuidv4 } from 'uuid';
import "./deck.css";
import { useRouter } from "next/router";
import { CustomerServiceOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import AddCard from "../AddCard";
import cardService from "@/services/CardService";
import type { NotificationPlacement } from 'antd/es/notification/interface';

const { Meta } = Card;
function Deck() {
  const [cards, setCards] = useState<CardPage>();
  const router = useRouter();
  const [addCardVisible, setAddCardVisible] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const Context = React.createContext({ name: 'Default' });

  async function loadData() {
    if (router.query.id !== undefined) {
      const response = await deckService.findCards(Number(router.query.id), 30, 0);
      setCards(response.data);
    }
    
  }

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
  useEffect(() => {  
    loadData();
  }, [router.query.id]);

  async function deleteCard(cardId: Number) {
    try {
      const response = await cardService.delete(Number(router.query.id), cardId);
      if (response.status === 204) {
        openNotificationSuccess("Operação realizada com sucess.");
        loadData();
      }
    } catch (error: any) {
      openNotificationError(error.message)
    }
  }

  return (
    <main>
      <h1 className='title'>{'Deck de ' + router.query.description}</h1>
      {contextHolder}
      <div className='card-container'>
      {cards && cards.content.map((card)=> {
          return (
            <Tooltip  key={uuidv4()} placement="bottom" title={card.description}>
              <Card key={uuidv4()}
                hoverable
                style={{ width: 250 }}
                cover={<img alt="example" src={card.image} />}
               
              >
                <Meta style={{ width: 250 }}/>


                <Popconfirm
                  title="Remover carta"
                  description="Você tem certeza que deseja remover essa carta do deck?"
                  onConfirm={()=> deleteCard(card.cardApiId)}
                  onCancel={()=> console.log("sd")}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button className={"btn-delete"} type="primary" danger icon={<DeleteOutlined />} 
                  />
                </Popconfirm>
              </Card>
            </Tooltip>
          )
        })} 
      </div>
      <FloatButton
        shape="square"
        type="primary"
        style={{ right: 24}}
        icon={ <PlusOutlined />}
        onClick={()=> setAddCardVisible(true)}
      />
      <AddCard open={addCardVisible} setOpen={setAddCardVisible} loadData={loadData}  />
    </main>
  )
}

export default Deck;
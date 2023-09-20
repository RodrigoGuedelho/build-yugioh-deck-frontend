import { Modal, Form, Input, notification, Tooltip, Card, Button, Select, Switch, Checkbox, InputNumber } from "antd";
import React, { useState } from "react";
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { v4 as uuidv4 } from 'uuid';
import { CheckOutlined, FileSearchOutlined, SearchOutlined } from "@ant-design/icons";
import cardService from "../../services/CardService";
import deckService from "../../services/DeckService";
import { CardDTO } from "../../dtos/CardDTO";
import { useRouter } from "next/router";
const { Meta } = Card;
import "./style.css";
import { CheckboxChangeEvent } from "antd/es/checkbox";

function AddCard(props: any) {
  const [filterName, setFilterName] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterRace, setFilterRace] = useState("");
  const [filterAttribute, setFilterAttribute] = useState("");
  const [filterLevel, setFilterLevel] = useState<string | number | null>(0);
  const [externalSeach, setExternalSeach] = useState<boolean>(false)

  const [api, contextHolder] = notification.useNotification();
  const [cards, setCards] = useState<CardDTO[]>([]);
  const router = useRouter();
  const Context = React.createContext({ name: 'Default' });

  async function findCards() {
    const response = await cardService.find(filterName, filterType, Number(filterLevel),
      filterRace, filterAttribute, externalSeach);
    setCards(response.data);
  }

  async function addCards() {
    try {
      const response = await deckService.addCard(cards[0], Number(router.query.id));
      if (response.status === 200) {
        openNotificationSuccess("Operação realizada com sucess.")
        props.loadData();
      }
    } catch (error: any) {
      openNotificationError(error.message)
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

  async function onChangeExternalSeach(e: CheckboxChangeEvent) {
    setExternalSeach(Boolean(e.target.checked));
    console.log("External seach", externalSeach + " " + e.target.checked)
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  return (
    <Modal
    title="Adicione Novas Cartas ao seu Deck"
    centered
    open={props.open}
    onOk={() => props.setOpen(false)}
    onCancel={() => props.setOpen(false)}
    width={1200}
    className="modal-add-card"
  > 
    {contextHolder}
    <div className="form-filters">
      <Form {...layout} name="normal_login" initialValues={{ remember: true }} layout="horizontal">
        <Form.Item name="filterDescriptionField" label="Nome" >
          <Input value={filterName} onChange={(e) => setFilterName(e.target.value)} placeholder="Nome" />   
        </Form.Item>

        <Form.Item name="filterTypeField" label="Type" >
          <Input value={filterType} onChange={(e) => setFilterType(e.target.value)} placeholder="Tipo" />   
        </Form.Item>

        <Form.Item name="filterRaceField" label="Race" >
          <Input value={filterRace} onChange={(e) => setFilterRace(e.target.value)} placeholder="Raça" />   
        </Form.Item>

        <Form.Item name="filterAttributeField" label="Attribute" >
          <Input value={filterAttribute} onChange={(e) => setFilterAttribute(e.target.value)} placeholder="Atributo" />   
        </Form.Item>

        <Form.Item name="filterLevelField" label="Level" >
          <InputNumber min={0} max={15} value={filterLevel} onChange={setFilterLevel} />
        </Form.Item>
       

        <Form.Item
          name="remember"
          
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox checked={externalSeach}  value={externalSeach} onChange={onChangeExternalSeach}>Buscar em API externa</Checkbox>
        </Form.Item>

        <Form.Item  name="btnFilter" wrapperCol={{ offset: 8, span: 16 }} >
          <Button type="primary" icon={<SearchOutlined />} onClick={findCards} >Buscar</Button>
        </Form.Item>
      </Form>
    </div>

    <div className='card-container-add-card'>
        { cards.length >0 ? cards.map((card)=> {
          return (
            <Tooltip  key={uuidv4()} placement="bottom" title={card.description} >
              <Card key={uuidv4()} 
                hoverable
                style={{ width: 250 }}
                cover={<img alt="example" src={card.image} />}
              >
                <Meta style={{ width: 250 }} />
                <Button type="primary" icon={<CheckOutlined />} onClick={addCards} />
              </Card>
          </Tooltip>
          )
        }) 
        
        : 
        <div style={{margin: '10px', textAlign: 'center'}}>
          <h1 >Não ha Itens...</h1>
          <FileSearchOutlined height={200} style={{width:'200px'}} twoToneColor="#eb2f96"/>
        </div>

      
        }
    </div>
  </Modal>
  );
}

export default AddCard;
import { RegisterDeckProps } from "@/dtos/RegisterDeckProps";
import deckService from "@/services/DeckService";
import { Form, Input, Button, Modal, notification } from 'antd';
import React, { useState } from "react";
import type { NotificationPlacement } from 'antd/es/notification/interface';

function RegisterDeck(props: RegisterDeckProps) {
  const [description, setDescription] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const Context = React.createContext({ name: 'Default' });
  function save(){
    try {
      deckService.save(description);
      openNotificationSuccess("Cadastro realizado com sucesso.");
      props.loadDecks();
      props.setOpen(false);
    } catch (error: any) {
      openNotificationError(error.message);
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
  return (
    <Modal
        title="Cadastrar um Novo Deck"
        centered
        open={props.open}
        onOk={() => save()}
        onCancel={() => props.setOpen(false)}
        width={600}
      > 
        {contextHolder}
        <Form name="normal_login" initialValues={{ remember: true }}>
          <Form.Item name="username" rules={[{ required: true, message: 'Por favor, insira a descrição.' }]}>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição" />
          </Form.Item>
        </Form>

      </Modal>
  )
}

export default RegisterDeck;
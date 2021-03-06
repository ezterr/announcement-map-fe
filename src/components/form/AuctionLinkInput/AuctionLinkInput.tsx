import React, { ChangeEvent, FormEvent, useState } from 'react'
import './AuctionLinkInput.css'
import { AuctionLink } from '../../AuctionLink/AuctionLink'
import { AddAuctionLinkForm } from '../AddAuctionLinkForm/AddAuctionLinkForm'
import { CreateAuctionLinkDto } from 'types';

interface Props {
  form: {
    auctionLinks: CreateAuctionLinkDto[],
  };
  removeAuctionLinkHandler: (index: number) => void;
  addAuctionLinkHandler: (auctionLink: CreateAuctionLinkDto) => void;
}

const initialAuctionLinkForm: CreateAuctionLinkDto = {
  name: '',
  url: '',
}

export const AuctionLinkInput = ({form, removeAuctionLinkHandler, addAuctionLinkHandler}: Props) => {
  const [linkForm, setLinkForm] = useState<CreateAuctionLinkDto>(initialAuctionLinkForm);

  const changeFormHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLinkForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addAuctionLinkHandler(linkForm);
    setLinkForm(initialAuctionLinkForm);
  }

  return (
    <div className="AuctionLinkInput">
      <p>Aukcje: </p>
      <AddAuctionLinkForm
        onSubmit={onSubmitHandler}
        form={linkForm}
        disabled={form.auctionLinks.length >= 5}
        changeFormHandler={changeFormHandler}
      />

      {form.auctionLinks.map((e, i) => (
        <AuctionLink
          key={i}
          name={e.name}
          removeAuctionLinkHandler={() => removeAuctionLinkHandler(i)}
        />
      ))}
    </div>
  )
}

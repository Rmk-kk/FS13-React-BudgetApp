import React, {FormEvent} from "react";

export interface listItem {
    amount: number,
    type: string | null,
    id: string,
    source: string,
    date: string | null
}

export interface Balance extends Object{
    income: number,
    expense: number,
    savings: number,
    total: number,
}

export interface ModalWindowProps {
    handleForm:(e:FormEvent, data:listItem) => void,

}

export interface SavingsModalProps {
    savingsShow: boolean,
    setSavingsShow: React.Dispatch<React.SetStateAction<boolean>>,
    savingsModalType: SavingsType,
    handleForm: (e:FormEvent,data:listItem) => void,
    type: 'target' | 'withdraw' | 'transfer' | null,
    setTargetSavings: (amount:number) => void,
}

export interface TransactionContentProps {
    list: listItem[],
}

export interface SavingsContentProps {
    handleForm: (e:FormEvent,data:listItem) => void,
}


export interface HeaderProps{
    setFilterInput: React.Dispatch<React.SetStateAction<string>>
    setRadioFilter: React.Dispatch<React.SetStateAction<string>>
}


export type SavingsType = 'target' | 'withdraw' | 'transfer' | null;



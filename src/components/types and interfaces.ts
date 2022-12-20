import React, {FormEvent} from "react";

export interface listItem {
    amount: number,
    type: string | null,
    id: string,
    source: string,
    date: Date | null
}

export interface Balance extends Object{
    income: number,
    expense: number,
    savings: number,
    total: number,
    target: number
}

export interface PieCharProps {
    balance: Balance
}

export interface ModalWindowProps {
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    handleForm:(e:FormEvent, data:listItem) => void,
    show: boolean,

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
    onDelete: (id: string) => void,
    balance: Balance,
    onItemChange: (id: string) => void
}

export interface SavingsContentProps {
    handleForm: (e:FormEvent,data:listItem) => void,
    balance: Balance,
    setTargetSavings: (amount:number) => void
}


export interface HeaderProps{
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    setFilterInput: React.Dispatch<React.SetStateAction<string>>
    setRadioFilter: React.Dispatch<React.SetStateAction<string>>
}

export interface FooterProps {
    balance: Balance | null
}

export type SavingsType = 'target' | 'withdraw' | 'transfer' | null;



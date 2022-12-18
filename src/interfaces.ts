import {FormData, SavingsData} from "./components/App/App";

export type ModalType = 'Income' | 'Expense' | 'Savings' | 'Transfer' | 'Withdraw'

export type ModalInputType = 'source' | 'amount' | 'transfer' | 'savings'
export interface CardInfo {
    title: string,
    amount: string,
    source: string,
}

export interface ContentProps {
    formData: FormData,
    handleForm: (data:FormData) => void,
    showModal: (type:ModalType) => void,
    savings: SavingsData,
    resetSavingsTarget:() => void,

}

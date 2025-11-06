import { toast } from "react-toastify";

export const toastSuccessMessage = (str) => {
    toast.success(`${str}`, {
        position: "top-center",
        autoClose: 2000,
    })
};


export const toastSuccessMessageError = (str) => {
    toast.error(`${str}`, {
        position: "top-center",
        autoClose: 2000,
    })
};
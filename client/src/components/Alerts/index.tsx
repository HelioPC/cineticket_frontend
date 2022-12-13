import Swal from 'sweetalert2';

type AlertProps = {
    title: string;
    description: string;
    link?: string;
    message?: string;
    confirm?: () => void;
}

export const AlertError = ({ title, description }: AlertProps) => {
    Swal.fire({
        title: title,
        icon: "error",
        text: description,
    })
}

export const AlertSuccess = ({ title, description, link, message, confirm }: AlertProps) => {
    Swal.fire({
        title: title,
        icon: "success",
        text: description,
        footer: (link !== undefined && message !== undefined) ? `<a href=${link}>${message}</a>` : 'CineTicket 2022 🎞 🚀'
    }).then(confirm).catch(function (error) {console.log(error)});
}

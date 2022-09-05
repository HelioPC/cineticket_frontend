import Swal from 'sweetalert2';

type AlertProps = {
    title: string;
    description: string;
}

export const AlertError = ({ title, description }: AlertProps) => {
    Swal.fire({
        title: title,
        icon: "error",
        text: description,
        footer: "<a href>Why do I have this issue?</a>"
    })
}

export const AlertSuccess = ({ title, description }: AlertProps) => {
    Swal.fire({
        title: title,
        icon: "success",
        text: description,
        footer: "<a href>Why do I have this issue?</a>"
    })
}

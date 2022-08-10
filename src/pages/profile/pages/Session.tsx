import { useEffect, useState } from "react";
import SessionsList from "../../../components/SessionsList";
import { Loading } from "../../../components/Utils";

const Session = () => {
    return (
        <div>
            <h1>Sessões</h1>

            <SessionsList />
        </div>
    )
}

export default Session;

import React, { ReactElement } from 'react';
import logo from "../../assets/images/algorave-yellow.svg";
import { MuxyEvent } from "../types";
import { DateTime } from "luxon";
import ProgressBar from "@ramonak/react-progress-bar";

interface Props {
    event: MuxyEvent | undefined
    reservedStreamCount: number | null
    totalStreamCount: number | null
}

interface ProgressType {
    reserved: number,
    total: number
    percent: number;
}

function EventHeader({event, reservedStreamCount, totalStreamCount}:Props): ReactElement {

    const calcProgressbar = (reservedStreamCount: number | null, totalStreamCount: number | null) : ProgressType => {
        if (reservedStreamCount === null || totalStreamCount === null) {
            return {reserved: 0, total: 0, percent: 0};
        }

        return {reserved: reservedStreamCount, total: totalStreamCount, percent: (reservedStreamCount * 100) / totalStreamCount};
    }

    const progressBarValues = calcProgressbar(reservedStreamCount, totalStreamCount);

    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h4>worldwide equinox stream</h4>
            <h1>Algorave 10th Birthday Party</h1>
            <h2> {event && DateTime.fromISO(event.starts_at).toFormat("dd. LLLL HH:mm")} - {event && DateTime.fromISO(event.ends_at).toFormat("dd. LLLL HH:mm")} {event && DateTime.fromISO(event.starts_at).toFormat("yyyy")}</h2>
            <hr/>

            <ProgressBar
                className="wrapper"
                bgColor={"#777"}
                baseBgColor={"#bbbbbb54"}
                labelClassName="label"
                labelAlignment={"outside"}
                width={"100%"}
                height={"28px"}
                margin={"8px"}
                customLabel={`${progressBarValues.reserved}/${progressBarValues.total} slots are filled`}
                completed={progressBarValues.percent}
            />

            <hr/>
            <p>Your timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
            <p>This March in 2022, algorave is ten years old. Lets try to fill a whole day with ten minute live streams, of live coded and other algorithmic performances. <br />Beginners and old timers are all welcome to stream. <br />Grab your performance slot below, you will then be sent a stream key for use with the (free) <a href="https://ten.algorave.com">OBS streaming software</a>, along with further instructions.</p>
            <p className="link-paragraph">The event will be streamed exclusively to <a href="https://live.eulerroom.com/">live.eulerroom.com</a></p>
        </header>
    );
}

export default EventHeader;

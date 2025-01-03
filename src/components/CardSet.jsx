import "../styles/cards.css";
import { Image, Container, Col, Row } from "react-bootstrap";
import { cloneElement, onMouseEnter } from "react";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "../contexts/GameContext.jsx";
import React from "react";
import Fig01 from "../styles/cards/fig01.svg";
import Back from "../styles/cards/back.svg";
import Fig02 from "../styles/cards/fig02.svg";
import Fig03 from "../styles/cards/fig03.svg";
import Fig04 from "../styles/cards/fig04.svg";
import Fig05 from "../styles/cards/fig05.svg";
import Fig06 from "../styles/cards/fig06.svg";
import Fig07 from "../styles/cards/fig07.svg";
import Fig08 from "../styles/cards/fig08.svg";
import Fig09 from "../styles/cards/fig09.svg";
import Fig10 from "../styles/cards/fig10.svg";
import Fig11 from "../styles/cards/fig11.svg";
import Fig12 from "../styles/cards/fig12.svg";
import Fig13 from "../styles/cards/fig13.svg";
import Fig14 from "../styles/cards/fig14.svg";
import Fig15 from "../styles/cards/fig15.svg";
import Fig16 from "../styles/cards/fig16.svg";
import Fig17 from "../styles/cards/fig17.svg";
import Fig18 from "../styles/cards/fig18.svg";
import Fige01 from "../styles/cards/fige01.svg";
import Fige02 from "../styles/cards/fige02.svg";
import Fige03 from "../styles/cards/fige03.svg";
import Fige04 from "../styles/cards/fige04.svg";
import Fige05 from "../styles/cards/fige05.svg";
import Fige06 from "../styles/cards/fige06.svg";
import Fige07 from "../styles/cards/fige07.svg";

const dictImg = {
    back: Back,
    fig01: Fig01,
    fig02: Fig02,
    fig03: Fig03,
    fig04: Fig04,
    fig05: Fig05,
    fig06: Fig06,
    fig07: Fig07,
    fig08: Fig08,
    fig09: Fig09,
    fig10: Fig10,
    fig11: Fig11,
    fig12: Fig12,
    fig13: Fig13,
    fig14: Fig14,
    fig15: Fig15,
    fig16: Fig16,
    fig17: Fig17,
    fig18: Fig18,
    fige01: Fige01,
    fige02: Fige02,
    fige03: Fige03,
    fige04: Fige04,
    fige05: Fige05,
    fige06: Fige06,
    fige07: Fige07,
};

function CardSwitcher({ imgsource, onSelect, isSelected, isBlocked }) {
    return (
        <Container
            onClick={onSelect}
            className={`card-switcher ${
                isSelected ? "is-selected-figure" : ""
            }`}
        >
            <Row>
            <Image src={isBlocked ? dictImg['back'] : imgsource} className="img-content" />
            </Row>
        </Container>    
    );
}

export default function CardSetFig({ idOwnsSet, position, isHorizontal }) {
    const {
        idPlayer,
        infoPlayers,
        players,
        turnPlayer,
        playersNames,
        selectedFigureCard,
        setSelectedFigureCard,
        setSelectedMovementCard,
        setSelectedTiles,
    } = useContext(GameContext);
    const [currentPlayers, setCurrentPlayers] = useState(players);
    const [actualCards, setActualCards] = useState([]);
    let firstPlayer = "";

    useEffect(() => {
        setCurrentPlayers(players);
    }, [players]);

    useEffect(() => {
        const actualPlayer = infoPlayers.find((p) => p.id_user === idOwnsSet);
        if(actualPlayer){
            const unblocked = actualPlayer.figures_available.map(
                (fig) => ({name: fig, isBlocked: false})
            )
            const blocked = actualPlayer.figures_blocked.map(
                (fig) => ({name: fig, isBlocked: true})
            )
            const figures_concat = blocked.concat(unblocked);
        
            setActualCards(actualPlayer ? figures_concat : []);
            //setActualCards([]);
        }
        console.log(infoPlayers);
    }, [infoPlayers]);

    if (currentPlayers.length > position && position != 0) {
        const otherPlayers = currentPlayers.filter(
            (player) => player != idPlayer
        );
        firstPlayer = otherPlayers[position - 1];
    }

    const handleClick = (idx) => {
        const infoSelectedCard = {
            idPlayer: idOwnsSet,
            offsetCard: idx,
            nameFig: actualCards[idx].name,
            isBlocked: actualCards[idx].isBlocked
        };
        setSelectedFigureCard(
            selectedFigureCard?.offsetCard == idx &&
                selectedFigureCard?.idPlayer == idOwnsSet &&
                !infoSelectedCard?.isBlocked
                ? null
                : infoSelectedCard
        );
        setSelectedMovementCard([null, null]);
        setSelectedTiles([]);
    };
    return (
        <Row className={`${idOwnsSet==idPlayer ? "is-my-set" : ""}`}>
            <Col className={isHorizontal ? "cardset-horizontal" : "cardset-vertical"}>
                <Row className="justify-content-md-center">
                    <h4 className={turnPlayer == firstPlayer ? "has-turn" : "not-turn"}>
                        {position != 0
                            ? firstPlayer
                                ? playersNames[currentPlayers.indexOf(firstPlayer)]
                                : "Disconnected"
                            : ""}
                    </h4>
                </Row>
                <Row className="justify-content-md-center bg-cardset" style={{
                        height: isHorizontal ? '110px' : '330px',
                        width: isHorizontal ? '350px' : '110px'
                    }}>
                    {[0, 1, 2].map((index) => (
                        <Col key={index} xs="auto" className="carta " style={{
                            padding: '10px'
                        }}>
                            {actualCards[index] && (
                                <CardSwitcher
                                    onSelect={() => handleClick(index)}
                                    imgsource={dictImg[actualCards[index].name]}
                                    isSelected={
                                        selectedFigureCard &&
                                        selectedFigureCard.offsetCard == index &&
                                        selectedFigureCard.idPlayer == idOwnsSet
                                    }
                                    isBlocked={actualCards[index].isBlocked}
                                />
                            )}
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    );
}

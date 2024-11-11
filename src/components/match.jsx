function MatchItem({
    name,
    quantPlayers,
    max_players,
    min_players,
    onClick,
    isSelected,
    isPrivate
}) {
    return (
        <tr onClick={onClick} className={isSelected ? "selected" : ""}>
            <td>
                {name}
                {isPrivate && <span title="Partida Privada">🔒</span>}
            </td>
            <td>{quantPlayers}</td>
            <td>
                {min_players} - {max_players}
            </td>
        </tr>
    );
}

export function MatchItemActiveList( {gameName,
    playerName,
    numPlayers,
    onClick,
    isSelected
}) {
    return (
        <tr onClick={onClick} className={isSelected ? "selected" : ""}>
            <td>{gameName}</td>
            <td>{playerName}</td>
            <td>{numPlayers}</td>
        </tr>
    );
}

export default MatchItem;

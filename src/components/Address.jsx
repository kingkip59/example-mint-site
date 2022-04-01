function cut(str, cutStart, cutEnd) {
    return str.substr(0, cutStart) + '...' + str.substr(cutEnd + 1);
}

export function Address({ address = "" }) {
    return address && (
        <div className="address">
            <h4>Connected Wallet: <br></br>{cut(address, 6, 35)}</h4>
        </div>
    )
}
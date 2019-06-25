import React from "react";


export function Collection({ children }) {
    return <ul className="collection">{children}</ul>
}

export function CollectionItem({ children }) {
    return <li className="collection-item">{children}</li>
}
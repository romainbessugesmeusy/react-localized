import { Link } from "@reach/router";
import React from "react";
import { useLocalized } from "react-localized";

export default ({ struct }) => {
  const { getLocalized: _ } = useLocalized();
  return (
    <nav>
      <ul>
        {struct.items.map((navItem) => (
          <li key={navItem.href}>
            <Link to={navItem.href}>{_(navItem.title)}</Link>
            {Array.isArray(navItem.items) && (
              <ul>
                {navItem.items.map((subNavItem) => (
                  <li key={`${navItem.href}/${subNavItem.href}`}>
                    <Link to={`${navItem.href}/${subNavItem.href}`}>{_(subNavItem.title)}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

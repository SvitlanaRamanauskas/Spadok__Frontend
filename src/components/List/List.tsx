import { Vyshyvanka } from "../../types/Vyshyvanka";
import "../../styles/button.scss";
import "./List.scss";
import "../../styles/App.scss";
import { ProductCard } from "../ProductCard";
import { useState } from "react";
import { SearchAndSort } from "../SearchAndSort";
import { useSearchParams } from "react-router-dom";
import { getPreparedVyshyvanky } from "../../helper/fetch";
import { Book } from "../../types/Book";


type Props = {
  items: Vyshyvanka[] | Book[];
};

export const List: React.FC<Props> = ({ items }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleItemsCountMobile, setVisibleItemsCountMobile] = useState(6);
  const [visibleItemsCountDesktop, setVisibleItemsCountDesktop] = useState(9);

  const innerWidth = window.innerWidth;

  const handleShowMoreClick = () => {
    if (innerWidth < 1200) {
      setVisibleItemsCountMobile((prevCount) => {
        const newCount = prevCount + 6;
        return newCount >= items.length ? items.length : newCount;
      });
    } else {
      setVisibleItemsCountDesktop((prevCount) => {
        const newCount = prevCount + 9;
        return newCount >= items.length ? items.length : newCount;
      });
    }
  };

  const vyshyvankaItems = (items as Array<Vyshyvanka | Book>).filter((item: Vyshyvanka | Book): item is Vyshyvanka => {
    return 'size' in item; 
  });
  console.log(vyshyvankaItems)

  const preparedProducts = getPreparedVyshyvanky(items, Object.fromEntries(searchParams));

  return (
    <>
      <SearchAndSort 
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      {innerWidth < 1200 ? (
        <div className="list">
          {preparedProducts.slice(0, visibleItemsCountMobile).map((item: Vyshyvanka | Book) => (
            <div className="list__card" key={item.id}>
              <ProductCard item={item} vyshyvankyFromServer={vyshyvankaItems} />
            </div>
          ))}

          {visibleItemsCountMobile < items.length && (
            <div className="list__button-wrapper">
                <button className="list__button button" onClick={handleShowMoreClick}>
                  Більше товарів
                </button>
            </div>
          )}
        </div>
      ) : (
        <div className="list">
          {preparedProducts.slice(0, visibleItemsCountDesktop).map((item: Vyshyvanka | Book) => (
            <div className="list__card" key={item.id}>
              <ProductCard item={item} vyshyvankyFromServer={vyshyvankaItems} />
            </div>
          ))}

          {visibleItemsCountDesktop < items.length && (
            <div className="list__button-wrapper">
                <button className="list__button button" onClick={handleShowMoreClick}>
                  Більше товарів
                </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

import React from "react";
import "./CollectionFilter.css";
function CollectionFilter({
  handleList,
  handleGrid,
  totalProductLength,
  getDataShort,
  t,
}) {
  return (
    <>
      <div className="collectionFilter">
        <div className="totalProducts">
          {/* <h6>
            {totalProductLength?.length} {t("Products")}
          </h6> */}
          {/* <h6>{data?.length} products</h6> */}
        </div>
        <div className="collectionFilterItem">
          <div className="collectionFilterSort">
            <select defaultValue={"DEFAULT"} onChange={getDataShort}>
              {/* <option value="DEFAULT">  Default Sorting </option>
              <option value="manual">Featured</option>
              <option value="best-selling">Best selling</option> */}
              {/* <option value="price-ascending">Price, low to high</option>
              <option value="price-descending">Price, high to low</option> */}
              <option value="3">{t("Ascending by Name")}</option>
              <option value="4">{t("Descending by Name")}</option>
              <option value="1">{t("Newly added last")}</option>
              <option value="2">{t("Newly added first")}</option>
              <option value="5">{t("Price High to Low")}</option>
              <option value="6">{t("Price Low to High")}</option>
            </select>
          </div>

          {/* TODO use in future */}
          {/* <div className="collectionFilterList">
            <ul className="no-bullets inline-list text-right">

              <li>
                <button
                  type="button"
                  className="grid-view-btn"
                  data-view="Grid"
                  title="Grid"
                  onClick={handleGrid}
                >
                 <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="grid-view-btn"
                  data-view="list"
                  title="List"
                  onClick={handleList}
                >
                 <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg>
                </button>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default CollectionFilter;

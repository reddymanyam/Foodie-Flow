import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react"; 
import Shimmer from "./Shimmer"; 
import { swiggy_api_URL } from "../constants";
import { Link } from "react-router-dom";


function filterData(searchText, restaurants) {
  const resFilterData = restaurants.filter((restaurant) =>
    restaurant?.info?.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return resFilterData;
}


const Body = () => {
  
  const [searchText, setSearchText] = useState("");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  
  useEffect(() => {
    getRestaurants();
  }, []);

  
  async function getRestaurants() {
    
    try {
      const response = await fetch(swiggy_api_URL);
      const json = await response.json();

     
      async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {

          
          let checkData = json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

          
          if (checkData !== undefined) {
            return checkData;
          }
        }
      }

      
      const resData = await checkJsonData(json);

      
      setAllRestaurants(resData);
      setFilteredRestaurants(resData);
    } catch (error) {
      console.log(error);
    }
  }

  
  const searchData = (searchText, restaurants) => {
    if (searchText !== "") {
      const filteredData = filterData(searchText, restaurants);
      setFilteredRestaurants(filteredData);
      setErrorMessage("");
      if (filteredData?.length === 0) {
        setErrorMessage(`Sorry, we couldn't find any results for "${searchText}"`);
      }
    } else {
      setErrorMessage("");
      setFilteredRestaurants(restaurants);
    }
  };

  
  if (!allRestaurants) return null;

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search a restaurant you want..."
          value={searchText}
          
          onChange={(e) => setSearchText(e.target.value)}
        ></input>
        <button
          className="search-btn"
          onClick={() => {
            
            searchData(searchText, allRestaurants);
          }}
        >
          Search
        </button>
      </div>
      {errorMessage && <div className="error-container">{errorMessage}</div>}

      {/* if restaurants data is not fetched then display Shimmer UI after the fetched data display restaurants cards */}
      {allRestaurants?.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="restaurant-list">
          {/* We are mapping restaurants array and passing JSON array data to RestaurantCard component as props with unique key as restaurant.data.id */}
          {filteredRestaurants.map((restaurant) => {
            return (
              <Link
                to={"/restaurant/" + restaurant?.info?.id}
                key={restaurant?.info?.id}
              >
                <RestaurantCard {...restaurant?.info} />
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Body;
import { useLocation, useNavigate } from "react-router-dom";
import queryString from 'query-string';

import { HeroCard } from "../components/HeroCard"
import { useForm } from "../hooks"
import { getHeroByName } from "../helpers";

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse( location.search );

  const heros = getHeroByName(q);

  const showSearch = ( q === '');
  const showError = ( q.length > 0 && heros.length === 0 );

  const { searchText, onInputChange } = useForm({ searchText: q });

  const handleSubmit = (e) => {
    e.preventDefault();

    // if(searchText.trim().length < 1) return;

    navigate(`?q=${ searchText }`);
  };

  return (
    <>
      <h1>SearchPage</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form aria-label="form" onSubmit={ handleSubmit }>
            <input 
              type="text"
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              value={ searchText }
              onChange={ onInputChange }
              autoComplete="off" />

              <button className="btn btn-outline-primary mt-1">Search</button>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {/* {
            ( q === '' ) 
            ? (
              <div className="alert alert-primary">
                Search a hero
              </div>
            )
            : ( heros.length === 0 && (
              <div className="alert alert-danger">
                No hero with <b>ABC</b>
              </div>
            ))
          } */}

          {
            ( showSearch ) && (
              <div className="alert alert-primary">
                Search a hero
              </div>
            ) 
          }
          
          {
            ( showError ) && (
              <div className="alert alert-danger">
                No hero with <b>{ q }</b>
              </div>
            ) 
          }

          {
            heros.map( hero => (
              <HeroCard key={ hero.id} { ...hero } />
            ))
          }

        </div>
      </div>

    </>
  )
}

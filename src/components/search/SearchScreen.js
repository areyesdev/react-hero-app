import React, { useMemo } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroByName } from '../../selectores/getHeroByName';

export const SearchScreen = ({history}) => {
    const location = useLocation();
    const { q = ''} = queryString.parse(location.search);
    const [ formValues, handleInputChange ] = useForm({
        searchText: q
    });
    const {searchText} = formValues;
    const herosFilter = useMemo(() => getHeroByName( q ), [q])
    const handleSearch = (ev) => {
        ev.preventDefault();
        history.push(`?q=${searchText}`)
    }
    return (
        <div>
            <h1>Searc hScreen</h1>
            <hr />
            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr />

                    <form onSubmit={handleSearch}>
                        <input 
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={searchText}
                            onChange={handleInputChange}
                        />
                        <button
                            type="submit"
                            className=" btn m1 btn-block btn-outline-primary"
                        >
                            Search...
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4> Resulta</h4>
                    <hr />
                    {
                        (q === '')
                            &&
                            <div className="alert alert-info">
                                Search a hero
                            </div>
                    }
                    {
                        (q !== '' && herosFilter.length === 0)
                            &&
                            <div className="alert alert-info">
                                There is no a hero with { q }
                            </div>
                    }
                    {
                        herosFilter.map(hero => (
                            <HeroCard 
                                key={hero.id}
                                {...hero}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

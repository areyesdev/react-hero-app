import React from 'react'
import { getHeroesByPublisher } from '../../selectores/getHeroesByPublisher'
import { HeroCard } from './HeroCard'

export const HeroeList = ({publisher}) => {
    const heroes = getHeroesByPublisher(publisher)
    return (
        <div className="card-columns">
            {
                heroes.map(hero => (
                    <HeroCard
                        key={hero.id}
                        {...hero}
                    />
                ))
            }
        </div>
    )
}

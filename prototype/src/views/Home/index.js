import React from 'react'
import {Link} from 'react-router-dom'
import Counter from '../../components/Counter'
import './index.css'

export default function () {
  return (
    <div className="HomeView">
      Hejhej på mig, jag är tjockare än du
      <Link to="/About">About</Link>
      <Counter />
    </div>
  )
}

/*
import { Query } from 'react-apollo'
import getPosts from './getPosts.gql'
<Query query={getPosts}>
  {({data: {posts = []}}, loading, error) => loading
    ? <div>Laddar</div>
    : error ? <div>Error</div>
    : posts.map(({ id, title, description, content }) =>
      <div className="Post">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    )
  }
</Query>
*/

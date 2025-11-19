import {Link} from 'react-router-dom'

const Header = () => {
  const navLinks = [
    {id: '', title: 'home'},
    {id: 'about', title: 'About'}
  ]

  return (
    <div>
      <ul>
        {navLinks.map((link) => (
          <li key={link.id}><Link to={`/${link.id}`}>{link.title}</Link></li>
        ))}
      </ul>
    </div>
  )
}


export default Header

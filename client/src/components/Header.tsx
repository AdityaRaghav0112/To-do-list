

const Header = () => {
    const data = [
        {id: 1, name: '1'},
        {id: 2, name: '2'},
        {id: 3, name: '3'},
        {id: 4, name: '4'}
    ]

  return (
    <div >
      This is Header 
      {data.map((link) => (
        <a key={link.id}>{link.name}</a>
      ))}
    </div>
  )
}

export default Header

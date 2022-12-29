const Entry = ({ person, deleteEntry }) => 
    <li>{person.name} - {person.number} - <button onClick={deleteEntry}>Delete me</button></li>


export default Entry